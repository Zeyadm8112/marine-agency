// ============================
// main.js (Fixed for #section history)
// ============================

// --- IMMEDIATE EXECUTION LOGIC ---

// ✅ Custom link handler to prevent #section from creating history states
document.addEventListener('click', (e) => {
  // Check if the clicked element (or its closest ancestor) is an anchor tag starting with '#'
  const link = e.target.closest('a[href^="#"]');
  if (link) {
      // Stop the browser from navigating or adding a history entry
      e.preventDefault(); 
      
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
          // Smoothly scroll to the target section
          targetEl.scrollIntoView({ behavior: 'smooth' });
          
          // CRITICAL: Use replaceState instead of pushState. 
          // This updates the URL without adding a new entry to the browser's history stack.
          history.replaceState(null, null, window.location.pathname + window.location.search);
      }
  }
});

// ✅ Remove hash from URL if present on initial load
if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname + window.location.search);
}

// -----------------------------------------------------------------------------------

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // ✅ Always scroll to top when refreshing or opening the page
  window.scrollTo({ top: 0, behavior: "auto" });

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
window.addEventListener("scroll", () => {
  navbar.classList.toggle("nav-solid", window.scrollY > 10);
});
// ----------------------------
// 3. Mobile menu toggles (NOW TOGGLES ICONS)
// ----------------------------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
// New: Get the icons
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");

if (menuBtn && mobileMenu && hamburgerIcon && closeIcon) {
    const toggleMenu = () => {
        // 1. Toggle the mobile menu visibility
        mobileMenu.classList.toggle("hidden");
        
        // 2. Toggle the icons
        hamburgerIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
        
        // 3. Toggle accessibility attribute
        const isExpanded = mobileMenu.classList.contains("hidden") ? "false" : "true";
        menuBtn.setAttribute("aria-expanded", isExpanded);
    };

    // 3a. Event listener for the menu button
    menuBtn.addEventListener("click", toggleMenu);

    // 3b. Close menu when a link inside it is clicked (UX fix)
    const mobileLinks = mobileMenu.querySelectorAll("a[href^='#']");
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if menu is open before closing it
            if (!mobileMenu.classList.contains("hidden")) {
                toggleMenu(); // Use toggleMenu to ensure icons are also reset
            }
        });
    });
}      
// ----------------------------
// 4. Fade-up animation (FIXED)
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
    }, { threshold: 0 });

    fadeEls.forEach(el => {
        // Elements in the hero section (above-the-fold) will hit this 'if' block.
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("visible");
            
            // 🛑 REMOVE THIS LINE: el.style.transition = "none";
            // By removing it, the element's existing CSS transition (from Tailwind/your CSS) 
            // will apply immediately when 'visible' is added, allowing for the smooth fade-in.
        } else {
            fadeObserver.observe(el);
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
  // 6. Remove preloader and init app
  // ----------------------------
  if (preloader) {
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
          preloader.remove();
          window.scrollTo({ top: 0, behavior: "auto" });
          initApp();
      }, 500);
  } else {
      initApp();
  }
});