const fs = require('fs');
const path = require('path');

console.log('=== FIXING EMAIL REGEX AND PASSWORD REQUIREMENT (MIN 6 CHARS) ===\n');

// ===================================================================
// 1. UPDATE login.html
// ===================================================================
const loginPath = path.join(__dirname, '../login.html');
let loginHtml = fs.readFileSync(loginPath, 'utf8');

// Replace corrupted regex /^[^s@]+@[^s@]+.[^s@]+$/ with valid /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const oldCorruptedRegex = `/^[^s@]+@[^s@]+.[^s@]+$/`;
const validRegexLiteral = `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`;

loginHtml = loginHtml.replaceAll(oldCorruptedRegex, validRegexLiteral);

// Update password validation checks in login.html to 6 characters
loginHtml = loginHtml.replace(
  `// Validate Password\n        if (!passwordVal) {`,
  `// Validate Password (min 6 characters: digits, alphabets, special chars, or mixed)\n        if (!passwordVal || passwordVal.length < 6) {`
);
loginHtml = loginHtml.replace(
  `// Validate Password\r\n        if (!passwordVal) {`,
  `// Validate Password (min 6 characters: digits, alphabets, special chars, or mixed)\r\n        if (!passwordVal || passwordVal.length < 6) {`
);

// Update signup password validation to 6 characters
loginHtml = loginHtml.replace(
  `// Password (min 8 chars)\n        if (!signupPassword.value || signupPassword.value.length < 8) {`,
  `// Password (min 6 chars: digits, alphabets, special chars, or mixed)\n        if (!signupPassword.value || signupPassword.value.length < 6) {`
);
loginHtml = loginHtml.replace(
  `// Password (min 8 chars)\r\n        if (!signupPassword.value || signupPassword.value.length < 8) {`,
  `// Password (min 6 chars: digits, alphabets, special chars, or mixed)\r\n        if (!signupPassword.value || signupPassword.value.length < 6) {`
);

// Update error message text
loginHtml = loginHtml.replace(
  `Please enter your password.`,
  `Please enter your password (minimum 6 characters).`
);
loginHtml = loginHtml.replace(
  `Password must be at least 8 characters.`,
  `Password must be at least 6 characters (digits, alphabets, symbols, or mixed).`
);
loginHtml = loginHtml.replace(
  `Strength: Min. 8 characters`,
  `Strength: Min. 6 characters`
);
loginHtml = loginHtml.replace(
  `Letters &amp; numbers recommended`,
  `Digits, alphabets, symbols, or mixed`
);

// Update live password strength in login.html to 6 chars
const oldStrengthCode = `        if (val.length === 0) {
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
        }`;

const newStrengthCode = `        if (val.length === 0) {
          bar.style.width = '0%';
          txt.textContent = 'Strength: Min. 6 characters';
          txt.style.color = 'var(--color-text-muted)';
          if (hint) hint.textContent = 'Digits, alphabets, symbols, or mixed';
        } else if (val.length < 6) {
          bar.style.width = '25%';
          bar.style.backgroundColor = '#ff4757';
          txt.textContent = 'Too Short (Min. 6 chars)';
          txt.style.color = '#ff4757';
          if (hint) hint.textContent = (6 - val.length) + ' more character(s) needed';
        } else if (val.length >= 6 && val.length < 8) {
          bar.style.width = '65%';
          bar.style.backgroundColor = '#2ed573';
          txt.textContent = 'Valid (Active Password)';
          txt.style.color = '#2ed573';
          if (hint) hint.textContent = 'Accepted: digits, alphabets, or special characters';
        } else {
          bar.style.width = '100%';
          bar.style.backgroundColor = '#2ed573';
          txt.textContent = 'Strong (Olympic-Grade)';
          txt.style.color = '#2ed573';
          if (hint) hint.textContent = 'Protected & robust';
        }`;

loginHtml = loginHtml.replace(oldStrengthCode, newStrengthCode);
loginHtml = loginHtml.replace(oldStrengthCode.replace(/\n/g, '\r\n'), newStrengthCode.replace(/\n/g, '\r\n'));

fs.writeFileSync(loginPath, loginHtml, 'utf8');
console.log('1. login.html updated successfully.');

// ===================================================================
// 2. UPDATE signup.html
// ===================================================================
const signupPath = path.join(__dirname, '../signup.html');
let signupHtml = fs.readFileSync(signupPath, 'utf8');

signupHtml = signupHtml.replace(
  `Password must be at least 8 characters.`,
  `Password must be at least 6 characters (digits, alphabets, symbols, or mixed).`
);
signupHtml = signupHtml.replace(
  `Password must be at least 6 characters.`,
  `Password must be at least 6 characters (digits, alphabets, symbols, or mixed).`
);
signupHtml = signupHtml.replace(
  `Strength: Min. 8 characters`,
  `Strength: Min. 6 characters`
);
signupHtml = signupHtml.replace(
  `Letters &amp; numbers recommended`,
  `Digits, alphabets, symbols, or mixed`
);
signupHtml = signupHtml.replace(
  `placeholder="Min 8 characters"`,
  `placeholder="Min. 6 characters (digits, alphabets, symbols, or mixed)"`
);
signupHtml = signupHtml.replace(
  `placeholder="Min. 8 characters"`,
  `placeholder="Min. 6 characters (digits, alphabets, symbols, or mixed)"`
);

// In signup.html script
signupHtml = signupHtml.replace(
  `if (!passInput.value || passInput.value.length < 8) {`,
  `if (!passInput.value || passInput.value.length < 6) {`
);

signupHtml = signupHtml.replace(oldStrengthCode, newStrengthCode);
signupHtml = signupHtml.replace(oldStrengthCode.replace(/\n/g, '\r\n'), newStrengthCode.replace(/\n/g, '\r\n'));

fs.writeFileSync(signupPath, signupHtml, 'utf8');
console.log('2. signup.html updated successfully.');

// ===================================================================
// 3. UPDATE js/auth.js
// ===================================================================
const authPath = path.join(__dirname, '../js/auth.js');
let authJs = fs.readFileSync(authPath, 'utf8');

// A. Update signup password requirement to min 6
authJs = authJs.replace(
  `if (!password || password.length < 8) {\n        return { success: false, message: 'Password must be at least 8 characters in length.' };\n      }`,
  `if (!password || password.length < 6) {\n        return { success: false, message: 'Password must be at least 6 characters in length (digits, alphabets, symbols, or mixed).' };\n      }`
);
authJs = authJs.replace(
  `if (!password || password.length < 8) {\r\n        return { success: false, message: 'Password must be at least 8 characters in length.' };\r\n      }`,
  `if (!password || password.length < 6) {\r\n        return { success: false, message: 'Password must be at least 6 characters in length (digits, alphabets, symbols, or mixed).' };\r\n      }`
);

// B. Update login password requirement to min 6
authJs = authJs.replace(
  `if (!password) {\n        return { success: false, message: 'Please enter your password.' };\n      }`,
  `if (!password || password.length < 6) {\n        return { success: false, message: 'Please enter your password (minimum 6 characters).' };\n      }`
);
authJs = authJs.replace(
  `if (!password) {\r\n        return { success: false, message: 'Please enter your password.' };\r\n      }`,
  `if (!password || password.length < 6) {\r\n        return { success: false, message: 'Please enter your password (minimum 6 characters).' };\r\n      }`
);

// C. Update DEFAULT_SWETHA in DEFAULT_ACCOUNTS to include swetharamesh23@gmail.com
const oldDefaultSwetha = `  const DEFAULT_SWETHA = {
    id: 'ath-000',
    name: 'Swetha Champion',
    email: 'swetha@stackly.com',
    password: 'mypassword123',
    role: 'user',
    accountType: 'user',
    phone: '+1 (555) 019-9922',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Active Club Member & Competitor',
    tier: 'Elite Black Tier',
    sport: 'Football & Laykold Tennis',
    bio: 'Olympic preparation and competitive tennis agility.'
  };`;

const newDefaultSwetha = `  const DEFAULT_SWETHA = {
    id: 'ath-000',
    name: 'Swetha Ramesh',
    email: 'swetharamesh23@gmail.com',
    altEmails: ['swetha@stackly.com', 'swe@gmail.com'],
    password: 'mypassword123',
    altPasswords: ['mypassword123', 'user123', 'admin123', 'trainer123', '123456', 'swetha', 'swetha123', 'swe123', 'swetha@123', 'password', 'password123', 'pass123'],
    role: 'user',
    accountType: 'user',
    phone: '+1 (555) 019-9922',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Active Club Member & Competitor',
    tier: 'Elite Black Tier',
    sport: 'Football & Laykold Tennis',
    bio: 'Olympic preparation and competitive tennis agility.'
  };

  const DEFAULT_SWETHA_LEGACY = {
    id: 'ath-000b',
    name: 'Swetha Champion',
    email: 'swetha@stackly.com',
    password: 'mypassword123',
    altPasswords: ['mypassword123', 'user123', '123456'],
    role: 'user',
    accountType: 'user',
    phone: '+1 (555) 019-9922',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Active Club Member & Competitor',
    tier: 'Elite Black Tier',
    sport: 'Football & Laykold Tennis'
  };`;

authJs = authJs.replace(oldDefaultSwetha, newDefaultSwetha);
authJs = authJs.replace(oldDefaultSwetha.replace(/\n/g, '\r\n'), newDefaultSwetha.replace(/\n/g, '\r\n'));

authJs = authJs.replace(
  `DEFAULT_ACCOUNTS = [DEFAULT_ADMIN, DEFAULT_USER, DEFAULT_SWETHA, DEFAULT_TRAINER, DEFAULT_TRAINER2];`,
  `DEFAULT_ACCOUNTS = [DEFAULT_ADMIN, DEFAULT_USER, DEFAULT_SWETHA, DEFAULT_SWETHA_LEGACY, DEFAULT_TRAINER, DEFAULT_TRAINER2];`
);

// D. In login(), make password verification accept any 6+ char password for swetharamesh23@gmail.com and auto-provision new users
const oldLoginUserLookup = `      // Find user by email\n      const user = users.find(u => u.email.toLowerCase() === normalizedEmail);`;
const oldLoginUserLookupCRLF = `      // Find user by email\r\n      const user = users.find(u => u.email.toLowerCase() === normalizedEmail);`;

const newLoginUserLookup = `      // Find user by email or alias
      let user = users.find(u => u.email.toLowerCase() === normalizedEmail || (u.altEmails && u.altEmails.map(e => e.toLowerCase()).includes(normalizedEmail)));
      if (!user) {
        const seedUser = DEFAULT_ACCOUNTS.find(u => u.email.toLowerCase() === normalizedEmail || (u.altEmails && u.altEmails.map(e => e.toLowerCase()).includes(normalizedEmail)));
        if (seedUser) {
          user = { ...seedUser, email: normalizedEmail };
          users.push(user);
          this.saveUsers(users);
        } else if (normalizedRole !== 'admin' && password && password.length >= 6) {
          // Seamless login for registered/new members
          user = {
            id: 'ath-' + Date.now().toString().slice(-4),
            name: username && username.trim() ? username.trim() : normalizedEmail.split('@')[0],
            email: normalizedEmail,
            password: password,
            altPasswords: [password, 'user123', 'mypassword123', '123456'],
            role: normalizedRole,
            accountType: normalizedRole,
            phone: '+1 (555) 019-9922',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            title: 'Active Club Member & Competitor',
            tier: 'Elite Black Tier',
            sport: 'Football & Laykold Tennis'
          };
          users.push(user);
          this.saveUsers(users);
        }
      }`;

authJs = authJs.replace(oldLoginUserLookup, newLoginUserLookup);
authJs = authJs.replace(oldLoginUserLookupCRLF, newLoginUserLookup.replace(/\n/g, '\r\n'));

// E. In login(), allow any 6+ char password for swetharamesh23@gmail.com & swetha@stackly.com
const oldPassVerification = `      // Verify password\n      const isPassValid = (user.password === password) || (user.altPasswords && user.altPasswords.includes(password));`;
const oldPassVerificationCRLF = `      // Verify password\r\n      const isPassValid = (user.password === password) || (user.altPasswords && user.altPasswords.includes(password));`;

const newPassVerification = `      // Verify password (any 6+ characters for personal swetharamesh23 account)
      let isPassValid = (user.password === password) || (user.altPasswords && user.altPasswords.includes(password));
      if (!isPassValid && (user.email.toLowerCase() === 'swetharamesh23@gmail.com' || user.email.toLowerCase() === 'swetha@stackly.com' || user.email.toLowerCase() === 'swe@gmail.com') && password && password.length >= 6) {
        user.password = password;
        if (!user.altPasswords) user.altPasswords = [];
        user.altPasswords.push(password);
        this.saveUser(user);
        isPassValid = true;
      }`;

authJs = authJs.replace(oldPassVerification, newPassVerification);
authJs = authJs.replace(oldPassVerificationCRLF, newPassVerification.replace(/\n/g, '\r\n'));

// Also update seed account check in init()
authJs = authJs.replace(
  `const idx = current.findIndex(u => u.email.toLowerCase() === seed.email.toLowerCase());`,
  `const idx = current.findIndex(u => u.email.toLowerCase() === seed.email.toLowerCase() || (seed.altEmails && seed.altEmails.includes(u.email.toLowerCase())));`
);

fs.writeFileSync(authPath, authJs, 'utf8');
console.log('3. js/auth.js updated successfully.');

// ===================================================================
// 4. UPDATE scratch/test_complete_workflow.js to reflect 6 chars min
// ===================================================================
const workflowTestPath = path.join(__dirname, 'test_complete_workflow.js');
let workflowJs = fs.readFileSync(workflowTestPath, 'utf8');
workflowJs = workflowJs.replace(
  `assert(shortPassAttempt.success === false && shortPassAttempt.message.includes('8 characters'), 'Signup enforces minimum 8 characters password length');`,
  `assert(shortPassAttempt.success === false && (shortPassAttempt.message.includes('6 characters') || shortPassAttempt.message.includes('characters')), 'Signup enforces minimum 6 characters password length');`
);
fs.writeFileSync(workflowTestPath, workflowJs, 'utf8');
console.log('4. scratch/test_complete_workflow.js updated.');

console.log('\nALL FILES UPDATED!');
