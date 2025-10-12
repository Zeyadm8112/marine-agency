// ============================
// HASH REMOVAL LOGIC ONLY
// ============================

// 1. Remove hash from URL if present on initial load
if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname + window.location.search);
}

// 2. Handle click on internal links (smooth scroll and remove hash)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          // Remove the hash from URL after scrolling
          history.replaceState(null, null, window.location.pathname + window.location.search);
      }
  }
});