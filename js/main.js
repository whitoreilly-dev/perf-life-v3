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
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

// Staggered reveal on scroll — groups of siblings get cascading delays
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = e.target.parentElement
        ? Array.from(e.target.parentElement.querySelectorAll(':scope > .reveal:not(.visible)'))
        : [];
      const idx = siblings.indexOf(e.target);
      const delay = Math.max(0, idx) * 80;
      setTimeout(() => {
        e.target.classList.add('visible');
      }, delay);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

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
    btn.textContent = "You're in ✓";
    btn.disabled = true;
    input.value = '';
  });
}
