
function setupNavToggles() {
  // Find every hamburger button and wire it to its nav sibling
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.nav-container');
      if (!parent) return;
      const nav = parent.querySelector('.nav');
      if (!nav) return;
      const isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      // toggle aria-expanded for accessibility
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ---------- Contact form validation & demo submit ---------- */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgEl = document.getElementById('form-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form.name?.value || '').trim();
    const email = (form.email?.value || '').trim();
    const message = (form.message?.value || '').trim();

    // Basic checks
    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error', msgEl);
      return;
    }

    // Simple email pattern
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error', msgEl);
      return;
    }

    // Simulate submission (replace with real API / Netlify Forms / server endpoint)
    showFormMessage('Thanks — your message was sent! (Demo only)', 'success', msgEl);
    form.reset();
  });
}

function showFormMessage(text, type, el) {
  if (!el) return;
  el.textContent = text;
  if (type === 'error') {
    el.style.color = 'crimson';
  } else {
    el.style.color = 'green';
  }
}

/* ---------- Smooth scroll for internal anchors ---------- */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length === 0) return;
      // Only intercept when target exists on the page
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---------- Auto set current year in footer(s) ---------- */
function setYears() {
  const year = new Date().getFullYear();
  document.querySelectorAll('[id^="year"]').forEach(el => {
    el.textContent = year;
  });
}

/* ---------- Init on DOM ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setupNavToggles();
  setupContactForm();
  setupSmoothScroll();
  setYears();
});
