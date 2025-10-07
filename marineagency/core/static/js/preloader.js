document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
  
    if (!preloader) return;
  
    // Wait for everything to load (images, styles, etc.)
    window.addEventListener("load", () => {
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";
  
      setTimeout(() => preloader.remove(), 500); // Remove after fade
    });
  });
  

  