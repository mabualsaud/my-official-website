// ======================================================================
// AI MEDICAL MODEL | PATENT RESEARCH PAGE
// ======================================================================

// ======================================================================
// FULL-SCREEN IMAGE VIEWER
// ======================================================================

const patentLightbox = document.getElementById("patentLightbox");
const patentLightboxImage = document.getElementById("patentLightboxImage");
const patentCloseButton = patentLightbox.querySelector(".patent-lightbox-close");
let patentPreviousFocus;

function closePatentLightbox() {
  patentLightbox.hidden = true;
  patentLightboxImage.src = "";
  document.body.classList.remove("patent-lightbox-open");
  patentPreviousFocus?.focus();
}

document.querySelectorAll(".patent-image-open").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    patentPreviousFocus = button;
    patentLightboxImage.src = image.src;
    patentLightboxImage.alt = image.alt;
    patentLightbox.hidden = false;
    document.body.classList.add("patent-lightbox-open");
    patentCloseButton.focus();
  });
});

patentCloseButton.addEventListener("click", closePatentLightbox);

patentLightbox.addEventListener("click", (event) => {
  if (event.target === patentLightbox) closePatentLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !patentLightbox.hidden) closePatentLightbox();
});
