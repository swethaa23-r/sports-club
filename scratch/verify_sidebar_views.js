const fs = require('fs');
const path = require('path');

console.log('--- VERIFYING SIDEBAR & VIEW MAPPING FOR ALL 3 DASHBOARDS ---');

// 1. User Dashboard Check
const userHtml = fs.readFileSync(path.join(__dirname, '../user-dashboard.html'), 'utf8');
const userRequiredViews = [
  'overview',
  'profile',
  'membership',
  'programs',
  'bookings',
  'schedule',
  'attendance',
  'payments',
  'notifications',
  'settings'
];

console.log('\nChecking User Dashboard...');
userRequiredViews.forEach(v => {
  const hasNav = userHtml.includes(`data-view="${v}"`);
  const hasSection = userHtml.includes(`id="view-${v}"`);
  if (hasNav && hasSection) {
    console.log(`  [PASS] User View "${v}": Nav button & section #view-${v} verified.`);
  } else {
    console.error(`  [FAIL] User View "${v}": hasNav=${hasNav}, hasSection=${hasSection}`);
  }
});

// 2. Trainer Dashboard Check
const trainerHtml = fs.readFileSync(path.join(__dirname, '../trainer-dashboard.html'), 'utf8');
const trainerRequiredViews = [
  'view-overview',
  'view-profile',
  'view-members',
  'view-programs',
  'view-schedule',
  'view-bookings',
  'view-attendance',
  'view-progress',
  'view-notifications',
  'view-settings'
];

console.log('\nChecking Trainer Dashboard...');
trainerRequiredViews.forEach(v => {
  const hasNav = trainerHtml.includes(`data-view="${v}"`);
  const hasSection = trainerHtml.includes(`id="${v}"`);
  if (hasNav && hasSection) {
    console.log(`  [PASS] Trainer View "${v}": Nav button & section #${v} verified.`);
  } else {
    console.error(`  [FAIL] Trainer View "${v}": hasNav=${hasNav}, hasSection=${hasSection}`);
  }
});

// 3. Admin Dashboard Check
const adminHtml = fs.readFileSync(path.join(__dirname, '../admin-dashboard.html'), 'utf8');
const adminRequiredViews = [
  'view-overview',
  'view-members',
  'view-trainers',
  'view-sports',
  'view-programs',
  'view-memberships',
  'view-bookings',
  'view-events',
  'view-payments',
  'view-reports',
  'view-notifications',
  'view-settings',
  'view-profile'
];

console.log('\nChecking Admin Dashboard...');
adminRequiredViews.forEach(v => {
  const hasNav = adminHtml.includes(`data-view="${v}"`);
  const hasSection = adminHtml.includes(`id="${v}"`);
  if (hasNav && hasSection) {
    console.log(`  [PASS] Admin View "${v}": Nav button & section #${v} verified.`);
  } else {
    console.error(`  [FAIL] Admin View "${v}": hasNav=${hasNav}, hasSection=${hasSection}`);
  }
});
