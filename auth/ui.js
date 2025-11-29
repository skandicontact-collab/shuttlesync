/* -------------------------------------------------------
   THEME ENGINE
------------------------------------------------------- */
function applyTheme(){
  const theme = localStorage.getItem("ss-theme") || "light";
  document.documentElement.dataset.theme = theme;
}
applyTheme();

function toggleTheme(){
  const newTheme = (localStorage.getItem("ss-theme") === "dark") ? "light" : "dark";
  localStorage.setItem("ss-theme", newTheme);
  applyTheme();
}

document.getElementById("ss-theme-toggle").onclick = toggleTheme;
document.getElementById("ss-theme-toggle-2").onclick = toggleTheme;


/* -------------------------------------------------------
   SIDEBAR TOGGLE
------------------------------------------------------- */
const sidebar = document.getElementById("ss-sidebar");

document.getElementById("ss-menu-btn").onclick = () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  document.body.classList.toggle("sidebar-collapsed", collapsed);
  document.body.classList.remove("sidebar-open");
};

document.addEventListener("click", e => {
  if(!sidebar.contains(e.target) && !e.target.closest("#ss-menu-btn")){
    sidebar.classList.add("collapsed");
    document.body.classList.add("sidebar-collapsed");
  }
});


/* -------------------------------------------------------
   LOADER
------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loader = document.getElementById("ss-loader");
    if (loader) loader.classList.add("hide");
  }, 300);
});
