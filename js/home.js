// ======================================================================
// WEBSITE HOME | REGISTRATION FORM VALIDATION & EMAILJS SUBMISSION
// ======================================================================

const EMAILJS_SERVICE_ID = "service_qx0jb98";
const EMAILJS_TEMPLATE_ID = "template_11ubkyd";
const EMAILJS_PUBLIC_KEY = "0dWIbzbT3wSua1oWG";

// ======================================================================
// 1. FORM ELEMENTS
// ======================================================================

const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("form-message");

const nameField = document.getElementById("reg-name");
const addressField = document.getElementById("reg-address");
const phoneField = document.getElementById("reg-phone");
const emailField = document.getElementById("reg-email");
const commentsField = document.getElementById("reg-comments");
const timeField = document.getElementById("reg-time");

const submitButton = registrationForm
  ? registrationForm.querySelector('button[type="submit"]')
  : null;

// ======================================================================
// 2. FORM FEEDBACK
// ======================================================================

function showFormMessage(message, isSuccess) {
  if (!formMessage) return;

  formMessage.textContent = message;
  formMessage.style.color = isSuccess
    ? "var(--accent-cyan)"
    : "var(--accent-pink)";
}

// ======================================================================
// 3. FORM VALIDATION
// ======================================================================

function validateField(field) {
  const value = field.value.trim();

  const namePattern = /^[\p{L}][\p{L}\s.'-]*$/u;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+()\d\s-]{7,20}$/;

  field.setCustomValidity("");

  if (
    field === nameField &&
    (value.length < 2 || !namePattern.test(value))
  ) {
    field.setCustomValidity("Please enter a valid full name.");
  }

  if (field === addressField && value.length < 5) {
    field.setCustomValidity("Please enter a valid address.");
  }

  if (field === phoneField && !phonePattern.test(value)) {
    field.setCustomValidity("Please enter a valid telephone number.");
  }

  if (field === emailField && !emailPattern.test(value)) {
    field.setCustomValidity("Please enter a valid email address.");
  }

  return field.checkValidity();
}

// ======================================================================
// 4. EMAILJS INITIALIZATION
// ======================================================================

if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

// ======================================================================
// 5. LIVE VALIDATION
// ======================================================================

if (registrationForm) {
  const requiredFields = [
    nameField,
    addressField,
    phoneField,
    emailField
  ];

  requiredFields.forEach((field) => {
    field.addEventListener("blur", function () {
      if (!validateField(field)) {
        showFormMessage(field.validationMessage, false);
        field.reportValidity();
      }
    });

    field.addEventListener("input", function () {
      field.setCustomValidity("");
      showFormMessage("", false);
    });
  });

  // ====================================================================
  // 6. EMAILJS FORM SUBMISSION
  // ====================================================================

  registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    for (const field of requiredFields) {
      if (!validateField(field)) {
        showFormMessage(field.validationMessage, false);
        field.reportValidity();
        field.focus();
        return;
      }
    }

    if (typeof emailjs === "undefined") {
      showFormMessage(
        "Email service could not be loaded. Please try again.",
        false
      );
      return;
    }

    if (timeField) {
      timeField.value = new Date().toLocaleString();
    }

    const originalButtonHTML = submitButton
      ? submitButton.innerHTML
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        'Sending... <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
    }

    showFormMessage("Sending your submission...", true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        registrationForm
      );

      const submittedName = nameField.value.trim();

      showFormMessage(
        `Thank you, ${submittedName}. Your submission was sent successfully.`,
        true
      );

      registrationForm.reset();

    } catch (error) {
      console.error("EmailJS submission failed:", error);

      showFormMessage(
        `EmailJS Error ${error.status || ""}: ${error.text || "Unknown error"}`,
        false
      );

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    }
  });
}