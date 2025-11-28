// ShuttleSync Session Manager
window.ShuttleSyncAuth = {
  
  saveSession(session){
    localStorage.setItem("skSession", JSON.stringify(session));
  },

  getSession(){
    try {
      return JSON.parse(localStorage.getItem("skSession"));
    } catch(e){
      return null;
    }
  },

  clearSession(){
    localStorage.removeItem("skSession");
  },

  verifySession: async function(){
    const session = this.getSession();
    if(!session) return false;

    const res = await fetch("YOUR_VERIFY_WEBHOOK", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: session.token })
    });

    const data = await res.json();
    return data.status === "valid";
  }
};
