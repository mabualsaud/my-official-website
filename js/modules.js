/* =========================================================
   MSc SOFTWARE ENGINEERING MODULES PAGE
   MOBILE MODULE NAVIGATION INTERACTIONS
========================================================= */

/* =========================================================
   1. DOM REFERENCES
========================================================= */

const moduleMenuToggle = document.querySelector(".module-menu-toggle");
const moduleNavigation = document.querySelector(".module-nav");
const moduleNavigationWrapper = document.querySelector(".module-navigation-wrapper");


/* =========================================================
   2. CLOSE MODULE NAVIGATION
========================================================= */

function closeModuleNavigation() {
  if (!moduleMenuToggle || !moduleNavigation) return;

  moduleNavigation.classList.remove("is-open");
  moduleMenuToggle.classList.remove("is-open");
  moduleMenuToggle.setAttribute("aria-expanded", "false");
}


/* =========================================================
   3. MODULE MENU INTERACTIONS
========================================================= */

if (moduleMenuToggle && moduleNavigation) {
  moduleMenuToggle.addEventListener("click", () => {
    const isOpen = moduleNavigation.classList.toggle("is-open");

    moduleMenuToggle.classList.toggle("is-open", isOpen);
    moduleMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  moduleNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeModuleNavigation);
  });


  /* =========================================================
     4. OUTSIDE CLICK
  ========================================================= */

  document.addEventListener("click", (event) => {
    const clickedOutsideNavigation =
      moduleNavigationWrapper &&
      !moduleNavigationWrapper.contains(event.target);

    if (
      moduleNavigation.classList.contains("is-open") &&
      clickedOutsideNavigation
    ) {
      closeModuleNavigation();
    }
  });


  /* =========================================================
     5. KEYBOARD ACCESSIBILITY
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModuleNavigation();
      moduleMenuToggle.focus();
    }
  });
}
