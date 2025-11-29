const VERIFY_URL = "/verify-session";

// Load session
const ss = JSON.parse(localStorage.getItem("skSession") || "{}");

// Inject UI
document.body.insertAdjacentHTML("afterbegin", `
    <header id="ss-topbar">
        <button id="ss-menu-btn" class="topbar-btn">☰</button>
        <div class="ss-title">${document.title}</div>
        <button id="ss-theme-toggle" class="topbar-btn">🌓</button>
    </header>

    <aside id="ss-sidebar" class="collapsed">
        <div class="ss-logo">ShuttleSync</div>

        <div class="ss-user">
            <img src="${ss.avatar || `https://ui-avatars.com/api/?name=${ss.fullName || 'User'}`}" />
            <div class="ss-user-info">
                <div class="name">${ss.fullName || "Unknown"}</div>
                <div class="role">${ss.role || "—"}</div>
            </div>
        </div>

        <nav id="ss-nav"></nav>

        <footer class="ss-footer">
            <button id="ss-logout">Logout</button>
            <button id="ss-theme-toggle-2">🌓 Theme</button>
        </footer>
    </aside>
`);


// Role menus
const MENUS = {
    Destination: [
        ["Home", "/destination/home/checkInOut.html"],
        ["Flights", "/destination/airport/flightList.html"],
        ["Passengers", "/destination/paxCI/welcomeMeetings.html"],
        ["Transfers", "/destination/transfers/busAssignments.html"],
        ["Tours", "/destination/tours/productList.html"],
        ["Guest Service", "/destination/guestService/hotlineChat.html"],
        ["Baggage Status", "/destination/airport/bagageStatus.html"]
    ],
    Operations: [
        ["Crew Planning", "/ops/crewPlanning.html"],
        ["Uniform Center", "/uniform/index.html"],
        ["Internal Portal", "/intra/dashboard.html"]
    ],
    Manager: [
        ["Duty Schedule", "/destination/managerPanel/dutySchedule.html"],
        ["Sales Reporting", "/destination/managerPanel/salesReporting.html"],
        ["Broadcast", "/destination/managerPanel/broadcastMessages.html"],
        ["All Modules", "/intra/dashboard.html"]
    ],
    Admin: [
        ["System Admin", "/intra/dashboard.html"],
        ["User Directory", "/intra/profile.html"]
    ]
};

const nav = document.getElementById("ss-nav");
(MENUS[ss.role] || []).forEach(([label, link]) => {
    const btn = document.createElement("button");
    btn.className = "ss-nav-btn";
    btn.textContent = label;
    btn.onclick = () => (window.location.href = link);
    nav.appendChild(btn);
});


// Sidebar toggle
const sidebar = document.getElementById("ss-sidebar");
document.getElementById("ss-menu-btn").onclick = () => {
    sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-open");
};


// Theme engine
function applyTheme() {
    const theme = localStorage.getItem("ss-theme") || "dark";
    document.documentElement.dataset.theme = theme;
}
applyTheme();

function toggleTheme() {
    const next = (localStorage.getItem("ss-theme") || "dark") === "dark" ? "light" : "dark";
    localStorage.setItem("ss-theme", next);
    applyTheme();
}

document.getElementById("ss-theme-toggle").onclick = toggleTheme;
document.getElementById("ss-theme-toggle-2").onclick = toggleTheme;


// Logout
document.getElementById("ss-logout").onclick = () => {
    localStorage.removeItem("skSession");
    window.location.href = "/shuttlesync";
};


// Session validation
async function validate() {
    if (!ss.sessionToken) return;
    try {
        const res = await fetch(VERIFY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: ss.sessionToken })
        });
        const data = await res.json();
        document.querySelector(".ss-user").style.borderLeft =
            data.valid ? "4px solid #27d47c" : "4px solid #e84545";
    } catch {
        document.querySelector(".ss-user").style.borderLeft = "4px solid #e84545";
    }
}
validate();
setInterval(validate, 30000);
