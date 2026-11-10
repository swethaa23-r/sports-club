const fs = require('fs');
const path = require('path');

const authJsPath = path.join(__dirname, '../js/auth.js');
let code = fs.readFileSync(authJsPath, 'utf8');

// Update login function to handle rememberMe
const oldLogin = `    login(email, password, selectedRole, username) {`;
const newLogin = `    login(email, password, selectedRole, rememberMe = false, username = null) {`;

if (code.includes(oldLogin)) {
  code = code.replace(oldLogin, newLogin);
}

// Ensure rememberMe persistence in login()
const loginRememberLogic = `
      // Handle Remember Me preference
      if (rememberMe) {
        localStorage.setItem('stackly_remember_email', normalizedEmail);
      } else {
        localStorage.removeItem('stackly_remember_email');
      }
`;

if (!code.includes('stackly_remember_email')) {
  code = code.replace(
    `localStorage.setItem(KEYS.IS_LOGGED_IN, 'true');`,
    `localStorage.setItem(KEYS.IS_LOGGED_IN, 'true');\n${loginRememberLogic}`
  );
}

// Update signup function to disallow public admin registration and support redirect to login
const oldSignup = `    signup(payload) {
      const { name, email, phone, password, role, sport } = payload;
      if (!name || !name.trim() || name.trim().length < 2) {
        return { success: false, message: 'Please enter your full name (minimum 2 characters).' };
      }
      if (!email || !email.trim() || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.trim())) {
        return { success: false, message: 'Please provide a valid email address.' };
      }
      if (!password || password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters in length.' };
      }
      if (!role) {
        return { success: false, message: 'Please select an account type from the role dropdown.' };
      }

      const normalizedRole = role.toLowerCase().trim();
      if (!['user', 'trainer', 'admin'].includes(normalizedRole)) {
        return { success: false, message: 'Invalid account role selected. Please choose Athlete (User), Coach (Trainer), or Admin.' };
      }`;

const newSignup = `    signup(payload, autoLogin = false) {
      const { name, email, phone, password, role, sport } = payload;
      if (!name || !name.trim() || name.trim().length < 2) {
        return { success: false, message: 'Please enter your full name (minimum 2 characters).' };
      }
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!email || !email.trim() || !emailRegex.test(email.trim())) {
        return { success: false, message: 'Please provide a valid email address (e.g. athlete@example.com).' };
      }
      if (!phone || phone.trim().length < 8) {
        return { success: false, message: 'Please provide a valid phone number (minimum 8 digits).' };
      }
      if (!password || password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters in length.' };
      }
      if (!role) {
        return { success: false, message: 'Please select an account type from the role dropdown.' };
      }

      const normalizedRole = role.toLowerCase().trim();
      // SECURITY REQUIREMENT: Admin registration must not be publicly available
      if (normalizedRole === 'admin') {
        return {
          success: false,
          message: 'Access Restricted: Administrative accounts cannot be registered publicly. Admin privileges are provisioned solely through verified club governance.'
        };
      }
      if (!['user', 'trainer'].includes(normalizedRole)) {
        return { success: false, message: 'Invalid account role selected. Please choose User or Trainer.' };
      }`;

if (code.includes(oldSignup)) {
  code = code.replace(oldSignup, newSignup);
}

// Update signup post-save behavior (respect autoLogin)
const oldPostSave = `      // Authenticate the newly registered user
      localStorage.setItem(KEYS.USER_NAME, newUser.name);
      localStorage.setItem(KEYS.USER_EMAIL, newUser.email);
      localStorage.setItem(KEYS.USER_ROLE, newUser.role);
      localStorage.setItem(KEYS.IS_LOGGED_IN, 'true');

      this.syncSessionState();

      const redirectUrl = this.getDashboardUrlForRole(newUser.role);

      return {
        success: true,
        user: newUser,
        redirectUrl,
        message: \`Account created successfully! Welcome to Stackly, \${newUser.name}.\`
      };`;

const newPostSave = `      // Check if autoLogin requested (e.g. direct flow) vs redirecting to login.html per user specification
      if (autoLogin) {
        localStorage.setItem(KEYS.USER_NAME, newUser.name);
        localStorage.setItem(KEYS.USER_EMAIL, newUser.email);
        localStorage.setItem(KEYS.USER_ROLE, newUser.role);
        localStorage.setItem(KEYS.IS_LOGGED_IN, 'true');
        this.syncSessionState();
        return {
          success: true,
          user: newUser,
          redirectUrl: this.getDashboardUrlForRole(newUser.role),
          message: \`Account created successfully! Welcome to STACKLY, \${newUser.name}.\`
        };
      }

      // Default production requirement: redirect to login after successful registration
      const redirectUrl = \`login.html?registered=true&email=\${encodeURIComponent(newUser.email)}&role=\${newUser.role}\`;
      return {
        success: true,
        user: newUser,
        redirectUrl,
        message: \`Account created successfully! Welcome to STACKLY, \${newUser.name}. Redirecting to sign in...\`
      };`;

if (code.includes(oldPostSave)) {
  code = code.replace(oldPostSave, newPostSave);
}

// Add helper methods
const oldHelpers = `    getDashboardUrlForRole(role) {`;
const newHelpers = `    getRememberedEmail() {
      try {
        return localStorage.getItem('stackly_remember_email') || '';
      } catch (e) {
        return '';
      }
    },

    setRememberedEmail(email) {
      try {
        if (email) localStorage.setItem('stackly_remember_email', email);
        else localStorage.removeItem('stackly_remember_email');
      } catch (e) {}
    },

    getDashboardUrlForRole(role) {`;

if (code.includes(oldHelpers) && !code.includes('getRememberedEmail()')) {
  code = code.replace(oldHelpers, newHelpers);
}

fs.writeFileSync(authJsPath, code, 'utf8');
console.log('js/auth.js updated successfully!');
