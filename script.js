// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal-on-scroll using IntersectionObserver, with staggered delay per group
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const groups = new Map();
  els.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((items) => {
    items.forEach((el, i) => { el.style.transitionDelay = (i * 80) + 'ms'; });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  els.forEach((el) => io.observe(el));
} else {
  els.forEach((el) => el.classList.add('in-view'));
}

// Hero parallax + fade
const hero = document.querySelector('[data-parallax]');
if (hero) {
  const onScroll = () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.2}px)`;
    hero.style.opacity = String(Math.max(1 - y / 600, 0));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
