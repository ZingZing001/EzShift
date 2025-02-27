document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".logout-button");
    
    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
        alert("You have been logged out.");
        window.location.href = "index.html"; // Redirect to home or login page
      });
    }
  });
  