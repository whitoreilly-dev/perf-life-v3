// Perf Life — Main JS

// Sticky nav color shift
const nav = document.querySelector('.nav');
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile drawer
const burger = document.querySelector('.nav__burger');
const drawer = document.querySelector('.nav__drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  // Close on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObs.observe(el));

// FAQ accordion
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Newsletter form (no-op for demo)
const nForm = document.querySelector('.newsletter__form');
if (nForm) {
  nForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = nForm.querySelector('input');
    const btn = nForm.querySelector('.btn');
    btn.textContent = 'You\'re in ✓';
    btn.disabled = true;
    input.value = '';
  });
}
