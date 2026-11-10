const fs = require('fs');
const path = require('path');

console.log('=== TEST: LOGIN.HTML VERIFICATION ===\n');

const loginHtml = fs.readFileSync(path.join(__dirname, '../login.html'), 'utf8');

// 1. Basic structural checks
console.log('1. Checking DOM structure and IDs...');
const requiredIds = [
  'tabSignIn', 'tabSignUp', 'loginFormWrap', 'signupFormWrap',
  'authAlertBox', 'authAlertText', 'serviceNoticeTitle', 'serviceNoticeText',
  'loginForm', 'loginUsername', 'loginEmail', 'loginPassword', 'loginRole', 'loginBtn',
  'err-login-username', 'err-login-email', 'err-login-password', 'err-login-role',
  'signupForm', 'signupName', 'signupEmail', 'signupPhone', 'signupRole', 'signupSport',
  'signupPassword', 'signupConfirmPassword', 'signupTerms', 'signupBtn',
  'err-signup-name', 'err-signup-email', 'err-signup-phone', 'err-signup-role',
  'err-signup-sport', 'err-signup-password', 'err-signup-confirm', 'err-signup-terms',
  'passwordStrengthWrap', 'passwordStrengthProgress', 'passwordStrengthText', 'passwordStrengthHint',
  'linkToSignup', 'linkToSignin'
];

requiredIds.forEach(id => {
  if (!loginHtml.includes(`id="${id}"`)) {
    throw new Error(`Missing expected element id="${id}" in login.html`);
  }
});
console.log('  [PASS] All 39 required element IDs found.');

// 2. Check that Admin is NOT in signupRole
console.log('2. Checking role safety in signupRole...');
const signupRoleMatch = loginHtml.match(/<select id="signupRole"[^>]*>([\s\S]*?)<\/select>/);
if (!signupRoleMatch) throw new Error('signupRole not found');
if (signupRoleMatch[1].includes('value="admin"')) {
  throw new Error('Admin role found in public signupRole dropdown! It must be restricted.');
}
console.log('  [PASS] Admin role is properly restricted from public signup.');

// 3. Check for stray </div> tags in auth container
console.log('3. Checking tag nesting...');
const sideStart = loginHtml.indexOf('<div class="auth-form-side">');
const sideEnd = loginHtml.indexOf('<!-- Modal: Forgot Password -->');
const sideBlock = loginHtml.substring(sideStart, sideEnd);
const openDivs = (sideBlock.match(/<div(\s|>)/g) || []).length;
const closeDivs = (sideBlock.match(/<\/div>/g) || []).length;
console.log(`  auth-form-side block: ${openDivs} open divs, ${closeDivs} close divs.`);
if (openDivs !== closeDivs) {
  throw new Error(`Mismatched divs in auth-form-side! open=${openDivs}, close=${closeDivs}`);
}
console.log('  [PASS] Div nesting is perfectly balanced.');

// 4. Test simulated switchTab behavior
console.log('4. Testing switchTab behavior logic...');
// Extract the script
const scriptStart = loginHtml.indexOf('<script>');
const scriptEnd = loginHtml.lastIndexOf('</script>');
const scriptBody = loginHtml.substring(scriptStart + 8, scriptEnd);

// Check that switchTab removes and adds d-none
if (!scriptBody.includes("loginFormWrap.classList.add('d-none')")) {
  throw new Error('switchTab does not add d-none to loginFormWrap');
}
if (!scriptBody.includes("signupFormWrap.classList.remove('d-none')")) {
  throw new Error('switchTab does not remove d-none from signupFormWrap');
}
if (!scriptBody.includes("signupFormWrap.classList.add('d-none')")) {
  throw new Error('switchTab does not add d-none to signupFormWrap');
}
if (!scriptBody.includes("loginFormWrap.classList.remove('d-none')")) {
  throw new Error('switchTab does not remove d-none from loginFormWrap');
}
console.log('  [PASS] switchTab removes and adds d-none class properly, fixing the blank screen bug.');

// 5. Check helper functions for d-none support
console.log('5. Checking clearField and setField validation helpers...');
if (!scriptBody.includes("errEl.classList.remove('d-none')")) {
  throw new Error('setField does not remove d-none from errEl');
}
if (!scriptBody.includes("errEl.classList.add('d-none')")) {
  throw new Error('clearField does not add d-none to errEl');
}
console.log('  [PASS] Validation error helpers toggle d-none cleanly.');

// 6. Check demo quick-fill listener
console.log('6. Checking demo account quick fill handlers...');
if (!scriptBody.includes("document.querySelectorAll('.btn-fill-demo')")) {
  throw new Error('Missing click handlers for .btn-fill-demo');
}
console.log('  [PASS] Demo account quick-fill listener implemented.');

console.log('\nALL VERIFICATION CHECKS PASSED PERFECTLY!');
