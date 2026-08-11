/* ========================================
   HADI AL SAIF - GATE INTERACTIONS
========================================= */

const enter = document.getElementById('enter');
const close = document.getElementById('close');
const reveal = document.getElementById('reveal');

/* ========================================
   OPEN AND CLOSE MESSAGE
========================================= */
function show(isOpen) {
  reveal.classList.toggle('open', isOpen);
  reveal.setAttribute('aria-hidden', String(!isOpen));
  enter.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
  (isOpen ? close : enter).focus();
}

enter.addEventListener('click', () => show(true));
close.addEventListener('click', () => show(false));

reveal.addEventListener('click', event => {
  if (event.target === reveal) show(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && reveal.classList.contains('open')) show(false);
});
