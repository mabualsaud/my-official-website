// ======================================================================
// ACHIEVEMENTS & CERTIFICATIONS | MSC SOFTWARE ENGINEERING JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. CERTIFICATE IMAGE MODAL
// ======================================================================

function showModal(imageSource) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-img");

  modalImage.src = imageSource;
  modal.style.display = "flex";
}

document.getElementById("modal").addEventListener("click", function () {
  this.style.display = "none";
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.getElementById("modal").style.display = "none";
  }
});
