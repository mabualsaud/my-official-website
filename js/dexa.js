// ======================================================================
// RE-ENGINEERING DXA REPORTS | CLINICAL INNOVATION JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. THEME SWITCHER
// ======================================================================

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
};

// ======================================================================
// 2. SCROLL REVEAL ANIMATION
// ======================================================================

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
reveals.forEach((el) => observer.observe(el));

// ======================================================================
// 3. IMAGE LIGHTBOX
// ======================================================================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".lightbox-close");

document.querySelectorAll(".zoomable").forEach((img) => {
  img.onclick = (e) => {
    e.stopPropagation();
    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  };
});

closeBtn.onclick = () => lightbox.classList.remove("show");
lightbox.onclick = () => lightbox.classList.remove("show");
lightboxImg.onclick = (e) => e.stopPropagation();
