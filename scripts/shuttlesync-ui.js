/* -------------------------------------------------------
   THEME ENGINE
------------------------------------------------------- */
function applyTheme() {
  const theme = localStorage.getItem("ss-theme") || "light";
  document.documentElement.dataset.theme = theme;
}
applyTheme();

function toggleTheme() {
  const newTheme = (localStorage.getItem("ss-theme") === "dark") ? "light" : "dark";
  localStorage.setItem("ss-theme", newTheme);
  applyTheme();
}

const themeBtn1 = document.getElementById("ss-theme-toggle");
if (themeBtn1) themeBtn1.onclick = toggleTheme;

const themeBtn2 = document.getElementById("ss-theme-toggle-2");
if (themeBtn2) themeBtn2.onclick = toggleTheme;

/* -------------------------------------------------------
   SIDEBAR TOGGLE
------------------------------------------------------- */
const sidebar = document.getElementById("ss-sidebar");
const menuBtn = document.getElementById("ss-menu-btn");

if (menuBtn && sidebar) {
  menuBtn.onclick = () => {
    const collapsed = sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    document.body.classList.remove("sidebar-open");
  };

  document.addEventListener("click", e => {
    if (!sidebar.contains(e.target) && !e.target.closest("#ss-menu-btn")) {
      sidebar.classList.add("collapsed");
      document.body.classList.add("sidebar-collapsed");
    }
  });
}

/* -------------------------------------------------------
   LOADER
------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loader = document.getElementById("ss-loader");
    if (loader) loader.classList.add("hide");
  }, 300);
});

/* -------------------------------------------------------
   SESSION MANAGER
------------------------------------------------------- */
window.ShuttleSyncAuth = {
  saveSession(session) {
    try {
      localStorage.setItem("skSession", JSON.stringify(session));
    } catch (e) {
      console.error("Failed to save session", e);
    }
  },
  getSession() {
    try {
      return JSON.parse(localStorage.getItem("skSession"));
    } catch {
      return null;
    }
  },
  clearSession() {
    localStorage.removeItem("skSession");
  }
};
