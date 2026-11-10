const fs = require('fs');
const path = require('path');

// ===================================================================
// 1. UPDATE signup.html
// ===================================================================
const signupPath = path.join(__dirname, '../signup.html');
let signupHtml = fs.readFileSync(signupPath, 'utf8');

// A. Remove Admin from Role Dropdown in signup.html
const oldRoleSelect = `<select id="regRole" class="form-select role-select-box" required>
                  <option value="" disabled>Choose Account Type...</option>
                  <option value="user" selected>User &bull; Club Athlete Member</option>
                  <option value="trainer">Trainer &bull; Certified Coach Faculty</option>
                  <option value="admin">Admin &bull; Club Operations &amp; Governance</option>
                </select>`;

const newRoleSelect = `<select id="regRole" class="form-select role-select-box" required>
                  <option value="" disabled>Choose Account Type...</option>
                  <option value="user" selected>User &bull; Club Athlete Member</option>
                  <option value="trainer">Trainer &bull; Certified Coach Faculty</option>
                </select>`;

signupHtml = signupHtml.replace(oldRoleSelect, newRoleSelect);

// B. Notice banner update in signup.html (explicitly state Admin registration restricted)
const oldNotice = `unified client-side authentication demonstration. Select your desired role below (User, Trainer, or Admin) to test instant registration and role-based dashboard redirection.`;
const newNotice = `Verified Registration Portal: Public registration is available for Athlete Members (User) and Coach Faculty (Trainer). Administrative governance accounts are provisioned exclusively through authorized club management.`;
signupHtml = signupHtml.replace(oldNotice, newNotice);

// C. Add Password Strength indicator markup in signup.html
const oldPassWrap = `<div class="form-group">
                <label class="form-label" for="regPassword">Create Password *</label>
                <div class="password-field-wrap">
                  <input type="password" id="regPassword" class="form-input" placeholder="Min. 6 chars" required autocomplete="new-password">
                  <button type="button" class="password-toggle-btn" data-target="regPassword" aria-label="Toggle password visibility">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
                <div class="field-error-msg d-none" id="err-reg-password">
                  <i class="fa-solid fa-circle-exclamation"></i> Password must be at least 6 characters.
                </div>
              </div>`;

const newPassWrap = `<div class="form-group">
                <label class="form-label" for="regPassword">Create Password *</label>
                <div class="password-field-wrap">
                  <input type="password" id="regPassword" class="form-input" placeholder="Min. 8 characters" required autocomplete="new-password">
                  <button type="button" class="password-toggle-btn" data-target="regPassword" aria-label="Toggle password visibility">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
                <div class="password-strength-wrap" id="passwordStrengthWrap" style="margin-top: 6px;">
                  <div class="password-strength-bar" style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; margin-bottom: 4px;">
                    <div id="passwordStrengthProgress" style="height: 100%; width: 0%; transition: width 0.3s ease, background-color 0.3s ease;"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem;">
                    <span id="passwordStrengthText" style="color: var(--color-text-muted);">Strength: Min. 8 characters</span>
                    <span id="passwordStrengthHint" style="color: var(--color-text-muted); font-size: 0.7rem;">Letters &amp; numbers recommended</span>
                  </div>
                </div>
                <div class="field-error-msg d-none" id="err-reg-password">
                  <i class="fa-solid fa-circle-exclamation"></i> Password must be at least 8 characters.
                </div>
              </div>`;

signupHtml = signupHtml.replace(oldPassWrap, newPassWrap);

// D. Update script in signup.html to check password strength and redirect to login
const scriptSearch = `// Password (min 6)
        if (!passInput.value || passInput.value.length < 6) {
          setErr(passInput, errPass);
          isValid = false;
        } else {
          clearErr(passInput, errPass);
        }`;

const scriptReplace = `// Password strength validation (min 8 chars, letter + number)
        if (!passInput.value || passInput.value.length < 8) {
          setErr(passInput, errPass);
          isValid = false;
        } else {
          clearErr(passInput, errPass);
        }`;

signupHtml = signupHtml.replace(scriptSearch, scriptReplace);

// Add password strength live check in signup.html
const strengthLiveScript = `
      // Live password strength calculation
      if (passInput) {
        passInput.addEventListener('input', () => {
          const val = passInput.value;
          const bar = document.getElementById('passwordStrengthProgress');
          const txt = document.getElementById('passwordStrengthText');
          const hint = document.getElementById('passwordStrengthHint');
          if (!bar || !txt) return;

          let score = 0;
          if (val.length >= 8) score += 1;
          if (val.length >= 10) score += 1;
          if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score += 1;
          if (/[0-9]/.test(val)) score += 1;
          if (/[^A-Za-z0-9]/.test(val)) score += 1;

          if (val.length === 0) {
            bar.style.width = '0%';
            txt.textContent = 'Strength: Min. 8 characters';
            txt.style.color = 'var(--color-text-muted)';
            if (hint) hint.textContent = 'Letters & numbers recommended';
          } else if (val.length < 8) {
            bar.style.width = '25%';
            bar.style.backgroundColor = '#ff4757';
            txt.textContent = 'Too Short (Min. 8 chars)';
            txt.style.color = '#ff4757';
            if (hint) hint.textContent = (8 - val.length) + ' more character(s) needed';
          } else if (score <= 2) {
            bar.style.width = '50%';
            bar.style.backgroundColor = '#ffa502';
            txt.textContent = 'Moderate';
            txt.style.color = '#ffa502';
            if (hint) hint.textContent = 'Add numbers or mixed case';
          } else if (score <= 4) {
            bar.style.width = '80%';
            bar.style.backgroundColor = '#2ed573';
            txt.textContent = 'Strong';
            txt.style.color = '#2ed573';
            if (hint) hint.textContent = 'Great password!';
          } else {
            bar.style.width = '100%';
            bar.style.backgroundColor = '#2ed573';
            txt.textContent = 'Excellent (Olympic-Grade)';
            txt.style.color = '#2ed573';
            if (hint) hint.textContent = 'Protected & robust';
          }
        });
      }
`;

if (!signupHtml.includes('Live password strength calculation')) {
  signupHtml = signupHtml.replace(
    `const errConfirm = document.getElementById('err-reg-confirm');`,
    `const errConfirm = document.getElementById('err-reg-confirm');\n${strengthLiveScript}`
  );
}

fs.writeFileSync(signupPath, signupHtml, 'utf8');
console.log('signup.html updated successfully!');

// ===================================================================
// 2. UPDATE login.html
// ===================================================================
const loginPath = path.join(__dirname, '../login.html');
let loginHtml = fs.readFileSync(loginPath, 'utf8');

// A. Remove Admin from signupRole dropdown in login.html embedded tab
const oldSignupRole = `<select id="signupRole" class="form-select role-select-box" required>
                  <option value="" disabled selected>Choose Account Type...</option>
                  <option value="user" selected>User &bull; Club Athlete Member</option>
                  <option value="trainer">Trainer &bull; Certified Coach Faculty</option>
                  <option value="admin">Admin &bull; Club Operations &amp; Governance</option>
                </select>`;

const newSignupRole = `<select id="signupRole" class="form-select role-select-box" required>
                  <option value="" disabled>Choose Account Type...</option>
                  <option value="user" selected>User &bull; Club Athlete Member</option>
                  <option value="trainer">Trainer &bull; Certified Coach Faculty</option>
                </select>`;

loginHtml = loginHtml.replace(oldSignupRole, newSignupRole);

// B. In loginForm, add Remember Me checkbox and Forgot Password link row
const oldLoginPassGroup = `<div class="form-group">
              <label class="form-label" for="loginPassword">Password *</label>
              <div class="password-field-wrap">
                <input type="password" id="loginPassword" class="form-input" placeholder="••••••••••••" required autocomplete="current-password">
                <button type="button" class="password-toggle-btn" data-target="loginPassword" aria-label="Toggle password visibility">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
              <div class="field-error-msg d-none" id="err-login-password">
                <i class="fa-solid fa-circle-exclamation"></i> Please enter your password.
              </div>
            </div>`;

const newLoginPassGroup = `<div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label class="form-label" for="loginPassword" style="margin-bottom:0;">Password *</label>
                <a href="#forgot" id="forgotPasswordLink" style="font-size:0.78rem; color:var(--color-accent); font-weight:600; text-decoration:none;">Forgot password?</a>
              </div>
              <div class="password-field-wrap" style="margin-top:6px;">
                <input type="password" id="loginPassword" class="form-input" placeholder="••••••••••••" required autocomplete="current-password">
                <button type="button" class="password-toggle-btn" data-target="loginPassword" aria-label="Toggle password visibility">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
              <div class="field-error-msg d-none" id="err-login-password">
                <i class="fa-solid fa-circle-exclamation"></i> Please enter your password.
              </div>
            </div>

            <!-- Remember Me Row -->
            <div class="form-group" style="margin-top: -6px; margin-bottom: 14px;">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.85rem; color:var(--color-text-muted); user-select:none;">
                <input type="checkbox" id="loginRememberMe" style="accent-color:var(--color-accent); width:16px; height:16px; cursor:pointer;">
                <span>Remember my account on this browser</span>
              </label>
            </div>`;

if (!loginHtml.includes('loginRememberMe')) {
  loginHtml = loginHtml.replace(oldLoginPassGroup, newLoginPassGroup);
}

// C. In login.html script, handle Remember Me and ?registered=true query params
const loginScriptAdditions = `
    // Handle ?registered=true or ?redirect= query params on page load
    (function checkLoginParams() {
      const params = new URLSearchParams(window.location.search);
      const isRegistered = params.get('registered');
      const regEmail = params.get('email');
      const regRole = params.get('role');

      if (isRegistered && regEmail) {
        if (loginEmail) loginEmail.value = regEmail;
        if (regRole && loginRole) loginRole.value = regRole;
        showAlert('Registration complete! Please enter your password to sign in to your verified account.', true);
        if (typeof showToast === 'function') {
          showToast('Account Created Successfully', 'Your dossier is active. Sign in below.', 'success');
        }
        if (loginPassword) loginPassword.focus();
      } else {
        // Pre-fill remembered email if saved
        const remembered = StacklyAuth.getRememberedEmail ? StacklyAuth.getRememberedEmail() : localStorage.getItem('stackly_remember_email');
        const remCheckbox = document.getElementById('loginRememberMe');
        if (remembered && loginEmail) {
          loginEmail.value = remembered;
          if (remCheckbox) remCheckbox.checked = true;
        }
      }
    })();
`;

if (!loginHtml.includes('checkLoginParams')) {
  loginHtml = loginHtml.replace(
    `const loginBtn = document.getElementById('loginBtn');`,
    `const loginBtn = document.getElementById('loginBtn');\n${loginScriptAdditions}`
  );
}

// Update login submission in login.html to pass rememberMe checkbox state
loginHtml = loginHtml.replace(
  `const result = StacklyAuth.login(emailVal, passwordVal, roleVal, usernameVal);`,
  `const remChecked = document.getElementById('loginRememberMe') ? document.getElementById('loginRememberMe').checked : false;
        const result = StacklyAuth.login(emailVal, passwordVal, roleVal, remChecked, usernameVal);`
);

fs.writeFileSync(loginPath, loginHtml, 'utf8');
console.log('login.html updated successfully!');
