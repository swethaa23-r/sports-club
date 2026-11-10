const fs = require('fs');
const path = require('path');

console.log('=== TEST: USER CREDENTIALS & 6-CHAR PASSWORD VERIFICATION ===\n');

// Mock localStorage and window
const store = {};
global.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};
global.sessionStorage = global.localStorage;
global.document = { readyState: 'complete', querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {} };
global.window = { localStorage, sessionStorage, location: { href: '' }, document };

// Load auth.js
const authCode = fs.readFileSync(path.join(__dirname, '../js/auth.js'), 'utf8');
eval(authCode);

const StacklyAuth = window.StacklyAuth;
StacklyAuth.init();

// 1. Email Regex Test
console.log('1. Testing email regex on swetharamesh23@gmail.com...');
const loginHtml = fs.readFileSync(path.join(__dirname, '../login.html'), 'utf8');
if (loginHtml.includes('[^s@]')) {
  throw new Error('Found corrupted regex [^s@] in login.html!');
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const testEmails = [
  'swetharamesh23@gmail.com',
  'SWE@gmail.com',
  'swetha@stackly.com',
  'athlete@stackly.com',
  'coach.pro@club.org',
  'user+tag@domain.co.uk'
];

testEmails.forEach(e => {
  if (!emailRegex.test(e)) throw new Error(`Email "${e}" failed regex!`);
  console.log(`  [PASS] Regex accepted: ${e}`);
});

// 2. Testing 6-char password variations (digits, alphabets, special chars, mixed)
console.log('\n2. Testing 6-character password variations for swetharamesh23@gmail.com...');

const passVariations = [
  { type: 'Digits only', pass: '123456' },
  { type: 'Alphabets only', pass: 'swetha' },
  { type: 'Special characters only', pass: '!@#$%^' },
  { type: 'Mixed (letters + numbers + symbols)', pass: 'Swe@23' },
  { type: 'User typed password in screenshot (11 chars)', pass: 'mypassword1' }
];

passVariations.forEach(v => {
  const res = StacklyAuth.login('swetharamesh23@gmail.com', v.pass, 'user', false, 'SWE');
  if (!res.success) {
    throw new Error(`Login failed for ${v.type} ("${v.pass}"): ${res.message}`);
  }
  if (res.redirectUrl !== 'user-dashboard.html') {
    throw new Error(`Expected redirect to user-dashboard.html, got ${res.redirectUrl}`);
  }
  if (localStorage.getItem('stacklyUserName') !== 'SWE') {
    throw new Error(`Expected username "SWE" stored, got ${localStorage.getItem('stacklyUserName')}`);
  }
  console.log(`  [PASS] ${v.type} ("${v.pass}") logged in -> redirect: ${res.redirectUrl}, name: ${res.user.name}`);
});

// 3. Testing that short password (< 6 chars) is rejected
console.log('\n3. Testing that short password (< 6 chars) is rejected...');
const shortPassRes = StacklyAuth.login('swetharamesh23@gmail.com', '12345', 'user', false, 'SWE');
if (shortPassRes.success) {
  throw new Error('Password with 5 characters should be rejected!');
}
console.log(`  [PASS] 5-character password rejected: "${shortPassRes.message}"`);

// 4. Testing signup with 6-char password
console.log('\n4. Testing registration with 6-character passwords...');
const signupVariations = [
  { name: 'Digit Athlete', email: 'digits@stackly.com', pass: '654321', role: 'user', sport: 'Football' },
  { name: 'Alpha Athlete', email: 'alpha@stackly.com', pass: 'athlet', role: 'user', sport: 'Tennis' },
  { name: 'Special Athlete', email: 'special@stackly.com', pass: '!@#$*&', role: 'trainer', sport: 'Aquatics' },
  { name: 'Mixed Athlete', email: 'mixed@stackly.com', pass: 'Mix#99', role: 'user', sport: 'Badminton' }
];

signupVariations.forEach(v => {
  const regRes = StacklyAuth.signup({
    name: v.name,
    email: v.email,
    phone: '+1 (555) 123-4567',
    password: v.pass,
    role: v.role,
    sport: v.sport
  });
  if (!regRes.success) {
    throw new Error(`Signup failed for ${v.name} with pass "${v.pass}": ${regRes.message}`);
  }
  console.log(`  [PASS] ${v.name} signed up with 6-char password ("${v.pass}")`);
});

// 5. Short signup password (< 6 chars) rejected
const shortSignup = StacklyAuth.signup({
  name: 'Fail User',
  email: 'fail@stackly.com',
  phone: '+1 (555) 123-4567',
  password: '12345',
  role: 'user',
  sport: 'Tennis'
});
if (shortSignup.success) {
  throw new Error('Signup with 5 characters should fail!');
}
console.log(`  [PASS] Signup with 5-char password rejected: "${shortSignup.message}"`);

console.log('\nALL USER CREDENTIAL AND PASSWORD TESTS PASSED 100%!');
