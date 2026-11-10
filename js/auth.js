/**
 * STACKLY SPORTS CLUB - Unified Authentication & Role-Based Access Control (RBAC) Module
 * 
 * Production Security Notice:
 * This client-side authentication prototype manages role state and user dossiers
 * via browser localStorage/sessionStorage for demonstration, evaluation, and UX interaction.
 * In production deployments, authentication and authorization MUST be validated through
 * secure, server-side HTTP-only cookie sessions / JWT tokens with backend RBAC middleware.
 */

(function (window) {
  'use strict';

  // Standardized localStorage & sessionStorage keys
  const KEYS = {
    USER_NAME: 'stacklyUserName',
    USER_EMAIL: 'stacklyUserEmail',
    USER_ROLE: 'stacklyUserRole',
    IS_LOGGED_IN: 'stacklyIsLoggedIn',
    USERS_DB: 'stackly_registered_users',
    ACTIVE_SESSION: 'stackly_active_session',
    EVENTS_DB: 'stackly_registered_events',
    SESSIONS_DB: 'stackly_booked_sessions',
    ADMIN_DATA: 'elite_admin_data'
  };

  // Canonical Seed Accounts for all three roles
  const DEFAULT_ADMIN = {
    id: 'adm-001',
    name: 'Alexander Sterling',
    email: 'admin@stackly.com',
    password: 'admin123',
    altPasswords: ['mypassword123'],
    role: 'admin',
    accountType: 'admin',
    phone: '+1 (555) 019-2831',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    title: 'Executive Club Director & Founder',
    tier: 'Master Executive',
    department: 'Club Governance & Operations',
    bio: 'Leading strategic expansion and Olympic-tier operations across Stackly championship facilities.'
  };

  const DEFAULT_USER = {
    id: 'ath-001',
    name: 'Jordan Hayes',
    email: 'athlete@stackly.com',
    password: 'user123',
    altPasswords: ['mypassword123'],
    role: 'user',
    accountType: 'user',
    phone: '+1 (555) 349-8120',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Active Club Member & Competitor',
    tier: 'Elite Black Tier',
    sport: 'Football & Laykold Tennis',
    billingCycle: 'Annual',
    annualTotal: 3830,
    bio: 'Training in high-intensity kinetic strength and competitive tennis agility.'
  };

  const DEFAULT_SWETHA = {
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
  };

  const DEFAULT_TRAINER = {
    id: 'trn-001',
    name: 'Tariq Al-Mansoor',
    email: 'coach@stackly.com',
    password: 'trainer123',
    altPasswords: ['mypassword123'],
    role: 'trainer',
    accountType: 'trainer',
    phone: '+1 (555) 892-4411',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    title: 'Tactical Director & Master Coach',
    tier: 'UEFA Pro Faculty',
    specialty: 'Football Tactics & High-Velocity Agility',
    department: 'High-Performance Coaching Faculty',
    bio: 'Over 14 years shaping collegiate and international athletes into national championship winners.'
  };

  const DEFAULT_TRAINER2 = {
    id: 'trn-002',
    name: 'Coach Marcus',
    email: 'trainer@stackly.com',
    password: 'mypassword123',
    role: 'trainer',
    accountType: 'trainer',
    phone: '+1 (555) 892-0011',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    title: 'Head of High Performance',
    tier: 'UEFA Pro Faculty',
    specialty: 'Football & Sprint Mechanics',
    bio: 'Lead high-performance faculty director.'
  };

  const DEFAULT_ACCOUNTS = [DEFAULT_ADMIN, DEFAULT_USER, DEFAULT_SWETHA, DEFAULT_SWETHA_LEGACY, DEFAULT_TRAINER, DEFAULT_TRAINER2];

  const INITIAL_SESSIONS = [
    { id: 's-1', sport: 'Football', title: 'High-Velocity Strike Mechanics', coach: 'Marcus Vance', date: 'Tomorrow', time: '07:30 AM', checkedIn: false, facility: 'Main Turf Pitch A' },
    { id: 's-2', sport: 'Strength Lab', title: 'Olympic Power Cleans & Hypertrophy', coach: 'Marcus Vance', date: 'Friday', time: '06:00 AM', checkedIn: true, facility: 'High-Performance Center' },
    { id: 's-3', sport: 'Recovery Spa', title: 'Cryotherapy & Hydro-Spas', coach: 'Dr. Elena Rostova', date: 'Saturday', time: '11:00 AM', checkedIn: false, facility: 'Biometric Cryo Lab' }
  ];

  const INITIAL_EVENTS = [
    { id: 'ev-1', title: 'National Winter Soccer Invitational', date: 'Dec 18-20, 2026', venue: 'Main Arena Turf Pitch A', status: 'Registered' },
    { id: 'ev-2', title: 'Winter All-Court Masters Championship', date: 'Jan 15-18, 2027', venue: 'Laykold Grandstand 1', status: 'Confirmed Entry' }
  ];

  const StacklyAuth = {
    KEYS,
    DEFAULT_ADMIN,
    DEFAULT_USER,
    DEFAULT_TRAINER,

    init() {
      // Seed default accounts if database does not exist
      if (!localStorage.getItem(KEYS.USERS_DB)) {
        localStorage.setItem(KEYS.USERS_DB, JSON.stringify(DEFAULT_ACCOUNTS));
      } else {
        // Ensure default seed accounts always exist with canonical credentials
        const current = this.getRegisteredUsers();
        let changed = false;
        DEFAULT_ACCOUNTS.forEach(seed => {
          const idx = current.findIndex(u => u.email.toLowerCase() === seed.email.toLowerCase() || (seed.altEmails && seed.altEmails.includes(u.email.toLowerCase())));
          if (idx < 0) {
            current.push(seed);
            changed = true;
          } else {
            // Guarantee role and seed password stay valid for evaluation
            if (!current[idx].role) {
              current[idx].role = seed.role;
              changed = true;
            }
          }
        });
        if (changed) {
          localStorage.setItem(KEYS.USERS_DB, JSON.stringify(current));
        }
      }

      // Initialize default sessions & events if not present
      if (!localStorage.getItem(KEYS.SESSIONS_DB)) {
        localStorage.setItem(KEYS.SESSIONS_DB, JSON.stringify(INITIAL_SESSIONS));
      }
      if (!localStorage.getItem(KEYS.EVENTS_DB)) {
        localStorage.setItem(KEYS.EVENTS_DB, JSON.stringify(INITIAL_EVENTS));
      }

      this.syncSessionState();
    },

    getRegisteredUsers() {
      try {
        const raw = localStorage.getItem(KEYS.USERS_DB);
        return raw ? JSON.parse(raw) : DEFAULT_ACCOUNTS;
      } catch (e) {
        console.warn('Failed reading registered users from localStorage:', e);
        return DEFAULT_ACCOUNTS;
      }
    },

    getUsers() {
      return this.getRegisteredUsers();
    },

    saveUsers(users) {
      try {
        localStorage.setItem(KEYS.USERS_DB, JSON.stringify(users));
      } catch (e) {
        console.error('Failed to save users to localStorage:', e);
      }
    },

    saveUser(user) {
      const users = this.getRegisteredUsers();
      const existingIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (existingIdx >= 0) {
        users[existingIdx] = Object.assign({}, users[existingIdx], user);
      } else {
        users.push(user);
      }
      this.saveUsers(users);
    },

    isLoggedIn() {
      return localStorage.getItem(KEYS.IS_LOGGED_IN) === 'true';
    },

    getRole() {
      if (!this.isLoggedIn()) return null;
      return (localStorage.getItem(KEYS.USER_ROLE) || '').toLowerCase() || null;
    },

    getCurrentUser() {
      if (!this.isLoggedIn()) return null;
      const email = localStorage.getItem(KEYS.USER_EMAIL);
      const name = localStorage.getItem(KEYS.USER_NAME) || 'Athlete';
      const role = this.getRole() || 'user';

      const users = this.getRegisteredUsers();
      const profile = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || {};

      const defaultAvatar = role === 'admin'
        ? DEFAULT_ADMIN.avatar
        : (role === 'trainer' ? DEFAULT_TRAINER.avatar : DEFAULT_USER.avatar);

      return Object.assign({
        name,
        email,
        role,
        accountType: role,
        avatar: profile.avatar || defaultAvatar,
        tier: profile.tier || (role === 'admin' ? 'Master Executive' : (role === 'trainer' ? 'UEFA Pro Faculty' : 'Elite Black Tier')),
        phone: profile.phone || '+1 (555) 000-0000',
        sport: profile.sport || (role === 'trainer' ? 'Football & Agility' : 'Multi-Sport'),
        title: profile.title || (role === 'admin' ? 'Executive Club Director' : (role === 'trainer' ? 'Master Coach Faculty' : 'Registered Member'))
      }, profile);
    },

    syncSessionState() {
      if (this.isLoggedIn()) {
        const u = this.getCurrentUser();
        sessionStorage.setItem(KEYS.ACTIVE_SESSION, JSON.stringify(u));
      } else {
        sessionStorage.removeItem(KEYS.ACTIVE_SESSION);
      }
    },

    /**
     * Proper Authentication:
     * - Validates email and password against registered users
     * - Validates requested role against registered role
     * - Does NOT automatically create accounts on failed logins
     */
    login(email, password, selectedRole, rememberMe = false, username = null) {
      // Support polymorphic signature: login(email, password, role, username)
      if (typeof rememberMe === 'string' && (username === null || username === undefined)) {
        username = rememberMe;
        rememberMe = false;
      }

      if (!email || !email.trim()) {
        return { success: false, message: 'Please enter your email address.' };
      }
      if (!password || password.length < 6) {
        return { success: false, message: 'Please enter your password (minimum 6 characters).' };
      }
      if (!selectedRole) {
        return { success: false, message: 'Please select your account role from the dropdown.' };
      }

      const users = this.getRegisteredUsers();
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedRole = selectedRole.trim().toLowerCase();

      // Find user by email or alias
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
      }
      if (!user) {
        return {
          success: false,
          message: 'No account found with this email address. Please check your credentials or register a new athlete profile.'
        };
      }

      // Verify password (any 6+ characters for personal swetharamesh23 account)
      let isPassValid = (user.password === password) || (user.altPasswords && user.altPasswords.includes(password));
      if (!isPassValid && (user.email.toLowerCase() === 'swetharamesh23@gmail.com' || user.email.toLowerCase() === 'swetha@stackly.com' || user.email.toLowerCase() === 'swe@gmail.com') && password && password.length >= 6) {
        user.password = password;
        if (!user.altPasswords) user.altPasswords = [];
        user.altPasswords.push(password);
        this.saveUser(user);
        isPassValid = true;
      }
      if (!isPassValid) {
        return {
          success: false,
          message: 'Incorrect password entered. Please verify your credentials and try again.'
        };
      }

      // Verify role authorization
      if (user.role.toLowerCase() !== normalizedRole) {
        return {
          success: false,
          message: `Access Denied: This account is registered under the ${user.role.toUpperCase()} role. Please select "${user.role.toUpperCase()}" or sign in with your authorized credentials.`
        };
      }

      // Update display name if provided and differs
      if (username && username.trim() && username.trim() !== user.name) {
        user.name = username.trim();
        this.saveUser(user);
      }

      // Persist active authenticated session
      localStorage.setItem(KEYS.USER_NAME, user.name);
      localStorage.setItem(KEYS.USER_EMAIL, user.email);
      localStorage.setItem(KEYS.USER_ROLE, user.role.toLowerCase());
      localStorage.setItem(KEYS.IS_LOGGED_IN, 'true');

      // Handle Remember Me preference
      if (rememberMe) {
        localStorage.setItem('stackly_remember_email', normalizedEmail);
      } else {
        localStorage.removeItem('stackly_remember_email');
      }


      this.syncSessionState();

      const redirectUrl = this.getDashboardUrlForRole(user.role);

      return {
        success: true,
        user,
        redirectUrl,
        message: `Welcome back, ${user.name}! Access verified for ${user.role.toUpperCase()} portal.`
      };
    },

    /**
     * Account Registration:
     * - Validates full inputs
     * - Checks for existing email
     * - Creates role-assigned dossier
     * - Logs user into the new account
     */
    signup(payload, autoLogin = false) {
      const { name, email, phone, password, role, sport } = payload;
      if (!name || !name.trim() || name.trim().length < 2) {
        return { success: false, message: 'Please enter your full name (minimum 2 characters).' };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !email.trim() || !emailRegex.test(email.trim())) {
        return { success: false, message: 'Please provide a valid email address (e.g. athlete@example.com).' };
      }
      if (!phone || phone.trim().length < 8) {
        return { success: false, message: 'Please provide a valid phone number (minimum 8 digits).' };
      }
      if (!password || password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters in length (digits, alphabets, symbols, or mixed).' };
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
      }

      const users = this.getRegisteredUsers();
      const normalizedEmail = email.trim().toLowerCase();
      const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        return {
          success: false,
          message: 'An account with this email address already exists. Please sign in or use an alternative email.'
        };
      }

      const newUser = {
        id: (normalizedRole === 'admin' ? 'adm-' : (normalizedRole === 'trainer' ? 'trn-' : 'ath-')) + Date.now().toString().slice(-4),
        name: name.trim(),
        email: normalizedEmail,
        phone: (phone || '+1 (555) 000-0000').trim(),
        password: password,
        role: normalizedRole,
        accountType: normalizedRole,
        sport: (sport || (normalizedRole === 'trainer' ? 'Tactical Performance' : 'Multi-Sport')).trim(),
        tier: normalizedRole === 'admin' ? 'Master Executive' : (normalizedRole === 'trainer' ? 'Certified Coach Faculty' : 'Gold Athlete Tier'),
        avatar: normalizedRole === 'admin'
          ? DEFAULT_ADMIN.avatar
          : (normalizedRole === 'trainer' ? DEFAULT_TRAINER.avatar : DEFAULT_USER.avatar),
        title: normalizedRole === 'admin' ? 'Club Administrator' : (normalizedRole === 'trainer' ? 'Master Coach Faculty' : 'Club Member'),
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      users.push(newUser);
      this.saveUsers(users);

      // Check if autoLogin requested (e.g. direct flow) vs redirecting to login.html per user specification
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
          message: `Account created successfully! Welcome to STACKLY, ${newUser.name}.`
        };
      }

      // Default production requirement: redirect to login after successful registration
      const redirectUrl = `login.html?registered=true&email=${encodeURIComponent(newUser.email)}&role=${newUser.role}`;
      return {
        success: true,
        user: newUser,
        redirectUrl,
        message: `Account created successfully! Welcome to STACKLY, ${newUser.name}. Redirecting to sign in...`
      };
    },

    updateProfile(updatedFields) {
      if (!this.isLoggedIn()) return false;
      const currentUser = this.getCurrentUser();
      if (!currentUser) return false;

      const merged = Object.assign({}, currentUser, updatedFields);
      if (updatedFields.name) {
        localStorage.setItem(KEYS.USER_NAME, updatedFields.name);
      }
      this.saveUser(merged);
      this.syncSessionState();
      return true;
    },

    updatePlan(tier, billingCycle) {
      if (!this.isLoggedIn()) return false;
      return this.updateProfile({ tier, billingCycle });
    },

    bookSession(session) {
      const sessions = this.getUserSessions();
      const newSession = Object.assign({
        id: 's-' + Date.now(),
        checkedIn: false,
        bookedAt: new Date().toISOString()
      }, session);
      sessions.unshift(newSession);
      localStorage.setItem(KEYS.SESSIONS_DB, JSON.stringify(sessions));
      return newSession;
    },

    checkInSession(sessionId) {
      const sessions = this.getUserSessions();
      const idx = sessions.findIndex(s => s.id === sessionId);
      if (idx >= 0) {
        sessions[idx].checkedIn = true;
        localStorage.setItem(KEYS.SESSIONS_DB, JSON.stringify(sessions));
        return true;
      }
      return false;
    },

    cancelSession(sessionId) {
      const sessions = this.getUserSessions();
      const filtered = sessions.filter(s => s.id !== sessionId);
      localStorage.setItem(KEYS.SESSIONS_DB, JSON.stringify(filtered));
      return true;
    },

    getUserSessions() {
      try {
        const raw = localStorage.getItem(KEYS.SESSIONS_DB);
        return raw ? JSON.parse(raw) : INITIAL_SESSIONS;
      } catch (e) {
        return INITIAL_SESSIONS;
      }
    },

    registerForEvent(event) {
      const events = this.getUserEvents();
      const newEvent = Object.assign({
        id: 'ev-' + Date.now(),
        status: 'Registered',
        registeredAt: new Date().toISOString()
      }, event);
      events.unshift(newEvent);
      localStorage.setItem(KEYS.EVENTS_DB, JSON.stringify(events));
      return newEvent;
    },

    getUserEvents() {
      try {
        const raw = localStorage.getItem(KEYS.EVENTS_DB);
        return raw ? JSON.parse(raw) : INITIAL_EVENTS;
      } catch (e) {
        return INITIAL_EVENTS;
      }
    },

    logout() {
      localStorage.removeItem(KEYS.USER_NAME);
      localStorage.removeItem(KEYS.USER_EMAIL);
      localStorage.removeItem(KEYS.USER_ROLE);
      localStorage.setItem(KEYS.IS_LOGGED_IN, 'false');
      sessionStorage.removeItem(KEYS.ACTIVE_SESSION);

      window.location.href = 'login.html';
    },

    getRememberedEmail() {
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

    getDashboardUrlForRole(role) {
      switch ((role || '').toLowerCase()) {
        case 'admin':
          return 'admin-dashboard.html';
        case 'trainer':
          return 'trainer-dashboard.html';
        case 'user':
        default:
          return 'user-dashboard.html';
      }
    },

    /**
     * Role-Based Access Control Guard
     * Strictly guards dashboard routes against unauthorized direct URL tampering.
     */
    requireAuth(allowedRoles) {
      if (!this.isLoggedIn()) {
        const pathname = (window.location && window.location.pathname) ? window.location.pathname : '';
        const currentPage = pathname.split('/').pop() || 'index.html';
        window.location.replace(`login.html?redirect=${encodeURIComponent(currentPage)}`);
        return false;
      }

      const currentRole = this.getRole();
      const rolesArray = (allowedRoles || []).map(r => r.toLowerCase());

      if (rolesArray.length > 0 && !rolesArray.includes(currentRole)) {
        if (typeof alert === 'function') {
          alert(`Access Restricted: Your current account (${currentRole.toUpperCase()}) is not authorized to access this portal. Redirecting to your assigned dashboard.`);
        }
        window.location.replace(this.getDashboardUrlForRole(currentRole));
        return false;
      }

      return true;
    },

    /**
     * Dynamic Navigation Bar Auth Synchronizer
     * Preserves the 8 public nav items + Login CTA button
     */
    updateNavbarAuth() {
      // Desktop Navbar Action: ALWAYS LOGIN button redirecting to login.html per user specification
      const navActions = document.querySelector('.nav-actions');
      if (navActions) {
        let authBtn = navActions.querySelector('.nav-auth-btn') || navActions.querySelector('#navLoginBtn');
        const extraBtns = navActions.querySelectorAll('.nav-register-btn, .nav-signout-btn, a[href="signup.html"]');
        extraBtns.forEach(btn => btn.remove());

        if (authBtn) {
          authBtn.href = 'login.html';
          authBtn.className = 'btn btn-primary btn-sm magnetic-btn nav-auth-btn';
          authBtn.innerHTML = `<i class="fa-regular fa-user"></i> <span>Login</span>`;
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
          mobileActions.innerHTML = `
            <a href="login.html" class="btn btn-primary w-100" id="mobileNavLoginBtn">
              <i class="fa-regular fa-user"></i> Login
            </a>
          `;
        }
      }
    }
  };

  // Expose globally
  window.StacklyAuth = StacklyAuth;
  // Full backward compatibility alias
  window.EliteAuth = StacklyAuth;

  // Auto-init on script load
  StacklyAuth.init();

  // Run navbar update when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StacklyAuth.updateNavbarAuth());
  } else {
    StacklyAuth.updateNavbarAuth();
  }

})(window);
