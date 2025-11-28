/*
    ShuttleSync — Global UI Framework
    - Universal Header + Sidebar
    - Auto theme (dark / light)
    - Responsive layout engine
    - Auto-close sidebar
    - Role-based navigation
    - Page container mount
    - Loader + skeleton support
*/

const VERIFY_URL = "YOUR_MAKE_VERIFY_WEBHOOK";

// Load session
const ss = JSON.parse(localStorage.getItem("skSession") || "{}");

// ---------------------------
// Inject Global Layout
// ---------------------------
document.body.insertAdjacentHTML("afterbegin", `
    <div id="ss-loader"><div class="spinner"></div></div>

    <header id="ss-topbar">
        <button id="ss-menu-btn" class="topbar-btn">☰</button>
        <div class="ss-title"></div>
        <button id="ss-theme-toggle" class="topbar-btn">🌓</button>
    </header>

    <aside id="ss-sidebar" class="collapsed">
        <div class="ss-logo">ShuttleSync</div>

        <div class="ss-user">
            <img src="${ss.avatar || 'https://ui-avatars.com/api/?name=' + (ss.fullName||'User')}" />
            <div class="ss-user-info">
                <div class="name">${ss.fullName || "Unknown"}</div>
                <div class="role">${ss.role || "—"}</div>
            </div>
            <div id="ss-status" class="ss-status"></div>
        </div>

        <nav id="ss-nav"></nav>

        <footer class="ss-footer">
            <button id="ss-logout">Logout</button>
            <button id="ss-theme-toggle-2">🌓 Theme</button>
        </footer>
    </aside>

    <main id="ss-content">
        <div id="ss-page-container"></div>
    </main>
`);


// ---------------------------
// Role-Based Navigation
// ---------------------------
const MENUS = {
    Destination: [
        ["Home", "/destination/home/checkInOut.html"],
        ["Flights", "/destination/airport/flightList.html"],
        ["Passengers", "/destination/paxCI/welcomeMeetings.html"],
        ["Transfers", "/destination/transfers/busAssignments.html"],
        ["Tours", "/destination/tours/productList.html"],
        ["Guest Service", "/destination/guestService/hotlineChat.html"],
        ["Baggage Status", "/destination/home/baggageStatus.html"]
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
const menuList = MENUS[ss.role] || [];

menuList.forEach(([label, link]) => {
    const btn = document.createElement("button");
    btn.className = "ss-nav-btn";
    btn.textContent = label;
    btn.onclick = () => (window.location.href = link);
    nav.appendChild(btn);
});

// ---------------------------
// Sidebar Toggle
// ---------------------------
const sidebar = document.getElementById("ss-sidebar");

document.getElementById("ss-menu-btn").onclick = () => {
    sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-open");
};

// Auto-close when clicking outside
document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !e.target.closest("#ss-menu-btn")) {
        sidebar.classList.add("collapsed");
        document.body.classList.remove("sidebar-open");
    }
});

// ---------------------------
// Logout
// ---------------------------
document.getElementById("ss-logout").onclick = () => {
    localStorage.removeItem("skSession");
    window.location.href = "/shuttlesync";
};

// ---------------------------
// Theme Engine
// ---------------------------
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

// ---------------------------
// Session Validation
// ---------------------------
async function validate() {
    if (!ss.sessionToken) return fail();
    try {
        const res = await fetch(VERIFY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: ss.sessionToken })
        });
        const data = await res.json();
        data.valid ? ok() : fail();
    } catch {
        fail();
    }
}
function ok() { document.getElementById("ss-status").style.background = "#27d47c"; }
function fail() { document.getElementById("ss-status").style.background = "#e84545"; }

validate();
setInterval(validate, 30000);

// ---------------------------
// Loader
// ---------------------------
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("ss-loader").classList.add("hide");
    }, 300);
});
