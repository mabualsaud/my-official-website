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

// ======================================================================
// 6. DESKTOP HORIZONTAL PROJECT NAVIGATION
// ======================================================================

const projectNavigationList = document.querySelector(".project-navigation-list");

if (projectNavigationList) {
  const previousButton = document.querySelector(".project-nav-prev");
  const nextButton = document.querySelector(".project-nav-next");
  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  const updateNavigationAlignment = () => {
    const overflows = projectNavigationList.scrollWidth > projectNavigationList.clientWidth + 1;
    projectNavigationList.classList.toggle("is-centered", !overflows);
    previousButton.hidden = !overflows;
    nextButton.hidden = !overflows;
    previousButton.disabled = projectNavigationList.scrollLeft <= 2;
    nextButton.disabled = projectNavigationList.scrollLeft >= projectNavigationList.scrollWidth - projectNavigationList.clientWidth - 2;
  };

  previousButton.addEventListener("click", () => {
    projectNavigationList.scrollBy({ left: -360, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    projectNavigationList.scrollBy({ left: 360, behavior: "smooth" });
  });

  projectNavigationList.addEventListener("wheel", (event) => {
    if (projectNavigationList.scrollWidth <= projectNavigationList.clientWidth) return;
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      projectNavigationList.scrollLeft += event.deltaY;
    }
  }, { passive: false });

  projectNavigationList.addEventListener("pointerdown", (event) => {
    if (projectNavigationList.scrollWidth <= projectNavigationList.clientWidth) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartScroll = projectNavigationList.scrollLeft;
    projectNavigationList.classList.add("is-dragging");
    projectNavigationList.setPointerCapture(event.pointerId);
  });

  projectNavigationList.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    projectNavigationList.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
  });

  const stopDragging = () => {
    dragging = false;
    projectNavigationList.classList.remove("is-dragging");
  };

  projectNavigationList.addEventListener("pointerup", stopDragging);
  projectNavigationList.addEventListener("pointercancel", stopDragging);
  projectNavigationList.addEventListener("scroll", updateNavigationAlignment, { passive: true });
  window.addEventListener("resize", updateNavigationAlignment);
  updateNavigationAlignment();
}
