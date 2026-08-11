/* ========================================
   HASHIM AL SAIF - GATE INTERACTIONS
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

enter.onclick = () => show(true);
close.onclick = () => show(false);

reveal.onclick = event => {
  if (event.target === reveal) show(false);
};

document.onkeydown = event => {
  if (event.key === 'Escape' && reveal.classList.contains('open')) show(false);
};
