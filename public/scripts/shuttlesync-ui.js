/* ==========================================================
   SHUTTLESYNC UI ENGINE
========================================================== */

/* ------------------------------
   THEME ENGINE
------------------------------ */
function applyTheme() {
  const theme = localStorage.getItem("ss-theme") || "light";
  document.documentElement.dataset.theme = theme;
}
applyTheme();

function toggleTheme() {
  const newTheme = localStorage.getItem("ss-theme") === "dark" ? "light" : "dark";
  localStorage.setItem("ss-theme", newTheme);
  applyTheme();
}

// Optional buttons
const themeBtn1 = document.getElementById("ss-theme-toggle");
const themeBtn2 = document.getElementById("ss-theme-toggle-2");
if (themeBtn1) themeBtn1.onclick = toggleTheme;
if (themeBtn2) themeBtn2.onclick = toggleTheme;


/* ------------------------------
   SIDEBAR TOGGLE
------------------------------ */
const sidebar = document.getElementById("ss-sidebar");
const menuBtn = document.getElementById("ss-menu-btn");

if (menuBtn) {
  menuBtn.onclick = () => {
    const collapsed = sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-collapsed", collapsed);
  };
}


/* ------------------------------
   LOADER
------------------------------ */
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loader = document.getElementById("ss-loader");
    if (loader) loader.classList.add("hide");
  }, 300);
});


/* ------------------------------
   SESSION MANAGER
------------------------------ */
window.ShuttleSyncAuth = {
  saveSession(session) {
    localStorage.setItem("skSession", JSON.stringify(session));
  },
  getSession() {
    try { return JSON.parse(localStorage.getItem("skSession")); }
    catch { return null; }
  },
  clearSession() {
    localStorage.removeItem("skSession");
  }
};


/* ------------------------------
   MOBILE VIEWPORT HEIGHT FIX
------------------------------ */
function updateVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', updateVH);
updateVH();
