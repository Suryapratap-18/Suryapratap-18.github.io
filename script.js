const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) { menuToggle.textContent = '☰'; menuToggle.setAttribute('aria-label', 'Open navigation'); }
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelector('#year').textContent = new Date().getFullYear();

// This first version opens the visitor's email app. A secure API + database can be connected in Phase 2.
document.querySelector('#contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const message = String(form.get('message') || '').trim();
  if (!name || !email || !message) return;
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\n${message}`);
  document.querySelector('#formNote').textContent = 'Your email app should open with the message filled in. Please send it from there.';
  window.location.href = `mailto:codesurya.io@gmail.com?subject=${subject}&body=${body}`;
});
