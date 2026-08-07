// ======================================================================
// CPIP | PROTECTED OFFICIAL ENDORSEMENT JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. CERTIFICATE DATA
// ======================================================================

window.onload = function () {
  document.getElementById("certDoctorName").innerText =
    "Dr. " + (localStorage.getItem("physicianName") || "Expert Validator");
  document.getElementById("certOrgName").innerText =
    "Clinical Representative of " + (localStorage.getItem("physicianOrg") || "Global Partner");
  document.getElementById("certModelUsed").innerText = localStorage.getItem("selectedModel") || "Advanced AI Engine";
};

// ======================================================================
// 2. PDF CERTIFICATE DOWNLOAD
// ======================================================================

function downloadCertificate() {
  const element = document.getElementById("certificate-area");
  const options = {
    margin: [5, 5, 5, 5], // Adds a 5 mm safety margin on every side.
    filename: "CPIP_Certificate.pdf",
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: { scale: 2, backgroundColor: "#0A0A0A", y: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
  };
  html2pdf().set(options).from(element).save();
}
