// Simple guard so the dashboard isn't reachable without going through login.
if (sessionStorage.getItem("mb_loggedIn") !== "true") {
  window.location.href = "login.html";
}

const accounts = [
  { id: "checking", type: "Joint Checking", holders: "Francisco & Annah", number: "•••• 4821", balance: 548228.13, icon: "fa-money-check-dollar" },
  { id: "savings", type: "Joint High-Yield Savings", holders: "Francisco & Annah", number: "•••• 9053", balance: 243220.47, icon: "fa-piggy-bank" },
  { id: "credit", type: "Joint Credit Card", holders: "Francisco & Annah", number: "•••• 2210", balance: -74032.35, icon: "fa-credit-card" },
];

const transactions = [
  { date: "March 26, 2026", desc: "Payroll Deposit — Francisco", category: "Income", account: "Joint Checking", amount: 9888.0 },
  { date: "March 20, 2026", desc: "Payroll Deposit — Annah", category: "Income", account: "Joint Checking", amount: 2566.0 },
  { date: "Febuary 26, 2026", desc: "Payroll Deposit — Francisco", category: "Income", account: "Joint Checking", amount: 9888.0 },
  { date: "Febuary 20, 2026", desc: "Payroll Deposit — Annah", category: "Income", account: "Joint Checking", amount: 2566.0 },
  { date: "January 24, 2026", desc: "Transfer to Savings", category: "Transfer", account: "Joint Checking", amount: -74032.35 },
];

function money(n) {
  const abs = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (n < 0 ? "-$" : "$") + abs;
}

function renderAccounts() {
  const grid = document.getElementById("accountsGrid");
  grid.innerHTML = "";
  let total = 0;

  accounts.forEach((acct) => {
    total += acct.balance;
    const card = document.createElement("div");
    card.className = "account-card";
    card.innerHTML = `
      <div class="account-card-top">
        <div class="account-icon"><i class="fa-solid ${acct.icon}"></i></div>
        <button type="button" class="balance-toggle" aria-label="Show or hide balance">
          <i class="fa-solid fa-eye"></i>
        </button>
      </div>
      <span class="account-joint-tag">${acct.holders}</span>
      <h3>${acct.type}</h3>
      <p class="account-number">${acct.number}</p>
      <p class="account-balance ${acct.balance < 0 ? "negative" : ""}" data-value="${money(acct.balance)}">${money(acct.balance)}</p>
      <a href="https://secure.chase.com/web/auth/#/logon/forgot/verifyIdentity;step=personalProvideInfo" class="account-link">View Details <i class="fa-solid fa-chevron-right"></i></a>
    `;
    grid.appendChild(card);

    card.querySelector(".balance-toggle").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const balEl = card.querySelector(".account-balance");
      const hidden = balEl.textContent.trim().includes("•");
      balEl.textContent = hidden ? balEl.dataset.value : "•••••••";
      btn.innerHTML = hidden ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });
  });

  document.getElementById("totalBalance").textContent = money(total);
}

function renderTransactions() {
  const body = document.getElementById("transactionsBody");
  body.innerHTML = "";
  transactions.forEach((tx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.desc}</td>
      <td><span class="category-tag">${tx.category}</span></td>
      <td>${tx.account}</td>
      <td class="align-right ${tx.amount < 0 ? "negative" : "positive"}">${money(tx.amount)}</td>
    `;
    body.appendChild(row);
  });
}

function setLastSignIn() {
  const last = new Date();
  last.setDate(last.getDate() - 1);
  last.setHours(11, 34, 0, 0);
  const formatted = last.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
  const time = last.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  document.getElementById("lastSignIn").textContent = `${formatted} at ${time} ET`;
}

renderAccounts();
renderTransactions();
setLastSignIn();

// ---- Profile dropdown ----
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("hidden");
});
document.addEventListener("click", () => profileDropdown.classList.add("hidden"));

// ---- Mobile nav toggle ----
const navToggle = document.getElementById("navToggle");
const appNav = document.getElementById("appNav");
navToggle.addEventListener("click", () => {
  const isOpen = appNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// ---- Sign out ----
document.getElementById("signOutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("mb_loggedIn");
  window.location.href = "login.html";
});

// ---- Restriction modal ----
const restrictedModal = document.getElementById("restrictedModal");
document.querySelectorAll('[data-restricted="true"]').forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    restrictedModal.classList.remove("hidden");
  });
});
document.getElementById("closeModalBtn").addEventListener("click", () => {
  restrictedModal.classList.add("hidden");
});
restrictedModal.addEventListener("click", (e) => {
  if (e.target === restrictedModal) restrictedModal.classList.add("hidden");
});
