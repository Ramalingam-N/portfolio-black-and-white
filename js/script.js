(function () {
  'use strict';

  /* ---------- 1. STICKY NAV background on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 2. MOBILE MENU toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  const closeMenu = () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu after clicking a link (mobile)
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- 3. SCROLL REVEAL (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible')); // fallback
  }

  /* ---------- 4. ACTIVE NAV LINK on scroll ---------- */
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav__link')];

  const setActive = () => {
    let current = '';
    const y = window.scrollY + 120;
    sections.forEach(sec => { if (y >= sec.offsetTop) current = sec.id; });
    navLinks.forEach(l =>
      l.classList.toggle('is-active', l.getAttribute('href') === '#' + current)
    );
  };
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });

  /* ---------- 5. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if(yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();