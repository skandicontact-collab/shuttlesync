window.ShuttleSyncAuth = {
  saveSession(session){
    localStorage.setItem("skSession", JSON.stringify(session));
  },
  getSession(){
    try { return JSON.parse(localStorage.getItem("skSession")); }
    catch { return null; }
  },
  clearSession(){
    localStorage.removeItem("skSession");
  }
};
