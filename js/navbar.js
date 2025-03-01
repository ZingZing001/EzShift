document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  
  sidebar.addEventListener("mouseenter", function () {
      sidebar.classList.add("expanded");
  });

  sidebar.addEventListener("mouseleave", function () {
      sidebar.classList.remove("expanded");
  });

  // Highlight the active button
  const pageMap = {
      "index.html": "homeButton",
      "shifts.html": "shiftsButton",
      "payroll.html": "payrollButton",
      "settings.html": "settingsButton"
  };

  // Get the current page filename
  const currentPage = window.location.pathname.split("/").pop() || "index.html"; // Default to index.html if empty

  console.log("Current Page:", currentPage);

  // Find the corresponding button
  const activeButtonId = pageMap[currentPage];
  if (activeButtonId) {
      const activeButton = document.getElementById(activeButtonId);
      if (activeButton) {
          activeButton.classList.add("active");
          console.log("Active Button Set:", activeButtonId);
      } else {
          console.log("Active button not found:", activeButtonId);
      }
  }
});
