
function toggleForms() {
    document.getElementById("registration-form").classList.toggle("hidden");
    document.getElementById("login-form").classList.toggle("hidden");
  }
  

  function registerUser() {
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const error = document.getElementById("reg-error");
  
    if (!validateEmail(email)) {
      error.textContent = "Invalid email address!";
      return;
    }
    if (password.length < 6) {
      error.textContent = "Password must be at least 6 characters!";
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
      error.textContent = "Email is already registered!";
      return;
    }
  
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    error.textContent = "";
    alert("Registration successful! Please login.");
    toggleForms();
  }
  
  
  function loginUser() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const error = document.getElementById("login-error");
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);
  
    if (!user) {
      error.textContent = "Email not registered!";
      return;
    }
    if (user.password !== password) {
      error.textContent = "Incorrect password!";
      return;
    }
  
    localStorage.setItem("loggedInUser", email);
    error.textContent = "";
    displayHomePage(email);
  }
  

  function displayHomePage(email) {
    document.getElementById("registration-form").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
  
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Welcome, ${email}!`;
  }
  

  function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
  }
  
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  window.onload = function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      displayHomePage(loggedInUser);
    }
  };
  