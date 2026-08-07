// ======================================================================
// CPIP | STRATEGIC EVALUATION JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. RECOMMENDATION SELECTION
// ======================================================================

function sel(el) {
  document.querySelectorAll(".opt-btn").forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  localStorage.setItem("recommendation_status", el.innerText);
}

// ======================================================================
// 2. PROFESSIONAL DATA VALIDATION AND STORAGE
// ======================================================================

function saveAndGo() {
  const status = localStorage.getItem("recommendation_status");
  const visionAnswer = document.getElementById("drVision").value;

  const name = document.getElementById("physicianName").value.trim();
  const spec = document.getElementById("physicianSpec").value.trim();
  const org = document.getElementById("physicianOrg").value.trim();
  const email = document.getElementById("physicianEmail").value.trim();
  if (!name || !org || !email) {
    alert("Please fill in your professional credentials (Name, Organization, and Email).");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid official email address.");
    return;
  }

  if (!status || !visionAnswer.trim()) {
    alert("Please complete the recommendation status and strategic vision fields.");
    return;
  }
  localStorage.setItem("physicianName", name);
  localStorage.setItem("physicianSpec", spec);
  localStorage.setItem("physicianOrg", org);
  localStorage.setItem("physicianPhone", document.getElementById("physicianPhone").value);
  localStorage.setItem("physicianEmail", email);
  localStorage.setItem(
    "drFeedback",
    status + ": The CPIP protocol represents a vital advancement in clinical AI safety.",
  );
  const questionTitle = document.getElementById("ehrQuestion").innerText;
  const fullDecision = "Status: " + status + "\n\nVision: " + visionAnswer;

  localStorage.setItem("evaluation_question_text", questionTitle);
  localStorage.setItem("evaluation_ans", fullDecision);

  location.href = "report.html";
}
