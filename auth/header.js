/*
    ShuttleSync UI Framework
    - Universal Header + Sidebar
    - Theme Engine (Dark / Light)
    - Layout Manager
    - Global Loader + Skeletons
    - Click-outside auto-close
    - Role-based navigation
*/

// -------------------------------
// CONFIG
// -------------------------------
const VERIFY_URL = "YOUR_MAKE_VERIFY_WEBHOOK";

// -------------------------------
// LOAD SESSION
// -------------------------------
const ss = JSON.parse(localStorage.getItem("skSession") || "{}");

// -------------------------------
// BUILD GLOBAL DOM
// -------------------------------
document.body.insertAdjacentHTML("afterbegin", `
<div id="ss-loader"><div class="spinner"></div></div>

<div id="ss-topbar">
    <button class="topbar-btn" id="ss-menu-btn">☰</button>
    <div class="ss-title">ShuttleSync</div>
    <button class="topbar-btn" id="ss-theme-toggle">🌓</button>
</div>

<div id="ss-sidebar" class="collapsed">
    <div class="ss-logo">ShuttleSync</div>

    <div class="ss-user">
        <img src="${ss.avatar || 'https://ui-avatars.com/api/?name=' + ss.fullName}" />
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

<div id="ss-content">
    <div id="ss-page-container"></div>
</div>
`);


// -------------------------------
// ROLE MENUS
// -------------------------------
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

activeMenu.forEach(([name, link]) => {
    const btn = document.createElement("button");
    btn.classList.add("ss-nav-btn");
    btn.textContent = name;
    btn.onclick = () => {
        window.location.href = link;
    };
    navEl.appendChild(btn);
});


// -------------------------------
// SIDEBAR TOGGLE (mobile)
# -------------------------------
const sidebar = document.getElementById("ss-sidebar");

document.getElementById("ss-menu-btn").onclick = () => {
    sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-open");
};


// -------------------------------
// AUTO-CLOSE SIDEBAR — click outside
// -------------------------------
document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !e.target.closest("#ss-menu-btn")) {
        sidebar.classList.add("collapsed");
        document.body.classList.remove("sidebar-open");
    }
});


// -------------------------------
// LOGOUT
// -------------------------------
document.getElementById("ss-logout").onclick = () => {
    localStorage.removeItem("skSession");
    window.location.href = "/shuttlesync";
};


// -------------------------------
// THEME ENGINE
// -------------------------------
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


// -------------------------------
// SESSION VALIDATION
// -------------------------------
async function validateSession() {
    if (!ss.sessionToken) return failStatus();

    try {
        const r = await fetch(VERIFY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: ss.sessionToken })
        });

        const data = await r.json();
        data.valid ? okStatus() : failStatus();

    } catch {
        failStatus();
    }
}

function okStatus() {
    document.getElementById("ss-status").style.background = "#27d47c";
}
function failStatus() {
    document.getElementById("ss-status").style.background = "#e84545";
}

validateSession();
setInterval(validateSession, 30000);


// -------------------------------
// PAGE LOADING + SKELETON
// -------------------------------
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("ss-loader").classList.add("hide");
    }, 400);
});

