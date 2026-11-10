/**
 * STACKLY SPORTS CLUB - Official Lenis Smooth Scrolling Engine
 * 
 * Synchronized with GSAP ScrollTrigger, AOS Animation Framework,
 * Full-Width Mobile Menus, and Modal Overlays.
 */

(function (window, document) {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lenisInstance = null;

  function initLenis() {
    // If Lenis is not available or reduced motion is preferred, provide a safe fallback
    if (typeof Lenis === 'undefined' || prefersReducedMotion) {
      window.StacklyScroll = {
        lenis: null,
        stop() {},
        start() {},
        scrollTo(target) {
          if (typeof target === 'string') {
            const el = document.querySelector(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      return;
    }

    try {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.8,
        infinite: false
      });

      // Synchronize with GSAP ScrollTrigger if present
      if (typeof ScrollTrigger !== 'undefined') {
        lenisInstance.on('scroll', ScrollTrigger.update);

        if (typeof gsap !== 'undefined') {
          gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        }
      } else {
        // Fallback requestAnimationFrame loop if GSAP ticker is absent
        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      // Synchronize with AOS if present
      if (typeof AOS !== 'undefined') {
        lenisInstance.on('scroll', () => {
          AOS.refresh();
        });
      }

      // Smooth anchor link navigation
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (!href || href === '#' || this.hasAttribute('data-modal-target') || this.hasAttribute('role')) {
            return;
          }
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            // If mobile menu is open, it will close first
            if (document.body.classList.contains('menu-open')) {
              window.StacklyNav && window.StacklyNav.close();
            }
            if (lenisInstance) {
              if (lenisInstance.isStopped) {
                lenisInstance.start();
              }
              try {
                lenisInstance.scrollTo(target, {
                  offset: -85,
                  duration: 1.2,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
              } catch (err) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });

      // Prevent Lenis scroll hijacking on internal scrollable containers
      const preventSelectors = [
        '.mobile-nav',
        '.modal-dialog',
        '.dash-sidebar',
        '.table-responsive',
        '.comparison-table-wrap',
        '.dash-main'
      ];

      preventSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.setAttribute('data-lenis-prevent', 'true');
        });
      });

      // Expose globally
      window.lenis = lenisInstance;
      window.StacklyScroll = {
        lenis: lenisInstance,
        stop() {
          if (lenisInstance) lenisInstance.stop();
        },
        start() {
          if (lenisInstance) lenisInstance.start();
        },
        scrollTo(target, options) {
          if (lenisInstance) {
            lenisInstance.scrollTo(target, Object.assign({ offset: -85, duration: 1.2 }, options));
          }
        }
      };

    } catch (err) {
      console.warn('Lenis Smooth Scroll failed to initialize:', err);
    }
  }

  // Initialize once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
  } else {
    initLenis();
  }

})(window, document);
