// ======================================================================
// WEBSITE HOME | REGISTRATION FORM VALIDATION
// ======================================================================

// ======================================================================
// 1. REGISTRATION FORM ELEMENTS
// ======================================================================

const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("form-message");

const nameField = document.getElementById("reg-name");
const addressField = document.getElementById("reg-address");
const phoneField = document.getElementById("reg-phone");
const emailField = document.getElementById("reg-email");
const commentsField = document.getElementById("reg-comments");

// ======================================================================
// 2. FORM FEEDBACK MESSAGE
// ======================================================================

function showFormMessage(message, isSuccess) {
  if (!formMessage) return;

  formMessage.textContent = message;
  formMessage.style.color = isSuccess ? "var(--accent-cyan)" : "var(--accent-pink)";
}

// ======================================================================
// 3. FORM VALIDATION & DATA EVALUATION
// ======================================================================

// Validate the collected values and provide an appropriate message for each field.
function validateField(field) {
  const value = field.value.trim();
  const namePattern = /^[\p{L}][\p{L}\s.'-]*$/u;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+()\d\s-]{7,20}$/;

  field.setCustomValidity("");

  if (field === nameField && (value.length < 2 || !namePattern.test(value))) {
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
// 4. LIVE FIELD VALIDATION
// ======================================================================

if (registrationForm) {
  const requiredFields = [nameField, addressField, phoneField, emailField];

  requiredFields.forEach((field) => {
    // Evaluate the field when the user leaves it.
    field.addEventListener("blur", function () {
      if (!validateField(field)) {
        showFormMessage(field.validationMessage, false);
        field.reportValidity();
      }
    });

    // Clear previous feedback while the user edits the field.
    field.addEventListener("input", function () {
      field.setCustomValidity("");
      showFormMessage("", false);
    });
  });

  // ====================================================================
  // 5. FORM SUBMISSION
  // ====================================================================

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Complete the final validation and data evaluation before accepting the form.
    for (const field of requiredFields) {
      if (!validateField(field)) {
        showFormMessage(field.validationMessage, false);
        field.reportValidity();
        field.focus();
        return;
      }
    }

    const name = nameField.value.trim();
    const address = addressField.value.trim();
    const phone = phoneField.value.trim();
    const email = emailField.value.trim();
    const comments = commentsField.value.trim();

    // Store the evaluated values for future back-end integration.
    const registrationData = {
      name,
      address,
      phone,
      email,
      comments,
    };

    showFormMessage(`Thank you, ${registrationData.name}. Your registration was submitted successfully.`, true);
    registrationForm.reset();
  });
}
