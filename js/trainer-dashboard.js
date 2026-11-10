/**
 * STACKLY SPORTS CLUB - Master Trainer & Coach Dashboard Controller
 * Powers 11 Modules:
 * 1. Overview & Faculty Telemetry
 * 2. My Profile & Credentials
 * 3. My Classes & Session Management
 * 4. My Schedule & Interactive Timetable
 * 5. Assigned Members & Athlete Dossiers
 * 6. Live Attendance Management & Marking
 * 7. Training Programs & Drills
 * 8. Member Progress & Kinetic Metrics
 * 9. Event Participation & Championship Entries
 * 10. Notifications & Alerts
 * 11. Profile Settings & Availability
 */

(function (window, document) {
  'use strict';

  // 1. Enforce Role-Based Access Control
  if (window.StacklyAuth) {
    if (!StacklyAuth.requireAuth(['trainer', 'admin'])) {
      return; // Stop execution if unauthorized
    }
  }

  let attendanceChart = null;
  let performanceRadarChart = null;

  // Mock data for attendance management
  const classRoster = [
    { id: 101, name: 'Jordan Hayes', sport: 'Football', tier: 'Elite Black', status: 'present', progress: '94%' },
    { id: 102, name: 'Elena Rostova', sport: 'Tennis', tier: 'Gold Tier', status: 'present', progress: '88%' },
    { id: 103, name: 'Marcus Vance', sport: 'Football', tier: 'Pro Academy', status: 'present', progress: '96%' },
    { id: 104, name: 'Liam Davies', sport: 'Basketball', tier: 'Gold Tier', status: 'absent', progress: '78%' },
    { id: 105, name: 'Sophia Chen', sport: 'Badminton', tier: 'Platinum', status: 'present', progress: '91%' },
    { id: 106, name: 'David Okafor', sport: 'Football', tier: 'Elite Black', status: 'excused', progress: '85%' },
    { id: 107, name: 'Chloe Bennett', sport: 'Tennis', tier: 'Pro Academy', status: 'present', progress: '98%' },
    { id: 108, name: 'Rajesh Varma Jr.', sport: 'Cricket', tier: 'Platinum', status: 'present', progress: '90%' }
  ];

  function initTrainerDashboard() {
    initDynamicUserInfo();
    initSidebarNavigation();
    initTabViews();
    initCharts();
    initAttendanceMarking();
    initMemberSearch();
    initProgressLogger();
    initLogout();
    
    // Profile Form Handler
    const profileForm = document.getElementById('trainerProfileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('profName')?.value;
        const phoneVal = document.getElementById('profPhone')?.value;
        const specialtyVal = document.getElementById('profSpecialty')?.value;
        const bioVal = document.getElementById('profBio')?.value;

        if (window.StacklyAuth) {
          StacklyAuth.updateProfile({
            name: nameVal,
            phone: phoneVal,
            specialty: specialtyVal,
            bio: bioVal
          });
          initDynamicUserInfo();
        }
        alert('Coach Profile Updated Successfully: Dossier details saved to Stackly faculty records.');
      });
    }

    // Settings Form Handler
    const settingsForm = document.getElementById('trainerSettingsForm');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Coach Preferences Saved: Default arena assignments and dispatch notifications updated.');
      });
    }

    // Update Portrait Button
    document.querySelectorAll('.btn-update-portrait, button:has(.fa-camera), .dash-profile-sidebar button').forEach(btn => {
      if (btn.textContent.includes('Update Portrait') || btn.textContent.includes('Portrait')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const newUrl = prompt('Enter image URL for updated Coach portrait:');
          if (newUrl && newUrl.trim()) {
            if (window.StacklyAuth) {
              StacklyAuth.updateProfile({ avatar: newUrl.trim() });
              initDynamicUserInfo();
            }
            alert('Coach Portrait Updated.');
          }
        });
      }
    });

    // Window Resize chart handler
    window.addEventListener('resize', () => {
      if (attendanceChart) attendanceChart.resize();
      if (performanceRadarChart) performanceRadarChart.resize();
    }, { passive: true });

  }

  function initDynamicUserInfo() {
    if (!window.StacklyAuth) return;
    const user = StacklyAuth.getCurrentUser();
    if (!user) return;

    const nameEls = document.querySelectorAll('.trainer-name-display, #sideTrainerName, #topbarTrainerName');
    nameEls.forEach(el => el.textContent = user.name);

    const titleEls = document.querySelectorAll('.trainer-title-display, #sideTrainerTitle');
    titleEls.forEach(el => el.textContent = user.title || user.specialty || 'Tactical Director & Master Coach');

    const avatarEls = document.querySelectorAll('.trainer-avatar-img, #sideTrainerAvatar, #topbarTrainerAvatar');
    avatarEls.forEach(el => {
      if (user.avatar) el.src = user.avatar;
    });
  }

  function initSidebarNavigation() {
    const sidebar = document.getElementById('trainerSidebar') || document.querySelector('.dash-sidebar');
    const toggleBtn = document.getElementById('dashMenuToggle') || document.getElementById('trainerSidebarToggle');
    const closeBtn = document.getElementById('dashSidebarClose');
    const backdrop = document.getElementById('dashSidebarBackdrop');

    if (!sidebar) return;

    const openSidebar = () => {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.classList.add('dash-sidebar-open');
    };

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.classList.remove('dash-sidebar-open');
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (window.innerWidth > 992) {
          sidebar.classList.toggle('collapsed');
        } else {
          openSidebar();
        }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    // Auto-close on link click in mobile view
    sidebar.querySelectorAll('.dash-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeSidebar();
      });
    });

    window.openTrainerSidebar = openSidebar;
    window.closeTrainerSidebar = closeSidebar;
  }

  function switchTrainerView(targetViewId) {
    if (!targetViewId) return;
    const navLinks = document.querySelectorAll('.dash-nav-link[data-view]');
    const viewSections = document.querySelectorAll('.dash-view-section');

    navLinks.forEach(l => {
      if (l.getAttribute('data-view') === targetViewId) l.classList.add('active');
      else l.classList.remove('active');
    });

    viewSections.forEach(sec => {
      if (sec.id === targetViewId) {
        sec.style.display = 'block';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(sec, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.28 });
        }
      } else {
        sec.style.display = 'none';
      }
    });

    try {
      history.replaceState(null, '', '#' + targetViewId);
    } catch (e) {}

    if (targetViewId === 'view-overview' && attendanceChart) {
      setTimeout(() => {
        attendanceChart.resize();
        if (performanceRadarChart) performanceRadarChart.resize();
      }, 80);
    }

    if (window.innerWidth <= 992 && typeof window.closeTrainerSidebar === 'function') {
      window.closeTrainerSidebar();
    }
  }

  function initTabViews() {
    const navLinks = document.querySelectorAll('.dash-nav-link[data-view]');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetViewId = link.getAttribute('data-view');
        switchTrainerView(targetViewId);
      });
    });

    // Check URL hash on page load
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      switchTrainerView(hash);
    }
  }

  function initCharts() {
    const ctxBar = document.getElementById('trainerAttendanceChart');
    if (ctxBar && typeof Chart !== 'undefined') {
      const gradient = ctxBar.getContext('2d').createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(255, 90, 31, 0.45)');
      gradient.addColorStop(1, 'rgba(255, 90, 31, 0.0)');

      attendanceChart = new Chart(ctxBar, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Athletes Attended',
              data: [42, 48, 52, 46, 58, 62, 54],
              borderColor: '#FF5A1F',
              backgroundColor: gradient,
              borderWidth: 3,
              fill: true,
              tension: 0.38,
              pointBackgroundColor: '#FF5A1F',
              pointBorderColor: '#ffffff',
              pointRadius: 5
            },
            {
              label: 'Target Capacity',
              data: [50, 50, 55, 50, 60, 65, 60],
              borderColor: 'rgba(255, 255, 255, 0.25)',
              borderDash: [5, 5],
              borderWidth: 2,
              fill: false,
              tension: 0.1,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#888894', font: { family: 'Inter', size: 12 } }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#888894', font: { family: 'Inter' } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#888894', font: { family: 'Inter' } }
            }
          }
        }
      });
    }

    const ctxRadar = document.getElementById('trainerSkillRadarChart');
    if (ctxRadar && typeof Chart !== 'undefined') {
      performanceRadarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: ['Kinetic Sprint', 'Tactical Reads', 'VO2 Endurance', 'Ball Velocity', 'Agility Score'],
          datasets: [
            {
              label: 'Cohort Average',
              data: [88, 92, 85, 90, 94],
              backgroundColor: 'rgba(255, 90, 31, 0.25)',
              borderColor: '#FF5A1F',
              borderWidth: 2,
              pointBackgroundColor: '#FF5A1F'
            },
            {
              label: 'Benchmark Target',
              data: [95, 95, 90, 95, 95],
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.4)',
              borderWidth: 1.5,
              pointBackgroundColor: '#ffffff'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: '#888894', font: { family: 'Inter', size: 11 } } }
          },
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
              grid: { color: 'rgba(255, 255, 255, 0.08)' },
              pointLabels: { color: '#d1d1d6', font: { family: 'Inter', size: 11 } },
              ticks: { display: false, max: 100 }
            }
          }
        }
      });
    }
  }

  function initAttendanceMarking() {
    const rosterContainer = document.getElementById('liveAttendanceRoster');
    if (!rosterContainer) return;

    const renderRoster = () => {
      rosterContainer.innerHTML = classRoster.map(athlete => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div class="dash-user-avatar" style="width:34px; height:34px; min-width:34px;">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="${athlete.name}">
              </div>
              <div>
                <strong>${athlete.name}</strong>
                <div style="font-size:0.75rem; color:#8c8c98;">#ATH-${athlete.id} &bull; ${athlete.sport}</div>
              </div>
            </div>
          </td>
          <td><span class="dash-nav-badge">${athlete.tier}</span></td>
          <td>
            <span class="status-pill ${athlete.status}" id="status-pill-${athlete.id}">
              <i class="fa-solid fa-circle" style="font-size:0.55rem;"></i> ${athlete.status.toUpperCase()}
            </span>
          </td>
          <td><strong>${athlete.progress}</strong></td>
          <td style="text-align:right;">
            <div class="btn-group" role="group" style="display:inline-flex; gap:4px;">
              <button type="button" class="btn btn-sm btn-action-present ${athlete.status === 'present' ? 'btn-primary' : 'btn-outline'}" data-id="${athlete.id}" data-set="present" title="Mark Present">
                <i class="fa-solid fa-check"></i>
              </button>
              <button type="button" class="btn btn-sm btn-action-absent ${athlete.status === 'absent' ? 'btn-danger' : 'btn-outline'}" data-id="${athlete.id}" data-set="absent" title="Mark Absent" style="${athlete.status === 'absent' ? 'background:#ff4757; color:#fff;' : ''}">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <button type="button" class="btn btn-sm btn-action-excused ${athlete.status === 'excused' ? 'btn-warning' : 'btn-outline'}" data-id="${athlete.id}" data-set="excused" title="Mark Excused" style="${athlete.status === 'excused' ? 'background:#ffab00; color:#000;' : ''}">
                <i class="fa-solid fa-clock-rotate-left"></i>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      // Wire attendance buttons
      rosterContainer.querySelectorAll('button[data-set]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'), 10);
          const newStatus = btn.getAttribute('data-set');
          const athlete = classRoster.find(a => a.id === id);
          if (athlete) {
            athlete.status = newStatus;
            renderRoster();
            updateAttendanceSummary();
          }
        });
      });
    };

    const updateAttendanceSummary = () => {
      const presentCount = classRoster.filter(a => a.status === 'present').length;
      const absentCount = classRoster.filter(a => a.status === 'absent').length;
      const excusedCount = classRoster.filter(a => a.status === 'excused').length;

      const pEl = document.getElementById('attSummaryPresent');
      const aEl = document.getElementById('attSummaryAbsent');
      const eEl = document.getElementById('attSummaryExcused');

      if (pEl) pEl.textContent = presentCount;
      if (aEl) aEl.textContent = absentCount;
      if (eEl) eEl.textContent = excusedCount;
    };

    renderRoster();
    updateAttendanceSummary();

    const saveBtn = document.getElementById('btnSaveAttendanceLedger');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const count = classRoster.filter(a => a.status === 'present').length;
        alert(`Attendance Ledger Verified: ${count} of ${classRoster.length} athletes marked present. Records stored in Stackly High-Performance Ledger.`);
      });
    }
  }

  function initMemberSearch() {
    const searchInput = document.getElementById('trainerMemberSearchInput');
    const tableRows = document.querySelectorAll('#assignedMembersTableBody tr');

    if (searchInput && tableRows.length) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        tableRows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }
  }

  function initProgressLogger() {
    const progressForm = document.getElementById('trainerProgressLogForm');
    if (progressForm) {
      progressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const athleteSelect = document.getElementById('logAthleteSelect');
        const metricSprint = document.getElementById('logSprintSpeed');
        const metricScore = document.getElementById('logTacticalScore');

        const name = athleteSelect ? athleteSelect.options[athleteSelect.selectedIndex].text : 'Athlete';
        alert(`Performance Telemetry Logged for ${name}: Sprint Speed ${metricSprint.value} MPH, Tactical Score ${metricScore.value}/100. Telemetry dispatched to athlete portal.`);
        progressForm.reset();
      });
    }
  }

  function initLogout() {
    const logoutBtns = document.querySelectorAll('#trainerLogoutBtn, .btn-trainer-logout');
    logoutBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to log out of the Coach Command Center?')) {
          if (window.StacklyAuth) {
            StacklyAuth.logout();
          } else {
            window.location.href = 'login.html';
          }
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrainerDashboard);
  } else {
    initTrainerDashboard();
  }

})(window, document);
