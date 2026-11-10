const fs = require('fs');
const path = require('path');

const userDashPath = path.join(__dirname, '../user-dashboard.html');
let html = fs.readFileSync(userDashPath, 'utf8');

// 1. UPDATE SIDEBAR NAVIGATION in user-dashboard.html
const oldNav = `<nav class="dash-nav" aria-label="Dashboard Navigation">
        <!-- 1. Overview -->
        <button class="dash-nav-item active" data-view="overview" id="navOverview">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-gauge-high"></i>
            <span>Overview</span>
          </div>
        </button>

        <!-- 2. My Profile -->
        <button class="dash-nav-item" data-view="profile" id="navProfile">
          <div class="dash-nav-item-left">
            <i class="fa-regular fa-user"></i>
            <span>My Profile</span>
          </div>
        </button>

        <!-- 3. My Membership -->
        <button class="dash-nav-item" data-view="membership" id="navMembership">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-id-card"></i>
            <span>My Membership</span>
          </div>
          <span class="dash-nav-badge">VIP</span>
        </button>

        
        <!-- 4. My Sports -->
        <button class="dash-nav-item" data-view="sports" id="navSports">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-futbol"></i>
            <span>My Sports</span>
          </div>
        </button>

        <!-- 5. My Training Programs -->
        <button class="dash-nav-item" data-view="programs" id="navPrograms">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-dumbbell"></i>
            <span>My Training Programs</span>
          </div>
        </button>

        <!-- 6. Training Schedule -->
        <button class="dash-nav-item" data-view="schedule" id="navSchedule">
          <div class="dash-nav-item-left">
            <i class="fa-regular fa-calendar-check"></i>
            <span>My Schedule</span>
          </div>
          <span class="dash-nav-badge" id="scheduleBadge">3</span>
        </button>

        <!-- 7. My Bookings -->
        <button class="dash-nav-item" data-view="bookings" id="navBookings">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-ticket"></i>
            <span>My Bookings</span>
          </div>
        </button>

        <!-- 8. My Attendance -->
        <button class="dash-nav-item" data-view="attendance" id="navAttendance">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-clipboard-user"></i>
            <span>My Attendance</span>
          </div>
        </button>


        <!-- 5. My Coaches -->
        <button class="dash-nav-item" data-view="coaches" id="navCoaches">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-user-ninja"></i>
            <span>My Coaches</span>
          </div>
        </button>

        <!-- 6. Upcoming Events -->
        <button class="dash-nav-item" data-view="events" id="navEvents">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-trophy"></i>
            <span>Upcoming Events</span>
          </div>
          <span class="dash-nav-badge">2</span>
        </button>

        <!-- 7. Achievements -->
        <button class="dash-nav-item" data-view="achievements" id="navAchievements">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-medal"></i>
            <span>Achievements</span>
          </div>
        </button>

        <!-- 8. Settings -->
        <button class="dash-nav-item" data-view="settings" id="navSettings">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-gear"></i>
            <span>Settings</span>
          </div>
        </button>`;

const newNav = `<nav class="dash-nav" aria-label="Dashboard Navigation">
        <!-- 1. Dashboard -->
        <button class="dash-nav-item active" data-view="overview" id="navOverview">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-gauge-high"></i>
            <span>Dashboard</span>
          </div>
        </button>

        <!-- 2. My Profile -->
        <button class="dash-nav-item" data-view="profile" id="navProfile">
          <div class="dash-nav-item-left">
            <i class="fa-regular fa-user"></i>
            <span>My Profile</span>
          </div>
        </button>

        <!-- 3. My Membership -->
        <button class="dash-nav-item" data-view="membership" id="navMembership">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-id-card"></i>
            <span>My Membership</span>
          </div>
          <span class="dash-nav-badge">VIP</span>
        </button>

        <!-- 4. My Programs -->
        <button class="dash-nav-item" data-view="programs" id="navPrograms">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-dumbbell"></i>
            <span>My Programs</span>
          </div>
        </button>

        <!-- 5. My Bookings -->
        <button class="dash-nav-item" data-view="bookings" id="navBookings">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-ticket"></i>
            <span>My Bookings</span>
          </div>
        </button>

        <!-- 6. My Schedule -->
        <button class="dash-nav-item" data-view="schedule" id="navSchedule">
          <div class="dash-nav-item-left">
            <i class="fa-regular fa-calendar-check"></i>
            <span>My Schedule</span>
          </div>
          <span class="dash-nav-badge" id="scheduleBadge">3</span>
        </button>

        <!-- 7. My Attendance -->
        <button class="dash-nav-item" data-view="attendance" id="navAttendance">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-clipboard-user"></i>
            <span>My Attendance</span>
          </div>
        </button>

        <!-- 8. My Payments -->
        <button class="dash-nav-item" data-view="payments" id="navPayments">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-credit-card"></i>
            <span>My Payments</span>
          </div>
        </button>

        <!-- 9. Notifications -->
        <button class="dash-nav-item" data-view="notifications" id="navNotifications">
          <div class="dash-nav-item-left">
            <i class="fa-regular fa-bell"></i>
            <span>Notifications</span>
          </div>
          <span class="badge" style="background:#ff4757; color:#fff; font-size:0.68rem; border-radius:50%; width:18px; height:18px; display:flex; align-items:center; justify-content:center;">2</span>
        </button>

        <!-- 10. Settings -->
        <button class="dash-nav-item" data-view="settings" id="navSettings">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-gear"></i>
            <span>Settings</span>
          </div>
        </button>

        <!-- Extra Modules -->
        <div class="dash-nav-section-title" style="margin-top:14px;">Athletic Arena</div>

        <button class="dash-nav-item" data-view="sports" id="navSports">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-futbol"></i>
            <span>My Sports</span>
          </div>
        </button>

        <button class="dash-nav-item" data-view="coaches" id="navCoaches">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-user-ninja"></i>
            <span>My Coaches</span>
          </div>
        </button>

        <button class="dash-nav-item" data-view="events" id="navEvents">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-trophy"></i>
            <span>Upcoming Events</span>
          </div>
          <span class="dash-nav-badge">2</span>
        </button>

        <button class="dash-nav-item" data-view="achievements" id="navAchievements">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-medal"></i>
            <span>Achievements</span>
          </div>
        </button>`;

html = html.replace(oldNav, newNav);

// 2. ADD VIEW: PAYMENTS & NOTIFICATIONS right before the end of the view container
const paymentsAndNotificationsViews = `
        <!-- ===============================================================
             VIEW: MY PAYMENTS & BILLING DOSSIER
             =============================================================== -->
        <section class="dash-view" id="view-payments" aria-label="My Payments">
          <div class="dash-section-header">
            <div>
              <h2 class="dash-section-title">MY BILLING &amp; PAYMENT HISTORY</h2>
              <p class="dash-section-desc">Track membership dues, court reservations, invoice statements, and digital payment methods.</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="exportDossierDoc('Annual Financial Statement')">
              <i class="fa-solid fa-file-invoice-dollar"></i> Download Statement
            </button>
          </div>

          <!-- Payment KPI Grid -->
          <div class="payment-kpi-grid">
            <div class="payment-kpi-card">
              <div style="font-size:0.75rem; text-transform:uppercase; color:#8c8c98; font-weight:700; margin-bottom:6px;">Total Billed (YTD)</div>
              <div style="font-family:var(--font-hero); font-size:2rem; color:#fff; line-height:1;">$3,830.00</div>
              <div style="font-size:0.75rem; color:#2ed573; margin-top:6px;"><i class="fa-solid fa-check-circle"></i> Account Current</div>
            </div>
            <div class="payment-kpi-card">
              <div style="font-size:0.75rem; text-transform:uppercase; color:#8c8c98; font-weight:700; margin-bottom:6px;">Next Scheduled Dues</div>
              <div style="font-family:var(--font-hero); font-size:2rem; color:var(--color-accent); line-height:1;">Dec 01, 2026</div>
              <div style="font-size:0.75rem; color:#8c8c98; margin-top:6px;">Annual Elite Renewal</div>
            </div>
            <div class="payment-kpi-card">
              <div style="font-size:0.75rem; text-transform:uppercase; color:#8c8c98; font-weight:700; margin-bottom:6px;">Payment Method</div>
              <div style="display:flex; align-items:center; gap:8px; margin-top:4px;">
                <i class="fa-brands fa-cc-visa" style="font-size:1.8rem; color:#5352ed;"></i>
                <div style="font-weight:700; color:#fff;">Visa &bull;&bull;&bull;&bull; 4022</div>
              </div>
              <div style="font-size:0.75rem; color:#8c8c98; margin-top:6px;">Expires 09/28 &bull; Default</div>
            </div>
            <div class="payment-kpi-card">
              <div style="font-size:0.75rem; text-transform:uppercase; color:#8c8c98; font-weight:700; margin-bottom:6px;">Active Membership Tier</div>
              <div style="font-family:var(--font-athletic); font-size:1.2rem; color:#fff; margin-top:2px;">ELITE BLACK PASS</div>
              <div style="font-size:0.75rem; color:var(--color-accent); margin-top:6px;"><i class="fa-solid fa-crown"></i> VIP Unlimited Access</div>
            </div>
          </div>

          <!-- Transaction Invoices Table -->
          <div class="dash-card">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
              <h4 style="font-family:var(--font-athletic); font-size:1.15rem; color:#fff; margin:0;">RECENT INVOICES &amp; SETTLEMENTS</h4>
              <div style="display:flex; gap:10px;">
                <select id="paymentFilterSelect" class="form-select" style="width:auto; padding:6px 12px; font-size:0.82rem;">
                  <option value="all">All Transactions</option>
                  <option value="membership">Membership Dues</option>
                  <option value="sessions">Session Bookings</option>
                  <option value="coaching">Masterclass Fees</option>
                </select>
              </div>
            </div>

            <div class="table-responsive">
              <table class="dash-table">
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Date</th>
                    <th>Item Description</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                    <th style="text-align:right;">Receipt</th>
                  </tr>
                </thead>
                <tbody id="paymentTableBody">
                  <tr>
                    <td style="font-weight:700; color:#fff;">INV-2026-8911</td>
                    <td style="color:#8c8c98;">Nov 01, 2026</td>
                    <td style="color:#fff; font-weight:600;">Annual Elite Black Pass Membership Dues</td>
                    <td style="font-weight:700; color:#fff;">$3,830.00</td>
                    <td><i class="fa-brands fa-cc-visa" style="color:#5352ed;"></i> Visa &bull;&bull;&bull;&bull; 4022</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-circle-check"></i> Paid</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="exportDossierDoc('Invoice INV-2026-8911')"><i class="fa-solid fa-download"></i> PDF</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#fff;">INV-2026-8804</td>
                    <td style="color:#8c8c98;">Oct 28, 2026</td>
                    <td style="color:#fff;">Laykold Grandstand Tennis Stadium (2 Hours VIP Reservation)</td>
                    <td style="font-weight:700; color:#fff;">$45.00</td>
                    <td><i class="fa-brands fa-apple-pay" style="color:#fff;"></i> Apple Pay</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-circle-check"></i> Paid</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="exportDossierDoc('Invoice INV-2026-8804')"><i class="fa-solid fa-download"></i> PDF</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#fff;">INV-2026-8742</td>
                    <td style="color:#8c8c98;">Oct 14, 2026</td>
                    <td style="color:#fff;">Private Master Coaching Session: Tariq Al-Mansoor (1-on-1 Strike Mechanics)</td>
                    <td style="font-weight:700; color:#fff;">$120.00</td>
                    <td><i class="fa-brands fa-cc-visa" style="color:#5352ed;"></i> Visa &bull;&bull;&bull;&bull; 4022</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-circle-check"></i> Paid</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="exportDossierDoc('Invoice INV-2026-8742')"><i class="fa-solid fa-download"></i> PDF</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#fff;">INV-2026-8610</td>
                    <td style="color:#8c8c98;">Sep 30, 2026</td>
                    <td style="color:#fff;">Biometric Cryo Recovery Spa Access &bull; Cold Plunge Chamber</td>
                    <td style="font-weight:700; color:#fff;">$60.00</td>
                    <td><i class="fa-brands fa-apple-pay" style="color:#fff;"></i> Apple Pay</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-circle-check"></i> Paid</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="exportDossierDoc('Invoice INV-2026-8610')"><i class="fa-solid fa-download"></i> PDF</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ===============================================================
             VIEW: NOTIFICATIONS & DISPATCH ALERTS
             =============================================================== -->
        <section class="dash-view" id="view-notifications" aria-label="Notifications">
          <div class="dash-section-header">
            <div>
              <h2 class="dash-section-title">NOTIFICATIONS &amp; DISPATCH ALERTS</h2>
              <p class="dash-section-desc">Real-time alerts regarding training bookings, masterclass schedules, tournament entries, and club security.</p>
            </div>
            <button class="btn btn-outline btn-sm" id="btnMarkAllNotifsRead" onclick="showToast('Notifications Cleared', 'All pending alerts marked as read.'); document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));">
              <i class="fa-solid fa-check-double"></i> Mark All as Read
            </button>
          </div>

          <div class="notifs-container">
            <!-- 1. Unread Booking Confirmed -->
            <div class="notif-item unread">
              <div class="notif-icon-box info">
                <i class="fa-solid fa-ticket"></i>
              </div>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h5 style="color:#fff; margin:0 0 4px; font-size:0.95rem;">Training Session Confirmed &bull; Main Turf Pitch A</h5>
                  <span style="font-size:0.75rem; color:var(--color-accent); font-weight:700;">Just now</span>
                </div>
                <p style="font-size:0.85rem; color:#8c8c98; margin:0 0 6px;">
                  High-Velocity Strike Mechanics session with Coach Marcus Vance has been confirmed for tomorrow at 07:30 AM.
                </p>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-primary btn-xs" onclick="switchView('bookings')">View Booking</button>
                  <button class="btn btn-outline btn-xs" onclick="this.closest('.notif-item').classList.remove('unread')">Mark Read</button>
                </div>
              </div>
            </div>

            <!-- 2. Unread Tournament Alert -->
            <div class="notif-item unread">
              <div class="notif-icon-box alert">
                <i class="fa-solid fa-trophy"></i>
              </div>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h5 style="color:#fff; margin:0 0 4px; font-size:0.95rem;">Sanctioned Tournament Draw Open</h5>
                  <span style="font-size:0.75rem; color:var(--color-accent); font-weight:700;">2 hours ago</span>
                </div>
                <p style="font-size:0.85rem; color:#8c8c98; margin:0 0 6px;">
                  National Winter Soccer Invitational entry passes are now active for Elite Black Tier athletes. $50,000 championship purse.
                </p>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-primary btn-xs" onclick="switchView('events')">Tournament Draw</button>
                  <button class="btn btn-outline btn-xs" onclick="this.closest('.notif-item').classList.remove('unread')">Mark Read</button>
                </div>
              </div>
            </div>

            <!-- 3. Telemetry Synced -->
            <div class="notif-item">
              <div class="notif-icon-box system">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h5 style="color:#fff; margin:0 0 4px; font-size:0.95rem;">Biometric Telemetry Radar Updated</h5>
                  <span style="font-size:0.75rem; color:#8c8c98;">Yesterday</span>
                </div>
                <p style="font-size:0.85rem; color:#8c8c98; margin:0;">
                  Your kinetic sprint velocity radar recorded a 95 Agility Score during Tuesday pitch drills. Telemetry synced with high-performance faculty.
                </p>
              </div>
            </div>

            <!-- 4. Membership Renewal -->
            <div class="notif-item">
              <div class="notif-icon-box system">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h5 style="color:#fff; margin:0 0 4px; font-size:0.95rem;">VIP Locker #42 Credential Verified</h5>
                  <span style="font-size:0.75rem; color:#8c8c98;">3 days ago</span>
                </div>
                <p style="font-size:0.85rem; color:#8c8c98; margin:0;">
                  Digital RFID locker credential renewed for the upcoming winter competitive season.
                </p>
              </div>
            </div>
          </div>
        </section>
`;

// Insert the two views right before `</div>\n      </main>`
if (!html.includes('id="view-payments"')) {
  html = html.replace(
    `</section>\n  \n        </div>\n      </main>`,
    `</section>\n${paymentsAndNotificationsViews}\n        </div>\n      </main>`
  );
}

// 3. FIX SCRIPT SYNTAX ERROR at line 3743 where </script> was closed prematurely
const brokenScriptSection = `      // 6. Live Clock Display
      const liveDateDisplay = document.getElementById('liveDateDisplay');
      if (liveDateDisplay) {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        liveDateDisplay.textContent = now.toLocaleDateString('en-US', options);
      }
    });
  </script>
  
    // Interactive Dashboard Handlers`;

const fixedScriptSection = `      // 6. Live Clock Display
      const liveDateDisplay = document.getElementById('liveDateDisplay');
      if (liveDateDisplay) {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        liveDateDisplay.textContent = now.toLocaleDateString('en-US', options);
      }
    });

    // Interactive Dashboard Handlers`;

if (html.includes(brokenScriptSection)) {
  html = html.replace(brokenScriptSection, fixedScriptSection);
  console.log('Fixed script tag syntax error in user-dashboard.html');
}

// 4. Update switchView function in user-dashboard.html to handle hash changes, active states, and mobile sidebar close
const oldSwitchView = `function switchView(viewId) {
      document.querySelectorAll('.dash-nav-item').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.dash-view').forEach(el => el.classList.remove('active'));

      const activeNav = document.querySelector(\`.dash-nav-item[data-view="\${viewId}"]\`);
      const activeView = document.getElementById(\`view-\${viewId}\`);

      if (activeNav) activeNav.classList.add('active');
      if (activeView) activeView.classList.add('active');

      // Update URL hash without scrolling
      history.replaceState(null, null, \`#\${viewId}\`);

      // Scroll top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }`;

const newSwitchView = `function switchView(viewId) {
      if (!viewId) return;
      document.querySelectorAll('.dash-nav-item').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.dash-view').forEach(el => el.classList.remove('active'));

      const activeNav = document.querySelector(\`.dash-nav-item[data-view="\${viewId}"]\`);
      const activeView = document.getElementById(\`view-\${viewId}\`);

      if (activeNav) activeNav.classList.add('active');
      if (activeView) activeView.classList.add('active');

      // Update URL hash without jumping
      try {
        history.replaceState(null, '', \`#\${viewId}\`);
      } catch (e) {}

      // Resize charts if visible
      if (viewId === 'overview' || viewId === 'attendance') {
        setTimeout(() => {
          if (userAttendanceChart) userAttendanceChart.resize();
          if (userProgressRadarChart) userProgressRadarChart.resize();
        }, 150);
      }

      // Close mobile drawer on item selection per requirement
      closeMobileSidebar();
    }`;

if (html.includes('function switchView(viewId) {')) {
  // Replace switchView
  const idx = html.indexOf('function switchView(viewId) {');
  const endIdx = html.indexOf('}', idx + 50);
  // Let's replace precisely
  html = html.replace(/function switchView\(viewId\) \{[\s\S]*?window\.scrollTo[\s\S]*?\}/, newSwitchView);
}

fs.writeFileSync(userDashPath, html, 'utf8');
console.log('user-dashboard.html updated successfully with all 10 sidebar modules, payments, notifications, and fixed scripts!');
