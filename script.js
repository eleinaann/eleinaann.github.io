// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Project accordion
document.querySelectorAll('.project-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const project = button.closest('.project');
    const isOpen = project.getAttribute('data-open') === 'true';

    document.querySelectorAll('.project').forEach(p => {
      p.setAttribute('data-open', 'false');
      p.querySelector('.project-toggle').setAttribute('aria-expanded', 'false');
      p.querySelector('.project-icon').textContent = '+';
    });

    if (!isOpen) {
      project.setAttribute('data-open', 'true');
      button.setAttribute('aria-expanded', 'true');
      project.querySelector('.project-icon').textContent = '\u2014';
    }
  });
});
