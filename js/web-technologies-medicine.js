// ======================================================================
// WHEN WEB TECHNOLOGIES SPEAK MEDICINE | PAGE INTERACTIONS
// ======================================================================

document.addEventListener("DOMContentLoaded", function () {
  // ====================================================================
  // 1. SCROLL REVEAL
  // ====================================================================

  const revealItems = document.querySelectorAll(
    ".story-card, .journey-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach(function (item) {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  // ====================================================================
  // 2. STORY CARD HOVER
  // ====================================================================

  document.querySelectorAll(".story-card").forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("is-hovered");
    });
  });

  // ====================================================================
  // 3. IMAGE HOVER
  // ====================================================================

  const storyImages = document.querySelectorAll(".story-image");

  storyImages.forEach(function (figure) {
    figure.addEventListener("mouseenter", function () {
      figure.classList.add("is-hovered");
    });

    figure.addEventListener("mouseleave", function () {
      figure.classList.remove("is-hovered");
    });
  });

  // ====================================================================
  // 4. IMAGE CLICK ZOOM | LIGHTBOX
  // ====================================================================

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");

  const lightboxImage = document.createElement("img");
  lightboxImage.alt = "";

  const closeButton = document.createElement("button");
  closeButton.className = "image-lightbox-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close image preview");
  closeButton.innerHTML = "&times;";

  lightbox.appendChild(lightboxImage);
  lightbox.appendChild(closeButton);

  document.body.appendChild(lightbox);

  function openLightbox(image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Expanded image";

    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");

    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
  }

  storyImages.forEach(function (figure) {
    const image = figure.querySelector("img");

    if (!image) return;

    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute(
      "aria-label",
      "Open image in full-screen view"
    );

    figure.addEventListener("click", function () {
      openLightbox(image);
    });

    figure.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      lightbox.classList.contains("is-open")
    ) {
      closeLightbox();
    }
  });
});