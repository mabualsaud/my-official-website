// ======================================================================
// PUBLICATION ARTICLES | PROFESSIONAL PORTFOLIO JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. PUBLICATION GALLERY DATA
// ======================================================================

const publicationImages = {
  // Newer and stronger publications appear first.
  // Arabic visuals remain in the same category, positioned after the newer English visuals.
  // Visually duplicated leadership images were removed:
  // 15-strategic-plan-board-visual.jpg
  // 17-executive-meeting-visual.jpg
  leadership: [
    "18-executive-budget-management.jpg",
    "16-executive-meeting.jpg",
    "14-strategic-plan-board.jpg",
    "13-multitasking-fast-tracking.jpg",
    "12-art-of-delegation.jpg",
    "11-conflict-management.jpg",
    "10-stakeholder-management.jpg",
    "08-strategic-innovation-before-crisis.jpg",
    "07-charismatic-leadership.jpg",
    "03-adkar-change-management.jpg",
    "01-organization-repository.jpg",
    "09-prayer-for-noble-character.jpg",
    "06-leadership-legacy.jpg",
    "05-creativity-and-leadership.jpg",
    "04-healthcare-noncompliance-risks.jpg",
    "02-national-competencies.jpg",
  ],

  "digital-transformation": [
    "23-end-medical-ai-hallucinations.jpg",
    "22-ethics-vs-legality-data-security.jpg",
    "21-red-team-attack-simulation.jpg",
    "20-system-scalability.jpg",
    "19-dxa-systems-integration.jpg",
    "18-systems-integration.jpg",
    "17-when-prompt-engineering-wasnt-enough.jpg",
    "16-code-protected-logic-lost.jpg",
    "15-software-security-ai-models.jpg",
    "14-technical-debt.jpg",
    "13-disruptive-software-innovation.jpg",
    "12-building-web-experience.jpg",
    "11-healthcare-translator-gap.jpg",
    "10-reengineering-clinical-innovation.jpg",
    "09-customer-experience-digital-marketing.jpg",
    "08-digital-business-leadership.jpg",
    "07-digital-transformation-journey.jpg",
    "06-observation-shadowing-product.jpg",
    "05-agile-mvp.jpg",
    "04-white-hat-system-engineering.jpg",
    "03-programming-input-output.jpg",
    "02-ui-ux-fashion-makeup.jpg",
    "01-linkedin-vs-pdf-resume.jpg",
  ],

 ai: [
  "30-ai-medical-safety-governance-visual.jpg",
  "29-ai-medical-safety-governance.jpg",
  "26-ai-hallucination-control.jpg",
  "27-medical-ai-hallucination-control.jpg",
  "28-clinical-reasoning-vs-medical-llm.jpg",
  "25-ai-medical-model-patient-safety.jpg",
  "24-ai-nuclear-medicine-imaging.jpg",
  "23-med-ai-clincal-ethics.jpg",
  "21-ai-responsible-healthcare.jpg",
  "22-ai-referal-engine.jpg",
  "17-swot-ai-clinical-simulation-cpip.jpg",
  "08-patient-ai-behaviour-cpip.jpg",
  "07-ai-governance-healthcare.jpg",
  "20-ai-persona-analysis.jpg",
  "18-ai-persona-analysis.jpg",
  "19-ai-era-keywords-vs-context (2).jpg",
  "16-clinical-ai-prompt-vs-chat.jpg",
  "15-root-cause-analysis-ai-systems.jpg",
  "14-bridging-healthcare-and-ai.jpg",
  "13-ai-workforce-empowerment.jpg",
  "12-governance-institutional-immunity.jpg",
  "11-executive-persona-analysis.jpg",
  "10-ats-filtering-vs-ai-analysis.jpg",
  "09-safe-ethical-healthcare-prompts.jpg",
  "06-ai-powered-talent-intelligence.jpg",
  "05-physicians-ai-assistance.jpg",
  "04-ai-epic-physician-centric-simulation.jpg",
  "03-ai-quality-risk-management.jpg",
  "02-ai-auditing.jpg",
  "01-ai-hiring-leadership-selection.jpg"
],

  epic: [
    "11-single-visit-vs-multi-visits.jpg",
    "10-accreditation-vs-ownership.jpg",
    "09-mobile-epic-workflow.jpg",
    "08-safety-box-digital-cabinet.jpg",
    "07-nmis-integration-epic.jpg",
    "06-disruptive-technology-jhah.jpg",
    "05-ui-ux-user-centred-design.jpg",
    "04-scrum-vs-kanban.jpg",
    "03-nuclear-medicine-workflows.jpg",
    "02-nuclear-medicine-patient-care.jpg",
    "01-jhah-epic-nuclear-medicine-project.jpg",
  ],

  "nuclear-medicine": [
    "28-radiology-capital-asset-transfer.jpg",
    "27-verbal-vs-email-handover.jpg",
    "26-rapid-response-vs-code-blue.jpg",
    "25-datix-patient-safety.jpg",
    "24-nuclear-medicine-safety-coordinator.jpg",
    "23-it-radiation-safety.jpg",
    "22-timing-is-the-diagnosis.jpg",
    "21-innovation-dxa-reporting.jpg",
    "20-blockchain-nuclear-medicine.jpg",
    "19-image-data-analysis.jpg",
    "18-osteoporosis-detection-dxa.jpg",
    "17-dream-to-innovation.jpg",
    "16-dxa-reporting-transformation.jpg",
    "15-iot-radiology-nuclear-medicine.jpg",
    "14-transforming-e-cam-gamma-camera.jpg",
    "13-digital-cardiac-imaging.jpg",
    "12-pet-ct-vs-spect-ct.jpg",
    "11-gamma-camera-power-shutdown.jpg",
    "10-quality-excellence-nuclear-medicine.jpg",
    "09-half-lives-nuclear-medicine.jpg",
    "08-wbc-labelling-tc99m-hmpao.jpg",
    "07-radiopharmaceutical-localization.jpg",
    "06-nmis-information-systems.jpg",
    "05-nuclear-medicine-centrifuge.jpg",
    "04-radiopharmaceutical-quality-control.jpg",
    "03-nuclear-medicine-supply-chain.jpg",
    "02-ai-nuclear-medicine-operations.jpg",
    "01-people-process-business-environment.jpg",
  ],
};

const galleryLabels = {
  leadership: "Executive Leadership",
  "digital-transformation": "Digital Transformation and Software Engineering",
  ai: "AI and Governance",
  epic: "EPIC Systems",
  "nuclear-medicine": "Nuclear Medicine",
};

// ======================================================================
// 2. PUBLICATION GALLERY CREATION
// ======================================================================

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const folder = gallery.dataset.gallery;
  const files = publicationImages[folder] || [];
  const countLabel = document.querySelector(`[data-count-for="${folder}"]`);

  if (countLabel) {
    countLabel.textContent = `${files.length} Visuals`;
  }

  files.forEach((file, index) => {
    const imagePath = `../articles/${folder}/${encodeURIComponent(file)}`;
    const articleCard = document.createElement("button");
    const image = document.createElement("img");

    articleCard.type = "button";
    articleCard.className = "article-card";
    articleCard.setAttribute("aria-label", `Open ${galleryLabels[folder]} visual ${index + 1}`);

    image.src = imagePath;
    image.alt = `${galleryLabels[folder]} publication visual ${index + 1}`;
    image.loading = index < 2 ? "eager" : "lazy";
    image.decoding = "async";

    articleCard.appendChild(image);
    gallery.appendChild(articleCard);

    articleCard.addEventListener("click", () => {
      openLightbox(imagePath, image.alt);
    });
  });
});

// ======================================================================
// 3. IMAGE LIGHTBOX
// ======================================================================

const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(imagePath, imageAlt) {
  lightboxImage.src = imagePath;
  lightboxImage.alt = imageAlt;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});