document.getElementById("year").textContent = new Date().getFullYear();

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("nav-solid", window.scrollY > 10);
});

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

const fadeEls = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });
fadeEls.forEach(el => observer.observe(el));

const counters = document.querySelectorAll('.counter');
const formatNumber = (n) => n.toLocaleString();
const runCounter = (el) => {
  const target = parseInt(el.getAttribute('data-target') || '0', 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1200; // ms
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = `${formatNumber(value)}${progress === 1 ? suffix : ''}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
if (counters.length) {
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
