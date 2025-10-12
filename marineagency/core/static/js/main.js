// ============================
// main.js (Preloader-safe, elements visible)
// ============================

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  const initApp = () => {
    // ----------------------------
    // 1. Update footer year
    // ----------------------------
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ----------------------------
    // 2. Navbar scroll effect
    // ----------------------------
    const navbar = document.getElementById("navbar");
    if (navbar) {
      const toggleNavSolid = () => navbar.classList.toggle("nav-solid", window.scrollY > 10);
      window.addEventListener("scroll", toggleNavSolid);
      toggleNavSolid(); // initial check
    }

    // ----------------------------
    // 3. Mobile menu toggle
    // ----------------------------
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
    }

    // ----------------------------
    // 4. Fade-up animation
    // ----------------------------
    const fadeEls = document.querySelectorAll(".fade-up");
    if (fadeEls.length) {
      const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      fadeEls.forEach(el => {
        fadeObserver.observe(el);
        // Animate elements already in viewport
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("visible");
        }
      });
    }

    // ----------------------------
    // 5. Counter animation
    // ----------------------------
    const counters = document.querySelectorAll(".counter");
    if (counters.length) {
      const formatNumber = (n) => n.toLocaleString();

      const runCounter = (el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1200;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = `${formatNumber(value)}${progress === 1 ? suffix : ""}`;
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      };

      const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });

      counters.forEach(c => counterObserver.observe(c));
    }
  };

  // ----------------------------
  // Remove preloader with fade, then initialize app
  // ----------------------------
  if (preloader) {
    preloader.style.transition = "opacity 0.5s ease";
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.remove();
      initApp(); // initialize everything after preloader removed
    }, 500);
  } else {
    initApp(); // if no preloader, just run
  }
});
