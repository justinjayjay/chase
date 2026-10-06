document.getElementById("tryAgainBtn").addEventListener("click", () => {
  sessionStorage.setItem("mb_attempts", "0");
  window.location.href = "login.html";
});
