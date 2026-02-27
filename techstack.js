/* ─────────────────────────────────────────
   techstack.js — Tech Stack Page
───────────────────────────────────────── */

// Stagger-fade sections on load
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.stack-section');
  sections.forEach((section, i) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(10px)';
    section.style.transition = `opacity 0.35s ease ${i * 0.07}s, transform 0.35s ease ${i * 0.07}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      });
    });
  });

  // Also animate header
  const header = document.querySelector('.page-header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(8px)';
    header.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      });
    });
  }
});