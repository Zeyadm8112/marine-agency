function showShipsModal() {
    const modal = document.getElementById("ships-modal");
    const loader = document.getElementById("ships-loader");
  
    if (!modal || !loader) return;
  
    // Show modal and loader
    modal.classList.remove("hidden");
    loader.classList.remove("hidden");
  
    // Wait for all images inside the modal to load
    const images = modal.querySelectorAll("img");
    const promises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    });
  
    Promise.all(promises).then(() => {
      loader.classList.add("hidden"); // hide loader
    });
  }
  