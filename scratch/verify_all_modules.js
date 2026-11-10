const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- AUDITING CODEBASE SYNTAX & INTEGRITY ---');

// 1. Check all JS files syntax
const jsFiles = [
  'js/auth.js',
  'js/user-dashboard.js',
  'js/trainer-dashboard.js',
  'js/main.js'
];

jsFiles.forEach(rel => {
  const full = path.join(__dirname, '..', rel);
  const code = fs.readFileSync(full, 'utf8');
  try {
    new vm.Script(code);
    console.log(`[PASS] ${rel} syntax is valid.`);
  } catch (err) {
    console.error(`[FAIL] ${rel} syntax error:`, err.message);
  }
});

// 2. Check HTML files for inline script syntax
const htmlFiles = [
  'login.html',
  'signup.html',
  'user-dashboard.html',
  'trainer-dashboard.html',
  'admin-dashboard.html',
  'contact.html'
];

htmlFiles.forEach(rel => {
  const full = path.join(__dirname, '..', rel);
  const content = fs.readFileSync(full, 'utf8');

  // Check matching <script> tags
  const openCount = (content.match(/<script\b[^>]*>/gi) || []).length;
  const closeCount = (content.match(/<\/script>/gi) || []).length;
  if (openCount !== closeCount) {
    console.error(`[WARN] ${rel} script tag mismatch: ${openCount} opens vs ${closeCount} closes!`);
  } else {
    console.log(`[PASS] ${rel} script tags match (${openCount} tags).`);
  }

  // Extract inline scripts and test syntax
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let idx = 0;
  while ((match = scriptRegex.exec(content)) !== null) {
    idx++;
    const srcMatch = match[0].match(/src=["'](.*?)["']/i);
    if (!srcMatch && match[1].trim().length > 0) {
      try {
        new vm.Script(match[1]);
      } catch (e) {
        console.error(`[FAIL] ${rel} inline script #${idx} syntax error:`, e.message);
      }
    }
  }
});

console.log('--- SYNTAX AUDIT COMPLETE ---');
