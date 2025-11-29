(function () {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const statusEl = document.getElementById("login-status");

  if (!form || !emailInput || !statusEl) return;

  const DASHBOARD_URL = "/public/apps/dashboard";

  function setStatus(message, type = "") {
    statusEl.textContent = message || "";
    statusEl.className = "login-status" + (type ? " " + type : "");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Optional: enforce SKANDI domain
  function isAllowedDomain(email) {
    return email.toLowerCase().endsWith("@skandigroup.com");
  }

  async function handleLogin(event) {
    event.preventDefault();
    const email = (emailInput.value || "").trim();

    if (!email) {
      setStatus("Enter your SKANDI email to continue.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("That doesn’t look like a valid email.", "error");
      return;
    }
    if (!isAllowedDomain(email)) {
      setStatus("Use your @skandigroup.com email.", "error");
      return;
    }

    setStatus("Signing you in…", "success");

    try {
      // TODO: integrate Magic + Make here:
      // 1) Call Magic (front-end) OR Send email to Make webhook
      // 2) Make verifies user in Airtable
      // 3) Make returns role, base, SK-ID, etc.

      // Example placeholder session:
      const session = {
        email,
        redirect: DASHBOARD_URL,
        loggedInAt: new Date().toISOString()
      };

      if (window.ShuttleSyncAuth && typeof window.ShuttleSyncAuth.saveSession === "function") {
        window.ShuttleSyncAuth.saveSession(session);
      }

      // Redirect everyone to dashboard for now
      window.location.href = DASHBOARD_URL;
    } catch (err) {
      console.error(err);
      setStatus("We couldn’t sign you in. Try again or contact a manager.", "error");
    }
  }

  form.addEventListener("submit", handleLogin);
  }
  // Mobile height fix (iOS 100vh issue)
(function() {
  function setVh() {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
  }
  setVh();
  window.addEventListener('resize', setVh);
})();
