/* ================================================================
   HEALTHCARE PROJECTS | THEME INTERACTION
================================================================ */
const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('nuclearMedicineProjectsTheme');

if (savedTheme === 'light') document.body.classList.add('light');

themeButton?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('nuclearMedicineProjectsTheme', document.body.classList.contains('light') ? 'light' : 'dark');
});
