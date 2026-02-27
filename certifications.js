/* ─────────────────────────────────────────
   certifications.js
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.page-header');
  const cards = document.querySelectorAll('.cert-card');

  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(8px)';
    header.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    }));
  }

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transition = `opacity 0.3s ease ${0.05 + i * 0.04}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.opacity = '1';
    }));
  });
});