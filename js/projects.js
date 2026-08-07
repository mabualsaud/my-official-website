// ======================================================================
// INNOVATIONS & PROJECTS | PROFESSIONAL PORTFOLIO WEBSITE JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. SAVED THEME PREFERENCE
// ======================================================================

function getSavedTheme() {
  try {
    return localStorage.getItem("themePreference");
  } catch {
    return null;
  }
}

if (getSavedTheme() === "light") {
  document.body.classList.add("light");
}

// ======================================================================
// 2. IMAGE LIGHTBOX ELEMENTS
// ======================================================================

const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

// ======================================================================
// 3. OPEN IMAGE LIGHTBOX
// ======================================================================

function openLightbox(src, captionText) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  lightboxImage.src = src;
  lightboxImage.alt = captionText;
  lightboxCaption.textContent = captionText;
  lightbox.classList.add("active");
}

// ======================================================================
// 4. CLOSE IMAGE LIGHTBOX
// ======================================================================

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("active");
}

// ======================================================================
// 5. KEYBOARD ACCESSIBILITY
// ======================================================================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("active")) {
    closeLightbox();
  }
});
