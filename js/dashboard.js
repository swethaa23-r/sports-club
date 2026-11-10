/**
 * STACKLY SPORTS CLUB - Unified Dashboard Content Action Redirector
 * 
 * Requirement:
 * - Sidebar / Side Menu navigation clicks are preserved and functional (view switching, mobile toggle, logout).
 * - All buttons and interactive action elements inside the dashboard workspace / views redirect to 404.html.
 */

(function initDashboardButtonRedirector() {
  'use strict';

  function isSideMenuElement(el) {
    if (!el) return false;
    // 1. Any element inside the side menu / sidebar
    if (el.closest('.dash-sidebar')) return true;
    // 2. The mobile sidebar open toggle button
    if (el.id === 'dashMenuToggle' || el.closest('#dashMenuToggle')) return true;
    // 3. The sidebar close button or backdrop overlay
    if (el.id === 'dashSidebarClose' || el.closest('#dashSidebarClose')) return true;
    if (el.id === 'dashSidebarBackdrop') return true;
    return false;
  }

  function handleActionClick(e) {
    // Detect buttons, action links, submit buttons, clickable cards, icon action buttons
    const actionEl = e.target.closest('button, .btn, a, [role="button"], input[type="submit"], input[type="button"], .dash-action-btn, .chart-action-btn, .dash-user-pill, .dash-notif-btn, .tier-select-card');
    if (!actionEl) return;

    // Side menu navigation, toggle, and logout are allowed
    if (isSideMenuElement(actionEl)) {
      return;
    }

    // All other buttons/actions inside dashboard views redirect to 404.html
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    window.location.href = '404.html';
  }

  // Intercept in capture phase so it runs before any inline onclick or component listeners
  document.addEventListener('click', handleActionClick, true);

  // Intercept any form submissions inside the dashboard content
  document.addEventListener('submit', function(e) {
    if (e.target.closest('.dash-sidebar')) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    window.location.href = '404.html';
  }, true);
})();
