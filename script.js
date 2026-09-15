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

// Terminal boot sequence (runs once, respects reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lines = document.querySelectorAll('#terminal .line[data-text]');
const cursor = document.getElementById('cursor');

function showLinesInstantly() {
  lines.forEach(line => {
    line.textContent = line.dataset.text;
    line.classList.add('shown');
  });
}

function typeLine(line, callback) {
  const text = line.dataset.text;
  line.classList.add('shown');
  let i = 0;
  const speed = line.dataset.type === 'prompt' ? 45 : 12;
  const interval = setInterval(() => {
    line.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(callback, line.dataset.type === 'prompt' ? 250 : 450);
    }
  }, speed);
}

function typeSequence(index) {
  if (index >= lines.length) return;
  typeLine(lines[index], () => typeSequence(index + 1));
}

if (prefersReducedMotion) {
  showLinesInstantly();
} else {
  typeSequence(0);
}
