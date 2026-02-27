/* ─────────────────────────────────────────
   script.js — Joshua Coronel Portfolio
───────────────────────────────────────── */

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    }
  });
});

// ── Fade-in on scroll ──
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.06 }
);

document.querySelectorAll('.fade').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.06) + 's';
  fadeObserver.observe(el);
});

// ── Active nav link on scroll ──
const navLinks = document.querySelectorAll('.topbar-nav a');

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + id
          );
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);

document.querySelectorAll('[id]').forEach(el => navObserver.observe(el));

// ── Experience: first item active, hover fills dot ──
const expItems = document.querySelectorAll('.exp-item');
expItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    expItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
  item.addEventListener('mouseleave', () => {
    // Re-activate first item when mouse leaves all items
  });
});

// When mouse leaves the entire exp list, reactivate first
const expList = document.querySelector('.exp-list');
if (expList) {
  expList.addEventListener('mouseleave', () => {
    expItems.forEach(i => i.classList.remove('active'));
    if (expItems[0]) expItems[0].classList.add('active');
  });
}

// ── Modal open / close ──
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(event, id) {
  if (event.target === event.currentTarget) {
    closeModal(id);
  }
}

// Close modals on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(overlay => {
      closeModal(overlay.id);
    });
  }
});