/**
 * DAIRY FARM - DASHBOARD JAVASCRIPT
 * Handles Farm Management Operations, Milk Production Tracking, Livestock Health Records,
 * Feed Stock Inventory, Order Dispatches, Customer Directory, and Real-time Modal Dialogs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initDashboardModals();
  initDashboardForms();
  initTableSearch();
  initRoleToggle();
});

/* ==========================================================================
   1. DASHBOARD TAB NAVIGATION
   ========================================================================== */
function initDashboardTabs() {
  const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');
  const viewTitle = document.querySelector('#dashViewTitle');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabTarget = item.dataset.tab;

      // Update active nav class
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Update active tab pane
      tabPanes.forEach(pane => {
        if (pane.id === `tab-${tabTarget}`) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });

      // Update Topbar View Title
      if (viewTitle) {
        viewTitle.textContent = item.querySelector('span') ? item.querySelector('span').textContent : 'Farm Overview';
      }

      // Close mobile sidebar if open
      const sidebar = document.querySelector('.dash-sidebar');
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });

  // Mobile sidebar toggle
  const sidebarToggleBtn = document.querySelector('#sidebarToggleBtn');
  const sidebar = document.querySelector('.dash-sidebar');
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

/* ==========================================================================
   2. MODALS SYSTEM
   - Modal to Log Milk Yield Batch
   - Modal to Register New Livestock
   ========================================================================== */
function initDashboardModals() {
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const overlays = document.querySelectorAll('.modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.openModal;
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (overlay) => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentOverlay = btn.closest('.modal-overlay');
      if (parentOverlay) closeModal(parentOverlay);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });
}

/* ==========================================================================
   3. DASHBOARD INTERACTIVE FORMS
   - Adding a milk batch updates the table dynamically
   - Adding a livestock record appends to the table
   ========================================================================== */
function initDashboardForms() {
  // Milk Batch Log Form
  const milkForm = document.querySelector('#formLogMilk');
  if (milkForm) {
    milkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const morningYield = document.querySelector('#milkMorning').value;
      const eveningYield = document.querySelector('#milkEvening').value;
      const fatPct = document.querySelector('#milkFat').value;
      const tankId = document.querySelector('#milkTank').value;
      const totalYield = (parseFloat(morningYield) || 0) + (parseFloat(eveningYield) || 0);

      const tableBody = document.querySelector('#milkBatchTableBody');
      if (tableBody) {
        const today = new Date().toISOString().split('T')[0];
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><strong>${today}</strong> (Batch #${Math.floor(Math.random() * 900 + 100)})</td>
          <td>${morningYield} L</td>
          <td>${eveningYield} L</td>
          <td><strong>${totalYield.toFixed(1)} L</strong></td>
          <td>${fatPct}%</td>
          <td>${tankId}</td>
          <td><span class="badge-status success">Chilled & Verified</span></td>
        `;
        tableBody.insertBefore(newRow, tableBody.firstChild);
      }

      // Close modal & reset form
      const modal = document.querySelector('#modalLogMilk');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      milkForm.reset();

      // Show toast
      showDashToast(`Logged ${totalYield.toFixed(1)} Liters of milk batch successfully!`);
    });
  }

  // Livestock Registration Form
  const livestockForm = document.querySelector('#formAddLivestock');
  if (livestockForm) {
    livestockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tagId = document.querySelector('#cattleTagId').value;
      const breed = document.querySelector('#cattleBreed').value;
      const age = document.querySelector('#cattleAge').value;
      const dailyYield = document.querySelector('#cattleYield').value;
      const health = document.querySelector('#cattleHealth').value;

      const livestockTableBody = document.querySelector('#livestockTableBody');
      if (livestockTableBody) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><strong>${tagId}</strong></td>
          <td>${breed}</td>
          <td>${age}</td>
          <td>${dailyYield} L/day</td>
          <td><span class="badge-status success">${health}</span></td>
          <td><span class="badge-status success">Up to date</span></td>
          <td>
            <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;">Details</button>
          </td>
        `;
        livestockTableBody.insertBefore(newRow, livestockTableBody.firstChild);
      }

      const modal = document.querySelector('#modalAddLivestock');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      livestockForm.reset();
      showDashToast(`Cattle ${tagId} registered to pasture livestock database!`);
    });
  }
}

/* ==========================================================================
   4. REALTIME SEARCH & FILTER IN TABLES
   ========================================================================== */
function initTableSearch() {
  const searchInput = document.querySelector('#dashSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      const activePane = document.querySelector('.dash-tab-pane[style*="block"]') || document.querySelector('#tab-overview');
      if (activePane) {
        const rows = activePane.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(term)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      }
    });
  }
}

/* ==========================================================================
   5. ROLE TOGGLE: ADMIN VIEW VS CUSTOMER VIEW
   ========================================================================== */
function initRoleToggle() {
  const roleSelect = document.querySelector('#dashRoleSelect');
  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      const role = roleSelect.value;
      const adminNavGroup = document.querySelector('#adminNavGroup');
      const userNavGroup = document.querySelector('#userNavGroup');

      if (role === 'user') {
        if (adminNavGroup) adminNavGroup.style.display = 'none';
        if (userNavGroup) userNavGroup.style.display = 'flex';
        // Switch to user profile tab
        const userOrderTab = document.querySelector('[data-tab="user-orders"]');
        if (userOrderTab) userOrderTab.click();
      } else {
        if (adminNavGroup) adminNavGroup.style.display = 'flex';
        if (userNavGroup) userNavGroup.style.display = 'none';
        const overviewTab = document.querySelector('[data-tab="overview"]');
        if (overviewTab) overviewTab.click();
      }
    });
  }
}

/* Helper Toast Notification */
function showDashToast(message) {
  let toast = document.querySelector('#dashToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dashToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--color-primary);
      color: #ffffff;
      padding: 14px 24px;
      border-radius: var(--radius-global);
      box-shadow: var(--shadow-hover);
      font-size: 0.95rem;
      font-weight: 500;
      z-index: 9999;
      transform: translateY(100px);
      transition: transform 0.3s ease;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
  }, 3500);
}
