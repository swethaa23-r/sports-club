/**
 * STACKLY – SPORTS CLUB
 * Comprehensive Interactive & UX Engine
 * Authentication, State Persistence, Animations & Accessibility
 */

/* ===================================================================
   UNIFIED ATHLETE AUTHENTICATION & STORAGE ENGINE
   Consolidated into js/auth.js (window.StacklyAuth / window.EliteAuth)
   =================================================================== */

/* ===================================================================
   MASTER INITIALIZATION
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (window.StacklyAuth && typeof window.StacklyAuth.init === 'function') {
    window.StacklyAuth.init();
  }
  initPreloader();
  initNavbar();
  if (window.StacklyAuth && typeof window.StacklyAuth.updateNavbarAuth === 'function') {
    window.StacklyAuth.updateNavbarAuth();
  }
  initMagneticButtons();
  initModals();
  initToast();
  initForms();
  initScheduleFilters();
  initCoachSearchAndFilter();
  initPricingToggle();
  initFaqAccordion();
  initActiveNavLink();
  initAnimations();
  initTestimonialCarousel();
  initEventAndProgramModals();
  initSportsHub();
  initProgramsPage();
});

/* ===================================================================
   1. BRANDED PRELOADER
   =================================================================== */
function initPreloader() {
  // Branded full-screen preloader engine managed by js/preloader.js
  if (typeof triggerHeroEntrance === 'function') {
    setTimeout(triggerHeroEntrance, 350);
  }
}

/* ===================================================================
   2. STICKY NAVBAR SCROLL STATE
   (Full-width mobile overlay & keyboard navigation managed by js/navigation.js)
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.elite-navbar') || document.querySelector('.stackly-navbar') || document.querySelector('.header');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ===================================================================
   3. NAVBAR AUTHENTICATION STATE
   (Synchronized dynamically by window.StacklyAuth.updateNavbarAuth())
   =================================================================== */
function initNavbarAuthState() {
  if (window.StacklyAuth && typeof window.StacklyAuth.updateNavbarAuth === 'function') {
    window.StacklyAuth.updateNavbarAuth();
  }
}

/* ===================================================================
   4. ACCURATE ACTIVE NAVIGATION INDICATOR
   =================================================================== */
function initActiveNavLink() {
  const currentPath = (window.location.pathname.split('/').pop() || 'index.html').split('#')[0].split('?')[0];
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const rawHref = link.getAttribute('href') || '';
    const cleanHref = rawHref.split('#')[0].split('?')[0];

    const isMatch = (cleanHref === currentPath) ||
                    (currentPath === '' && cleanHref === 'index.html') ||
                    (currentPath === 'signup.html' && cleanHref === 'login.html') ||
                    (['sports.html', 'schedule.html', 'trainers.html', 'coaches.html', 'courses.html'].includes(currentPath) && cleanHref === 'courses.html');

    if (isMatch) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ===================================================================
   5. MAGNETIC BUTTON MICRO-INTERACTIONS (DESKTOP PRECISION POINTER ONLY)
   =================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.innerWidth < 1025) return;

  const magnetics = document.querySelectorAll('.magnetic-btn');

  magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (typeof gsap !== 'undefined') {
        gsap.to(btn, {
          x: x * 0.18,
          y: y * 0.18,
          duration: 0.25,
          ease: 'power2.out'
        });
      }
    });

    btn.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    });
  });
}

/* ===================================================================
   6. CLEAN, ACCESSIBLE, PERFORMANT ANIMATIONS ENGINE
   =================================================================== */
function initAnimations() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Accessibility override
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initCounterAnimations();
    return;
  }

  initSubpageHeroEntrance();
  initSectionHeadingsScrollTrigger();
  initUniversalGridsScrollTrigger();
  initParallaxBackgrounds();
  initClipPathImageReveals();
  initCounterAnimations();

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768
    });
  }
}

function initSubpageHeroEntrance() {
  const subpageHero = document.querySelector('.subpage-hero, .sports-collage-hero');
  if (!subpageHero) return;

  const title = subpageHero.querySelector('.subpage-hero-title, .hero-title, h1');
  const breadcrumbs = subpageHero.querySelector('.breadcrumbs, .section-tag');
  const leadDesc = subpageHero.querySelector('.subpage-hero-desc, p.lead, .subpage-hero-content p, .section-subtitle');
  const ctaButtons = subpageHero.querySelectorAll('.subpage-hero-actions .btn, .subpage-hero-content .btn, .hero-actions .btn');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (breadcrumbs) {
    tl.fromTo(breadcrumbs, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45 }, 0.05);
  }

  if (title) {
    tl.fromTo(title, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15);
  }

  if (leadDesc && leadDesc !== title) {
    tl.fromTo(leadDesc, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35);
  }

  if (ctaButtons.length > 0) {
    tl.fromTo(ctaButtons, 
      { opacity: 0, y: 15, scale: 0.96 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.2)' }, 
      0.5
    );
  }
}

function initSectionHeadingsScrollTrigger() {
  if (typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const headings = document.querySelectorAll('.section-title, .subpage-section-title, .editorial-title');
  headings.forEach(heading => {
    if (heading.closest('.hero-section') || heading.closest('.subpage-hero')) return;

    const parent = heading.closest('.section-header') || heading.parentElement;
    const tag = parent ? parent.querySelector('.section-tag') : null;
    const desc = parent ? parent.querySelector('.section-subtitle, .section-desc') : null;

    ScrollTrigger.create({
      trigger: heading,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        if (tag) {
          gsap.fromTo(tag, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
        }
        gsap.fromTo(heading, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        if (desc && desc !== heading) {
          gsap.fromTo(desc, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.12, ease: 'power2.out' });
        }
      }
    });
  });
}

function initUniversalGridsScrollTrigger() {
  if (typeof ScrollTrigger === 'undefined') return;
  const isMobile = window.innerWidth <= 768;

  const gridRules = [
    { container: '.sports-categories-grid', items: '.sport-cat-card' },
    { container: '.sport-hub-grid', items: '.sport-hub-card' },
    { container: '.gallery-grid', items: '.gallery-card' },
    { container: '.coaches-grid, .coaches-roster-grid', items: '.coach-card, .coach-profile-card' },
    { container: '.events-grid', items: '.event-card' },
    { container: '.programs-grid', items: '.program-card' },
    { container: '.why-choose-grid', items: '.why-card' },
    { container: '.pricing-grid, .pricing-grid-4', items: '.pricing-card' },
    { container: '.values-grid-5', items: '.value-card' },
    { container: '.facilities-grid', items: '.facility-card' },
    { container: '.contact-cards-grid', items: '.contact-card' }
  ];

  gridRules.forEach(rule => {
    const cont = document.querySelector(rule.container);
    if (!cont) return;
    const cards = cont.querySelectorAll(rule.items);
    if (!cards.length) return;

    gsap.fromTo(cards,
      { y: isMobile ? 15 : 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.45 : 0.6,
        stagger: isMobile ? 0.04 : 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cont,
          start: 'top 86%',
          once: true
        }
      }
    );
  });
}

function initParallaxBackgrounds() {
  if (typeof ScrollTrigger === 'undefined') return;
  if (window.innerWidth < 1025) return; // Only desktop

  const parallaxImages = document.querySelectorAll('.hero-bg img, .subpage-hero-bg img, .cta-bg img');
  parallaxImages.forEach(img => {
    const parentSection = img.closest('section') || img.parentElement;
    if (!parentSection) return;

    gsap.to(img, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: parentSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      }
    });
  });
}

function initClipPathImageReveals() {
  if (typeof ScrollTrigger === 'undefined') return;

  const clipElements = document.querySelectorAll('.clip-reveal, .intro-image-wrapper, .head-coach-img-box');
  clipElements.forEach(item => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => item.classList.add('revealed')
    });
  });
}

function triggerHeroEntrance() {
  window.triggerHeroEntrance = triggerHeroEntrance;
  window.initSubpageHeroEntrance = initSubpageHeroEntrance;
  if (typeof gsap === 'undefined') return;

  const heroImg = document.querySelector('.hero-bg img');
  if (heroImg) {
    gsap.fromTo(heroImg, 
      { scale: 1.12, opacity: 0.5 },
      { scale: 1.02, opacity: 1, duration: 1.2, ease: 'power2.out' }
    );
  }

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    gsap.fromTo(heroTitle, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.2 }
    );
  }

  gsap.fromTo('.hero-animated-subtext, .hero-badge', 
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4 }
  );

  gsap.fromTo('.hero-lead, .hero-btn-group, .hero-scroll-indicator', 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 0.6 }
  );
}

function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-number, .stat-counter, .stat-number, .counter-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || el.textContent.replace(/[^0-9]/g, ''), 10) || 0;
        if (!target) return;

        const duration = 1600;
        const startTime = performance.now();

        const updateCount = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeProgress * target);
          el.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target.toLocaleString();
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}

/* ===================================================================
   7. MODAL SYSTEM
   =================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('.modal-close-btn, [data-modal-close]');
  const overlays = document.querySelectorAll('.modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);

      // Pre-fill fields if dynamic attributes exist
      const className = btn.getAttribute('data-class-name');
      const classCoach = btn.getAttribute('data-class-coach');
      if (className && targetModal) {
        const classInput = targetModal.querySelector('#resClassName');
        const coachInput = targetModal.querySelector('#resCoachName');
        if (classInput) classInput.value = className;
        if (coachInput) coachInput.value = classCoach || '';
      }

      if (targetModal) openModal(targetModal);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 80);
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ===================================================================
   8. TOAST NOTIFICATIONS
   =================================================================== */
function showToast(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const iconClass = type === 'error' ? 'fa-circle-xmark' : (type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-check');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <div class="toast-body">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 15);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 4200);
}

function initToast() {
  // Container initialized on-demand
}

/* ===================================================================
   9. FORMS SYSTEM (TOUR, CLASS RESERVATION, NEWSLETTER)
   =================================================================== */
function initForms() {
  // VIP Tour Booking Form - Script-based validation & 404 redirect
  const tourForm = document.getElementById('tourBookingForm');
  if (tourForm) {
    tourForm.setAttribute('novalidate', 'true');
    tourForm.noValidate = true;

    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = tourForm.querySelector('input[name="fullname"]');
      const emailInput = tourForm.querySelector('input[name="email"]');
      const phoneInput = tourForm.querySelector('input[name="phone"]');
      const dateInput = tourForm.querySelector('input[name="date"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const date = dateInput ? dateInput.value.trim() : '';

      // Clear previous error styles
      [nameInput, emailInput, phoneInput, dateInput].forEach(inp => {
        if (inp) {
          inp.classList.remove('is-invalid');
          inp.style.borderColor = '';
        }
      });

      let hasError = false;
      let errorMsg = '';

      if (!name) {
        hasError = true;
        if (nameInput) {
          nameInput.classList.add('is-invalid');
          nameInput.style.borderColor = '#ff3344';
          nameInput.focus();
        }
        errorMsg = 'Please enter your Full Name.';
      } else if (!email) {
        hasError = true;
        if (emailInput) {
          emailInput.classList.add('is-invalid');
          emailInput.style.borderColor = '#ff3344';
          emailInput.focus();
        }
        errorMsg = 'Please enter your Email Address.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        hasError = true;
        if (emailInput) {
          emailInput.classList.add('is-invalid');
          emailInput.style.borderColor = '#ff3344';
          emailInput.focus();
        }
        errorMsg = 'Please enter a valid Email Address.';
      } else if (!phone || phone.length < 8) {
        hasError = true;
        if (phoneInput) {
          phoneInput.classList.add('is-invalid');
          phoneInput.style.borderColor = '#ff3344';
          phoneInput.focus();
        }
        errorMsg = 'Please enter a valid Phone Number (minimum 8 digits).';
      } else if (!date) {
        hasError = true;
        if (dateInput) {
          dateInput.classList.add('is-invalid');
          dateInput.style.borderColor = '#ff3344';
          dateInput.focus();
        }
        errorMsg = 'Please select your Preferred Date for the VIP tour.';
      }

      if (hasError) {
        showToast('Required Details Missing', errorMsg, 'error');
        return;
      }

      // Valid: close modal and redirect to 404
      const modal = tourForm.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
      showToast('VIP Tour Confirmed', `Thank you, ${name}! Your VIP Arena walkthrough is confirmed. Our concierge will contact you.`);
      tourForm.reset();
    });

    // Clear error highlights on input
    tourForm.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => {
        inp.classList.remove('is-invalid');
        inp.style.borderColor = '';
      });
    });
  }

  // Class Reservation Form
  const classForm = document.getElementById('classReservationForm');
  if (classForm) {
    classForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const className = classForm.querySelector('#resClassName')?.value || 'Masterclass Session';
      const coachName = classForm.querySelector('#resCoachName')?.value || 'Master Coach';
      const modal = classForm.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';

      // Persist to athlete profile if logged in
      if (window.StacklyAuth && typeof window.StacklyAuth.bookSession === 'function') {
        window.StacklyAuth.bookSession({
          sport: 'multi',
          title: className,
          coach: coachName,
          date: 'Upcoming',
          time: 'Reserved'
        });
      }

      classForm.reset();
      showToast('Spot Confirmed!', `Your reservation for "${className}" with Coach ${coachName} has been confirmed. Added to your schedule.`);
    });
  }

  // General Contact Form (fallback only if page-specific validator is not present)
  const contactForm = document.getElementById('contactForm');
  if (contactForm && !document.getElementById('contactSuccessCard')) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[name="fullname"]')?.value || 'Athlete';
      contactForm.reset();
      showToast('Message Received', `Thank you, ${name}. Our athletic desk will respond within 4 business hours.`);
    });
  }

  // Newsletter / Insider Drop subscription - Script-based validation & 404 redirect
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.setAttribute('novalidate', 'true');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"], input[name="email"], input');
      const email = input ? input.value.trim() : '';
      if (!email) {
        showToast('Email Required', 'Please enter your email address to subscribe to Insider Drop.', 'error');
        if (input) {
          input.focus();
          input.style.borderColor = '#FF5A1F';
        }
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Invalid Email Format', 'Please provide a valid email address (e.g. champion@stackly.com).', 'error');
        if (input) {
          input.focus();
          input.style.borderColor = '#FF5A1F';
        }
        return;
      }
      showToast('Subscribed!', `Thank you for subscribing to Stackly Insider Drops (${email}).`);
      form.reset();
    });
  });

  // Global protection: Prevent any browser native HTML validation popup tooltips website-wide
  document.addEventListener('invalid', (e) => {
    e.preventDefault();
  }, true);
}

/* ===================================================================
   10. SCHEDULE FILTERS (DAY OF WEEK & SPORT CATEGORY)
   =================================================================== */
function initScheduleFilters() {
  const scheduleControls = document.querySelector('.schedule-controls');
  if (!scheduleControls) return;

  const dayTabs = scheduleControls.querySelectorAll('.day-tab-btn');
  const catPills = scheduleControls.querySelectorAll('.filter-pill');
  const classCards = document.querySelectorAll('.class-card');

  if (!dayTabs.length && !catPills.length) return;

  let activeDay = 'all';
  let activeCat = 'all';

  // Empty state container
  let emptyState = document.getElementById('scheduleEmptyState');
  if (!emptyState) {
    emptyState = document.createElement('div');
    emptyState.id = 'scheduleEmptyState';
    emptyState.className = 'schedule-empty-state';
    emptyState.style.display = 'none';
    emptyState.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); margin-top: 20px;">
        <i class="fa-regular fa-calendar-xmark" style="font-size: 2.4rem; color: var(--color-accent); margin-bottom: 14px;"></i>
        <h4 style="font-family: var(--font-athletic); font-size: 1.5rem; text-transform: uppercase; color: #fff; margin-bottom: 8px;">No Scheduled Sessions</h4>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 18px;">
          No masterclasses currently match this specific day and discipline filter.
        </p>
        <button class="btn btn-secondary btn-sm" id="btnResetScheduleFilters">Show All Classes</button>
      </div>
    `;
    const container = document.querySelector('.schedule-grid') || scheduleControls.parentElement;
    if (container) container.appendChild(emptyState);

    const resetBtn = emptyState.querySelector('#btnResetScheduleFilters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        dayTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-day') === 'all'));
        catPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'all'));
        activeDay = 'all';
        activeCat = 'all';
        applyFilters();
      });
    }
  }

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDay = tab.getAttribute('data-day');
      applyFilters();
    });
  });

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.getAttribute('data-category');
      applyFilters();
    });
  });

  function applyFilters() {
    let visibleCount = 0;

    classCards.forEach(card => {
      const cardDay = card.getAttribute('data-day') || '';
      const cardCat = card.getAttribute('data-category') || '';

      const matchDay = (activeDay === 'all' || cardDay.includes(activeDay));
      const matchCat = (activeCat === 'all' || cardCat === activeCat);

      if (matchDay && matchCat) {
        card.style.display = 'grid';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    if (window.lenis && typeof window.lenis.resize === 'function') {
      window.lenis.resize();
    }
  }
}

/* ===================================================================
   11. COACH SEARCH & CATEGORY FILTERING (trainers.html)
   =================================================================== */
function initCoachSearchAndFilter() {
  const searchInput = document.getElementById('coachSearchInput');
  const coachPills = document.querySelectorAll('[data-coach-filter]');
  const coachCards = document.querySelectorAll('#facultyCardsContainer .coach-profile-card, .coaches-roster-grid .coach-profile-card');
  const container = document.getElementById('facultyCardsContainer') || document.querySelector('.coaches-roster-grid');

  if (!coachCards.length) return;

  let activeFilter = 'all';
  let searchQuery = '';

  // Results count element
  let countDisplay = document.getElementById('coachResultsCount');

  // Empty state container
  let emptyState = document.getElementById('coachesEmptyState');
  if (!emptyState && container) {
    emptyState = document.createElement('div');
    emptyState.id = 'coachesEmptyState';
    emptyState.className = 'coaches-empty-state';
    emptyState.style.display = 'none';
    emptyState.style.gridColumn = '1 / -1';
    emptyState.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
        <i class="fa-solid fa-user-slash" style="font-size: 2.2rem; color: var(--color-accent); margin-bottom: 12px;"></i>
        <h4 style="font-family: var(--font-athletic); font-size: 1.5rem; color: #fff; text-transform: uppercase; margin-bottom: 8px;">No Coaches Matched</h4>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 16px;">
          Try searching for another discipline, coach name, or Olympic credential.
        </p>
        <button class="btn btn-secondary btn-sm" id="btnClearCoachSearch">Clear Search &amp; Filters</button>
      </div>
    `;
    container.appendChild(emptyState);

    const clearBtn = emptyState.querySelector('#btnClearCoachSearch');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        activeFilter = 'all';
        coachPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-coach-filter') === 'all'));
        filterCoaches();
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCoaches();
    });
  }

  coachPills.forEach(pill => {
    pill.addEventListener('click', () => {
      coachPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = (pill.getAttribute('data-coach-filter') || 'all').toLowerCase();
      filterCoaches();
    });
  });

  function filterCoaches() {
    let matchCount = 0;

    coachCards.forEach(card => {
      const cardCat = (card.getAttribute('data-coach-cat') || card.getAttribute('data-coach-sport') || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      let matchCat = false;
      if (activeFilter === 'all') {
        matchCat = true;
      } else if (activeFilter === 'strength') {
        matchCat = cardCat.includes('strength') || cardCat.includes('track') || cardCat.includes('combat') || cardCat.includes('speed');
      } else {
        matchCat = cardCat.includes(activeFilter);
      }

      const matchSearch = (!searchQuery || text.includes(searchQuery));

      if (matchCat && matchSearch) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = matchCount === 0 ? 'block' : 'none';
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${matchCount} coach${matchCount === 1 ? '' : 'es'}`;
    }

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    if (window.lenis && typeof window.lenis.resize === 'function') {
      window.lenis.resize();
    }
  }
}

/* ===================================================================
   12. PRICING SWITCHER (MONTHLY VS ANNUAL 20% DISCOUNT)
   =================================================================== */
function initPricingToggle() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;

  const cards = document.querySelectorAll('.pricing-card');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelAnnual = document.getElementById('labelAnnual');

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;

    if (labelMonthly && labelAnnual) {
      if (isAnnual) {
        labelAnnual.classList.add('active');
        labelMonthly.classList.remove('active');
      } else {
        labelMonthly.classList.add('active');
        labelAnnual.classList.remove('active');
      }
    }

    cards.forEach(card => {
      const amountEl = card.querySelector('.tier-price-box .amount');
      const noteEl = card.querySelector('.annual-billing-note');

      let targetVal;
      if (card.hasAttribute('data-price-monthly') && card.hasAttribute('data-price-annual')) {
        targetVal = isAnnual ? card.getAttribute('data-price-annual') : card.getAttribute('data-price-monthly');
      }

      if (amountEl && targetVal) {
        amountEl.textContent = targetVal;
      }

      if (noteEl) {
        const annualTotal = card.getAttribute('data-annual-total');
        if (isAnnual && annualTotal) {
          noteEl.textContent = `billed $${annualTotal}/yr (Save 20%)`;
        } else {
          noteEl.textContent = 'billed monthly, cancel anytime';
        }
      }
    });
  });
}

/* ===================================================================
   13. ACCESSIBLE FAQ ACCORDION (EXPAND / COLLAPSE)
   =================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  // Set initial state
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    if (!header || !body) return;

    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');

    if (item.classList.contains('active')) {
      header.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = (body.scrollHeight + 30) + 'px';
    } else {
      header.setAttribute('aria-expanded', 'false');
      body.style.maxHeight = null;
    }

    const toggleItem = () => {
      const isOpen = item.classList.contains('active');

      // Collapse other items
      items.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherHeader = other.querySelector('.faq-header');
          const otherBody = other.querySelector('.faq-body');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = (body.scrollHeight + 30) + 'px';
      }
    };

    header.addEventListener('click', toggleItem);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem();
      }
    });
  });

  window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.faq-item.active .faq-body');
    if (activeItem) {
      activeItem.style.maxHeight = (activeItem.scrollHeight + 30) + 'px';
    }
  }, { passive: true });
}

/* ===================================================================
   14. TESTIMONIAL CAROUSEL
   =================================================================== */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevTestimonialBtn');
  const nextBtn = document.getElementById('nextTestimonialBtn');
  const indicators = document.querySelectorAll('.carousel-indicators .indicator-dot');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
  }

  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => updateCarousel(i));
  });

  let autoTimer = setInterval(() => {
    updateCarousel(currentIndex + 1);
  }, 6500);

  const container = document.querySelector('.testimonial-carousel-container');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoTimer));
    container.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => updateCarousel(currentIndex + 1), 6500);
    });
  }
}

/* ===================================================================
   15. EVENT & PROGRAM REGISTRATION MODALS
   =================================================================== */
function initEventAndProgramModals() {
  // Event registration buttons
  const eventBtns = document.querySelectorAll('[data-event-name]');
  eventBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventName = btn.getAttribute('data-event-name');
      const eventDate = btn.getAttribute('data-event-date') || 'Tournament Date';
      const eventVenue = btn.getAttribute('data-event-venue') || 'Stackly';

      const modal = document.getElementById('eventRegModal');
      if (modal) {
        const titleInput = modal.querySelector('#eventModalTargetTitle') || modal.querySelector('#targetEventTitle');
        const metaInput = modal.querySelector('#eventModalTargetMeta') || modal.querySelector('#targetEventMeta');
        if (titleInput) titleInput.value = eventName;
        if (metaInput) metaInput.value = `${eventDate} • ${eventVenue}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const eventForm = document.getElementById('eventRegistrationForm');
  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = eventForm.querySelector('input[name="athlete_name"]')?.value || 'Athlete';
      const eventTitle = eventForm.querySelector('#eventModalTargetTitle')?.value || eventForm.querySelector('#targetEventTitle')?.value || 'Championship Tournament';
      const modal = document.getElementById('eventRegModal');
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';

      // Persist event to athlete profile
      if (window.StacklyAuth && typeof window.StacklyAuth.registerForEvent === 'function') {
        window.StacklyAuth.registerForEvent({
          title: eventTitle,
          venue: 'Stackly Championship Court'
        });
      }

      eventForm.reset();
      showToast('Registration Confirmed!', `Athlete ${name}, your spot for [${eventTitle}] is registered. Tournament check-in pass sent via email.`);
    });
  }

  // Program enrollment buttons
  const programBtns = document.querySelectorAll('[data-program-name]');
  programBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const progName = btn.getAttribute('data-program-name');
      const modal = document.getElementById('programEnrollModal');
      if (modal) {
        const progInput = modal.querySelector('#targetProgramName');
        if (progInput) progInput.value = progName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const progForm = document.getElementById('programEnrollmentForm');
  if (progForm) {
    progForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = progForm.querySelector('input[name="athlete_name"]')?.value || 'Athlete';
      const programName = progForm.querySelector('#targetProgramName')?.value || 'Training Program';
      const modal = document.getElementById('programEnrollModal');
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
      progForm.reset();
      showToast('Enrollment Application Received!', `Welcome ${name}! Your intake assessment for the [${programName}] has been assigned to a head coach.`);
    });
  }
}

/* ===================================================================
   16. SPORTS HUB FILTERS & DETAIL MODAL (sports.html)
   =================================================================== */
function initSportsHub() {
  const filterBtns = document.querySelectorAll('[data-sport-category-filter]');
  const sportCards = document.querySelectorAll('.sport-hub-card');

  if (filterBtns.length > 0 && sportCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-sport-category-filter');

        sportCards.forEach(card => {
          const cat = card.getAttribute('data-sport-group') || '';
          if (filter === 'all' || cat.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
        if (window.lenis && typeof window.lenis.resize === 'function') {
          window.lenis.resize();
        }
      });
    });
  }

  const detailBtns = document.querySelectorAll('[data-sport-modal-trigger]');
  const detailModal = document.getElementById('sportDetailModal');

  if (detailBtns.length > 0 && detailModal) {
    detailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = btn.getAttribute('data-sport-title') || 'Sport Discipline';
        const img = btn.getAttribute('data-sport-img') || '';
        const desc = btn.getAttribute('data-sport-desc') || '';
        const level = btn.getAttribute('data-sport-level') || 'All Levels';
        const avail = btn.getAttribute('data-sport-avail') || 'Daily';
        const specs = btn.getAttribute('data-sport-specs') || '';

        const modalTitle = detailModal.querySelector('#modalSportTitle');
        const modalImg = detailModal.querySelector('#modalSportImg');
        const modalDesc = detailModal.querySelector('#modalSportDesc');
        const modalLevel = detailModal.querySelector('#modalSportLevel');
        const modalAvail = detailModal.querySelector('#modalSportAvail');
        const modalSpecsContainer = detailModal.querySelector('#modalSportSpecs');

        if (modalTitle) modalTitle.textContent = title;
        if (modalImg) modalImg.src = img;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalLevel) modalLevel.textContent = level;
        if (modalAvail) modalAvail.textContent = avail;

        if (modalSpecsContainer && specs) {
          const specItems = specs.split('|');
          modalSpecsContainer.innerHTML = specItems.map(item => `
            <div class="modal-spec-item"><i class="fa-solid fa-check"></i> <span>${item.trim()}</span></div>
          `).join('');
        }

        const targetInput = detailModal.querySelector('#modalSelectedSportInput');
        if (targetInput) targetInput.value = title;

        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const sportBookingForm = document.getElementById('sportDetailBookingForm');
    if (sportBookingForm) {
      sportBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sportName = sportBookingForm.querySelector('#modalSelectedSportInput')?.value || 'Sport';
        const name = sportBookingForm.querySelector('input[name="athlete_name"]')?.value || 'Athlete';
        detailModal.classList.remove('active');
        document.body.style.overflow = '';
        sportBookingForm.reset();
        showToast('Trial Session Scheduled!', `Welcome, ${name}! Your private trial session for [${sportName}] is locked in.`);
      });
    }
  }
}

/* ===================================================================
   17. PROGRAMS & TRAINING CONTROLLER (programs.html)
   =================================================================== */
function initProgramsPage() {
  const progFilters = document.querySelectorAll('[data-program-tab-filter]');
  const progCards = document.querySelectorAll('.sport-prog-card');

  if (progFilters.length > 0 && progCards.length > 0) {
    progFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        progFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-program-tab-filter');

        progCards.forEach(card => {
          const group = card.getAttribute('data-prog-group') || '';
          if (filter === 'all' || group.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}
