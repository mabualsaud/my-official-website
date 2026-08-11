/* ========================================
   JANA AL SAIF - GATE INTERACTIONS
========================================= */
const enter = document.getElementById('enter');
const close = document.getElementById('close');
const welcome = document.getElementById('welcome');

function showWelcome(isOpen) {
  welcome.classList.toggle('open', isOpen);
  welcome.setAttribute('aria-hidden', String(!isOpen));
  enter.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
  (isOpen ? close : enter).focus();
}

enter.addEventListener('click', () => showWelcome(true));
close.addEventListener('click', () => showWelcome(false));
welcome.addEventListener('click', event => {
  if (event.target === welcome) showWelcome(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && welcome.classList.contains('open')) showWelcome(false);
});
