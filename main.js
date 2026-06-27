/* ========== PORTFOLIO MAIN JS ========== */

// --- Initialize Lucide Icons ---
function initLucide() {
  if (window.lucide) {
    lucide.createIcons();
  } else {
    setTimeout(initLucide, 100);
  }
}

// --- Loader ---
window.addEventListener('load', () => {
  initLucide();
  setTimeout(() => {
    const loader = document.querySelector('.loader-wrap');
    loader.classList.add('hidden');
    setTimeout(() => loader.style.display = 'none', 600);
    animateHero();
  }, 1200);
});

// --- Hero Animation ---
function animateHero() {
  const els = document.querySelectorAll('.hero-animate');
  els.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = `opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)`;
    }, i * 150);
  });
}

// --- Navbar Scroll ---
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// --- Mobile Menu ---
const menuBtn = document.querySelector('.menu-btn');
const navLinksWrap = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinksWrap.classList.toggle('open');
});

navLinksWrap.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinksWrap.classList.remove('open');
  });
});

// --- Scroll Reveal with staggered children ---
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .timeline-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      if (entry.target.classList.contains('timeline-item')) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// --- Counter Animation ---
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(counter => {
    const target = +counter.dataset.count;
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + suffix;
    }, 30);
  });
}

setTimeout(() => { animateCounters(); }, 2200);

// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.innerWidth > 768) {
  document.body.style.cursor = 'none';

  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.style.cssText = 'width:120px;height:120px;background:radial-gradient(circle,rgba(108,99,255,0.06) 0%,transparent 70%);border-radius:50%;position:fixed;pointer-events:none;z-index:9996;transform:translate(-50%,-50%);transition:opacity .3s';
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .btn, .btn-resume, .project-card, .skill-card, .cert-card, .highlight-card, .contact-link, .hero-socials a, input, textarea').forEach(el => {
    el.style.cursor = 'none';
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('hovered');
      cursorDot.style.transform = 'translate(-50%,-50%) scale(1.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('hovered');
      cursorDot.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// --- Card Tilt Effect ---
document.querySelectorAll('.skill-card, .highlight-card, .project-card, .cert-card, .edu-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});

// --- Parallax Shapes ---
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.shape').forEach((shape, i) => {
    const speed = (i + 1) * 0.03;
    shape.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// --- Contact Form ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #43E97B, #38D968)';
    setTimeout(() => {
      btn.innerHTML = 'Send Message →';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
