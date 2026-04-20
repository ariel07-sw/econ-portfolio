// Nav: add .scrolled class once user scrolls past hero
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Skills: animate bars when section enters viewport
const fills = document.querySelectorAll('.skill-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(el => el.classList.add('animated'));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) observer.observe(skillsSection);

// Contact form: fake submit feedback (wire to a backend / Formspree as needed)
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = '';
    note.className = 'form-note';

    // Swap button text while "sending"
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      note.textContent = 'Thanks! I'll get back to you soon.';
      note.classList.add('success');
      form.reset();
    }, 1200);
  });
}

// Project gallery filter
const filterBar  = document.getElementById('filter-bar');
const allCards   = [...document.querySelectorAll('#projects-grid .card')];
const emptyState = document.getElementById('gallery-empty');

function showCard(card) {
  card.classList.add('card-out');
  card.classList.remove('card-hidden');
  requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('card-out')));
}

function hideCard(card) {
  card.classList.add('card-out');
  setTimeout(() => {
    card.classList.add('card-hidden');
    card.classList.remove('card-out');
    updateEmpty();
  }, 230);
}

function updateEmpty() {
  const anyVisible = allCards.some(c => !c.classList.contains('card-hidden'));
  emptyState.classList.toggle('visible', !anyVisible);
}

if (filterBar) {
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    allCards.forEach(card => {
      const tags = (card.dataset.tags || '').split(',');
      const match = filter === 'all' || tags.includes(filter);
      if (match) showCard(card); else hideCard(card);
    });
    if (filter === 'all') emptyState.classList.remove('visible');
  });
}

// Smooth-scroll all anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
