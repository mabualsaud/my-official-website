// ======================================================================
// CPIP | STRATEGIC CLINICAL METRICS JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. METRIC SCORE SELECTION
// ======================================================================

function sel(el) {
  el.parentElement.querySelectorAll(".dot").forEach((d) => d.classList.remove("active"));
  el.classList.add("active");
  const metricIndex = Array.from(document.querySelectorAll(".card")).indexOf(el.closest(".card"));
  localStorage.setItem(`metric_score_${metricIndex}`, el.innerText);
}

// ======================================================================
// 2. METRIC RESPONSES STORAGE
// ======================================================================

function saveQuestionsAndProceed() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const note = card.querySelector("textarea").value;
    const activeScore = card.querySelector(".dot.active").innerText;

    localStorage.setItem(`metric_note_${index}`, note);
    localStorage.setItem(`metric_score_${index}`, activeScore);
  });
  location.href = "evaluation.html";
}
