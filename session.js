const SESSION_KEY = "meridianApSession";
const POSTED_KEY = "meridianApPostedInvoices";

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function saveSession(username) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user: username, loggedInAt: new Date().toISOString() }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Redirects to the login page if there's no session, and fills in the
// "signed in as" / sign-out controls when there is one. Call on every
// page except the login page itself.
function requireSession() {
  const session = getSession();
  if (!session) {
    window.location.href = "index.html";
    return null;
  }
  const userEl = document.getElementById("sessionUser");
  if (userEl) userEl.textContent = session.user;
  const signOutEl = document.getElementById("signOutLink");
  if (signOutEl) {
    signOutEl.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      window.location.href = "index.html";
    });
  }
  return session;
}

function getPostedInvoices() {
  try {
    return JSON.parse(localStorage.getItem(POSTED_KEY)) || [];
  } catch {
    return [];
  }
}

function addPostedInvoice(record) {
  const list = getPostedInvoices();
  list.unshift(record);
  localStorage.setItem(POSTED_KEY, JSON.stringify(list));
}
