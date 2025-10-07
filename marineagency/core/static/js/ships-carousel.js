document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
 
    if (!carousel || !prevButton || !nextButton) return;
 
    // Using 328 (320px card + 8px gap) for a cleaner scroll
    const scrollAmount = 328; 
 
    const updateNavButtons = () => {
        // 1. Check for small screen (less than 768px - Tailwind's 'md' breakpoint)
        const isSmallScreen = window.innerWidth < 768;
 
        // 2. Check if the content is scrollable (scrollWidth is greater than clientWidth)
        const isScrollable = carousel.scrollWidth > carousel.clientWidth;
 
        // Buttons should be visible ONLY if it's NOT a small screen AND the content is scrollable.
        const shouldBeVisible = !isSmallScreen && isScrollable;
 
        if (shouldBeVisible) {
            // REMOVE 'hidden' and ADD 'flex' to make them visible and use the flex layout
            prevButton.classList.remove("hidden");
            prevButton.classList.add("flex");
            nextButton.classList.remove("hidden");
            nextButton.classList.add("flex");
        } else {
            // ADD 'hidden' and REMOVE 'flex' to hide them
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
 
    // Wait for images to load before checking widths
    const images = carousel.querySelectorAll("img");
    let loadedImages = 0;
    
    // Function to check and update when images are done loading
    const checkImageLoading = () => {
        if (loadedImages === images.length) {
            // Delay update slightly to ensure all layout calculations are complete
            setTimeout(updateNavButtons, 50);
        }
    };

    if (images.length === 0) {
        // No images, check immediately
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
        checkImageLoading(); // Initial check for images already loaded
    }
 
    // Update button visibility on window resize
    window.addEventListener("resize", updateNavButtons);
});