const fs = require('fs');
const path = require('path');

const authPath = path.join(__dirname, '../js/auth.js');
let code = fs.readFileSync(authPath, 'utf8').replace(/\r\n/g, '\n');

const oldUpdateNavbar = `    updateNavbarAuth() {
      const isAuth = this.isLoggedIn();
      const user = this.getCurrentUser();

      // Desktop Navbar Action
      const navActions = document.querySelector('.nav-actions');
      if (navActions) {
        let authBtn = navActions.querySelector('.nav-auth-btn') || navActions.querySelector('#navLoginBtn');
        const extraBtns = navActions.querySelectorAll('.nav-register-btn, .nav-signout-btn, a[href="signup.html"]');
        extraBtns.forEach(btn => btn.remove());

        if (authBtn) {
          if (isAuth && user) {
            const roleUrl = this.getDashboardUrlForRole(user.role);
            authBtn.href = roleUrl;
            authBtn.className = 'btn btn-primary btn-sm magnetic-btn nav-auth-btn btn-auth-active';
            authBtn.innerHTML = \`<i class="fa-regular fa-user"></i> <span>Dashboard (\${user.name.split(' ')[0]})</span>\`;
            authBtn.setAttribute('title', \`Logged in as \${user.name} (\${user.role.toUpperCase()}) - Click to open Dashboard\`);
          } else {
            authBtn.href = 'login.html';
            authBtn.className = 'btn btn-primary btn-sm magnetic-btn nav-auth-btn';
            authBtn.innerHTML = \`<i class="fa-regular fa-user"></i> <span>Login</span>\`;
            authBtn.removeAttribute('title');
          }
        }
      }

      // Mobile Overlay Actions
      const mobileNav = document.querySelector('.mobile-nav');
      if (mobileNav) {
        const mobileLoginLink = mobileNav.querySelector('.mobile-nav-menu a[href="login.html"]');
        if (mobileLoginLink) {
          if (isAuth && user) {
            mobileLoginLink.href = this.getDashboardUrlForRole(user.role);
            mobileLoginLink.innerHTML = \`Dashboard <span style="font-size:0.75rem; color:var(--color-accent); font-weight:700;">(\${user.role.toUpperCase()})</span>\`;
          } else {
            mobileLoginLink.href = 'login.html';
            mobileLoginLink.textContent = 'Login';
          }
        }

        const mobileActions = mobileNav.querySelector('.mobile-nav-actions');
        if (mobileActions) {
          if (isAuth && user) {
            const roleUrl = this.getDashboardUrlForRole(user.role);
            mobileActions.innerHTML = \`
              <a href="\${roleUrl}" class="btn btn-primary w-100 mobile-auth-btn">
                <i class="fa-regular fa-user"></i> Open Dashboard (\${user.name.split(' ')[0]})
              </a>
              <button type="button" class="btn btn-outline w-100 mobile-signout-btn" id="mobileDrawerLogout" style="margin-top:6px;">
                <i class="fa-solid fa-right-from-bracket"></i> Sign Out
              </button>
            \`;
            const signoutBtn = mobileActions.querySelector('#mobileDrawerLogout');
            if (signoutBtn) {
              signoutBtn.addEventListener('click', () => {
                StacklyAuth.logout();
              });
            }
          } else {
            mobileActions.innerHTML = \`
              <a href="login.html" class="btn btn-primary w-100" id="mobileNavLoginBtn">
                <i class="fa-regular fa-user"></i> Login to Portal
              </a>
            \`;
          }
        }
      }
    }`;

const newUpdateNavbar = `    updateNavbarAuth() {
      // Desktop Navbar Action: ALWAYS LOGIN button redirecting to login.html per user specification
      const navActions = document.querySelector('.nav-actions');
      if (navActions) {
        let authBtn = navActions.querySelector('.nav-auth-btn') || navActions.querySelector('#navLoginBtn');
        const extraBtns = navActions.querySelectorAll('.nav-register-btn, .nav-signout-btn, a[href="signup.html"]');
        extraBtns.forEach(btn => btn.remove());

        if (authBtn) {
          authBtn.href = 'login.html';
          authBtn.className = 'btn btn-primary btn-sm magnetic-btn nav-auth-btn';
          authBtn.innerHTML = \`<i class="fa-regular fa-user"></i> <span>Login</span>\`;
          authBtn.setAttribute('title', 'Login to STACKLY Portal');
        }
      }

      // Mobile Overlay Actions: ALWAYS Login button redirecting to login.html
      const mobileNav = document.querySelector('.mobile-nav');
      if (mobileNav) {
        const mobileLoginLink = mobileNav.querySelector('.mobile-nav-menu a[href="login.html"]');
        if (mobileLoginLink) {
          mobileLoginLink.href = 'login.html';
          mobileLoginLink.textContent = 'Login';
        }

        const mobileActions = mobileNav.querySelector('.mobile-nav-actions');
        if (mobileActions) {
          mobileActions.innerHTML = \`
            <a href="login.html" class="btn btn-primary w-100" id="mobileNavLoginBtn">
              <i class="fa-regular fa-user"></i> Login
            </a>
          \`;
        }
      }
    }`;

if (code.includes(oldUpdateNavbar)) {
  code = code.replace(oldUpdateNavbar, newUpdateNavbar);
  fs.writeFileSync(authPath, code, 'utf8');
  console.log('js/auth.js updated: Navbar now ALWAYS displays "Login" and redirects to login.html!');
} else {
  console.error('Could not find oldUpdateNavbar in js/auth.js');
}
