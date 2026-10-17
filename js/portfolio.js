/* Navigation progressively enhances an otherwise fully usable static page. */
(() => {
  'use strict';
  const nav = document.querySelector('.navigation');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('#nav-links');
  if (!nav || !toggle || !links) return;
  const mobile = window.matchMedia('(max-width: 760px)');
  const setOpen = (open, restoreFocus = false) => {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? '−' : '+';
    if (restoreFocus) toggle.focus();
  };
  nav.classList.add('enhanced');
  toggle.hidden = false;
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) setOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
})();
