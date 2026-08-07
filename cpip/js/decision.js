// ======================================================================
// CPIP | NEXT STEPS JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. START A NEW SIMULATION
// ======================================================================

function prepareNewSimulation() {
  for (let i = 0; i < 7; i++) {
    localStorage.removeItem(`metric_score_${i}`);
    localStorage.removeItem(`metric_note_${i}`);
  }
  localStorage.removeItem("recommendation_status");
  localStorage.removeItem("drFeedback");
  localStorage.removeItem("evaluation_ans");
  localStorage.removeItem("evaluation_question_text");
  window.location.href = "sandbox.html";
}
