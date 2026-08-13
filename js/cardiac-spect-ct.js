// ======================================================================
// CARDIAC SPECT/CT | CLINICAL WORKFLOW TRANSFORMATION
// ======================================================================

// ======================================================================
// 1. THEME SWITCHER & PAGE-SPECIFIC PREFERENCE STORAGE
// ======================================================================
const themeButton = document.getElementById("themeToggle");
const themeLabel = themeButton.querySelector("span");

function applyTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  themeButton.setAttribute("aria-pressed", String(isLight));
  themeLabel.textContent = isLight ? "Dark Theme" : "Switch Theme";
}

applyTheme(localStorage.getItem("cardiac-spect-ct-theme") === "light");

themeButton.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");
  applyTheme(isLight);
  localStorage.setItem("cardiac-spect-ct-theme", isLight ? "light" : "dark");
});

// ======================================================================
// 2. ACTIVE PROJECT SECTION NAVIGATION
// ======================================================================
const sectionLinks = [...document.querySelectorAll(".page-nav a")];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

  if (!visibleSection) return;

  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${visibleSection.target.id}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });
}, { rootMargin: "-20% 0px -60%", threshold: [0, 0.25, 0.5] });

observedSections.forEach((section) => sectionObserver.observe(section));

// ======================================================================
// 3. ACCESSIBLE FULL-SCREEN IMAGE VIEWER
// ======================================================================
const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = lightbox.querySelector(".lightbox-close");
let previousFocus;

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.classList.remove("lightbox-open");
  previousFocus?.focus();
}

document.querySelectorAll(".image-zoom-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    previousFocus = link;

    const sourceImage = link.querySelector("img");
    lightboxImage.src = link.href;
    lightboxImage.alt = sourceImage.alt;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});
