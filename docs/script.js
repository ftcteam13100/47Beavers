// ===== Mobile Nav Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// ===== Active Nav Highlighting on Scroll (homepage only) =====
const navLinks = document.querySelectorAll('nav ul li a');
const homeSections = document.querySelectorAll('#home, #about, #achievements, #camps, #contact');

if (homeSections.length > 0) {
  const activateLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  homeSections.forEach(sec => sectionObserver.observe(sec));
}

// ===== Scroll-Triggered Fade-In Animations =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Smooth Scroll for Same-Page Links =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    // Only intercept same-page anchor links (e.g. #about), not cross-page links
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

