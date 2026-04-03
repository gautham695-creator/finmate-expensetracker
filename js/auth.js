// public/js/auth.js

// Login Function
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!email || !password) {
      showMessage("Please fill in both fields.");
      return;
    }
  
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        showMessage("Login successful!", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      })
      .catch((error) => {
        showMessage(error.message);
      });
  }
  
  // Register Function
  function register() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!email || !password) {
      showMessage("Please fill in both fields.");
      return;
    }
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        showMessage("Registration successful! Logging in...", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      })
      .catch((error) => {
        showMessage(error.message);
      });
  }
  
  // Display message
  function showMessage(msg, type = "error") {
    const msgEl = document.getElementById("auth-message");
    msgEl.textContent = msg;
    msgEl.style.color = type === "success" ? "green" : "red";
  }
  
  // Expose functions globally
  window.login = login;
  window.register = register;
  