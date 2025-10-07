document.addEventListener("DOMContentLoaded", () => {
    
    // ===================================================
    // 1. CAROUSEL SCROLLING LOGIC (Keep this untouched)
    // ===================================================
    const carousel = document.getElementById("carousel");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
 
    // Only run carousel logic if all elements exist
    if (carousel && prevButton && nextButton) {
        // NOTE: scrollAmount is 328 based on your previous discussion
        const scrollAmount = 328; 
 
        const updateNavButtons = () => {
            const isSmallScreen = window.innerWidth < 768;
            const isScrollable = carousel.scrollWidth > carousel.clientWidth;
            const shouldBeVisible = !isSmallScreen && isScrollable;
 
            if (shouldBeVisible) {
                prevButton.classList.remove("hidden");
                prevButton.classList.add("flex");
                nextButton.classList.remove("hidden");
                nextButton.classList.add("flex");
            } else {
                prevButton.classList.add("hidden");
                prevButton.classList.remove("flex");
                nextButton.classList.add("hidden");
                nextButton.classList.remove("flex");
            }
        };
 
        const scrollPrev = () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        };
        const scrollNext = () => {
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        };
 
        prevButton.addEventListener("click", scrollPrev);
        nextButton.addEventListener("click", scrollNext);
 
        // Initial check and resize listeners... (rest of your scrolling script)
        const images = carousel.querySelectorAll("img");
        let loadedImages = 0;
        
        const checkImageLoading = () => {
            if (loadedImages === images.length) {
                setTimeout(updateNavButtons, 50);
            }
        };

        if (images.length === 0) {
            updateNavButtons();
        } else {
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener("load", () => {
                        loadedImages++;
                        checkImageLoading();
                    });
                }
            });
            checkImageLoading();
        }
 
        window.addEventListener("resize", updateNavButtons);
    }
    
    // ===================================================
    // 2. MODAL WINDOW LOGIC (New, isolated script block)
    // ===================================================
    const showAllBtn = document.getElementById("show-all-ships-btn");
    const modal = document.getElementById("ships-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");

    // Only run modal logic if all elements exist
    if (showAllBtn && modal && closeModalBtn) {
        
        const openModal = () => {
            modal.classList.remove("hidden");
            // Prevent background scrolling for a clean modal experience
            document.body.style.overflow = "hidden"; 
        };

        const closeModal = () => {
            modal.classList.add("hidden");
            // Restore background scrolling
            document.body.style.overflow = ""; 
        };

        // Event listeners
        showAllBtn.addEventListener("click", openModal);
        closeModalBtn.addEventListener("click", closeModal);

        // Close on outside click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
});