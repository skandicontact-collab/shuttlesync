// ===============================
// ShuttleSync Header Component
// ===============================

async function loadSession() {
    const raw = localStorage.getItem("skSession");
    if (!raw) return null;

    try { return JSON.parse(raw); }
    catch { return null; }
}

// Validate token with Make.com
async function validateSession(session) {
    const res = await fetch("YOUR_MAKE_TOKEN_VERIFY_WEBHOOK", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: session.sessionToken })
    }).then(r => r.json());

    return res.valid === true;
}

// Render header
async function renderHeader() {
    const header = document.getElementById("ss-header");
    if (!header) return;

    const session = await loadSession();
    if (!session) {
        header.innerHTML = `<div class="ss-header-error">Not logged in</div>`;
        return;
    }

    const ok = await validateSession(session);
    if (!ok) {
        localStorage.removeItem("skSession");
        header.innerHTML = `<div class="ss-header-error">Session expired</div>`;
        return;
    }

    const { skid, fullName, role } = session;

    header.innerHTML = `
        <div class="ss-header-left">
            <img src="https://skandi-static/logo.png" class="ss-logo" />
            <span class="ss-title">ShuttleSync</span>
        </div>

        <div class="ss-header-center">
            ${buildRoleMenu(role)}
        </div>

        <div class="ss-header-right">
            <div class="ss-user-info">
                <div class="ss-user-name">${fullName}</div>
                <div class="ss-user-skip">${skid}</div>
                <div class="ss-user-role">${role}</div>
            </div>
            <button class="ss-logout" onclick="logout()">Logout</button>
        </div>
    `;
}

function buildRoleMenu(role) {
    const baseMenu = `
        <a href="../intra/dashboard.html" target="_parent">Intra</a>
        <a href="../travels/manageBooking.html" target="_parent">Travels</a>
        <a href="../uniform/index.html" target="_parent">Uniform</a>
    `;

    const destinationMenu = `
        <a href="../destination/torGad.html" target="_parent">Destination</a>
        <a href="../destination/mail.html" target="_parent">Mail</a>
        <a href="../destination/ptt.html" target="_parent">PTT</a>
    `;

    const opsMenu = `
        <a href="../ops/crewPlanning.html" target="_parent">Ops</a>
    `;

    let output = baseMenu;

    if (role === "Destination" || role === "Manager")
        output += destinationMenu;

    if (role === "Ops" || role === "Manager")
        output += opsMenu;

    return output;
}

// Logout
function logout() {
    localStorage.removeItem("skSession");
    window.parent.postMessage({ type: "logout" }, "*");
}

// Auto-load
document.addEventListener("DOMContentLoaded", renderHeader);
