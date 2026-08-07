// ======================================================================
// CPIP | STRATEGIC AUDIT REPORT JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. EMAIL SERVICE INITIALIZATION
// ======================================================================

(function () {
  emailjs.init("0dWIbzbT3wSua1oWG");
})();

// ======================================================================
// 2. AUDIT REPORT GENERATION
// ======================================================================

window.onload = function () {
  document.getElementById("recordID").innerText = Math.floor(Math.random() * 90000) + 10000;
  const name = localStorage.getItem("physicianName") || "Validator";
  document.getElementById("resName").innerText = "Dr. " + name;
  document.getElementById("resOrg").innerText = localStorage.getItem("physicianOrg") || "N/A";
  document.getElementById("resContact").innerText =
    (localStorage.getItem("physicianPhone") || "") + " | " + (localStorage.getItem("physicianEmail") || "");
  document.getElementById("resModel").innerText = localStorage.getItem("selectedModel") || "Gemini Pro";
  document.getElementById("resFeedback").innerText = localStorage.getItem("drFeedback") || "No feedback recorded.";
  document.getElementById("sigDrName").innerText = "DR. " + name.toUpperCase();
  document.getElementById("dynamicQuestion").innerText =
    localStorage.getItem("evaluation_question_text") || "Recommendation Decision:";
  document.getElementById("coreAnswer").innerText = localStorage.getItem("evaluation_ans") || "No decision provided.";
  let totalScore = 0;
  const scores = [];
  for (let i = 0; i < 7; i++) {
    const s = parseInt(localStorage.getItem(`metric_score_${i}`)) || 5;
    scores.push(s * 20);
    totalScore += s;
  }
  const finalAvg = ((totalScore / 35) * 100).toFixed(1);
  const scoreEl = document.getElementById("realAuditScore");
  scoreEl.innerText = `Validated ${finalAvg}%`;

  // Apply the audit result color according to the calculated performance.
  scoreEl.style.color = finalAvg > 85 ? "#27ae60" : finalAvg > 60 ? "#f39c12" : "#e74c3c";
  const metricsContainer = document.getElementById("metrics-list");
  const metricLabels = [
    "Clinical Hallucination Audit",
    "Assumption Detection",
    "Data Integrity",
    "Logic Trace Continuity",
    "Risk Flagging",
    "Ethical Compliance",
    "Cross-Model Consistency",
  ];

  metricLabels.forEach((label, i) => {
    const div = document.createElement("div");
    div.className = "qa-card";
    const score = localStorage.getItem(`metric_score_${i}`) || "5";
    const note = localStorage.getItem(`metric_note_${i}`) || "No specific notes provided.";
    const metricTitle = document.createElement("span");
    const metricNote = document.createElement("span");
    metricTitle.className = "q-label";
    metricNote.className = "a-label";
    metricTitle.textContent = `${i + 1}. ${label} (Score: ${score}/5)`;
    metricNote.textContent = note;
    div.append(metricTitle, metricNote);
    metricsContainer.appendChild(div);
  });
  const chatHistory = JSON.parse(localStorage.getItem("cpip_chat_history") || "[]");
  const qaContainer = document.getElementById("qa-list");
  chatHistory.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "qa-card";
    const role = entry.role === "user" ? "Physician (MD)" : "AI System";
    const text = entry.parts[0].text;
    const roleLabel = document.createElement("span");
    const responseText = document.createElement("span");
    roleLabel.className = `q-label ${entry.role === "user" ? "physician-role" : "ai-role"}`;
    responseText.className = "a-label";
    roleLabel.textContent = `${role}:`;
    responseText.textContent = text;
    div.append(roleLabel, responseText);
    qaContainer.appendChild(div);
  });

  const ctx = document.getElementById("auditChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Hallucination", "Assumptions", "Integrity", "Logic", "Risk", "Ethics", "Stability"],
      datasets: [
        {
          label: "Audit Performance %",
          data: scores,
          backgroundColor: "#D4AF37",
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  // Send the completed audit summary through EmailJS.

  emailjs.send("service_qx0jb98", "template_b95id14", {
    doctor_name: name,
    organization: localStorage.getItem("physicianOrg"),
    testimony: localStorage.getItem("drFeedback"),
  });
};

// ======================================================================
// 3. PDF REPORT DOWNLOAD
// ======================================================================

function downloadReport() {
  const element = document.getElementById("report-wrapper");
  html2pdf()
    .set({
      margin: 0,
      filename: "Audit_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
}

// ======================================================================
// 4. FINAL DECISION NAVIGATION
// ======================================================================

function goToDecision() {
  window.location.href = "decision.html";
}
