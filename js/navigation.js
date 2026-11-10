/**
 * STACKLY SPORTS CLUB - Full-Width Mobile Navigation Controller
 * 
 * Features:
 * - 100vw x 100dvh Full-Screen Overlay
 * - GSAP-powered staggered link reveals and smooth dismissal
 * - Background scroll freeze (body & html locks + Lenis pause/resume)
 * - Safe event debouncing to prevent multiple open/close glitches
 * - Keyboard Escape & link-click auto-close
 * - Prevents page load flickering
 */

(function (window, document) {
  'use strict';

  let isOpen = false;
  let isAnimating = false;

  const StacklyNav = {
    init() {
      const menuToggle = document.querySelector('.menu-toggle');
      const mobileNav = document.querySelector('.mobile-nav');

      if (!mobileNav) return;

      // Ensure proper attributes
      mobileNav.setAttribute('data-lenis-prevent', 'true');
      mobileNav.setAttribute('role', 'dialog');
      mobileNav.setAttribute('aria-modal', 'true');
      mobileNav.setAttribute('aria-label', 'Main Mobile Menu');

      // 1. Ensure close button exists
      let closeBtn = mobileNav.querySelector('.mobile-nav-close');
      if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.id = 'mobileNavCloseBtn';
        closeBtn.setAttribute('aria-label', 'Close Navigation Menu');
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        
        let header = mobileNav.querySelector('.mobile-nav-header');
        if (header) {
          header.appendChild(closeBtn);
        } else {
          mobileNav.insertBefore(closeBtn, mobileNav.firstChild);
        }
      }

      // 2. Hamburger button click
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'mobileNav');

        menuToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isOpen) {
            this.close();
          } else {
            this.open();
          }
        });
      }

      // 3. Close button click
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        });
      }

      // 4. Auto-close when clicking any link inside mobile navigation
      mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          this.close();
        });
      });

      // 5. Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
          this.close();
        }
      });

      // 6. Close on resize if returning to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && isOpen) {
          this.close(true); // immediate close
        }
      }, { passive: true });

      // Expose globally
      window.StacklyNav = this;
    },

    open() {
      if (isOpen || isAnimating) return;
      const mobileNav = document.querySelector('.mobile-nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (!mobileNav) return;

      isAnimating = true;
      isOpen = true;

      // 1. Lock body & HTML scrolling
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');

      // 2. Pause Lenis smooth scrolling if active
      if (window.StacklyScroll && typeof window.StacklyScroll.stop === 'function') {
        window.StacklyScroll.stop();
      }

      // 3. Update ARIA state
      if (menuToggle) {
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
      }

      mobileNav.classList.add('open');

      // 4. GSAP Stagger Animation
      if (typeof gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false;
          }
        });

        tl.fromTo(mobileNav, 
          { opacity: 0, scale: 0.98 }, 
          { opacity: 1, scale: 1, duration: 0.32, ease: 'power2.out' }
        );

        const links = mobileNav.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .btn');
        if (links.length) {
          tl.fromTo(links, 
            { y: 22, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.035, ease: 'power2.out', clearProps: 'transform,opacity' },
            '-=0.18'
          );
        }
      } else {
        mobileNav.style.opacity = '1';
        mobileNav.style.pointerEvents = 'auto';
        isAnimating = false;
      }
    },

    close(immediate = false) {
      if (!isOpen || isAnimating) return;
      const mobileNav = document.querySelector('.mobile-nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (!mobileNav) return;

      isAnimating = true;

      const finishClosing = () => {
        mobileNav.classList.remove('open');
        mobileNav.style.opacity = '';
        mobileNav.style.pointerEvents = '';
        mobileNav.style.transform = '';

        // Restore scrolling
        document.documentElement.classList.remove('menu-open');
        document.body.classList.remove('menu-open');

        // Resume Lenis smooth scroll
        if (window.StacklyScroll && typeof window.StacklyScroll.start === 'function') {
          window.StacklyScroll.start();
        }

        if (menuToggle) {
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }

        isOpen = false;
        isAnimating = false;
      };

      if (immediate || typeof gsap === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finishClosing();
      } else {
        gsap.to(mobileNav, {
          opacity: 0,
          scale: 0.98,
          duration: 0.24,
          ease: 'power2.in',
          onComplete: finishClosing
        });
      }
    }
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StacklyNav.init());
  } else {
    StacklyNav.init();
  }

})(window, document);
