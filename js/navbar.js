document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    
    sidebar.addEventListener("mouseenter", function () {
      sidebar.classList.add("expanded");
    });
  
    sidebar.addEventListener("mouseleave", function () {
      sidebar.classList.remove("expanded");
    });
  });