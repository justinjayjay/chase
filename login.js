const DEMO_USER = "CallejasAnn2025";
const DEMO_PASS = "CalAnn77";
const MAX_ATTEMPTS = 3;

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");
const loginErrorText = document.getElementById("loginErrorText");
const passwordToggle = document.getElementById("passwordToggle");
const resetDemoBtn = document.getElementById("resetDemoBtn");

function getAttempts() {
  return parseInt(sessionStorage.getItem("mb_attempts") || "0", 10);
}
function setAttempts(n) {
  sessionStorage.setItem("mb_attempts", String(n));
}

// If the demo visitor is already locked out from a previous attempt in
// this session, send them straight to the lockout page.
if (getAttempts() >= MAX_ATTEMPTS) {
  window.location.href = "locked.html";
}

passwordToggle.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  passwordToggle.innerHTML = isPassword
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = usernameInput.value.trim().toLowerCase();
  const pass = passwordInput.value.trim();

  if (!user || !pass) {
    showError("Please enter both your username and password.");
    return;
  }

  if (user === DEMO_USER && pass === DEMO_PASS) {
    setAttempts(0);
    sessionStorage.setItem("mb_loggedIn", "true");
    window.location.href = "dashboard.html";
    return;
  }

  const attempts = getAttempts() + 1;
  setAttempts(attempts);

  if (attempts >= MAX_ATTEMPTS) {
    window.location.href = "locked.html";
    return;
  }

  const remaining = MAX_ATTEMPTS - attempts;
  showError(`That username or password isn't right. You have ${remaining} attempt${remaining === 1 ? "" : "s"} left before sign-in is temporarily paused.`);
});

function showError(msg) {
  loginErrorText.textContent = msg;
  loginError.classList.remove("hidden");
}

resetDemoBtn.addEventListener("click", () => {
  setAttempts(0);
  loginError.classList.add("hidden");
  loginForm.reset();
  usernameInput.focus();
});
