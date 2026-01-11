/* ========================================
   MAYANK HANGSHOO - PORTFOLIO JAVASCRIPT
   Premium Interactive Features
   ======================================== */

// ===== DOM ELEMENTS =====
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTop = document.getElementById('scroll-top');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const typedText = document.getElementById('typed-text');
const skillItems = document.querySelectorAll('.skill-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contact-form');

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'visible';
    initAnimations();
  }, 2500);
});

// ===== CUSTOM CURSOR =====
if (cursor && cursorFollower) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.width = '60px';
      cursorFollower.style.height = '60px';
      cursorFollower.style.borderColor = 'rgba(99, 102, 241, 0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
  });
}

// ===== PARTICLES BACKGROUND =====
function createParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}
createParticles();

// ===== HEADER SCROLL EFFECT =====
function handleScroll() {
  const scrollY = window.scrollY;

  // Header background
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Scroll to top button
  if (scrollY > 500) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav') === sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', handleScroll);

// ===== MOBILE NAVIGATION =====
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'visible';
    });
  });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== TYPING EFFECT =====
const typingTexts = [
  'Software Engineer',
  'Full-Stack Developer',
  'Cloud & DevOps Engineer',
  'AI/LLM Developer',
  'Microservices Architect',
  'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
  if (!typedText) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typeSpeed = 500; // Pause before typing new word
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after loader
function initTyping() {
  setTimeout(typeEffect, 500);
}

// ===== STATS COUNTER ANIMATION =====
function animateCounters() {
  statNumbers.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (target - start) * easeOutQuart;

      if (target % 1 !== 0) {
        stat.textContent = current.toFixed(1);
      } else {
        stat.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.5 });

  skillItems.forEach(item => observer.observe(item));
}

// ===== PORTFOLIO FILTER =====
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200,
      reset: false,
      easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    // Hero Section
    sr.reveal('.hero-badge', { delay: 100 });
    sr.reveal('.hero-title .title-line', { delay: 200, interval: 100 });
    sr.reveal('.hero-subtitle', { delay: 400 });
    sr.reveal('.hero-description', { delay: 500 });
    sr.reveal('.hero-cta', { delay: 600 });
    sr.reveal('.hero-stats', { delay: 700 });
    sr.reveal('.hero-visual', { origin: 'right', delay: 300 });

    // Section Headers
    sr.reveal('.section-header', { delay: 100 });

    // About Section
    sr.reveal('.about-image', { origin: 'left', delay: 200 });
    sr.reveal('.about-text', { origin: 'right', delay: 300 });
    sr.reveal('.highlight-item', { delay: 100, interval: 100 });

    // Skills Section
    sr.reveal('.skill-category', { delay: 100, interval: 150 });
    sr.reveal('.tech-stack', { delay: 400 });

    // Services Section
    sr.reveal('.service-card', { delay: 100, interval: 100 });

    // Portfolio Section
    sr.reveal('.portfolio-filter', { delay: 200 });
    sr.reveal('.portfolio-item', { delay: 100, interval: 100 });

    // Testimonials
    sr.reveal('.testimonial-card', { delay: 100, interval: 150 });

    // Contact Section
    sr.reveal('.contact-card', { origin: 'left', delay: 100, interval: 100 });
    sr.reveal('.contact-form', { origin: 'right', delay: 300 });

    // Footer
    sr.reveal('.footer-brand', { delay: 100 });
    sr.reveal('.footer-column', { delay: 100, interval: 100 });
  }
}

// ===== CONTACT FORM =====
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span><i class="bx bx-check"></i>';
      showNotification('Thank you! Your message has been sent.', 'success');
      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i>
        <span>${message}</span>
    `;

  notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        padding: 16px 24px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(-50%) translateY(0)';
  }, 100);

  setTimeout(() => {
    notification.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => notification.remove(), 500);
  }, 4000);
}

// ===== TILT EFFECT FOR CARDS =====
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Trigger counter animation when stats come into view
        if (entry.target.classList.contains('hero-stats')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.2 });

  // Observe various elements
  document.querySelectorAll('.hero-stats, section').forEach(el => {
    observer.observe(el);
  });
}

// ===== INITIALIZE ALL ANIMATIONS =====
function initAnimations() {
  initTyping();
  initScrollReveal();
  initTiltEffect();
  animateSkillBars();
  observeElements();
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'visible';
  }
});

// ===== SCROLL TO TOP =====
if (scrollTop) {
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hello, fellow developer!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to Mayank Hangshoo\'s Portfolio', 'font-size: 14px; color: #8b5cf6;');
console.log('%cInterested in collaborating? Reach out!', 'font-size: 12px; color: #a1a1aa;');