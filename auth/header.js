/*
   ShuttleSync Universal Header + Sidebar
   Features:
   - Session load
   - Role-based menus
   - Sync status
   - Logout
   - Theme toggle
   - Mobile slide sidebar
   - Desktop fixed sidebar
*/

// ------- CONFIG -------
const VERIFY_URL = "YOUR_MAKE_VERIFY_WEBHOOK";

// ------- LOAD SESSION -------
const ss = JSON.parse(localStorage.getItem("skSession") || "{}");

// ------- INSERT HTML STRUCTURE -------
document.body.insertAdjacentHTML("afterbegin", `
<div id="ss-topbar">
    <button class="topbar-btn" id="ss-menu-btn">☰</button>
    <div class="brand">ShuttleSync</div>
    <button class="topbar-btn" id="ss-theme-toggle">🌓</button>
</div>

<div id="ss-sidebar" class="collapsed">
    <div class="ss-logo">ShuttleSync</div>

    <div class="ss-user">
        <img src="${ss.avatar || "https://ui-avatars.com/api/?name="+ss.fullName}" />
        <div class="ss-user-info">
            <div class="name">${ss.fullName || "Unknown"}</div>
            <div class="role">${ss.role || "—"}</div>
        </div>
        <div id="ss-status" class="ss-status"></div>
    </div>

    <div class="ss-nav" id="ss-nav"></div>

    <div class="ss-footer">
        <button id="ss-logout">Logout</button>
        <button id="ss-theme-toggle-2">🌓 Theme</button>
    </div>
</div>

<div id="ss-content"></div>
`);

// ------- ROLE MENUS -------
const menus = {
    "Destination": [
        ["Home Dashboard", "/destination/home/checkInOut.html"],
        ["Flights", "/destination/airport/flightList.html"],
        ["Passengers", "/destination/paxCI/welcomeMeetings.html"],
        ["Transfers", "/destination/transfers/busAssignments.html"],
        ["Tours", "/destination/tours/productList.html"],
        ["Guest Service", "/destination/guestService/hotlineChat.html"]
    ],
    "Operations": [
        ["Crew Planning", "/ops/crewPlanning.html"],
        ["Uniform Center", "/uniform/index.html"],
        ["Internal", "/intra/dashboard.html"]
    ],
    "Manager": [
        ["Manager Panel", "/destination/managerPanel/dutySchedule.html"],
        ["Reports", "/destination/home/reporting.html"],
        ["All Modules", "/intra/dashboard.html"]
    ],
    "Admin": [
        ["System Admin", "/intra/dashboard.html"],
        ["User Directory", "/intra/profile.html"]
    ]
};

const activeMenu = menus[ss.role] || [["Dashboard", "/intra/dashboard.html"]];
const navEl = document.getElementById("ss-nav");

activeMenu.forEach(([label, link])=>{
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => window.location.href = link;
    navEl.appendChild(btn);
});

// ------- SIDEBAR TOGGLE -------
document.getElementById("ss-menu-btn").onclick = () => {
    document.body.classList.toggle("sidebar-collapsed");
    document.getElementById("ss-sidebar").classList.toggle("collapsed");
};

// ------- LOGOUT -------
document.getElementById("ss-logout").onclick = () => {
    localStorage.removeItem("skSession");
    window.location.href = "/shuttlesync";
};

// ------- THEME MODE -------
function applyTheme() {
    const theme = localStorage.getItem("ss-theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
}
applyTheme();

function toggleTheme() {
    const current = localStorage.getItem("ss-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("ss-theme", next);
    applyTheme();
}

document.getElementById("ss-theme-toggle").onclick = toggleTheme;
document.getElementById("ss-theme-toggle-2").onclick = toggleTheme;

// ------- SESSION VALIDATION -------
async function validate(){
    if(!ss.sessionToken){
        failStatus(); 
        return;
    }

    try {
        const res = await fetch(VERIFY_URL, {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify({ token:ss.sessionToken })
        }).then(r=>r.json());

        if(res.valid) okStatus();
        else failStatus();

    } catch(e){
        failStatus();
    }
}

function okStatus(){
    document.getElementById("ss-status").style.background = "#27d47c";
}
function failStatus(){
    document.getElementById("ss-status").style.background = "#e84545";
}

validate();
setInterval(validate, 30000);
