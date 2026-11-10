const fs = require('fs');
const path = require('path');

const userDashJsPath = path.join(__dirname, '../js/user-dashboard.js');
let code = fs.readFileSync(userDashJsPath, 'utf8');

const oldInitSidebar = `  function initSidebar() {
    const sidebar = document.getElementById('userSidebar') || document.querySelector('.dash-sidebar');
    const toggleBtn = document.getElementById('dashMenuToggle') || document.getElementById('dashMobileToggle');
    const closeBtn = document.getElementById('dashSidebarClose');
    const backdrop = document.getElementById('dashSidebarBackdrop');

    if (!sidebar) return;

    const openSidebar = () => {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.classList.add('menu-open');
    };

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('.dash-nav-item, .dash-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeSidebar();
      });
    });
  }`;

const newInitSidebar = `  function initSidebar() {
    const sidebar = document.getElementById('userSidebar') || document.querySelector('.dash-sidebar');
    const toggleBtn = document.getElementById('dashMenuToggle') || document.getElementById('dashMobileToggle');
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

    sidebar.querySelectorAll('.dash-nav-item, .dash-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeSidebar();
      });
    });

    // Make global for inline handlers
    window.openMobileSidebar = openSidebar;
    window.closeMobileSidebar = closeSidebar;
  }`;

if (code.includes(oldInitSidebar)) {
  code = code.replace(oldInitSidebar, newInitSidebar);
  fs.writeFileSync(userDashJsPath, code, 'utf8');
  console.log('js/user-dashboard.js sidebar updated!');
}
