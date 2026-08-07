// ======================================================================
// PROFESSIONAL PORTFOLIO WEBSITE | PAGE INTERACTIONS
// ======================================================================

// ======================================================================
// 1. THEME SWITCHER ELEMENTS
// ======================================================================

const themeButton = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

function updateThemeButton(isLight) {
  if (!themeButton || !themeIcon || !themeText) return;

  themeIcon.textContent = isLight ? "☀️" : "◐";
  themeText.textContent = isLight ? "Light Mode" : "Dark Mode";
  themeButton.setAttribute("aria-pressed", String(isLight));
  themeButton.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
}

// ======================================================================
// 2. SAFE THEME PREFERENCE STORAGE
// ======================================================================

function getSavedTheme() {
  try {
    return localStorage.getItem("themePreference");
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("themePreference", theme);
  } catch {
    // The theme still works when browser privacy settings block storage.
  }
}

// ======================================================================
// 3. INITIAL THEME
// ======================================================================

if (getSavedTheme() === "light") {
  document.body.classList.add("light");
}

updateThemeButton(document.body.classList.contains("light"));

// ======================================================================
// 4. THEME SWITCHER INTERACTION
// ======================================================================

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");
    updateThemeButton(isLight);
    saveTheme(isLight ? "light" : "dark");
  });
}
