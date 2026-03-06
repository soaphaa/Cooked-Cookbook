const tabLogin = document.getElementById("login-tab");
const tabSignup = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

tabLogin.addEventListener("click", function() {
    loginForm.classList.remove("hidden"); //only display the ones maeant gulp
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

//LOGIN PAGE
document.getElementById("login-btn").addEventListener("click", function(event) {
    const username = document.getElementById("login-username").value.trim(); //saved username in local storage
    const password = document.getElementById("login-password").value.trim(); //saved password in local storage
    const message = document.getElementById("login-message");
    const savedUser = JSON.parse(localStorage.getItem(username)); //get the saved user data from local storage
    const savedPassword = JSON.parse(localStorage.getItem(password)); //get the saved user data from local storage

    if (!savedUser) {
        message.textContent = "Username not found.";
        return;
    }
    if (savedPassword !== password) {
        message.textContent = "Incorrect password.";
        return;
    }

    localStorage.setItem("loggedInUser", username);
    console.log("Logged in user:", username);
    console.log(localStorage.getItem("loggedInUser"));
    message.textContent = "Welcome back the goat" + username + "!";


});

//SIGNUP PAGE
document.getElementById("signup-btn").addEventListener("click", function(event) {
    const username = document.getElementById("signup-username").value.trim(); //get the username input value
    const password = document.getElementById("signup-password").value.trim(); //get the password input value
    const message = document.getElementById("signup-message");

    if(!username || !password) {
        message.textContent = "Please enter a username and password.";
        return;
    }

    const existing = localStorage.getItem("user_" + username); //check if the username already exists in local storage
    if(existing){
        message.textContent = "Username already exists. Please choose a different one.";
        return;
    }

    localStorage.setItem("user_" + username, password);
    message.textContent = "Account created successfully! Redirecting...";
    setTimeout(() => window.location.href = "index.html", 1000); //redirect to home page after 2 seconds
});    