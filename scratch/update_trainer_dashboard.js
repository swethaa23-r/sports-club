const fs = require('fs');
const path = require('path');

// 1. UPDATE trainer-dashboard.html
const trainerHtmlPath = path.join(__dirname, '../trainer-dashboard.html');
let html = fs.readFileSync(trainerHtmlPath, 'utf8');

// Insert Manage Bookings nav button after My Schedule
const oldScheduleNav = `<!-- 4. My Schedule -->
        <button class="dash-nav-link" data-view="view-schedule" id="navTrainerSchedule">
          <div class="dash-nav-item-left">
            <i class="fa-regular fa-calendar-check"></i>
            <span>My Schedule</span>
          </div>
        </button>`;

const newScheduleAndBookingsNav = `<!-- 4. My Schedule -->
        <button class="dash-nav-link" data-view="view-schedule" id="navTrainerSchedule">
          <div class="dash-nav-item-left">
            <i class="fa-regular fa-calendar-check"></i>
            <span>Manage Schedule</span>
          </div>
        </button>

        <!-- 5. Manage Bookings -->
        <button class="dash-nav-link" data-view="view-bookings" id="navTrainerBookings">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-ticket"></i>
            <span>Manage Bookings</span>
          </div>
          <span class="badge" style="background:rgba(46,213,115,0.2); color:#2ed573; font-size:0.7rem; border-radius:12px; padding:2px 8px;">3 New</span>
        </button>`;

if (!html.includes('id="navTrainerBookings"')) {
  html = html.replace(oldScheduleNav, newScheduleAndBookingsNav);
}

// Add the view-bookings section right before view-settings
const viewBookingsSection = `
      <!-- ===============================================================
           VIEW: MANAGE BOOKINGS & TRAINEE APPOINTMENTS
           =============================================================== -->
      <section class="dash-view-section" id="view-bookings" style="display:none;">
        <div class="dash-section-header">
          <div>
            <h2 class="dash-section-title">MANAGE BOOKINGS &amp; ATHLETE APPOINTMENTS</h2>
            <p class="dash-section-desc">Review reserved training sessions, allocate pitch lanes, confirm 1-on-1 consultations, and manage athlete schedules.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="showToast('Roster Synced', 'All booked session rosters synchronized with arena gates.')">
            <i class="fa-solid fa-arrows-rotate"></i> Sync Arena Gates
          </button>
        </div>

        <!-- Bookings KPI Grid -->
        <div class="dash-kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">Active Bookings</span>
              <div class="dash-kpi-icon"><i class="fa-solid fa-calendar-check"></i></div>
            </div>
            <div class="dash-kpi-value">38</div>
            <div class="dash-kpi-delta positive"><i class="fa-solid fa-arrow-trend-up"></i> +8 This Week</div>
          </div>
          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">Pending Approval</span>
              <div class="dash-kpi-icon" style="background:rgba(255,171,0,0.15); color:#ffab00;"><i class="fa-solid fa-clock"></i></div>
            </div>
            <div class="dash-kpi-value" id="kpiPendingBookings">3</div>
            <div class="dash-kpi-delta" style="color:#ffab00;">Requires Coach Review</div>
          </div>
          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">Today's Sessions</span>
              <div class="dash-kpi-icon" style="background:rgba(46,213,115,0.15); color:#2ed573;"><i class="fa-solid fa-stopwatch"></i></div>
            </div>
            <div class="dash-kpi-value">6</div>
            <div class="dash-kpi-delta positive"><i class="fa-solid fa-check"></i> 4 Completed</div>
          </div>
          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">Lane Utilization</span>
              <div class="dash-kpi-icon"><i class="fa-solid fa-gauge-high"></i></div>
            </div>
            <div class="dash-kpi-value">92%</div>
            <div class="dash-kpi-delta positive">Peak Performance</div>
          </div>
        </div>

        <!-- Bookings Filter & Table Card -->
        <div class="dash-table-card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
            <div class="dash-search-box" style="display:flex; min-width:240px;">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="bookingSearchInput" class="dash-search-input" placeholder="Search athlete or session...">
            </div>
            <div style="display:flex; gap:10px;">
              <select id="bookingStatusFilter" class="form-select" style="width:auto; padding:6px 12px; font-size:0.82rem;">
                <option value="all">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div class="table-responsive">
            <table class="dash-table" id="trainerBookingsTable">
              <thead>
                <tr>
                  <th>Athlete Dossier</th>
                  <th>Discipline / Session</th>
                  <th>Date &amp; Time</th>
                  <th>Arena Facility</th>
                  <th>Status</th>
                  <th style="text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="font-weight:700; color:#fff;">Jordan Hayes</div>
                    <div style="font-size:0.75rem; color:#8c8c98;">athlete@stackly.com &bull; Elite Black Pass</div>
                  </td>
                  <td style="color:#fff; font-weight:600;">High-Velocity Strike Mechanics</td>
                  <td style="color:var(--color-accent); font-weight:600;">Tomorrow 07:30 AM</td>
                  <td>Main Championship Pitch A</td>
                  <td><span class="status-pill active"><i class="fa-solid fa-check"></i> Confirmed</span></td>
                  <td style="text-align:right;">
                    <button class="btn btn-outline btn-xs" onclick="rescheduleBooking(this, 'Jordan Hayes')" style="margin-right:4px;">Reschedule</button>
                    <button class="btn btn-outline btn-xs" onclick="cancelTrainerBooking(this, 'Jordan Hayes')" style="color:#ff4757;">Cancel</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="font-weight:700; color:#fff;">Serena Vance</div>
                    <div style="font-size:0.75rem; color:#8c8c98;">serena.v@example.com &bull; Platinum Elite</div>
                  </td>
                  <td style="color:#fff; font-weight:600;">Grand Slam Topspin &amp; Volley Clinic</td>
                  <td style="color:var(--color-accent); font-weight:600;">Thursday 09:00 AM</td>
                  <td>Laykold Grandstand Court 1</td>
                  <td><span class="status-pill pending"><i class="fa-solid fa-clock"></i> Pending Review</span></td>
                  <td style="text-align:right;">
                    <button class="btn btn-primary btn-xs" onclick="approveBooking(this, 'Serena Vance')" style="margin-right:4px;">Approve</button>
                    <button class="btn btn-outline btn-xs" onclick="cancelTrainerBooking(this, 'Serena Vance')" style="color:#ff4757;">Decline</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="font-weight:700; color:#fff;">Liam Sterling</div>
                    <div style="font-size:0.75rem; color:#8c8c98;">liam.s@example.com &bull; Gold Pro</div>
                  </td>
                  <td style="color:#fff; font-weight:600;">Olympic Power Cleans &amp; Hypertrophy</td>
                  <td style="color:var(--color-accent); font-weight:600;">Friday 06:00 AM</td>
                  <td>Strength Lab &amp; Recovery Spa</td>
                  <td><span class="status-pill active"><i class="fa-solid fa-check"></i> Confirmed</span></td>
                  <td style="text-align:right;">
                    <button class="btn btn-outline btn-xs" onclick="rescheduleBooking(this, 'Liam Sterling')" style="margin-right:4px;">Reschedule</button>
                    <button class="btn btn-outline btn-xs" onclick="cancelTrainerBooking(this, 'Liam Sterling')" style="color:#ff4757;">Cancel</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="font-weight:700; color:#fff;">Aria Takahashi</div>
                    <div style="font-size:0.75rem; color:#8c8c98;">aria.t@example.com &bull; Silver Club</div>
                  </td>
                  <td style="color:#fff; font-weight:600;">50M Natatorium Freestyle Agility</td>
                  <td style="color:#8c8c98;">Yesterday 08:00 AM</td>
                  <td>Olympic 50M Swimming Pool</td>
                  <td><span class="status-pill completed"><i class="fa-solid fa-check-double"></i> Completed</span></td>
                  <td style="text-align:right;">
                    <button class="btn btn-outline btn-xs" onclick="showToast('Session Logged', 'Aria Takahashi attendance logged.')">View Log</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
`;

if (!html.includes('id="view-bookings"')) {
  html = html.replace(
    `<section class="dash-view-section" id="view-settings"`,
    `${viewBookingsSection}\n      <section class="dash-view-section" id="view-settings"`
  );
}

// Ensure backdrop element exists for mobile drawer
if (!html.includes('id="dashSidebarBackdrop"')) {
  html = html.replace(
    `<div class="toast-container"`,
    `<div class="dash-sidebar-backdrop" id="dashSidebarBackdrop"></div>\n  <div class="toast-container"`
  );
}

// Add global handlers for bookings
const bookingScriptHandlers = `
  <script>
    function approveBooking(btn, athleteName) {
      const row = btn.closest('tr');
      const statusCell = row.querySelector('.status-pill');
      if (statusCell) {
        statusCell.className = 'status-pill active';
        statusCell.innerHTML = '<i class="fa-solid fa-check"></i> Confirmed';
      }
      btn.outerHTML = '<button class="btn btn-outline btn-xs" onclick="rescheduleBooking(this, \\'' + athleteName + '\\')" style="margin-right:4px;">Reschedule</button>';
      showToast('Booking Approved', athleteName + ' appointment confirmed. Arena lane notified.');
      const pendingEl = document.getElementById('kpiPendingBookings');
      if (pendingEl && parseInt(pendingEl.textContent) > 0) {
        pendingEl.textContent = parseInt(pendingEl.textContent) - 1;
      }
    }

    function cancelTrainerBooking(btn, athleteName) {
      if (confirm('Cancel reservation for ' + athleteName + '? The slot will be restored to open inventory.')) {
        const row = btn.closest('tr');
        if (row) {
          row.style.transition = 'all 0.3s ease';
          row.style.opacity = '0.35';
          const actionsCell = row.querySelector('td:last-child');
          if (actionsCell) actionsCell.innerHTML = '<span style="color:#ff4757; font-size:0.75rem; font-weight:700;">Cancelled</span>';
        }
        showToast('Reservation Cancelled', 'Appointment with ' + athleteName + ' cancelled.');
      }
    }

    function rescheduleBooking(btn, athleteName) {
      const newTime = prompt('Enter new date and time for ' + athleteName + ' (e.g. Next Monday 08:30 AM):');
      if (newTime && newTime.trim()) {
        const row = btn.closest('tr');
        const timeCell = row.querySelectorAll('td')[2];
        if (timeCell) timeCell.textContent = newTime.trim();
        showToast('Session Rescheduled', athleteName + ' session updated to ' + newTime.trim() + '.');
      }
    }
  </script>
`;

if (!html.includes('function approveBooking')) {
  html = html.replace('</body>', `${bookingScriptHandlers}\n</body>`);
}

fs.writeFileSync(trainerHtmlPath, html, 'utf8');
console.log('trainer-dashboard.html updated successfully!');

// 2. UPDATE js/trainer-dashboard.js
const trainerJsPath = path.join(__dirname, '../js/trainer-dashboard.js');
let js = fs.readFileSync(trainerJsPath, 'utf8');

// Update initSidebarNavigation to handle desktop collapse toggle and backdrop
const oldTrainerSidebar = `  function initSidebarNavigation() {
    const sidebar = document.getElementById('trainerSidebar');
    const toggleBtn = document.getElementById('dashMenuToggle') || document.getElementById('trainerSidebarToggle');
    const closeBtn = document.getElementById('dashSidebarClose');
    const backdrop = document.getElementById('dashSidebarBackdrop');

    if (!sidebar) return;

    const openSidebar = () => {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.classList.add('menu-open');
    };

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    // Auto-close on link click in mobile view
    sidebar.querySelectorAll('.dash-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeSidebar();
      });
    });
  }`;

const newTrainerSidebar = `  function initSidebarNavigation() {
    const sidebar = document.getElementById('trainerSidebar') || document.querySelector('.dash-sidebar');
    const toggleBtn = document.getElementById('dashMenuToggle') || document.getElementById('trainerSidebarToggle');
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

    // Auto-close on link click in mobile view
    sidebar.querySelectorAll('.dash-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeSidebar();
      });
    });

    window.openTrainerSidebar = openSidebar;
    window.closeTrainerSidebar = closeSidebar;
  }`;

if (js.includes(oldTrainerSidebar)) {
  js = js.replace(oldTrainerSidebar, newTrainerSidebar);
}

// Update initTabViews to support URL hash on load
const oldTrainerTabViews = `  function initTabViews() {
    const navLinks = document.querySelectorAll('.dash-nav-link[data-view]');
    const viewSections = document.querySelectorAll('.dash-view-section');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetViewId = link.getAttribute('data-view');

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        viewSections.forEach(sec => {
          if (sec.id === targetViewId) {
            sec.style.display = 'block';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(sec, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.28 });
            }
          } else {
            sec.style.display = 'none';
          }
        });

        // Trigger chart resize if entering overview
        if (targetViewId === 'view-overview' && attendanceChart) {
          setTimeout(() => {
            attendanceChart.resize();
            if (performanceRadarChart) performanceRadarChart.resize();
          }, 50);
        }
      });
    });
  }`;

const newTrainerTabViews = `  function switchTrainerView(targetViewId) {
    if (!targetViewId) return;
    const navLinks = document.querySelectorAll('.dash-nav-link[data-view]');
    const viewSections = document.querySelectorAll('.dash-view-section');

    navLinks.forEach(l => {
      if (l.getAttribute('data-view') === targetViewId) l.classList.add('active');
      else l.classList.remove('active');
    });

    viewSections.forEach(sec => {
      if (sec.id === targetViewId) {
        sec.style.display = 'block';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(sec, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.28 });
        }
      } else {
        sec.style.display = 'none';
      }
    });

    try {
      history.replaceState(null, '', '#' + targetViewId);
    } catch (e) {}

    if (targetViewId === 'view-overview' && attendanceChart) {
      setTimeout(() => {
        attendanceChart.resize();
        if (performanceRadarChart) performanceRadarChart.resize();
      }, 80);
    }

    if (window.innerWidth <= 992 && typeof window.closeTrainerSidebar === 'function') {
      window.closeTrainerSidebar();
    }
  }

  function initTabViews() {
    const navLinks = document.querySelectorAll('.dash-nav-link[data-view]');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetViewId = link.getAttribute('data-view');
        switchTrainerView(targetViewId);
      });
    });

    // Check URL hash on page load
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      switchTrainerView(hash);
    }
  }`;

if (js.includes(oldTrainerTabViews)) {
  js = js.replace(oldTrainerTabViews, newTrainerTabViews);
}

fs.writeFileSync(trainerJsPath, js, 'utf8');
console.log('js/trainer-dashboard.js updated successfully!');
