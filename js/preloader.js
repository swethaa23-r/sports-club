/**
 * STACKLY SPORTS CLUB - Cinematic Branded Preloader Engine
 * File: js/preloader.js
 * 
 * Features:
 * - Central STACKLY logo scale-up & fade-in with authentic brand preservation
 * - Centered circular orange SVG loading ring surrounding the logo
 * - Real loading percentage (0% to 100%) and athletic status progression
 * - High-performance animated orange progress bar with leading flare
 * - Cinematic stadium spotlights, floodlights array & arena silhouette
 * - Premium orange & white laser light sweep glinting across logo contours
 * - Staggered entrance for "STACKLY SPORTS CLUB" and tagline:
 *   "TRAIN HARD. PLAY STRONG. WIN TOGETHER."
 * - Intelligent session tracking (avoids repeated loading on internal navigation)
 * - Reload-aware: Hard reload or refreshing the page plays the full experience
 * - Critical asset & font synchronization with graceful failure tolerance
 * - Complete scroll prevention while active
 * - Smooth cinematic exit transition triggering GSAP hero animations
 * - Full prefers-reduced-motion accessibility & fail-safe safety timeout
 */

(function () {
  'use strict';

  // Prevent scrolling immediately before styles or scripts fully paint
  document.documentElement.classList.add('stackly-loading');
  if (document.body) {
    document.body.classList.add('stackly-loading');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('stackly-loading');
    });
  }

  function initStacklyPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
      document.documentElement.classList.remove('stackly-loading');
      if (document.body) document.body.classList.remove('stackly-loading');
      return;
    }

    // 1. Accessibility: Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      bypassPreloaderImmediately(preloader);
      return;
    }

    // 2. Navigation Intelligence:
    // If the user reloaded the page (F5 / browser reload) or requested via ?preloader=1, ALWAYS play full preloader.
    const urlParams = new URLSearchParams(window.location.search);
    const forcePreview = urlParams.has('preloader') || urlParams.has('preview');
    
    let isPageReload = false;
    try {
      const navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (navEntry && navEntry.type === 'reload') {
        isPageReload = true;
      } else if (window.performance && window.performance.navigation && window.performance.navigation.type === 1) {
        isPageReload = true;
      }
    } catch (e) {}

    const hasSeenPreloader = sessionStorage.getItem('stackly_preloader_seen') === 'true';

    // If it's an internal link navigation (not a fresh reload) AND not forcePreview, dismiss quickly.
    if (hasSeenPreloader && !isPageReload && !forcePreview) {
      fastInternalDismissal(preloader);
      return;
    }

    // 3. Elements Selection
    const counterEl = document.getElementById('preloaderCounter');
    const barEl = document.getElementById('preloaderBar');
    const circleProgressEl = document.getElementById('preloaderCircleProgress');
    const stageLabelEl = document.getElementById('preloaderStage');
    const preloaderCore = preloader.querySelector('.preloader-core');
    const logoWrapper = preloader.querySelector('.preloader-logo-wrapper');
    const titleStackly = preloader.querySelector('.brand-text-stackly');
    const titleClub = preloader.querySelector('.brand-text-club');
    const taglineWords = preloader.querySelectorAll('.preloader-tagline .tagline-word, .preloader-tagline .tagline-sep');

    // SVG circle circumference for r = 124 is ~780px
    const CIRCLE_CIRCUMFERENCE = 780;

    // State Variables & Extended Cinematic Timing (~3.2s runtime)
    let currentPercent = 0;
    let targetPercent = 8;
    let isDismissed = false;
    let animFrameId = null;
    const startTime = performance.now();
    const MIN_CINEMATIC_DURATION = 3200; // Increased to 3.2 seconds for full cinematic impact

    // Stop Lenis smooth scrolling while preloader is active
    stopScrollEngine();

    // 4. Initial GSAP / CSS Entrance Sequences
    playEntranceSequence();

    function playEntranceSequence() {
      if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        if (logoWrapper) {
          tl.fromTo(logoWrapper, 
            { scale: 0.84, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.15)' },
            0.1
          );
        }

        if (titleStackly && titleClub) {
          tl.fromTo([titleStackly, titleClub],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.14, ease: 'power3.out' },
            0.35
          );
        }

        if (taglineWords && taglineWords.length) {
          tl.fromTo(taglineWords,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
            0.6
          );
        }
      } else {
        // CSS fallback if GSAP is not present
        if (logoWrapper) {
          logoWrapper.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
          logoWrapper.style.transform = 'scale(1)';
          logoWrapper.style.opacity = '1';
        }
      }
    }

    // 5. Update UI based on progress
    function updateProgressUI(pct) {
      const rounded = Math.min(100, Math.floor(pct));
      
      // Update Numeric Counter
      if (counterEl) {
        counterEl.textContent = rounded;
      }

      // Update Horizontal Bar
      if (barEl) {
        barEl.style.width = `${pct}%`;
      }

      // Update Circular Orange Progress Ring
      if (circleProgressEl) {
        const offset = Math.max(0, CIRCLE_CIRCUMFERENCE - (CIRCLE_CIRCUMFERENCE * (pct / 100)));
        circleProgressEl.style.strokeDashoffset = offset;
      }

      // Update Athletic Stage Labels
      if (stageLabelEl) {
        if (rounded < 28) {
          stageLabelEl.textContent = 'INITIALIZING ARENA';
        } else if (rounded < 65) {
          stageLabelEl.textContent = 'CALIBRATING ATHLETIC SUITE';
        } else if (rounded < 88) {
          stageLabelEl.textContent = 'PREPARING CHAMPIONSHIP ACCESS';
        } else if (rounded < 100) {
          stageLabelEl.textContent = 'FINALIZING ACCESS';
        } else {
          stageLabelEl.textContent = 'READY TO WIN • ACCESS GRANTED';
          stageLabelEl.style.color = '#FF5A1F';
        }
      }
    }

    // 6. Smooth Animation Interpolator Loop with Cinematic Pacing
    function progressTick(now) {
      if (isDismissed) return;

      const elapsed = now - startTime;
      
      // Time-based milestone target to ensure smooth, un-rushed cinematic curve
      let timeBasedTarget = 0;
      if (elapsed < 800) {
        // 0s - 0.8s: Ease to 28%
        timeBasedTarget = (elapsed / 800) * 28;
      } else if (elapsed < 1800) {
        // 0.8s - 1.8s: Ease from 28% to 64%
        timeBasedTarget = 28 + ((elapsed - 800) / 1000) * 36;
      } else if (elapsed < 2600) {
        // 1.8s - 2.6s: Ease from 64% to 88%
        timeBasedTarget = 64 + ((elapsed - 1800) / 800) * 24;
      } else if (elapsed < MIN_CINEMATIC_DURATION) {
        // 2.6s - 3.2s: Ease from 88% to 100%
        timeBasedTarget = 88 + ((elapsed - 2600) / (MIN_CINEMATIC_DURATION - 2600)) * 12;
      } else {
        timeBasedTarget = 100;
      }

      // Desired target is max of real asset loading and time-based cinematic progression
      const effectiveTarget = Math.min(100, Math.max(targetPercent, timeBasedTarget));

      // Interpolate towards effectiveTarget smoothly
      const diff = effectiveTarget - currentPercent;
      if (diff > 0.05) {
        const step = Math.max(0.2, diff * 0.12);
        currentPercent += step;
        if (currentPercent > effectiveTarget) currentPercent = effectiveTarget;
      }

      updateProgressUI(currentPercent);

      // Check if we reached 100% and completed minimum duration
      if (currentPercent >= 99.8 && elapsed >= MIN_CINEMATIC_DURATION) {
        currentPercent = 100;
        updateProgressUI(100);
        // Short pause at 100% for satisfaction before transition
        setTimeout(executePreloaderExit, 240);
        return;
      }

      animFrameId = requestAnimationFrame(progressTick);
    }

    animFrameId = requestAnimationFrame(progressTick);

    // 7. Track Real Page Assets & Font Readiness
    trackPageResources((progressIncrement) => {
      targetPercent = Math.max(targetPercent, progressIncrement);
    });

    // 8. Resource Tracking Logic
    function trackPageResources(onMilestone) {
      let loadedMilestone = 20;
      onMilestone(loadedMilestone);

      // A. Document interactive milestone
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        loadedMilestone = Math.max(loadedMilestone, 40);
        onMilestone(loadedMilestone);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          loadedMilestone = Math.max(loadedMilestone, 40);
          onMilestone(loadedMilestone);
        }, { once: true });
      }

      // B. Critical Web Fonts (Bebas Neue, Oswald, Inter)
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          loadedMilestone = Math.max(loadedMilestone, 60);
          onMilestone(loadedMilestone);
        }).catch(() => {
          loadedMilestone = Math.max(loadedMilestone, 60);
          onMilestone(loadedMilestone);
        });
      } else {
        loadedMilestone = Math.max(loadedMilestone, 60);
        onMilestone(loadedMilestone);
      }

      // C. High Priority Hero Images & Logo
      const criticalImgs = Array.from(document.querySelectorAll(
        '.hero-bg img, .hero-section img, .subpage-hero img, [fetchpriority="high"], .preloader-logo-img'
      ));

      if (criticalImgs.length > 0) {
        const imgPromises = criticalImgs.map(img => {
          if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
            setTimeout(resolve, 2000);
          });
        });

        Promise.allSettled(imgPromises).then(() => {
          loadedMilestone = Math.max(loadedMilestone, 85);
          onMilestone(loadedMilestone);
        });
      } else {
        loadedMilestone = Math.max(loadedMilestone, 85);
        onMilestone(loadedMilestone);
      }

      // D. Window Load (Full document + styles + scripts)
      if (document.readyState === 'complete') {
        onMilestone(100);
      } else {
        window.addEventListener('load', () => {
          onMilestone(100);
        }, { once: true });
      }
    }

    // 9. Fail-Safe Hard Timeout
    const HARD_TIMEOUT = 4500;
    setTimeout(() => {
      if (!isDismissed) {
        targetPercent = 100;
        currentPercent = 100;
        updateProgressUI(100);
        executePreloaderExit();
      }
    }, HARD_TIMEOUT);

    // 10. Cinematic Exit Orchestration
    function executePreloaderExit() {
      if (isDismissed) return;
      isDismissed = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);

      // Mark session so internal navigation does not replay full intro
      try {
        sessionStorage.setItem('stackly_preloader_seen', 'true');
      } catch (e) {}

      if (typeof gsap !== 'undefined') {
        const exitTl = gsap.timeline({
          onComplete: () => {
            finalizePreloaderDismissal(preloader);
          }
        });

        // Slight scale-up and fade of inner core
        if (preloaderCore) {
          exitTl.to(preloaderCore, {
            scale: 1.05,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
          }, 0);
        }

        // Smooth background fade
        exitTl.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, 0.1);

      } else {
        // Standard CSS transition exit
        preloader.classList.add('loaded');
        setTimeout(() => {
          finalizePreloaderDismissal(preloader);
        }, 600);
      }
    }

    // 11. Final Cleanup & Hero Entrance Trigger
    function finalizePreloaderDismissal(preloaderEl) {
      preloaderEl.classList.add('loaded');
      preloaderEl.style.display = 'none';
      preloaderEl.style.pointerEvents = 'none';
      preloaderEl.setAttribute('aria-hidden', 'true');

      // Release scroll locks
      document.documentElement.classList.remove('stackly-loading');
      if (document.body) {
        document.body.classList.remove('stackly-loading');
        document.body.classList.add('page-ready');
      }

      // Resume Lenis smooth scroll
      resumeScrollEngine();

      // Trigger GSAP Homepage Hero Animations
      if (typeof window.triggerHeroEntrance === 'function') {
        window.triggerHeroEntrance();
      }

      // Trigger Subpage Hero Animations if on subpage
      if (typeof window.initSubpageHeroEntrance === 'function') {
        window.initSubpageHeroEntrance();
      }

      // Refresh AOS if loaded
      if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
        AOS.refresh();
      }

      // Dispatch global custom event for other modules
      window.dispatchEvent(new CustomEvent('stackly:preloaderComplete'));
    }

    // 12. Fast Dismissal for Internal Navigation
    function fastInternalDismissal(preloaderEl) {
      stopScrollEngine();
      
      const dismissFast = () => {
        if (preloaderEl.classList.contains('loaded')) return;
        
        preloaderEl.style.transition = 'opacity 0.22s ease-out';
        preloaderEl.style.opacity = '0';
        
        setTimeout(() => {
          finalizePreloaderDismissal(preloaderEl);
        }, 220);
      };

      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(dismissFast, 60);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(dismissFast, 60);
        }, { once: true });
      }

      setTimeout(dismissFast, 350);
    }

    // 13. Immediate Bypass for Reduced Motion
    function bypassPreloaderImmediately(preloaderEl) {
      preloaderEl.classList.add('loaded');
      preloaderEl.style.display = 'none';
      preloaderEl.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('stackly-loading');
      if (document.body) {
        document.body.classList.remove('stackly-loading');
        document.body.classList.add('page-ready');
      }
      resumeScrollEngine();
      if (typeof window.triggerHeroEntrance === 'function') window.triggerHeroEntrance();
      if (typeof window.initSubpageHeroEntrance === 'function') window.initSubpageHeroEntrance();
    }

    // 14. Scroll Engine Control Helpers
    function stopScrollEngine() {
      if (window.StacklyScroll && typeof window.StacklyScroll.stop === 'function') {
        window.StacklyScroll.stop();
      } else if (window.lenis && typeof window.lenis.stop === 'function') {
        window.lenis.stop();
      }
    }

    function resumeScrollEngine() {
      if (window.StacklyScroll && typeof window.StacklyScroll.start === 'function') {
        window.StacklyScroll.start();
      } else if (window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
    }

    // 15. Handle Browser Back-Forward Cache (bfcache)
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        preloader.classList.add('loaded');
        preloader.style.display = 'none';
        document.documentElement.classList.remove('stackly-loading');
        if (document.body) document.body.classList.remove('stackly-loading');
        resumeScrollEngine();
      }
    });
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStacklyPreloader);
  } else {
    initStacklyPreloader();
  }

  // Expose Global Testing & Control API
  window.dismissStacklyPreloader = function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('loaded');
      preloader.style.display = 'none';
      document.documentElement.classList.remove('stackly-loading');
      if (document.body) document.body.classList.remove('stackly-loading');
    }
  };

  window.replayStacklyPreloader = function () {
    try {
      sessionStorage.removeItem('stackly_preloader_seen');
    } catch (e) {}
    window.location.search = '?preloader=1';
  };
})();
