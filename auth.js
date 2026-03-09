const tabLogin = document.getElementById("login-tab");
const tabSignup = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

tabLogin.addEventListener("click", function() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    tabLogin.classList.add("active-tab");
    tabSignup.classList.remove("active-tab");
});

tabSignup.addEventListener("click", function() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    tabSignup.classList.add("active-tab");
    tabLogin.classList.remove("active-tab");
});

// LOGIN
document.getElementById("login-btn").addEventListener("click", function() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const message = document.getElementById("login-message");

    const saved = localStorage.getItem("user_" + username);

    if (!saved) {
        message.textContent = "Username not found.";
        return;
    }
    if (saved !== password) {
        message.textContent = "Incorrect password, please try again.";
        return;
    }

    localStorage.setItem("loggedInUser", username);
    message.textContent = "Welcome back " + username + "! Redirecting...";
    setTimeout(() => window.location.href = "index.html", 1000);
});

// SIGNUP
document.getElementById("signup-btn").addEventListener("click", function() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const message = document.getElementById("signup-message");

    if (!username || !password) {
        message.textContent = "Please enter a username and password.";
        return;
    }

    const existing = localStorage.getItem("user_" + username);
    if (existing) {
        message.textContent = "Username already exists. Please choose a different one.";
        return;
    }

    localStorage.setItem("user_" + username, password);
    message.textContent = "Account created! Redirecting...";
    setTimeout(() => window.location.href = "index.html", 1000);
});

// show/hide password toggles
document.getElementById("show-login-password").addEventListener("change", function() {
    const input = document.getElementById("login-password");
    input.type = this.checked ? "text" : "password";
});

document.getElementById("show-signup-password").addEventListener("change", function() {
    const input = document.getElementById("signup-password");
    input.type = this.checked ? "text" : "password";
});