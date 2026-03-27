/* ===================================================
   NOMADIC MONGOLIA — JavaScript
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // NAVBAR: scroll effect + hamburger
  // ===================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      document.querySelectorAll('.hamburger span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  };

  window.addEventListener('scroll', updateActiveLink);


  // ===================================================
  // HERO SLIDER
  // ===================================================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  const slideLabel = document.getElementById('slideLabel');
  const slideNum = document.getElementById('slideNum');
  const dotPrev = document.getElementById('dotPrev');
  const dotNext = document.getElementById('dotNext');
  const heroTitle = document.getElementById('heroTitle');
  const heroCards = document.querySelectorAll('.tour-card-sm');

  const slideData = [
    { label: 'Yurt', title: 'Authentic Ger <br/>Yurt' },
    { label: 'Horseback', title: 'Nomadic Horseback<br/>Experience' },
    { label: 'Stars', title: 'Under the<br/>Stars' },
  ];

  // Nomadic Horseback 

  let currentSlide = 0;
  let autoSlideTimer;

  const goToSlide = (idx) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    heroCards[currentSlide].classList.remove('active');

    currentSlide = (idx + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    heroCards[currentSlide].classList.add('active');

    slideLabel.textContent = slideData[currentSlide].label;
    slideNum.textContent = currentSlide + 1;
    heroTitle.innerHTML = slideData[currentSlide].title;
  };

  const startAutoSlide = () => {
    autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  };

  dotNext.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });
  dotPrev.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
  });

  startAutoSlide();


  // ===================================================
  // SEARCH TABS
  // ===================================================
  const stabs = document.querySelectorAll('.stab');
  stabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });


  // ===================================================
  // DESTINATION SLIDER
  // ===================================================
  const destSlider = document.getElementById('destSlider');
  const destPrev = document.getElementById('destPrev');
  const destNext = document.getElementById('destNext');

  if (destSlider && destPrev && destNext) {
    const destCardWidth = () => {
      const card = destSlider.querySelector('.dslide-card');
      return card ? card.offsetWidth + 20 : 280;
    };

    destNext.addEventListener('click', () => {
      destSlider.scrollBy({ left: destCardWidth(), behavior: 'smooth' });
    });
    destPrev.addEventListener('click', () => {
      destSlider.scrollBy({ left: -destCardWidth(), behavior: 'smooth' });
    });
  }


  // ===================================================
  // GUIDES SLIDER
  // ===================================================
  const guidesSlider = document.getElementById('guidesSlider');
  const guidePrev = document.getElementById('guidePrev');
  const guideNext = document.getElementById('guideNext');

  if (guidesSlider) {
    guideNext.addEventListener('click', () => {
      guidesSlider.scrollBy({ left: 240, behavior: 'smooth' });
    });
    guidePrev.addEventListener('click', () => {
      guidesSlider.scrollBy({ left: -240, behavior: 'smooth' });
    });
  }


  // ===================================================
  // BLOG SLIDER
  // ===================================================
  const blogSlider = document.getElementById('blogSlider');
  const blogPrev = document.getElementById('blogPrev');
  const blogNext = document.getElementById('blogNext');

  if (blogSlider) {
    blogNext.addEventListener('click', () => {
      blogSlider.scrollBy({ left: 360, behavior: 'smooth' });
    });
    blogPrev.addEventListener('click', () => {
      blogSlider.scrollBy({ left: -360, behavior: 'smooth' });
    });
  }


  // ===================================================
  // BOOKING FORM
  // ===================================================
  const submitBook = document.getElementById('submitBook');
  const formSuccess = document.getElementById('formSuccess');

  if (submitBook) {
    submitBook.addEventListener('click', (e) => {
      e.preventDefault();
      const form = document.getElementById('bookingForm');
      const inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
      let valid = true;

      inputs.forEach(inp => {
        if (!inp.value.trim()) {
          inp.style.borderColor = '#f44336';
          valid = false;
          setTimeout(() => inp.style.borderColor = '', 2000);
        }
      });

      if (valid) {
        submitBook.textContent = 'Sending…';
        submitBook.disabled = true;
        setTimeout(() => {
          formSuccess.classList.add('show');
          submitBook.textContent = 'Request Booking →';
          submitBook.disabled = false;
          form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
        }, 1200);
      }
    });
  }


  // ===================================================
  // CONTACT FORM
  // ===================================================
  const contactSubmit = document.getElementById('contactSubmit');

  if (contactSubmit) {
    contactSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      contactSubmit.textContent = 'Sending…';
      contactSubmit.disabled = true;
      setTimeout(() => {
        contactSubmit.textContent = '✓ Message Sent!';
        contactSubmit.style.background = '#0ea882';
        setTimeout(() => {
          contactSubmit.textContent = 'Send Message →';
          contactSubmit.style.background = '';
          contactSubmit.disabled = false;
        }, 3000);
      }, 1000);
    });
  }


  // ===================================================
  // NEWSLETTER FORM
  // ===================================================
  const nlSubmit = document.getElementById('nlSubmit');
  const nlEmail = document.getElementById('nlEmail');

  if (nlSubmit) {
    nlSubmit.addEventListener('click', () => {
      if (nlEmail.value.includes('@')) {
        nlSubmit.textContent = '✓';
        nlSubmit.style.background = '#0ea882';
        nlEmail.value = '';
        setTimeout(() => {
          nlSubmit.textContent = '→';
          nlSubmit.style.background = '';
        }, 3000);
      } else {
        nlEmail.style.borderColor = '#f44336';
        setTimeout(() => nlEmail.style.borderColor = '', 2000);
      }
    });
  }


  // ===================================================
  // SCROLL REVEAL
  // ===================================================
  const revealTargets = document.querySelectorAll(
    '.value-card, .dest-card, .trans-card, .guide-card, .blog-card, .dslide-card, .afeat, .stat'
  );

  revealTargets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));


  // ===================================================
  // SMOOTH ACTIVE STATE ON HERO CARDS
  // ===================================================
  heroCards.forEach((card, i) => {
    card.addEventListener('click', () => {
      goToSlide(i);
      resetAutoSlide();
    });
  });

  // ===================================================
  // KEYBOARD ACCESSIBILITY - HERO
  // ===================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goToSlide(currentSlide - 1); resetAutoSlide(); }
    if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); resetAutoSlide(); }
  });

  // ===================================================
  // LAZY LOAD IMAGES (Native)
  // ===================================================
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading (attribute already set)
  } else {
    // Fallback: load all images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.src;
    });
  }

});
