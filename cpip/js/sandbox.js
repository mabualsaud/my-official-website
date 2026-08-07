// ======================================================================
// CPIP | STRATEGIC CLINICAL SUITE JAVASCRIPT
// ======================================================================

// ======================================================================
// 1. APPLICATION STATE AND INITIALIZATION
// ======================================================================

let isRec = false;
let finalText = "";
window.clinicalContext = null;
window.initEngine = async () => {
  const statusEl = document.getElementById("kStatus");
  displayGovernanceHeader();
  if (statusEl) {
    statusEl.innerText = "CPIP LINK-MODE";
    statusEl.className = "kernel-status status-online";
  }

  setTimeout(() => {
    document.getElementById("specModal").style.display = "flex";
    document.getElementById("specInput").focus();
  }, 1000);
};
window.initEngine();

window.onload = () => {
  if (!localStorage.getItem("selectedModel")) localStorage.setItem("selectedModel", "CPIP");
};

// ======================================================================
// 2. SPEECH RECOGNITION
// ======================================================================

const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!Speech) {
  alert("Speech Recognition not supported in this browser.");
}

const rec = Speech ? new Speech() : null;

if (rec) {
  rec.continuous = true;
  rec.interimResults = true;
  rec.lang = "en-US";

  rec.onresult = (e) => {
    let interimTranscript = "";
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      const transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) {
        finalText += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }
    const field = document.getElementById("userInput");

    // Clean up whitespace to prevent word detection glitches

    field.value = (finalText + interimTranscript).replace(/\s\s+/g, " ");
    updateHeight(field);
  };
  rec.onend = () => {
    if (isRec) {
      try {
        rec.start();
      } catch (e) {
        console.warn("Mic restart blocked");
      }
    }
  };
  rec.onerror = (e) => {
    console.error("Speech Error:", e.error);
    if (e.error === "not-allowed") alert("Microphone access is blocked. Please enable it in browser settings.");
    isRec = false;
    document.getElementById("mic").classList.remove("active");
  };
}

function toggleMic() {
  if (!rec) return;
  const field = document.getElementById("userInput");
  if (!isRec) {
    finalText = field.value + (field.value.length > 0 ? " " : "");
    try {
      rec.start();
      isRec = true;
      document.getElementById("mic").classList.add("active");
    } catch (e) {
      console.error("Mic start failed:", e);
    }
  } else {
    isRec = false;
    rec.stop();
    document.getElementById("mic").classList.remove("active");
  }
}

function updateHeight(el) {
  el.style.height = "60px";
  el.style.height = el.scrollHeight + "px";
}

// ======================================================================
// 3. MESSAGE INPUT FOCUS
// ======================================================================

function enterFocus() {
  document.getElementById("mainFooter").classList.add("jumped");
  document.getElementById("bgOverlay").classList.add("active");

  // Fix: Re-focus the field after the 'jumped' transition to ensure text entry works

  setTimeout(() => document.getElementById("userInput").focus(), 150);
}

function exitFocus() {
  const footer = document.getElementById("mainFooter");
  const overlay = document.getElementById("bgOverlay");
  footer.classList.remove("jumped");
  overlay.classList.remove("active");
  document.getElementById("userInput").blur();
}
// ======================================================================
// 4. LINK-MODE MESSAGE OUTPUT
// ======================================================================

function processClinicalCase() {
  const stdArea = document.getElementById("stdOut");
  const message = document.createElement("div");
  const description = document.createElement("p");
  const launchButton = document.createElement("button");

  message.className = "link-mode-message";
  description.textContent = "System is in Link-Mode.";
  launchButton.className = "btn-gold";
  launchButton.type = "button";
  launchButton.textContent = "Launch CPIP Protocol in Gemini";
  launchButton.addEventListener("click", openCPIPWithContext);

  message.append(description, launchButton);
  stdArea.replaceChildren(message);
}
function displayGovernanceHeader() {
  const cpipArea = document.getElementById("cpipOut");
  const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
  const headerContent = `================================================================================
  Clinical Protection Intelligence Protocol (CPIP) | CLINICAL SAFETY KERNEL V 16.0
  ================================================================================

  [PATIENT SAFETY NOTICE]
  --------------------------------------------------
  >> CRITICAL: THIS SYSTEM IS FOR PHYSICIAN USE ONLY.
  >> SAFETY NOTICE: This is a clinical simulation and decision-support tool.
  >> LIABILITY: It does NOT provide medical diagnosis or treatment decisions.
  >> Zero Overconfidence Mode: ENABLED (Capped at 85.0%)
  >> Protocol: Clinical Protection Intelligence Protocol (CPIP)
  >> LLM ADAPTER SYNC @ ${ts}
  --------------------------------------------------------------------------------`;

  cpipArea.insertAdjacentHTML("afterbegin", `<pre class="governance-header">${headerContent}</pre>`);
}

function sendMsg() {
  const field = document.getElementById("userInput");
  const val = field.value.trim();
  if (!val) return;

  field.value = "";
  field.style.height = "60px";
  exitFocus();

  processClinicalCase();
}

// ======================================================================
// 5. CLINICAL SPECIALTY CONTEXT
// ======================================================================

function setContext() {
  const specInput = document.getElementById("specInput");
  const val = specInput.value.trim();
  if (!val) return alert("Please define medical specialty.");

  window.clinicalContext = val;
  document.getElementById("displaySpec").innerText = val; // تحديث الترويسة
  document.getElementById("specModal").style.display = "none";
}

// ======================================================================
// 6. EXTERNAL CPIP PROTOCOL LAUNCH
// ======================================================================

function openCPIPWithContext() {
  const protocolLink = "https://colab.research.google.com/drive/1gqvA4MZuv5FYtLZi8ASfTLnXcofM7S7H?usp=sharing";
  const instruction =
    `You are the clinical assistant for the CPIP system.` +
    ` Refer to this link for the clinical protocol: ${protocolLink}.` +
    ` Load its clinical logic and apply it carefully to the case I provide.` +
    ` Follow the protocol without disclosing its protected code.`;

  const url = `https://gemini.google.com/?prompt=${encodeURIComponent(instruction)}`;
  window.open(url, "_blank");
}

// ======================================================================
// 7. KEYBOARD ACCESSIBILITY
// ======================================================================

document.getElementById("userInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMsg();
  }
});

// ======================================================================
// 8. GLOBAL HANDLERS FOR HTML CONTROLS
// ======================================================================

window.sendMsg = sendMsg;
window.toggleMic = toggleMic;
window.enterFocus = enterFocus;
window.exitFocus = exitFocus;
window.updateHeight = updateHeight;
window.openCPIPWithContext = openCPIPWithContext;
window.setContext = setContext;
