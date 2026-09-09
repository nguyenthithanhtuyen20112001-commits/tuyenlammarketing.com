// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Fade-in on scroll (Intersection Observer)
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// Animate stat numbers
function animateValue(el, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + range * eased);
    el.textContent = current + (el.dataset.suffix || '+');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const h3 = entry.target;
      const text = h3.textContent;
      const num = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      h3.dataset.suffix = suffix;
      animateValue(h3, 0, num, 1500);
      statObserver.unobserve(h3);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-item h3').forEach(el => statObserver.observe(el));

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Đã gửi thành công! ✅';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Gửi tin nhắn ✨';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// Smooth reveal for experience cards
const expCards = document.querySelectorAll('.exp-card');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 150);
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
expCards.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  tlObserver.observe(item);
});

// Skill cards stagger animation
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const cards = entry.target.parentElement.querySelectorAll('.skill-card');
      cards.forEach((card, idx) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, idx * 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
skillCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
if (skillCards.length > 0) skillObserver.observe(skillCards[0]);

// Project Accordion Toggle
function toggleProject(headerEl) {
  const accordion = headerEl.closest('.project-accordion');
  const wasOpen = accordion.classList.contains('open');

  // Close all other accordions
  document.querySelectorAll('.project-accordion.open').forEach(a => {
    if (a !== accordion) {
      a.classList.remove('open');
    }
  });

  // Toggle this one
  accordion.classList.toggle('open');

  // Re-create lucide icons for newly visible content
  if (!wasOpen) {
    setTimeout(() => lucide.createIcons(), 100);
  }
}

// Skill Accordion Toggle (mobile only)
function toggleSkill(headerEl) {
  if (window.innerWidth > 768) return; // Desktop: không làm gì
  const card = headerEl.closest('.skill-card');
  card.classList.toggle('open');
}
