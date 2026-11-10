const fs = require('fs');
const path = require('path');

const cssRules = `
/* ===================================================================
   Cross-Browser Form Select & Option Contrast Fix
   Ensures dropdown option menus have high contrast dark backgrounds 
   and crisp white text across Chrome, Edge, Safari, and Firefox.
   =================================================================== */
:root {
  color-scheme: dark;
}

select,
.form-select,
.role-select-box {
  color-scheme: dark !important;
  background-color: #0d0d12 !important;
  color: #ffffff !important;
}

select option,
.form-select option,
.role-select-box option {
  background-color: #141419 !important;
  color: #ffffff !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 0.95rem !important;
  padding: 12px 16px !important;
}

select option:checked,
.form-select option:checked,
.role-select-box option:checked {
  background-color: #FF5A1F !important;
  color: #ffffff !important;
}

select option:disabled,
.form-select option:disabled,
.role-select-box option:disabled {
  color: #8c8c98 !important;
  background-color: #09090c !important;
}

select optgroup,
.form-select optgroup {
  background-color: #09090c !important;
  color: #FF5A1F !important;
  font-weight: 700 !important;
}
`;

// 1. Update css/components/forms.css
const formsCssPath = path.join(__dirname, '../css/components/forms.css');
let formsCss = fs.readFileSync(formsCssPath, 'utf8');
if (!formsCss.includes('Cross-Browser Form Select & Option Contrast Fix')) {
  formsCss += '\n' + cssRules;
  fs.writeFileSync(formsCssPath, formsCss, 'utf8');
  console.log('Updated css/components/forms.css');
}

// 2. Update css/auth.css
const authCssPath = path.join(__dirname, '../css/auth.css');
let authCss = fs.readFileSync(authCssPath, 'utf8');
if (!authCss.includes('Cross-Browser Form Select & Option Contrast Fix')) {
  authCss += '\n' + cssRules;
  fs.writeFileSync(authCssPath, authCss, 'utf8');
  console.log('Updated css/auth.css');
}

// 3. Update css/dashboard.css
const dashCssPath = path.join(__dirname, '../css/dashboard.css');
let dashCss = fs.readFileSync(dashCssPath, 'utf8');
if (!dashCss.includes('Cross-Browser Form Select & Option Contrast Fix')) {
  dashCss += '\n' + cssRules;
  fs.writeFileSync(dashCssPath, dashCss, 'utf8');
  console.log('Updated css/dashboard.css');
}

// 4. Update css/style.css
const styleCssPath = path.join(__dirname, '../css/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');
if (!styleCss.includes('Cross-Browser Form Select & Option Contrast Fix')) {
  styleCss += '\n' + cssRules;
  fs.writeFileSync(styleCssPath, styleCss, 'utf8');
  console.log('Updated css/style.css');
}
