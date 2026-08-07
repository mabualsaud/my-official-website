// ======================================================================
// EPIC – NUCLEAR MEDICINE WORKFLOW ARCHITECTURE DESIGN JAVASCRIPT
// ======================================================================

// ======================================================================
// EPIC – NUCLEAR MEDICINE WORKFLOW ARCHITECTURE DESIGN
// ======================================================================

"use strict";

// ======================================================================
// 1. MOBILE NAVIGATION
// ======================================================================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-link");

function closeNavigation() {
  if (!navToggle || !navLinks) return;

  navToggle.classList.remove("active");
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open project navigation");
  document.body.classList.remove("nav-open");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close project navigation" : "Open project navigation");
    document.body.classList.toggle("nav-open", isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNavigation();
  });
}

// ======================================================================
// 2. SCROLL REVEAL
// ======================================================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// ======================================================================
// 3. ACTIVE NAVIGATION SECTION
// ======================================================================

const projectSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && projectSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      navigationLinks.forEach((link) => {
        const matchesSection = link.getAttribute("href") === `#${visibleEntry.target.id}`;

        link.classList.toggle("active", matchesSection);
        if (matchesSection) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: [0.05, 0.2, 0.5],
    },
  );

  projectSections.forEach((section) => sectionObserver.observe(section));
}

// ======================================================================
// 4. IMAGE LIGHTBOX
// ======================================================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const zoomableImages = document.querySelectorAll(".zoomable");

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

zoomableImages.forEach((image) => {
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("show")) {
      closeLightbox();
    }
  });
}

// ======================================================================
// 5. THEME SWITCH
// ======================================================================

const themeSwitch = document.getElementById("themeSwitch");
const storedTheme = localStorage.getItem("epic-theme");

if (storedTheme === "light") {
  document.body.classList.add("light-theme");
}

function syncThemeSwitch() {
  if (!themeSwitch) return;
  const isLight = document.body.classList.contains("light-theme");
  themeSwitch.setAttribute("aria-pressed", String(isLight));
  themeSwitch.querySelector("span").textContent = isLight ? "Dark Theme" : "Switch Theme";
}

syncThemeSwitch();

if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("epic-theme", isLight ? "light" : "dark");
    syncThemeSwitch();
  });
}
