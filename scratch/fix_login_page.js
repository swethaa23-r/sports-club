const fs = require('fs');
const path = require('path');

const loginPath = path.join(__dirname, '../login.html');
let html = fs.readFileSync(loginPath, 'utf8');

// 1. Update the Service Notice to have ID attributes for dynamic title and description
const oldNotice = `        <!-- Service Notice Banner -->
        <div class="auth-service-notice">
          <i class="fa-solid fa-shield-halved"></i>
          <div>
            <strong>Verified Member Portal:</strong>
            Enter your credentials and select your authorized role to access your personalized training dossier and performance metrics.
          </div>
        </div>`;

const newNotice = `        <!-- Service Notice Banner -->
        <div class="auth-service-notice">
          <i class="fa-solid fa-shield-halved"></i>
          <div>
            <strong id="serviceNoticeTitle">Verified Member Portal:</strong>
            <span id="serviceNoticeText">Enter your credentials and select your authorized role to access your personalized training dossier and performance metrics.</span>
          </div>
        </div>`;

if (html.includes(oldNotice)) {
  html = html.replace(oldNotice, newNotice);
}

// 2. Remove Admin from signupRole in login.html embedded tab
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

if (html.includes(oldSignupRole)) {
  html = html.replace(oldSignupRole, newSignupRole);
}

// 3. Add password strength meter and back to sign in link to signupForm in login.html
const oldSignupPassWrap = `            <!-- Password & Confirm Password -->
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label" for="signupPassword">Password *</label>
                <div class="password-field-wrap">
                  <input type="password" id="signupPassword" class="form-input" placeholder="Min 8 characters" required autocomplete="new-password">
                  <button type="button" class="password-toggle-btn" data-target="signupPassword" aria-label="Toggle password visibility">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
                <div class="field-error-msg d-none" id="err-signup-password">
                  <i class="fa-solid fa-circle-exclamation"></i> Password must be at least 8 characters.
                </div>
              </div>`;

const newSignupPassWrap = `            <!-- Password & Confirm Password -->
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label" for="signupPassword">Password *</label>
                <div class="password-field-wrap">
                  <input type="password" id="signupPassword" class="form-input" placeholder="Min 8 characters" required autocomplete="new-password">
                  <button type="button" class="password-toggle-btn" data-target="signupPassword" aria-label="Toggle password visibility">
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
                <div class="field-error-msg d-none" id="err-signup-password">
                  <i class="fa-solid fa-circle-exclamation"></i> Password must be at least 8 characters.
                </div>
              </div>`;

if (html.includes(oldSignupPassWrap)) {
  html = html.replace(oldSignupPassWrap, newSignupPassWrap);
}

// 4. Add "Already registered? Sign In to Portal" link below the Create Athlete Account button and remove stray </div>
const oldSignupBtnEnd = `            <!-- Submit Button -->
            <button type="submit" id="signupBtn" class="btn btn-primary w-100 btn-lg magnetic-btn">
              <span>Create Athlete Account</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>

      </div>
    </div>

  </div>`;

const newSignupBtnEnd = `            <!-- Submit Button -->
            <button type="submit" id="signupBtn" class="btn btn-primary w-100 btn-lg magnetic-btn">
              <span>Create Athlete Account</span> <i class="fa-solid fa-arrow-right"></i>
            </button>

            <!-- Switch to Sign In Prompt -->
            <div class="auth-signup-prompt" style="margin-top: 20px; text-align: center; font-size: 0.9rem; color: var(--color-text-muted);">
              Already registered with Stackly? <a href="#signin" id="linkToSignin" style="color: var(--color-accent); font-weight: 600; text-decoration: none;">Sign In to Portal</a>
            </div>
          </form>
        </div>

      </div>
    </div>`;

if (html.includes(oldSignupBtnEnd)) {
  html = html.replace(oldSignupBtnEnd, newSignupBtnEnd);
}

// 5. Replace the entire script block with clean, bug-free, robust implementation
const scriptStartIdx = html.indexOf('<script>');
const scriptEndIdx = html.lastIndexOf('</script>');

if (scriptStartIdx !== -1 && scriptEndIdx !== -1) {
  const newScript = `<script>
    // Tab Switching Logic (Sign In vs Create Account)
    const tabSignIn = document.getElementById('tabSignIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const loginFormWrap = document.getElementById('loginFormWrap');
    const signupFormWrap = document.getElementById('signupFormWrap');
    const alertBox = document.getElementById('authAlertBox');
    const alertText = document.getElementById('authAlertText');
    const serviceNoticeTitle = document.getElementById('serviceNoticeTitle');
    const serviceNoticeText = document.getElementById('serviceNoticeText');

    function showAlert(msg, isSuccess = false) {
      if (!alertBox || !alertText) return;
      alertBox.className = 'auth-alert-box ' + (isSuccess ? 'alert-success' : 'alert-error');
      alertBox.querySelector('i').className = isSuccess ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
      alertText.textContent = msg;
      alertBox.style.display = 'flex';
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 7000);
    }

    function switchTab(target) {
      if (target === 'signup') {
        tabSignUp.classList.add('active');
        tabSignUp.setAttribute('aria-selected', 'true');
        tabSignIn.classList.remove('active');
        tabSignIn.setAttribute('aria-selected', 'false');

        // Hide login cleanly and show signup
        loginFormWrap.classList.add('d-none');
        loginFormWrap.classList.remove('active');
        loginFormWrap.style.display = 'none';

        signupFormWrap.classList.remove('d-none');
        signupFormWrap.classList.add('active');
        signupFormWrap.style.display = 'block';

        if (serviceNoticeTitle && serviceNoticeText) {
          serviceNoticeTitle.textContent = 'Athlete Registration Portal:';
          serviceNoticeText.textContent = 'Create your verified athletic dossier as a Member (User) or Coach (Trainer). Enter your credentials below to initialize your training dossier.';
        }

        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, null, '#signup');
        }

        if (typeof gsap !== 'undefined') {
          gsap.fromTo(signupFormWrap, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
        }
      } else {
        tabSignIn.classList.add('active');
        tabSignIn.setAttribute('aria-selected', 'true');
        tabSignUp.classList.remove('active');
        tabSignUp.setAttribute('aria-selected', 'false');

        // Hide signup cleanly and show login
        signupFormWrap.classList.add('d-none');
        signupFormWrap.classList.remove('active');
        signupFormWrap.style.display = 'none';

        loginFormWrap.classList.remove('d-none');
        loginFormWrap.classList.add('active');
        loginFormWrap.style.display = 'block';

        if (serviceNoticeTitle && serviceNoticeText) {
          serviceNoticeTitle.textContent = 'Verified Member Portal:';
          serviceNoticeText.textContent = 'Enter your credentials and select your authorized role to access your personalized training dossier and performance metrics.';
        }

        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, null, window.location.pathname + window.location.search);
        }

        if (typeof gsap !== 'undefined') {
          gsap.fromTo(loginFormWrap, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
        }
      }
    }

    if (tabSignIn) tabSignIn.addEventListener('click', () => switchTab('signin'));
    if (tabSignUp) tabSignUp.addEventListener('click', () => switchTab('signup'));

    const linkToSignup = document.getElementById('linkToSignup');
    if (linkToSignup) {
      linkToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('signup');
      });
    }

    const linkToSignin = document.getElementById('linkToSignin');
    if (linkToSignin) {
      linkToSignin.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('signin');
      });
    }

    // Check URL hash on initial load
    if (window.location.hash === '#signup') {
      switchTab('signup');
    }

    // Password Visibility Toggle
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');

        if (!input) return;
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });

    // Forgot Password Modal
    const forgotModal = document.getElementById('forgotModal');
    const forgotLink = document.getElementById('forgotPasswordLink');
    const closeForgot = document.getElementById('closeForgotModal');

    if (forgotLink && forgotModal) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        forgotModal.classList.add('active');
      });
    }
    if (closeForgot && forgotModal) {
      closeForgot.addEventListener('click', () => {
        forgotModal.classList.remove('active');
      });
    }

    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        forgotModal.classList.remove('active');
        if (typeof showToast === 'function') {
          showToast('Password Recovery Dispatched', \`Instructions have been routed to \${email} (via configured authentication service).\`, 'info');
        }
        forgotForm.reset();
      });
    }

    // Helper functions for field validation with d-none support
    function clearField(input, errEl) {
      if (input) input.classList.remove('is-invalid');
      if (errEl) {
        errEl.classList.add('d-none');
        errEl.style.display = 'none';
      }
    }
    function setField(input, errEl) {
      if (input) input.classList.add('is-invalid');
      if (errEl) {
        errEl.classList.remove('d-none');
        errEl.style.display = 'flex';
      }
    }

    // Login Form Elements
    const loginForm = document.getElementById('loginForm');
    const loginUsername = document.getElementById('loginUsername');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginRole = document.getElementById('loginRole');
    const errLoginUsername = document.getElementById('err-login-username');
    const errLoginEmail = document.getElementById('err-login-email');
    const errLoginPassword = document.getElementById('err-login-password');
    const errLoginRole = document.getElementById('err-login-role');
    const loginBtn = document.getElementById('loginBtn');

    // Signup Form Elements
    const signupForm = document.getElementById('signupForm');
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPhone = document.getElementById('signupPhone');
    const signupRole = document.getElementById('signupRole');
    const signupSport = document.getElementById('signupSport');
    const signupPassword = document.getElementById('signupPassword');
    const signupConfirmPassword = document.getElementById('signupConfirmPassword');
    const signupTerms = document.getElementById('signupTerms');
    const signupBtn = document.getElementById('signupBtn');

    const errSignupName = document.getElementById('err-signup-name');
    const errSignupEmail = document.getElementById('err-signup-email');
    const errSignupPhone = document.getElementById('err-signup-phone');
    const errSignupRole = document.getElementById('err-signup-role');
    const errSignupSport = document.getElementById('err-signup-sport');
    const errSignupPassword = document.getElementById('err-signup-password');
    const errSignupConfirm = document.getElementById('err-signup-confirm');
    const errSignupTerms = document.getElementById('err-signup-terms');

    // Demo Account Quick Fill Button Listener
    document.querySelectorAll('.btn-fill-demo').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab('signin');
        const role = btn.getAttribute('data-role');
        const email = btn.getAttribute('data-email');
        const pass = btn.getAttribute('data-pass');
        const name = btn.getAttribute('data-name');

        if (loginUsername) loginUsername.value = name || '';
        if (loginEmail) loginEmail.value = email || '';
        if (loginPassword) loginPassword.value = pass || '';
        if (loginRole) loginRole.value = role || '';

        clearField(loginUsername, errLoginUsername);
        clearField(loginEmail, errLoginEmail);
        clearField(loginPassword, errLoginPassword);
        clearField(loginRole, errLoginRole);

        if (typeof showToast === 'function') {
          showToast('Demo Credentials Loaded', \`Filled \${role.toUpperCase()} credentials for \${name}. Click "Sign In To Portal".\`, 'info');
        }
      });
    });

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
        const remembered = StacklyAuth.getRememberedEmail ? StacklyAuth.getRememberedEmail() : localStorage.getItem('stackly_remember_email');
        const remCheckbox = document.getElementById('loginRememberMe');
        if (remembered && loginEmail) {
          loginEmail.value = remembered;
          if (remCheckbox) remCheckbox.checked = true;
        }
      }
    })();

    // Real-time Input Validation Clearing (Login)
    [loginUsername, loginEmail, loginPassword, loginRole].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          if (inp === loginUsername) clearField(loginUsername, errLoginUsername);
          if (inp === loginEmail) clearField(loginEmail, errLoginEmail);
          if (inp === loginPassword) clearField(loginPassword, errLoginPassword);
          if (inp === loginRole) clearField(loginRole, errLoginRole);
        });
        if (inp === loginRole) {
          inp.addEventListener('change', () => clearField(loginRole, errLoginRole));
        }
      }
    });

    // Real-time Input Validation Clearing (Signup)
    [signupName, signupEmail, signupPhone, signupPassword, signupConfirmPassword].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          if (inp === signupName) clearField(signupName, errSignupName);
          if (inp === signupEmail) clearField(signupEmail, errSignupEmail);
          if (inp === signupPhone) clearField(signupPhone, errSignupPhone);
          if (inp === signupPassword) clearField(signupPassword, errSignupPassword);
          if (inp === signupConfirmPassword) clearField(signupConfirmPassword, errSignupConfirm);
        });
      }
    });
    if (signupRole) signupRole.addEventListener('change', () => clearField(signupRole, errSignupRole));
    if (signupSport) signupSport.addEventListener('change', () => clearField(signupSport, errSignupSport));
    if (signupTerms) {
      signupTerms.addEventListener('change', () => {
        if (signupTerms.checked) clearField(signupTerms, errSignupTerms);
      });
    }

    // Live Password Strength Meter for Signup
    if (signupPassword) {
      signupPassword.addEventListener('input', () => {
        const val = signupPassword.value;
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

    // Login Form Submit Handler
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const usernameVal = loginUsername ? loginUsername.value.trim() : '';
        const emailVal = loginEmail ? loginEmail.value.trim() : '';
        const passwordVal = loginPassword ? loginPassword.value : '';
        const roleVal = loginRole ? loginRole.value : '';

        // Validate Username
        if (!usernameVal || usernameVal.length < 2) {
          setField(loginUsername, errLoginUsername);
          isValid = false;
        } else {
          clearField(loginUsername, errLoginUsername);
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          setField(loginEmail, errLoginEmail);
          isValid = false;
        } else {
          clearField(loginEmail, errLoginEmail);
        }

        // Validate Password
        if (!passwordVal) {
          setField(loginPassword, errLoginPassword);
          isValid = false;
        } else {
          clearField(loginPassword, errLoginPassword);
        }

        // Validate Role
        if (!roleVal) {
          setField(loginRole, errLoginRole);
          isValid = false;
        } else {
          clearField(loginRole, errLoginRole);
        }

        if (!isValid) {
          if (typeof showToast === 'function') {
            showToast('Required Fields Missing', 'Please enter your Username, Email, Password, and select your Role.', 'error');
          }
          return;
        }

        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = \`<i class="fa-solid fa-spinner fa-spin"></i> Authenticating Role Session...\`;
        loginBtn.disabled = true;

        setTimeout(() => {
          const remChecked = document.getElementById('loginRememberMe') ? document.getElementById('loginRememberMe').checked : false;
          const result = StacklyAuth.login(emailVal, passwordVal, roleVal, remChecked, usernameVal);

          loginBtn.innerHTML = originalText;
          loginBtn.disabled = false;

          if (result.success) {
            showAlert(result.message, true);
            if (typeof showToast === 'function') {
              showToast('Authentication Verified', \`Welcome back, \${result.user.name}! Redirecting to \${result.user.role.toUpperCase()} Dashboard...\`, 'success');
            }
            
            // Check ?redirect= parameter
            const urlParams = new URLSearchParams(window.location.search);
            const redirectParam = urlParams.get('redirect');
            let targetUrl = result.redirectUrl;
            if (redirectParam && !redirectParam.startsWith('http') && !redirectParam.startsWith('//')) {
              if (redirectParam.includes('admin') && result.user.role === 'admin') targetUrl = redirectParam;
              else if (redirectParam.includes('trainer') && (result.user.role === 'trainer' || result.user.role === 'admin')) targetUrl = redirectParam;
              else if (redirectParam.includes('user') && (result.user.role === 'user' || result.user.role === 'admin')) targetUrl = redirectParam;
            }

            setTimeout(() => {
              window.location.href = targetUrl;
            }, 500);
          } else {
            showAlert(result.message, false);
            if (typeof showToast === 'function') {
              showToast('Login Failed', result.message, 'error');
            }
          }
        }, 400);
      });
    }

    // Signup Form Submit Handler
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name
        if (!signupName.value.trim() || signupName.value.trim().length < 2) {
          setField(signupName, errSignupName);
          isValid = false;
        } else {
          clearField(signupName, errSignupName);
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signupEmail.value.trim() || !emailRegex.test(signupEmail.value.trim())) {
          setField(signupEmail, errSignupEmail);
          isValid = false;
        } else {
          clearField(signupEmail, errSignupEmail);
        }

        // Phone
        if (!signupPhone.value.trim() || signupPhone.value.trim().length < 8) {
          setField(signupPhone, errSignupPhone);
          isValid = false;
        } else {
          clearField(signupPhone, errSignupPhone);
        }

        // Role
        if (!signupRole.value) {
          setField(signupRole, errSignupRole);
          isValid = false;
        } else {
          clearField(signupRole, errSignupRole);
        }

        // Sport
        if (!signupSport.value) {
          setField(signupSport, errSignupSport);
          isValid = false;
        } else {
          clearField(signupSport, errSignupSport);
        }

        // Password (min 8 chars)
        if (!signupPassword.value || signupPassword.value.length < 8) {
          setField(signupPassword, errSignupPassword);
          isValid = false;
        } else {
          clearField(signupPassword, errSignupPassword);
        }

        // Confirm Password
        if (signupConfirmPassword.value !== signupPassword.value) {
          setField(signupConfirmPassword, errSignupConfirm);
          isValid = false;
        } else {
          clearField(signupConfirmPassword, errSignupConfirm);
        }

        // Terms
        if (!signupTerms.checked) {
          setField(signupTerms, errSignupTerms);
          isValid = false;
        } else {
          clearField(signupTerms, errSignupTerms);
        }

        if (!isValid) {
          if (typeof showToast === 'function') {
            showToast('Required Fields Missing', 'Please complete all required fields.', 'error');
          }
          return;
        }

        // Show loading state
        const originalText = signupBtn.innerHTML;
        signupBtn.innerHTML = \`<i class="fa-solid fa-spinner fa-spin"></i> Registering Account...\`;
        signupBtn.disabled = true;

        setTimeout(() => {
          const result = StacklyAuth.signup({
            name: signupName.value.trim(),
            email: signupEmail.value.trim(),
            phone: signupPhone.value.trim(),
            password: signupPassword.value,
            role: signupRole.value,
            sport: signupSport.value
          });

          signupBtn.innerHTML = originalText;
          signupBtn.disabled = false;

          if (result.success) {
            showAlert(result.message, true);
            if (typeof showToast === 'function') {
              showToast('Account Created', \`Profile registered as \${result.user.role.toUpperCase()}. Directing to your dashboard...\`, 'success');
            }
            signupForm.reset();
            setTimeout(() => {
              window.location.href = result.redirectUrl;
            }, 700);
          } else {
            showAlert(result.message, false);
            if (typeof showToast === 'function') {
              showToast('Registration Error', result.message, 'error');
            }
            setField(signupEmail, errSignupEmail);
          }
        }, 450);
      });
    }
  </script>`;

  html = html.substring(0, scriptStartIdx) + newScript + html.substring(scriptEndIdx + 9);
}

fs.writeFileSync(loginPath, html, 'utf8');
console.log('Successfully updated login.html with all fixes!');
