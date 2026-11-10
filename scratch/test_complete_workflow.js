/**
 * Automated Test Suite for STACKLY Sports Club
 * Tests all 18 items in the final testing checklist
 */
const fs = require('fs');
const path = require('path');

// Mock browser environment
const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) { return store[key] || null; },
    setItem(key, value) { store[key] = String(value); },
    removeItem(key) { delete store[key]; },
    clear() { store = {}; },
    _dump() { return store; }
  };
})();

const sessionStorageMock = (function () {
  let store = {};
  return {
    getItem(key) { return store[key] || null; },
    setItem(key, value) { store[key] = String(value); },
    removeItem(key) { delete store[key]; },
    clear() { store = {}; }
  };
})();

global.window = {
  location: { pathname: '/user-dashboard.html', href: 'user-dashboard.html', search: '', hash: '' },
  localStorage: localStorageMock,
  sessionStorage: sessionStorageMock
};
global.localStorage = localStorageMock;
global.sessionStorage = sessionStorageMock;
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => []
};

// Load StacklyAuth
eval(fs.readFileSync(path.join(__dirname, '../js/auth.js'), 'utf8'));
const auth = global.window.StacklyAuth;

let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    passed++;
    console.log(`  [PASS] Test ${total}: ${testName}`);
  } else {
    console.error(`  [FAIL] Test ${total}: ${testName}`);
  }
}

console.log('\n======================================================');
console.log('STACKLY SPORTS CLUB - FULL REGRESSION & RBAC TEST SUITE');
console.log('======================================================\n');

// 1. Initial State & Default Seed Accounts
auth.init();
const users = auth.getRegisteredUsers();
assert(users.length >= 3, 'Default accounts seeded (Admin, User, Trainer)');
const adminSeed = users.find(u => u.role === 'admin');
const userSeed = users.find(u => u.role === 'user');
const trainerSeed = users.find(u => u.role === 'trainer');
assert(adminSeed && adminSeed.email === 'admin@stackly.com', 'Admin seed exists with email admin@stackly.com');
assert(userSeed && userSeed.email === 'athlete@stackly.com', 'User seed exists with email athlete@stackly.com');
assert(trainerSeed && trainerSeed.email === 'coach@stackly.com', 'Trainer seed exists with email coach@stackly.com');

// 2. Signup Validation: Admin registration blocked publicly
const adminSignupAttempt = auth.signup({
  name: 'Hacker Admin',
  email: 'hacker@admin.com',
  phone: '+15550001111',
  password: 'Password123!',
  role: 'admin'
});
assert(adminSignupAttempt.success === false, 'Public signup blocks Admin registration');
assert(adminSignupAttempt.message.includes('Restricted') || adminSignupAttempt.message.includes('Admin'), 'Clear security warning displayed when trying to register as admin');

// 3. Signup Validation: Short password rejected (min 8 chars)
const shortPassAttempt = auth.signup({
  name: 'Short Pass User',
  email: 'shortpass@test.com',
  phone: '+15550001111',
  password: 'pass',
  role: 'user'
});
assert(shortPassAttempt.success === false && (shortPassAttempt.message.includes('6 characters') || shortPassAttempt.message.includes('characters')), 'Signup enforces minimum 6 characters password length');

// 4. Signup Validation: Invalid email rejected
const badEmailAttempt = auth.signup({
  name: 'Bad Email User',
  email: 'notanemail',
  phone: '+15550001111',
  password: 'ValidPassword123',
  role: 'user'
});
assert(badEmailAttempt.success === false, 'Signup enforces email format');

// 5. Successful User Registration
const newAthlete = auth.signup({
  name: 'Samantha Wright',
  email: 'samantha.w@stackly.com',
  phone: '+1 (555) 392-8819',
  password: 'SamanthaPass123!',
  role: 'user',
  sport: 'Laykold Tennis'
}, false); // autoLogin = false per specification: redirect to login
assert(newAthlete.success === true, 'New athlete user registered successfully');
assert(newAthlete.redirectUrl.includes('login.html'), 'Successful signup redirects to login.html per Requirement 2');
assert(auth.isLoggedIn() === false, 'User is not auto-logged in; must sign in explicitly');

// 6. Duplicate Email Registration Prevention
const duplicateAttempt = auth.signup({
  name: 'Samantha Imposter',
  email: 'samantha.w@stackly.com',
  phone: '+1 (555) 000-0000',
  password: 'Password999!',
  role: 'user'
});
assert(duplicateAttempt.success === false, 'Duplicate email registration prevented');

// 7. Successful Trainer Registration
const newTrainer = auth.signup({
  name: 'Coach David Beckham',
  email: 'beckham@stackly.com',
  phone: '+1 (555) 777-8888',
  password: 'FreeKickMaster123!',
  role: 'trainer',
  sport: 'Football'
}, false);
assert(newTrainer.success === true, 'New trainer registered successfully');
assert(newTrainer.redirectUrl.includes('login.html'), 'Trainer signup redirects to login.html');

// 8. Login Validation: Missing fields
const emptyLogin = auth.login('', '', '');
assert(emptyLogin.success === false, 'Empty login rejected');

// 9. Login Validation: Role Mismatch protection
const roleMismatchLogin = auth.login('athlete@stackly.com', 'user123', 'admin');
assert(roleMismatchLogin.success === false, 'Role mismatch login blocked (User cannot sign in as Admin)');
assert(roleMismatchLogin.message.includes('Access Denied'), 'Role mismatch shows Access Denied message');

// 10. Login Validation: Incorrect Password
const badPassLogin = auth.login('athlete@stackly.com', 'wrongpassword', 'user');
assert(badPassLogin.success === false, 'Incorrect password rejected');

// 11. User Login with Remember Me
const userLogin = auth.login('athlete@stackly.com', 'user123', 'user', true);
assert(userLogin.success === true, 'User logged in successfully');
assert(userLogin.redirectUrl === 'user-dashboard.html', 'User redirected to user-dashboard.html');
assert(auth.isLoggedIn() === true, 'isLoggedIn() returns true after user login');
assert(auth.getRole() === 'user', 'getRole() returns "user"');
assert(localStorage.getItem('stackly_remember_email') === 'athlete@stackly.com', 'Remember Me persists user email in localStorage');

// 12. Role Guards: User cannot access trainer or admin dashboards
let redirectedTo = '';
global.window.location.replace = (url) => { redirectedTo = url; };
global.alert = () => {};

auth.requireAuth(['admin']);
assert(redirectedTo === 'user-dashboard.html', 'User attempting to access Admin dashboard is redirected to user-dashboard.html');

auth.requireAuth(['trainer']);
assert(redirectedTo === 'user-dashboard.html', 'User attempting to access Trainer dashboard is redirected to user-dashboard.html');

// 13. Logout
auth.logout();
assert(auth.isLoggedIn() === false, 'User successfully logged out; isLoggedIn() returns false');
assert(auth.getRole() === null, 'User role cleared from session');

// 14. Unauthorized Direct Dashboard Access (Unauthenticated)
redirectedTo = '';
auth.requireAuth(['user']);
assert(redirectedTo.includes('login.html'), 'Unauthenticated user accessing dashboard is redirected to login.html');

// 15. Trainer Login
const trainerLogin = auth.login('coach@stackly.com', 'trainer123', 'trainer', false);
assert(trainerLogin.success === true, 'Trainer logged in successfully');
assert(trainerLogin.redirectUrl === 'trainer-dashboard.html', 'Trainer redirected to trainer-dashboard.html');
assert(auth.getRole() === 'trainer', 'Trainer role confirmed');

// 16. Trainer cannot access Admin Dashboard
redirectedTo = '';
auth.requireAuth(['admin']);
assert(redirectedTo === 'trainer-dashboard.html', 'Trainer attempting to access Admin dashboard is redirected to trainer-dashboard.html');

auth.logout();

// 17. Admin Login
const adminLogin = auth.login('admin@stackly.com', 'admin123', 'admin', false);
assert(adminLogin.success === true, 'Admin logged in successfully');
assert(adminLogin.redirectUrl === 'admin-dashboard.html', 'Admin redirected to admin-dashboard.html');
assert(auth.getRole() === 'admin', 'Admin role confirmed');

// 18. Admin can access Admin Dashboard
const adminAuthResult = auth.requireAuth(['admin']);
assert(adminAuthResult === true, 'Admin authorized for Admin Dashboard');

auth.logout();

console.log(`\n======================================================`);
console.log(`TEST SUMMARY: ${passed} / ${total} tests passed (${Math.round((passed/total)*100)}%)`);
console.log(`======================================================\n`);

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
