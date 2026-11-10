const fs = require('fs');
const path = require('path');

const loginPath = path.join(__dirname, '../login.html');
let content = fs.readFileSync(loginPath, 'utf8');

// Normalize to \n for replacement
const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// 1. Notice banner
const oldNotice = `<div class="auth-service-notice">
          <i class="fa-solid fa-shield-halved"></i>
          <div>
            <strong>Verified Member Portal:</strong>
            Enter your credentials and select your authorized role to access your personalized training dossier and performance metrics.
          </div>
        </div>`;

const newNotice = `<div class="auth-service-notice">
          <i class="fa-solid fa-shield-halved"></i>
          <div>
            <strong id="serviceNoticeTitle">Verified Member Portal:</strong>
            <span id="serviceNoticeText">Enter your credentials and select your authorized role to access your personalized training dossier and performance metrics.</span>
          </div>
        </div>`;

if (content.includes(oldNotice)) {
  content = content.replace(oldNotice, newNotice);
  console.log('[1/4] Service notice updated.');
} else {
  console.log('[1/4] Notice already updated or not matched.');
}

// 2. Remove Admin from signupRole
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

if (content.includes(oldSignupRole)) {
  content = content.replace(oldSignupRole, newSignupRole);
  console.log('[2/4] signupRole updated (Admin removed).');
} else {
  console.log('[2/4] signupRole already updated or not matched.');
}

// 3. Add password strength meter to signup password
const oldPassGroup = `<div class="form-group">
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

const newPassGroup = `<div class="form-group">
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

if (content.includes(oldPassGroup)) {
  content = content.replace(oldPassGroup, newPassGroup);
  console.log('[3/4] signupPassword strength meter added.');
} else {
  console.log('[3/4] signupPassword strength meter already added or not matched.');
}

// 4. Add "Already registered? Sign In to Portal" link below signup button & fix stray </div>
const oldSignupEnd = `<!-- Submit Button -->
            <button type="submit" id="signupBtn" class="btn btn-primary w-100 btn-lg magnetic-btn">
              <span>Create Athlete Account</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>

      </div>
    </div>

  </div>`;

const newSignupEnd = `<!-- Submit Button -->
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

if (content.includes(oldSignupEnd)) {
  content = content.replace(oldSignupEnd, newSignupEnd);
  console.log('[4/4] Signup end updated & stray div removed.');
} else {
  console.log('[4/4] Signup end already updated or not matched.');
}

// Convert back to CRLF
if (isCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(loginPath, content, 'utf8');
console.log('Update complete!');
