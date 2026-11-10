const fs = require('fs');
const path = require('path');

const dashCssPath = path.join(__dirname, '../css/dashboard.css');
let css = fs.readFileSync(dashCssPath, 'utf8');

const additionalStyles = `
/* ===================================================================
   STACKLY UNIFIED SIDEBAR ENHANCEMENTS
   Consistent across User, Trainer, and Admin Dashboards
   =================================================================== */

/* Body freeze when mobile sidebar drawer is open */
body.dash-sidebar-open {
  overflow: hidden !important;
  touch-action: none !important;
}

/* Sidebar Desktop Collapsed State (Toggle via #dashSidebarCollapse) */
@media (min-width: 993px) {
  .dash-sidebar.collapsed {
    width: 84px !important;
    min-width: 84px !important;
    padding: 24px 10px !important;
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;
  }
  .dash-sidebar.collapsed .brand-title-group,
  .dash-sidebar.collapsed .dash-user-info,
  .dash-sidebar.collapsed .dash-nav-section-title,
  .dash-sidebar.collapsed .dash-nav-item span:not(.dash-nav-badge),
  .dash-sidebar.collapsed .dash-nav-link span:not(.dash-nav-badge),
  .dash-sidebar.collapsed .dash-nav-badge,
  .dash-sidebar.collapsed .dash-logout-btn span,
  .dash-sidebar.collapsed .badge {
    display: none !important;
  }
  .dash-sidebar.collapsed .dash-sidebar-header {
    justify-content: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
  }
  .dash-sidebar.collapsed .brand-logo {
    justify-content: center;
  }
  .dash-sidebar.collapsed .dash-user-card {
    justify-content: center;
    padding: 8px 0;
    border-left: none !important;
  }
  .dash-sidebar.collapsed .dash-nav-item,
  .dash-sidebar.collapsed .dash-nav-link {
    justify-content: center !important;
    padding: 12px 0 !important;
  }
  .dash-sidebar.collapsed .dash-nav-item-left {
    margin: 0 auto;
    justify-content: center;
  }
  .dash-sidebar.collapsed .dash-logout-btn {
    justify-content: center;
    padding: 12px 0;
  }
}

/* Mobile Sidebar Drawer: Occupies 100% available width on phone screens */
@media (max-width: 992px) {
  .dash-sidebar {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    width: 320px !important;
    max-width: 85vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    z-index: 10001 !important;
    transform: translateX(-100%) !important;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    box-shadow: 12px 0 45px rgba(0, 0, 0, 0.95);
  }
  .dash-sidebar.open {
    transform: translateX(0) !important;
  }
  .dash-sidebar-close {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .dash-menu-toggle {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
}

/* Full 100% width on standard mobile viewports (< 576px) per requirement */
@media (max-width: 576px) {
  .dash-sidebar {
    width: 100% !important;
    max-width: 100% !important;
  }
}

/* Consistent Active Nav Link Accent */
.dash-nav-item.active,
.dash-nav-link.active {
  background: rgba(255, 90, 31, 0.15) !important;
  color: #ffffff !important;
  border-left: 3px solid var(--color-accent, #FF5A1F) !important;
  font-weight: 600 !important;
}

.dash-nav-item.active i,
.dash-nav-link.active i {
  color: var(--color-accent, #FF5A1F) !important;
  text-shadow: 0 0 10px rgba(255, 90, 31, 0.5);
}

/* Notification & Payments Cards */
.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  margin-bottom: 10px;
  transition: all 0.2s ease;
}
.notif-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 90, 31, 0.3);
}
.notif-item.unread {
  background: rgba(255, 90, 31, 0.05);
  border-color: rgba(255, 90, 31, 0.25);
}
.notif-icon-box {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}
.notif-icon-box.info {
  background: rgba(46, 213, 115, 0.15);
  color: #2ed573;
}
.notif-icon-box.alert {
  background: rgba(255, 90, 31, 0.15);
  color: #FF5A1F;
}
.notif-icon-box.system {
  background: rgba(112, 161, 255, 0.15);
  color: #70a1ff;
}

/* Payments & Invoices Styling */
.payment-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.payment-kpi-card {
  background: #111116;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 18px 20px;
}
.payment-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.payment-card-badge.paid {
  background: rgba(46, 213, 115, 0.15);
  color: #2ed573;
}
.payment-card-badge.pending {
  background: rgba(255, 171, 0, 0.15);
  color: #ffab00;
}
`;

if (!css.includes('STACKLY UNIFIED SIDEBAR ENHANCEMENTS')) {
  css += '\n' + additionalStyles;
  fs.writeFileSync(dashCssPath, css, 'utf8');
  console.log('css/dashboard.css updated with sidebar enhancements!');
}
