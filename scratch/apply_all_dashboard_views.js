const fs = require('fs');
const path = require('path');

console.log('=== APPLYING DASHBOARD VIEWS & SIDEBAR NAVIGATION ===');

// ===================================================================
// 1. USER DASHBOARD
// ===================================================================
const userPath = path.join(__dirname, '../user-dashboard.html');
let userHtml = fs.readFileSync(userPath, 'utf8').replace(/\r\n/g, '\n');

// A. Sidebar nav replacement
const userNavRegex = /<nav class="dash-nav" aria-label="Dashboard Navigation">[\s\S]*?<\/nav>/;
const userNavReplacement = `<nav class="dash-nav" aria-label="Dashboard Navigation">
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
        </button>

        <a href="trainer-dashboard.html" class="dash-nav-item" style="color: #2ed573; border: 1px dashed rgba(46,213,115,0.35); margin-top: 6px; border-radius: 8px; text-decoration: none;">
          <div class="dash-nav-item-left">
            <i class="fa-solid fa-user-ninja"></i>
            <span>Coach Portal</span>
          </div>
          <span class="badge" style="background: rgba(46,213,115,0.2); color: #2ed573; font-size: 0.65rem;">FACULTY</span>
        </a>
      </nav>`;

userHtml = userHtml.replace(userNavRegex, userNavReplacement);

// B. Add view-payments and view-notifications before </main>
const userPaymentsAndNotifs = `
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

if (!userHtml.includes('id="view-payments"')) {
  // Find </main>
  const mainIdx = userHtml.lastIndexOf('</main>');
  if (mainIdx !== -1) {
    userHtml = userHtml.slice(0, mainIdx) + userPaymentsAndNotifs + '\n    ' + userHtml.slice(mainIdx);
    console.log('Inserted view-payments and view-notifications into user-dashboard.html');
  }
}

fs.writeFileSync(userPath, userHtml, 'utf8');

// ===================================================================
// 2. TRAINER DASHBOARD
// ===================================================================
const trainerPath = path.join(__dirname, '../trainer-dashboard.html');
let trainerHtml = fs.readFileSync(trainerPath, 'utf8').replace(/\r\n/g, '\n');

// Nav check for view-bookings
if (!trainerHtml.includes('data-view="view-bookings"')) {
  const scheduleNavPattern = /(<button class="dash-nav-link[^>]*data-view="view-schedule"[\s\S]*?<\/button>)/;
  const bookingNavBtn = `\n        <!-- 5. Manage Bookings -->\n        <button class="dash-nav-link" data-view="view-bookings" id="navTrainerBookings">\n          <div class="dash-nav-item-left">\n            <i class="fa-solid fa-ticket"></i>\n            <span>Manage Bookings</span>\n          </div>\n          <span class="badge" style="background:rgba(46,213,115,0.2); color:#2ed573; font-size:0.7rem; border-radius:12px; padding:2px 8px;">3 New</span>\n        </button>`;
  trainerHtml = trainerHtml.replace(scheduleNavPattern, '$1' + bookingNavBtn);
  console.log('Added view-bookings button to trainer-dashboard.html nav');
}

fs.writeFileSync(trainerPath, trainerHtml, 'utf8');

// ===================================================================
// 3. ADMIN DASHBOARD
// ===================================================================
const adminPath = path.join(__dirname, '../admin-dashboard.html');
let adminHtml = fs.readFileSync(adminPath, 'utf8').replace(/\r\n/g, '\n');

// A. Sidebar nav replacement
const adminNavRegex = /<nav class="dash-nav" aria-label="Admin Navigation">[\s\S]*?<\/nav>/;
const adminNavReplacement = `<nav class="dash-nav" aria-label="Admin Navigation">
        <div class="dash-nav-section-title">Club Governance</div>
        <!-- 1. Dashboard -->
        <button class="dash-nav-link active" data-view="view-overview" id="navAdminOverview">
          <i class="fa-solid fa-gauge-high"></i> <span>Dashboard</span>
        </button>
        <!-- 2. User Management -->
        <button class="dash-nav-link" data-view="view-members" id="navAdminMembers">
          <i class="fa-solid fa-users"></i> <span>User Management</span>
          <span class="badge" id="sidebarMemberCount" style="margin-left:auto; background:rgba(255,90,31,0.2); color:#FF5A1F; font-size:0.75rem;">642</span>
        </button>
        <!-- 3. Trainer Management -->
        <button class="dash-nav-link" data-view="view-trainers" id="navAdminTrainers">
          <i class="fa-solid fa-user-ninja"></i> <span>Trainer Management</span>
        </button>
        <!-- 4. Sports Management -->
        <button class="dash-nav-link" data-view="view-sports" id="navAdminSports">
          <i class="fa-solid fa-futbol"></i> <span>Sports Management</span>
        </button>
        <!-- 5. Programs Management -->
        <button class="dash-nav-link" data-view="view-programs" id="navAdminPrograms">
          <i class="fa-solid fa-dumbbell"></i> <span>Programs Management</span>
        </button>
        <!-- 6. Membership Management -->
        <button class="dash-nav-link" data-view="view-memberships" id="navAdminMemberships">
          <i class="fa-solid fa-id-card"></i> <span>Membership Management</span>
        </button>
        <!-- 7. Booking Management -->
        <button class="dash-nav-link" data-view="view-bookings" id="navAdminBookings">
          <i class="fa-solid fa-ticket"></i> <span>Booking Management</span>
        </button>
        <!-- 8. Events Management -->
        <button class="dash-nav-link" data-view="view-events" id="navAdminEvents">
          <i class="fa-solid fa-trophy"></i> <span>Events Management</span>
        </button>
        <!-- 9. Payments -->
        <button class="dash-nav-link" data-view="view-payments" id="navAdminPayments">
          <i class="fa-solid fa-credit-card"></i> <span>Payments</span>
        </button>
        <!-- 10. Reports & Analytics -->
        <button class="dash-nav-link" data-view="view-reports" id="navAdminReports">
          <i class="fa-solid fa-chart-line"></i> <span>Reports &amp; Analytics</span>
        </button>
        <!-- 11. Notifications -->
        <button class="dash-nav-link" data-view="view-notifications" id="navAdminNotifications">
          <i class="fa-regular fa-bell"></i> <span>Notifications</span>
          <span class="badge" style="margin-left:auto; background:#ff4757; color:#fff; font-size:0.68rem; border-radius:10px; padding:1px 6px;">5</span>
        </button>
        <!-- 12. Website Settings -->
        <button class="dash-nav-link" data-view="view-settings" id="navAdminSettings">
          <i class="fa-solid fa-sliders"></i> <span>Website Settings</span>
        </button>
        <!-- 13. Profile -->
        <button class="dash-nav-link" data-view="view-profile" id="navAdminProfile">
          <i class="fa-regular fa-user"></i> <span>Profile</span>
        </button>
        <!-- Extra: Schedule Management -->
        <button class="dash-nav-link" data-view="view-schedule" id="navAdminSchedule">
          <i class="fa-solid fa-calendar-days"></i> <span>Schedule Management</span>
        </button>

        <div class="dash-nav-section-title" style="margin-top:24px;">Role Switcher &amp; Navigation</div>
        <a href="user-dashboard.html" class="dash-nav-link" style="color:var(--text-secondary);">
          <i class="fa-solid fa-running"></i> <span>Switch to Athlete Portal</span>
        </a>
        <a href="trainer-dashboard.html" class="dash-nav-link" style="color:#2ed573;">
          <i class="fa-solid fa-user-ninja"></i> <span>Switch to Coach Portal</span>
        </a>
        <a href="index.html" class="dash-nav-link" style="color:var(--text-secondary);">
          <i class="fa-solid fa-globe"></i> <span>Public Arena Site</span>
        </a>
      </nav>`;

adminHtml = adminHtml.replace(adminNavRegex, adminNavReplacement);

// B. Add sections: view-payments, view-notifications, view-settings, view-profile if missing
const adminNewSections = `
        <!-- ===============================================================
             VIEW: PAYMENTS & FINANCIAL MANAGEMENT
             =============================================================== -->
        <section id="view-payments" class="dash-view-pane d-none">
          <div class="dash-section-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:24px;">
            <div>
              <h2 class="dash-section-title" style="margin:0 0 6px;">REVENUE &amp; PAYMENT MANAGEMENT</h2>
              <p class="dash-section-desc" style="margin:0;">Audit member membership settlements, facility booking collections, and digital payment gateway transactions.</p>
            </div>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-outline btn-sm" onclick="exportDossierDoc('Audit Report')">
                <i class="fa-solid fa-file-csv"></i> Export CSV
              </button>
              <button class="btn btn-primary btn-sm" onclick="openModal('modalAddPayment')">
                <i class="fa-solid fa-plus"></i> Record Payment
              </button>
            </div>
          </div>

          <!-- Financial KPIs -->
          <div class="dash-kpi-grid">
            <div class="dash-kpi-card">
              <div class="dash-kpi-header">
                <span class="dash-kpi-title">TOTAL REVENUE (YTD)</span>
                <div class="dash-kpi-icon"><i class="fa-solid fa-sack-dollar"></i></div>
              </div>
              <div class="dash-kpi-value">$482,500</div>
              <div class="dash-kpi-subtext" style="color:#2ed573;"><i class="fa-solid fa-arrow-trend-up"></i> +14.2% vs last quarter</div>
            </div>
            <div class="dash-kpi-card">
              <div class="dash-kpi-header">
                <span class="dash-kpi-title">MONTHLY RUN RATE</span>
                <div class="dash-kpi-icon"><i class="fa-solid fa-calendar-check"></i></div>
              </div>
              <div class="dash-kpi-value">$41,200</div>
              <div class="dash-kpi-subtext" style="color:#2ed573;"><i class="fa-solid fa-circle-check"></i> 98.4% collection rate</div>
            </div>
            <div class="dash-kpi-card">
              <div class="dash-kpi-header">
                <span class="dash-kpi-title">PENDING SETTLEMENTS</span>
                <div class="dash-kpi-icon" style="background:rgba(255,171,0,0.15); color:#ffab00;"><i class="fa-solid fa-clock"></i></div>
              </div>
              <div class="dash-kpi-value">$1,450</div>
              <div class="dash-kpi-subtext" style="color:#ffab00;">3 invoices under review</div>
            </div>
            <div class="dash-kpi-card">
              <div class="dash-kpi-header">
                <span class="dash-kpi-title">REFUND RATE</span>
                <div class="dash-kpi-icon"><i class="fa-solid fa-shield-heart"></i></div>
              </div>
              <div class="dash-kpi-value">0.18%</div>
              <div class="dash-kpi-subtext" style="color:#2ed573;">Exceptional athlete satisfaction</div>
            </div>
          </div>

          <!-- Payments Table -->
          <div class="dash-table-card">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
              <div class="dash-search-box" style="display:flex; min-width:240px;">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="adminPaymentSearch" class="dash-search-input" placeholder="Search athlete, transaction ID...">
              </div>
              <div style="display:flex; gap:10px;">
                <select id="adminPaymentStatusFilter" class="form-select" style="width:auto; padding:6px 12px; font-size:0.82rem;">
                  <option value="all">All Statuses</option>
                  <option value="Settled">Settled</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            <div class="table-responsive">
              <table class="dash-table" id="adminPaymentsTable">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Athlete Name</th>
                    <th>Item / Description</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th style="text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody id="adminPaymentsTableBody">
                  <tr>
                    <td style="font-weight:700; color:#fff;">TXN-90184</td>
                    <td style="color:#fff; font-weight:600;">Jordan Hayes</td>
                    <td>Annual Elite Black Pass</td>
                    <td style="font-weight:700; color:#fff;">$3,830.00</td>
                    <td>Visa &bull;&bull;&bull;&bull; 4022</td>
                    <td style="color:#8c8c98;">Nov 01, 2026</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-check"></i> Settled</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="viewPaymentReceipt('TXN-90184')">Receipt</button>
                      <button class="btn btn-outline btn-xs" onclick="refundPayment('TXN-90184', 3830)" style="color:#ff4757;">Refund</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#fff;">TXN-90172</td>
                    <td style="color:#fff; font-weight:600;">Serena Vance</td>
                    <td>Laykold Grandstand 1 Hourly Booking</td>
                    <td style="font-weight:700; color:#fff;">$45.00</td>
                    <td>Apple Pay</td>
                    <td style="color:#8c8c98;">Oct 28, 2026</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-check"></i> Settled</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="viewPaymentReceipt('TXN-90172')">Receipt</button>
                      <button class="btn btn-outline btn-xs" onclick="refundPayment('TXN-90172', 45)" style="color:#ff4757;">Refund</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#fff;">TXN-90165</td>
                    <td style="color:#fff; font-weight:600;">Liam Sterling</td>
                    <td>Gold Pro Monthly Subscription</td>
                    <td style="font-weight:700; color:#fff;">$289.00</td>
                    <td>Mastercard &bull;&bull;&bull;&bull; 1180</td>
                    <td style="color:#8c8c98;">Oct 25, 2026</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-check"></i> Settled</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="viewPaymentReceipt('TXN-90165')">Receipt</button>
                      <button class="btn btn-outline btn-xs" onclick="refundPayment('TXN-90165', 289)" style="color:#ff4757;">Refund</button>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#fff;">TXN-90159</td>
                    <td style="color:#fff; font-weight:600;">Aria Takahashi</td>
                    <td>Silver Club Annual Membership</td>
                    <td style="font-weight:700; color:#fff;">$1,490.00</td>
                    <td>Visa &bull;&bull;&bull;&bull; 9931</td>
                    <td style="color:#8c8c98;">Oct 18, 2026</td>
                    <td><span class="payment-card-badge paid"><i class="fa-solid fa-check"></i> Settled</span></td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-xs" onclick="viewPaymentReceipt('TXN-90159')">Receipt</button>
                      <button class="btn btn-outline btn-xs" onclick="refundPayment('TXN-90159', 1490)" style="color:#ff4757;">Refund</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ===============================================================
             VIEW: NOTIFICATIONS & BROADCAST DISPATCHER
             =============================================================== -->
        <section id="view-notifications" class="dash-view-pane d-none">
          <div class="dash-section-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:24px;">
            <div>
              <h2 class="dash-section-title" style="margin:0 0 6px;">COMMUNICATIONS &amp; BROADCAST NOTIFICATIONS</h2>
              <p class="dash-section-desc" style="margin:0;">Broadcast emergency facility alerts, weather closures, tournament announcements, and membership newsletters.</p>
            </div>
          </div>

          <div class="row g-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:20px; margin-bottom:28px;">
            <!-- Broadcast Composer -->
            <div style="background:#111116; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:22px;">
              <h4 style="font-family:var(--font-athletic); font-size:1.15rem; color:#fff; margin:0 0 16px;">
                <i class="fa-solid fa-bullhorn text-accent"></i> COMPOSE CLUB BROADCAST
              </h4>
              <form id="adminBroadcastForm" onsubmit="handleSendBroadcast(event)">
                <div class="form-group" style="margin-bottom:14px;">
                  <label class="form-label">Recipient Group *</label>
                  <select id="broadcastTarget" class="form-select" required>
                    <option value="all">All Registered Athletes &amp; Coaches (666 Recipients)</option>
                    <option value="athletes">Athletes &bull; Active Members Only</option>
                    <option value="coaches">Coaching Faculty &bull; Master Trainers</option>
                    <option value="vip">Elite Black Pass &bull; VIP Members</option>
                  </select>
                </div>
                <div class="form-group" style="margin-bottom:14px;">
                  <label class="form-label">Broadcast Title *</label>
                  <input type="text" id="broadcastTitle" class="form-input" placeholder="e.g. Winter Tournament Entry Open" required>
                </div>
                <div class="form-group" style="margin-bottom:14px;">
                  <label class="form-label">Broadcast Message *</label>
                  <textarea id="broadcastMessage" class="form-textarea" placeholder="Type notification content..." style="min-height:90px;" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-100">
                  <i class="fa-solid fa-paper-plane"></i> Dispatch Broadcast Immediately
                </button>
              </form>
            </div>

            <!-- Recent Broadcasts History -->
            <div style="background:#111116; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:22px;">
              <h4 style="font-family:var(--font-athletic); font-size:1.15rem; color:#fff; margin:0 0 16px;">
                <i class="fa-solid fa-clock-rotate-left text-accent"></i> SENT DISPATCH AUDIT LOG
              </h4>
              <div id="broadcastHistoryList">
                <div class="notif-item" style="margin-bottom:12px;">
                  <div class="notif-icon-box alert"><i class="fa-solid fa-trophy"></i></div>
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <h6 style="color:#fff; margin:0; font-size:0.9rem;">National Winter Soccer Invitational Draw Open</h6>
                      <span style="font-size:0.72rem; color:#8c8c98;">2 hours ago</span>
                    </div>
                    <p style="font-size:0.8rem; color:#8c8c98; margin:4px 0 0;">Target: All Athletes &bull; Dispatched to 642 members.</p>
                  </div>
                </div>
                <div class="notif-item" style="margin-bottom:12px;">
                  <div class="notif-icon-box info"><i class="fa-solid fa-wrench"></i></div>
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <h6 style="color:#fff; margin:0; font-size:0.9rem;">Batting Cage #4 Scheduled Maintenance</h6>
                      <span style="font-size:0.72rem; color:#8c8c98;">Yesterday</span>
                    </div>
                    <p style="font-size:0.8rem; color:#8c8c98; margin:4px 0 0;">Target: Cricket Roster &bull; Dispatched to 84 cricketers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===============================================================
             VIEW: WEBSITE & CLUB SETTINGS
             =============================================================== -->
        <section id="view-settings" class="dash-view-pane d-none">
          <div class="dash-section-header" style="margin-bottom:24px;">
            <h2 class="dash-section-title" style="margin:0 0 6px;">CLUB OPERATIONS &amp; SYSTEM SETTINGS</h2>
            <p class="dash-section-desc" style="margin:0;">Manage facility hours, member intake caps, booking lead times, contact telemetry, and security protocols.</p>
          </div>

          <div style="background:#111116; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:24px; max-width:880px;">
            <form id="adminSettingsForm" onsubmit="handleSaveAdminSettings(event)">
              <h4 style="font-family:var(--font-athletic); font-size:1.15rem; color:#fff; margin:0 0 18px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                1. GENERAL CLUB SPECIFICATIONS
              </h4>
              <div class="form-group-row">
                <div class="form-group">
                  <label class="form-label">Club Legal Name</label>
                  <input type="text" class="form-input" value="STACKLY SPORTS CLUB &amp; PERFORMANCE LABS" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Total Athlete Membership Cap</label>
                  <input type="number" class="form-input" value="750" required>
                </div>
              </div>
              <div class="form-group-row">
                <div class="form-group">
                  <label class="form-label">Operating Hours (Weekdays)</label>
                  <input type="text" class="form-input" value="05:00 AM – 11:00 PM" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Operating Hours (Weekends)</label>
                  <input type="text" class="form-input" value="06:00 AM – 10:00 PM" required>
                </div>
              </div>

              <h4 style="font-family:var(--font-athletic); font-size:1.15rem; color:#fff; margin:24px 0 18px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                2. ARENA RESERVATION RULES
              </h4>
              <div class="form-group-row">
                <div class="form-group">
                  <label class="form-label">Advance Booking Window</label>
                  <select class="form-select">
                    <option value="14">14 Days in Advance (VIP Tier)</option>
                    <option value="7">7 Days in Advance (Standard)</option>
                    <option value="30">30 Days (Championship Tournament)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Cancellation Deadline (Hours)</label>
                  <select class="form-select">
                    <option value="12">12 Hours Prior</option>
                    <option value="24" selected>24 Hours Prior</option>
                    <option value="48">48 Hours Prior</option>
                  </select>
                </div>
              </div>

              <div style="margin-top:24px;">
                <button type="submit" class="btn btn-primary btn-lg">
                  <i class="fa-solid fa-floppy-disk"></i> Save Governance Settings
                </button>
              </div>
            </form>
          </div>
        </section>

        <!-- ===============================================================
             VIEW: ADMINISTRATOR PROFILE & CREDENTIALS
             =============================================================== -->
        <section id="view-profile" class="dash-view-pane d-none">
          <div class="dash-section-header" style="margin-bottom:24px;">
            <h2 class="dash-section-title" style="margin:0 0 6px;">ADMINISTRATOR PROFILE &amp; ACCESS PRIVILEGES</h2>
            <p class="dash-section-desc" style="margin:0;">Manage executive credentials, cryptographic security keys, and emergency governance contact.</p>
          </div>

          <div style="background:#111116; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:24px; max-width:880px;">
            <form id="adminProfileForm" onsubmit="handleSaveAdminProfile(event)">
              <div style="display:flex; align-items:center; gap:20px; margin-bottom:24px;">
                <div style="width:72px; height:72px; border-radius:50%; border:2px solid var(--color-accent); display:flex; align-items:center; justify-content:center; background:rgba(255,90,31,0.15); color:var(--color-accent); font-size:2rem;">
                  <i class="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h4 style="font-family:var(--font-athletic); font-size:1.3rem; color:#fff; margin:0;" id="profAdminNameDisplay">Alexander Sterling</h4>
                  <div style="color:var(--color-accent); font-size:0.85rem; font-weight:700;"><i class="fa-solid fa-crown"></i> Executive Club Director &bull; Master Level Clearance</div>
                </div>
              </div>

              <div class="form-group-row">
                <div class="form-group">
                  <label class="form-label">Full Name *</label>
                  <input type="text" id="adminProfName" class="form-input" value="Alexander Sterling" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Official Email *</label>
                  <input type="email" id="adminProfEmail" class="form-input" value="admin@stackly.com" required>
                </div>
              </div>

              <div class="form-group-row">
                <div class="form-group">
                  <label class="form-label">Direct Desk Phone</label>
                  <input type="tel" id="adminProfPhone" class="form-input" value="+1 (555) 019-2831">
                </div>
                <div class="form-group">
                  <label class="form-label">Department</label>
                  <input type="text" class="form-input" value="Club Governance &amp; Executive Operations" readonly>
                </div>
              </div>

              <h4 style="font-family:var(--font-athletic); font-size:1.15rem; color:#fff; margin:24px 0 16px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                SECURITY &amp; PASSWORD REVISION
              </h4>
              <div class="form-group-row">
                <div class="form-group">
                  <label class="form-label">Current Password</label>
                  <input type="password" id="adminCurrPass" class="form-input" placeholder="••••••••••••">
                </div>
                <div class="form-group">
                  <label class="form-label">New Password (Min. 8 Chars)</label>
                  <input type="password" id="adminNewPass" class="form-input" placeholder="••••••••••••">
                </div>
              </div>

              <div style="margin-top:20px;">
                <button type="submit" class="btn btn-primary btn-lg">
                  <i class="fa-solid fa-floppy-disk"></i> Save Admin Profile &amp; Security
                </button>
              </div>
            </form>
          </div>
        </section>
`;

if (!adminHtml.includes('id="view-payments"')) {
  const contentAreaIdx = adminHtml.indexOf('id="adminContentArea"');
  if (contentAreaIdx !== -1) {
    const endOfReports = adminHtml.indexOf('</section>', adminHtml.indexOf('id="view-reports"'));
    if (endOfReports !== -1) {
      const insertIdx = endOfReports + '</section>'.length;
      adminHtml = adminHtml.slice(0, insertIdx) + adminNewSections + adminHtml.slice(insertIdx);
      console.log('Inserted view-payments, view-notifications, view-settings, and view-profile into admin-dashboard.html');
    }
  }
}

fs.writeFileSync(adminPath, adminHtml, 'utf8');
console.log('Finished updating all three dashboards.');
