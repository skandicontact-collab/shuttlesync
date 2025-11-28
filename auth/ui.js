// Auto-load session
const session = ShuttleSyncAuth.getSession();
if (!session) window.location.href = "/shuttlesync";

// Page-specific logic here
console.log("Module loaded:", session);
