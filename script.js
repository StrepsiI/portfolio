// Year
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   AUTO GALLERY
   Drop a new image into /assets/ named build-N.png (or .jpg
   / .jpeg / .webp) and it will appear automatically.
   - Probes build-1 ... build-MAX
   - Stops after STOP_AFTER_MISSING consecutive misses
   - Renders cards in numeric order
   ========================================================= */
const GALLERY_CONFIG = {
  prefix: 'assets/build-',
  extensions: ['png', 'jpg', 'jpeg', 'webp'],
  max: 200,                 // hard upper bound
  stopAfterMissing: 5,      // bail out after this many consecutive missing indices
};

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ ok: true, src, w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ ok: false, src });
    img.src = src;
  });
}

async function findImageForIndex(i) {
  for (const ext of GALLERY_CONFIG.extensions) {
    const src = `${GALLERY_CONFIG.prefix}${i}.${ext}`;
    const res = await loadImage(src);
    if (res.ok) return src;
  }
  return null;
}

async function buildGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return [];

  const created = [];
  let consecutiveMisses = 0;

  for (let i = 1; i <= GALLERY_CONFIG.max; i++) {
    const src = await findImageForIndex(i);
    if (src) {
      consecutiveMisses = 0;
      const article = document.createElement('article');
      article.className = 'card reveal';
      article.innerHTML = `<div class="card-media"><img src="${src}" alt="Build ${i}" loading="lazy" /></div>`;
      grid.appendChild(article);
      created.push(article);
    } else {
      consecutiveMisses++;
      if (consecutiveMisses >= GALLERY_CONFIG.stopAfterMissing) break;
    }
  }

  if (created.length === 0) {
    grid.innerHTML = `<p style="opacity:.6;text-align:center;padding:2rem;">No images found. Add files like <code>assets/build-1.png</code> to the assets folder.</p>`;
  }

  return created;
}

/* =========================================================
   REVEAL ON SCROLL
   Run AFTER the gallery is built so new cards are observed.
   ========================================================= */
function initReveals() {
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
}

/* =========================================================
   HERO PARALLAX
   ========================================================= */
function initParallax() {
  const hero = document.querySelector('[data-parallax]');
  if (!hero) return;
  const onScroll = () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.2}px)`;
    hero.style.opacity = String(Math.max(1 - y / 600, 0));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Boot */
(async function init() {
  await buildGallery();
  initReveals();
  initParallax();
})();
