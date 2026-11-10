const fs = require('fs');
const path = require('path');

const adminHtmlPath = path.join(__dirname, '../admin-dashboard.html');
let html = fs.readFileSync(adminHtmlPath, 'utf8');

// 1. UPDATE SIDEBAR in admin-dashboard.html
const oldSidebarNav = `<nav class="dash-nav" aria-label="Admin Navigation">
        <div class="dash-nav-section-title">Club Operations</div>
        <button class="dash-nav-link active" data-view="view-overview">
          <i class="fa-solid fa-gauge-high"></i> <span>Executive Overview</span>
        </button>
        <button class="dash-nav-link" data-view="view-members">
          <i class="fa-solid fa-users"></i> <span>Member Directory</span>
          <span class="badge" id="sidebarMemberCount" style="margin-left:auto; background:rgba(255,90,31,0.2); color:#FF5A1F; font-size:0.75rem;">642</span>
        </button>
        <button class="dash-nav-link" data-view="view-trainers">
          <i class="fa-solid fa-user-ninja"></i> <span>Coaches &amp; Faculty</span>
        </button>
        <button class="dash-nav-link" data-view="view-sports">
          <i class="fa-solid fa-futbol"></i> <span>Sports &amp; Arenas</span>
        </button>
        <button class="dash-nav-link" data-view="view-programs">
          <i class="fa-solid fa-dumbbell"></i> <span>Training Programs</span>
        </button>
        <button class="dash-nav-link" data-view="view-memberships">
          <i class="fa-solid fa-id-card"></i> <span>Membership Tiers</span>
        </button>
        <button class="dash-nav-link" data-view="view-schedule">
          <i class="fa-solid fa-calendar-days"></i> <span>Schedule &amp; Timetable</span>
        </button>
        <button class="dash-nav-link" data-view="view-events">
          <i class="fa-solid fa-trophy"></i> <span>Events &amp; Tournaments</span>
        </button>
        <button class="dash-nav-link" data-view="view-bookings">
          <i class="fa-solid fa-ticket"></i> <span>Arena Bookings</span>
        </button>
        <button class="dash-nav-link" data-view="view-reports">
          <i class="fa-solid fa-file-invoice-dollar"></i> <span>Reports &amp; Analytics</span>
        </button>`;

const newSidebarNav = `<nav class="dash-nav" aria-label="Admin Navigation">
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
          <i class="fa-solid fa-credit-card"></i> <span>Payments &amp; Revenue</span>
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
          <i class="fa-regular fa-user"></i> <span>Admin Profile</span>
        </button>
        <!-- Extra: Schedule Management -->
        <button class="dash-nav-link" data-view="view-schedule" id="navAdminSchedule">
          <i class="fa-solid fa-calendar-days"></i> <span>Schedule Management</span>
        </button>`;

html = html.replace(oldSidebarNav, newSidebarNav);

// 2. ADD NEW VIEWS: view-payments, view-notifications, view-settings, view-profile
const newAdminViews = `
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

// Insert the new views before modalAddMember
if (!html.includes('id="view-payments"')) {
  html = html.replace(
    `<!-- ===================================================================\n       MODAL 1: REGISTER NEW ATHLETE`,
    `${newAdminViews}\n\n      <!-- ===================================================================\n       MODAL 1: REGISTER NEW ATHLETE`
  );
}

// 3. ADD MODAL: modalAddPayment
const modalAddPayment = `
  <!-- ===================================================================
       MODAL: RECORD NEW TRANSACTION
       =================================================================== -->
  <div class="modal-overlay" id="modalAddPayment">
    <div class="modal-dialog">
      <button class="modal-close-btn" onclick="closeModal('modalAddPayment')"><i class="fa-solid fa-xmark"></i></button>
      <div class="modal-header">
        <span class="modal-tag">Financial Ledger</span>
        <h3 class="modal-title">Record Member Payment</h3>
        <p class="text-muted text-subtle-sm">Log manual or external remittance to the club ledger.</p>
      </div>
      <form id="formAddPayment" onsubmit="handleRecordPayment(event)">
        <div class="form-group">
          <label class="form-label" for="payMemberName">Athlete Name *</label>
          <input type="text" id="payMemberName" class="form-input" placeholder="e.g. Jordan Hayes" required>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label class="form-label" for="payItemDesc">Item / Tier Description *</label>
            <input type="text" id="payItemDesc" class="form-input" placeholder="e.g. Annual Elite Black Pass" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="payAmount">Amount ($) *</label>
            <input type="number" id="payAmount" class="form-input" placeholder="3830" required>
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label class="form-label" for="payMethod">Payment Method *</label>
            <select id="payMethod" class="form-select" required>
              <option value="Visa">Visa Credit</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="Wire Transfer">Bank Wire Transfer</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="payStatus">Settlement Status *</label>
            <select id="payStatus" class="form-select" required>
              <option value="Settled">Settled / Paid</option>
              <option value="Pending">Pending Review</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100 btn-lg" style="margin-top:16px;">
          Log Transaction to Ledger <i class="fa-solid fa-check"></i>
        </button>
      </form>
    </div>
  </div>
`;

if (!html.includes('id="modalAddPayment"')) {
  html = html.replace(
    `<div class="toast-container">`,
    `${modalAddPayment}\n  <div class="toast-container">`
  );
}

// 4. Update titles mapping and switchAdminTab in admin-dashboard.html script
const oldTitles = `'view-bookings': ['ARENA & COURT RESERVATIONS', 'Real-time athlete check-in matrix and facility dispatching.'],
        'view-reports': ['EXECUTIVE REPORTS & ANALYTICS', 'Financial audits, RFID biometric gate data, and operational export.']`;

const newTitles = `'view-bookings': ['ARENA & COURT RESERVATIONS', 'Real-time athlete check-in matrix and facility dispatching.'],
        'view-reports': ['EXECUTIVE REPORTS & ANALYTICS', 'Financial audits, RFID biometric gate data, and operational export.'],
        'view-payments': ['PAYMENTS & REVENUE LEDGER', 'Comprehensive settlement tracking, refund processing, and financial receipts.'],
        'view-notifications': ['NOTIFICATIONS & BROADCASTS', 'Club-wide communications, emergency notices, and dispatch log.'],
        'view-settings': ['WEBSITE & CLUB GOVERNANCE', 'Configure capacity caps, operating schedules, and arena parameters.'],
        'view-profile': ['ADMINISTRATOR DOSSIER', 'Executive profile credentials and security clearance configuration.']`;

html = html.replace(oldTitles, newTitles);

// 5. Add handlers for Payment, Broadcast, Settings, and Profile
const adminScriptHandlers = `
    // Payments CRUD & Actions
    function viewPaymentReceipt(txnId) {
      showToast('Receipt Generated', 'Generating certified PDF for ' + txnId + '. Opening print dialog...');
      setTimeout(() => window.print(), 400);
    }

    function refundPayment(txnId, amount) {
      if (confirm('Authorize refund of $' + amount + ' for transaction ' + txnId + '?\\n\\nThis action requires administrative confirmation.')) {
        showToast('Refund Processed', '$' + amount + ' refund scheduled for ' + txnId + '.');
      }
    }

    function handleRecordPayment(e) {
      e.preventDefault();
      const name = document.getElementById('payMemberName').value;
      const desc = document.getElementById('payItemDesc').value;
      const amount = document.getElementById('payAmount').value;
      const method = document.getElementById('payMethod').value;
      const status = document.getElementById('payStatus').value;

      const newTxnId = 'TXN-' + Math.floor(10000 + Math.random() * 90000);
      const tbody = document.getElementById('adminPaymentsTableBody');
      if (tbody) {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td style="font-weight:700; color:#fff;">\${newTxnId}</td>
          <td style="color:#fff; font-weight:600;">\${name}</td>
          <td>\${desc}</td>
          <td style="font-weight:700; color:#fff;">$\${amount}.00</td>
          <td>\${method}</td>
          <td style="color:#8c8c98;">Today</td>
          <td><span class="payment-card-badge paid"><i class="fa-solid fa-check"></i> \${status}</span></td>
          <td style="text-align:right;">
            <button class="btn btn-outline btn-xs" onclick="viewPaymentReceipt('\${newTxnId}')">Receipt</button>
            <button class="btn btn-outline btn-xs" onclick="refundPayment('\${newTxnId}', \${amount})" style="color:#ff4757;">Refund</button>
          </td>
        \`;
        tbody.prepend(tr);
      }
      closeModal('modalAddPayment');
      document.getElementById('formAddPayment').reset();
      showToast('Payment Recorded', 'Transaction ' + newTxnId + ' logged to club ledger.');
    }

    // Broadcast Dispatcher
    function handleSendBroadcast(e) {
      e.preventDefault();
      const target = document.getElementById('broadcastTarget').value;
      const title = document.getElementById('broadcastTitle').value;
      const msg = document.getElementById('broadcastMessage').value;

      const historyList = document.getElementById('broadcastHistoryList');
      if (historyList) {
        const item = document.createElement('div');
        item.className = 'notif-item';
        item.style.marginBottom = '12px';
        item.innerHTML = \`
          <div class="notif-icon-box info"><i class="fa-solid fa-bullhorn"></i></div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h6 style="color:#fff; margin:0; font-size:0.9rem;">\${title}</h6>
              <span style="font-size:0.72rem; color:var(--color-accent); font-weight:700;">Just now</span>
            </div>
            <p style="font-size:0.8rem; color:#8c8c98; margin:4px 0 0;">Target: \${target} &bull; \${msg}</p>
          </div>
        \`;
        historyList.prepend(item);
      }
      document.getElementById('adminBroadcastForm').reset();
      showToast('Broadcast Dispatched', 'Notification transmitted to selected recipients.');
    }

    // Settings
    function handleSaveAdminSettings(e) {
      e.preventDefault();
      showToast('Settings Saved', 'Club governance rules and arena parameters updated.');
    }

    // Admin Profile
    function handleSaveAdminProfile(e) {
      e.preventDefault();
      const name = document.getElementById('adminProfName').value;
      const email = document.getElementById('adminProfEmail').value;
      const phone = document.getElementById('adminProfPhone').value;
      const newPass = document.getElementById('adminNewPass')?.value;

      if (window.StacklyAuth) {
        const updateData = { name, email, phone };
        if (newPass && newPass.length >= 8) updateData.password = newPass;
        StacklyAuth.updateProfile(updateData);
      }
      document.getElementById('profAdminNameDisplay').textContent = name;
      document.getElementById('topAdminName').textContent = name;
      showToast('Profile Saved', 'Administrator dossier and security credentials updated.');
    }
`;

if (!html.includes('handleRecordPayment')) {
  html = html.replace('</script>\n</body>', `${adminScriptHandlers}\n</script>\n</body>`);
}

// Ensure URL hash routing works in admin-dashboard.html
const hashRouter = `
      // Support URL hash routing (e.g. #view-payments, #view-trainers)
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {
        switchAdminTab(hash);
      }

      // Handle desktop sidebar collapse toggle
      document.getElementById('dashMenuToggle')?.addEventListener('click', (e) => {
        if (window.innerWidth > 992) {
          document.getElementById('adminSidebar')?.classList.toggle('collapsed');
        } else {
          document.getElementById('adminSidebar')?.classList.add('open');
          document.getElementById('dashSidebarBackdrop')?.classList.add('active');
          document.body.classList.add('dash-sidebar-open');
        }
      });
`;

if (!html.includes('Support URL hash routing')) {
  html = html.replace(
    `// Setup tab switcher\n      setupTabNavigation();`,
    `// Setup tab switcher\n      setupTabNavigation();\n${hashRouter}`
  );
}

// Update close drawer behavior to remove dash-sidebar-open
html = html.replace(
  `document.getElementById('dashSidebarClose')?.addEventListener('click', () => {
        document.getElementById('adminSidebar')?.classList.remove('open');
      });`,
  `const closeAdminDrawer = () => {
        document.getElementById('adminSidebar')?.classList.remove('open');
        document.getElementById('dashSidebarBackdrop')?.classList.remove('active');
        document.body.classList.remove('dash-sidebar-open');
      };
      document.getElementById('dashSidebarClose')?.addEventListener('click', closeAdminDrawer);
      document.getElementById('dashSidebarBackdrop')?.addEventListener('click', closeAdminDrawer);`
);

fs.writeFileSync(adminHtmlPath, html, 'utf8');
console.log('admin-dashboard.html updated successfully with all 13 sidebar modules, CRUD, payments, and settings!');
