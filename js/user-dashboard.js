/**
 * STACKLY SPORTS CLUB - Athlete & User Member Dashboard Controller
 * Powers 12 Modules:
 * 1. Overview & Performance Telemetry
 * 2. My Profile & Kinetic Biometrics
 * 3. My Membership & VIP Benefits
 * 4. My Sports & Arena Access
 * 5. My Training Programs
 * 6. My Schedule & Live Class Timetable
 * 7. My Bookings & Court Reservations
 * 8. My Attendance & Check-In History
 * 9. My Events & Tournament Registrations
 * 10. My Progress & Kinetic Analytics
 * 11. Notifications & Messages
 * 12. Account Settings & Security
 */

(function (window, document) {
  'use strict';

  // 1. Role-Based Access Control Guard
  if (window.StacklyAuth && !StacklyAuth.requireAuth(['user', 'admin'])) { return; }

  let userAttendanceChart = null;
  let userProgressRadarChart = null;

  function initUserDashboard() {
    initDynamicUserInfo();
    initSidebar();
    initTabViews();
    initCharts();
    initProfileEditor();
    initBookingActions();
    initLogout();
  }

  function initDynamicUserInfo() {
    if (!window.StacklyAuth) return;
    const user = StacklyAuth.getCurrentUser();
    if (!user) return;

    document.querySelectorAll('.user-name-display, #sideUserName, #topbarUserName').forEach(el => {
      el.textContent = user.name;
    });

    document.querySelectorAll('.user-tier-display, #sideUserTier').forEach(el => {
      el.innerHTML = `<i class="fa-solid fa-crown text-accent"></i> ${user.tier || 'Elite Black Tier'}`;
    });

    document.querySelectorAll('.user-avatar-img, #sideUserAvatar, #topbarUserAvatar').forEach(el => {
      if (user.avatar) el.src = user.avatar;
    });

    // Populate profile inputs if present
    const nameInput = document.getElementById('userProfileName');
    const emailInput = document.getElementById('userProfileEmail');
    const phoneInput = document.getElementById('userProfilePhone');
    if (nameInput) nameInput.value = user.name;
    if (emailInput) emailInput.value = user.email;
    if (phoneInput && user.phone) phoneInput.value = user.phone;
  }

  function initSidebar() {
    const sidebar = document.getElementById('userSidebar') || document.querySelector('.dash-sidebar');
    const toggleBtn = document.getElementById('dashMenuToggle') || document.getElementById('dashMobileToggle');
    const closeBtn = document.getElementById('dashSidebarClose');
    const backdrop = document.getElementById('dashSidebarBackdrop');

    if (!sidebar) return;

    const openSidebar = () => {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.classList.add('dash-sidebar-open');
    };

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.classList.remove('dash-sidebar-open');
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (window.innerWidth > 992) {
          sidebar.classList.toggle('collapsed');
        } else {
          openSidebar();
        }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('.dash-nav-item, .dash-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeSidebar();
      });
    });

    // Make global for inline handlers
    window.openMobileSidebar = openSidebar;
    window.closeMobileSidebar = closeSidebar;
  }

  function initTabViews() {
    const navItems = document.querySelectorAll('.dash-nav-item[data-view], .dash-nav-link[data-view]');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-view');
        if (typeof switchView === 'function') {
          switchView(targetView);
        }
      });
    });
  }

  function initCharts() {
    const ctxAtt = document.getElementById('userAttendanceHistoryChart');
    if (ctxAtt && typeof Chart !== 'undefined') {
      const grad = ctxAtt.getContext('2d').createLinearGradient(0, 0, 0, 260);
      grad.addColorStop(0, 'rgba(255, 90, 31, 0.4)');
      grad.addColorStop(1, 'rgba(255, 90, 31, 0.0)');

      userAttendanceChart = new Chart(ctxAtt, {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          datasets: [{
            label: 'Sessions Attended',
            data: [5, 6, 4, 6, 5, 6],
            backgroundColor: '#FF5A1F',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#888894', font: { family: 'Inter' } }
            },
            y: {
              beginAtZero: true,
              max: 7,
              grid: { color: 'rgba(255,255,255,0.06)' },
              ticks: { color: '#888894', font: { family: 'Inter' } }
            }
          }
        }
      });
    }

    const ctxRadar = document.getElementById('userKineticRadarChart');
    if (ctxRadar && typeof Chart !== 'undefined') {
      userProgressRadarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: ['Top Speed', 'Aerobic VO2', 'Agility Score', 'Core Strength', 'Recovery Index'],
          datasets: [{
            label: 'My Kinetic Telemetry',
            data: [92, 86, 95, 88, 90],
            backgroundColor: 'rgba(255, 90, 31, 0.25)',
            borderColor: '#FF5A1F',
            borderWidth: 2,
            pointBackgroundColor: '#FF5A1F'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: '#888894', font: { family: 'Inter', size: 11 } } }
          },
          scales: {
            r: {
              angleLines: { color: 'rgba(255,255,255,0.08)' },
              grid: { color: 'rgba(255,255,255,0.08)' },
              pointLabels: { color: '#d1d1d6', font: { family: 'Inter', size: 11 } },
              ticks: { display: false, max: 100 }
            }
          }
        }
      });
    }
  }

  function initProfileEditor() {
    const form = document.getElementById('userProfileForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('userProfileName').value;
        const phoneVal = document.getElementById('userProfilePhone').value;

        if (window.StacklyAuth) {
          const cur = StacklyAuth.getCurrentUser();
          cur.name = nameVal;
          cur.phone = phoneVal;
          StacklyAuth.saveUser(cur);
          localStorage.setItem(StacklyAuth.KEYS.USER_NAME, nameVal);
          initDynamicUserInfo();
        }
        alert('Athlete Profile Successfully Saved.');
      });
    }
  }

  function initBookingActions() {
    document.querySelectorAll('.btn-cancel-booking').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Cancel this upcoming training reservation?')) {
          const row = btn.closest('tr');
          if (row) {
            row.style.opacity = '0.5';
            btn.textContent = 'Cancelled';
            btn.disabled = true;
          }
        }
      });
    });
  }

  function initLogout() {
    document.querySelectorAll('#dashLogoutBtn, .btn-user-logout').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Sign out of your athlete session?')) {
          if (window.StacklyAuth) {
            StacklyAuth.logout();
          } else {
            window.location.href = 'login.html';
          }
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserDashboard);
  } else {
    initUserDashboard();
  }

})(window, document);
