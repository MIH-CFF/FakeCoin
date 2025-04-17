document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your user ID
  emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your actual EmailJS user ID

  // DOM Elements
  const prankForm = document.getElementById("prank-form");
  const giveawayForm = document.getElementById("giveaway-form");
  const confirmationSection = document.getElementById("confirmation");
  const dashboardSection = document.getElementById("dashboard");
  const confirmationMessage = document.getElementById("confirmation-message");
  const viewDashboardBtn = document.getElementById("view-dashboard");
  const sendAnotherBtn = document.getElementById("send-another");
  const backToFormBtn = document.getElementById("back-to-form");
  const warpMiningBtn = document.getElementById("warp-mining");
  const miningMessage = document.getElementById("mining-message");
  const toggleThemeBtn = document.getElementById("toggle-theme");

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");

  // Check for saved theme preference or use preferred color scheme
  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  // Set initial icon
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀️"; // Show sun when in dark mode
  } else {
    themeIcon.textContent = "🌙"; // Show moon when in light mode
  }

  themeToggle.addEventListener("click", function () {
    const isDark = document.documentElement.hasAttribute("data-theme");

    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeIcon.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeIcon.textContent = "☀️";
    }
  });

  // Form submission
  prankForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const friendName = document.getElementById("friend-name").value;
    const friendEmail = document.getElementById("friend-email").value;
    const prizeAmount = document.getElementById("prize-amount").value;

    // Send email using EmailJS
    emailjs
      .send("YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID", {
        to_name: friendName,
        to_email: friendEmail,
        prize_amount: prizeAmount,
      })
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          showConfirmation(true, friendName, friendEmail);
        },
        function (error) {
          console.log("FAILED...", error);
          showConfirmation(false, friendName, friendEmail);
        }
      );
  });

  // Show confirmation message
  function showConfirmation(success, name, email) {
    giveawayForm.classList.remove("active");
    giveawayForm.classList.add("hidden");
    confirmationSection.classList.remove("hidden");

    if (success) {
      confirmationMessage.innerHTML = `Prank email sent successfully to <strong>${name}</strong> at <strong>${email}</strong>!<br><br>They'll think they won crypto! 😈`;
    } else {
      confirmationMessage.innerHTML = `Failed to send prank email to ${name}.<br><br>Maybe try again?`;
    }
  }

  // Navigation between sections
  viewDashboardBtn.addEventListener("click", function () {
    confirmationSection.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
  });

  sendAnotherBtn.addEventListener("click", function () {
    confirmationSection.classList.add("hidden");
    giveawayForm.classList.remove("hidden");
    prankForm.reset();
  });

  backToFormBtn.addEventListener("click", function () {
    dashboardSection.classList.add("hidden");
    giveawayForm.classList.remove("hidden");
    prankForm.reset();
  });

  // Easter egg - Warp Mining
  warpMiningBtn.addEventListener("click", function () {
    warpMiningBtn.disabled = true;
    warpMiningBtn.textContent = "⚡ Mining...";
    miningMessage.classList.remove("hidden");

    // Fake mining progress
    let progress = 0;
    const miningInterval = setInterval(() => {
      progress += Math.random() * 10;
      miningMessage.textContent = `Mining at ${Math.floor(
        progress
      )} H/s... Just kidding! 😆`;

      if (progress >= 100) {
        clearInterval(miningInterval);
        setTimeout(() => {
          miningMessage.textContent = "Mining complete! You earned 0 LOLToken.";
        }, 1000);
      }
    }, 200);

    // Reset after 5 seconds
    setTimeout(() => {
      clearInterval(miningInterval);
      warpMiningBtn.disabled = false;
      warpMiningBtn.textContent = "⚡ Enable Warp Mining";
      miningMessage.classList.add("hidden");
    }, 5000);
  });

  // Fake transaction animation
  if (dashboardSection) {
    const transactionList = document.querySelector(".transaction-list");

    // Add some fake transactions periodically
    setInterval(() => {
      const fakeSenders = [
        "SatoshiNakamoto",
        "CZ_Binance",
        "SBF_FTX",
        "CryptoWhale",
        "BitcoinHodler",
      ];
      const fakeAmounts = [
        "+0.001 BTC",
        "-5 ETH",
        "+1000 DOGE",
        "-50 SOL",
        "+1 LOLToken",
      ];

      const newTransaction = document.createElement("li");
      newTransaction.innerHTML = `
                <span class="transaction-detail">Received from ${
                  fakeSenders[Math.floor(Math.random() * fakeSenders.length)]
                }</span>
                <span class="transaction-amount">${
                  fakeAmounts[Math.floor(Math.random() * fakeAmounts.length)]
                }</span>
            `;

      transactionList.insertBefore(newTransaction, transactionList.firstChild);

      // Remove oldest transaction if more than 5
      if (transactionList.children.length > 5) {
        transactionList.removeChild(transactionList.lastChild);
      }
    }, 10000);
  }
});
