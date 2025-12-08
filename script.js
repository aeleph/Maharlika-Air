/* LOADER FADE OUT */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("fade-out");
  }, 1500); // Adjust delay (ms) as needed
});

/* FLIGHT SEARCH CALLBACK */
function searchFlights() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;

  document.getElementById("results").innerHTML = `
    <div class="bg-white p-6 shadow-md rounded-xl border result-card">
      <h3 class="text-xl font-bold text-blue-900">Searching flights from ${from} → ${to}</h3>
      <p class="text-gray-600 mt-2">Date: ${date}</p>
      <p class="text-gray-500 mt-4">Integrate API results here.</p>
    </div>
  `;
}

function openAuthModal(mode) {
  document.getElementById("authModal").classList.remove("hidden");

  if (mode === "login") {
    switchToLogin();
  } else {
    switchToSignup();
  }
}

function closeAuthModal() {
  document.getElementById("authModal").classList.add("hidden");
}

function switchToSignup() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = "Sign Up";
}

function switchToLogin() {
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = "Log In";
}

