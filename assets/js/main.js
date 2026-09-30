/**
 * DAIRY FARM - MAIN JAVASCRIPT
 * Handles Navigation, Theme Toggle, RTL Toggle, Form Validation, Animations, and Interactive Elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME TOGGLE SYSTEM (STEP 6)
  initTheme();

  // 2. RTL TOGGLE SYSTEM (STEP 5)
  initRTL();

  // 3. NAVIGATION & MOBILE DRAWER (STEP 4)
  initNavigation();

  // 4. CLIENT-SIDE FORM VALIDATION (STEP 12)
  initFormValidation();

  // 5. TESTIMONIAL CAROUSEL
  initTestimonials();

  // 6. FAQ ACCORDION
  initFAQ();

  // 7. PRODUCT FILTER TABS
  initProductFilters();

  // 8. COMING SOON COUNTDOWN (IF ON PAGE)
  initCountdown();

  // 9. BACK TO TOP BUTTON
  initBackToTop();
});

/* ==========================================================================
   1. THEME INITIALIZATION & TOGGLE
   - Default: detect prefers-color-scheme
   - Persists via localStorage
   - Sun/Moon icon swaps
   - Auth pages have NO theme toggle
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('dairy_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('dairy_theme', newTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  // Update icons on any theme toggle button
  const toggleButtons = document.querySelectorAll('.theme-toggle-btn i');
  toggleButtons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'ph ph-sun';
    } else {
      icon.className = 'ph ph-moon';
    }
  });
}

/* ==========================================================================
   2. RTL INITIALIZATION & TOGGLE (STEP 5)
   - Toggles dir="rtl" on <html> and .rtl on <body>
   - Icon: Phosphor arrows-left-right â‡„
   ========================================================================== */
function initRTL() {
  const savedDir = localStorage.getItem('dairy_dir');
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl');
  }

  const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
  rtlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.add('no-transition');
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
  
        document.documentElement.setAttribute('dir', newDir);
        if (newDir === 'rtl') {
          document.body.classList.add('rtl');
        } else {
          document.body.classList.remove('rtl');
        }
        localStorage.setItem('dairy_dir', newDir);
        
        setTimeout(() => {
          document.body.classList.remove('no-transition');
        }, 10);
    });
  });
}

/* ==========================================================================
   3. NAVIGATION & MOBILE DRAWER (STEP 4)
   - > 1024px: full horizontal nav
   - <= 1024px: hamburger -> slide drawer
   - Touch-friendly link height >= 44px
   ========================================================================== */
function initNavigation() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (hamburgerBtn && drawer && overlay) {
    const openDrawer = () => {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Close drawer when mobile link clicked
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Header sticky scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.style.boxShadow = 'var(--shadow-global)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
}

/* ==========================================================================
   4. FORM VALIDATION (STEP 12)
   - Client-side validation before submit
   - Visual error: red border + .invalid-feedback
   - Visual success: green border + .valid-feedback
   - Email regex, password length >= 8, confirm password matching
   - Terms checkbox checked
   - Inline message without page reload
   ========================================================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate="true"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Inputs
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        const value = input.value.trim();
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        let fieldValid = true;

        if (input.hasAttribute('required') && !value) {
          fieldValid = false;
          if (feedback) feedback.textContent = 'This field is required.';
        } else if (input.type === 'email' && value && !emailRegex.test(value)) {
          fieldValid = false;
          if (feedback) feedback.textContent = 'Please enter a valid email address.';
        } else if (input.type === 'password' && input.dataset.minlength && value.length < Number(input.dataset.minlength)) {
          fieldValid = false;
          if (feedback) feedback.textContent = `Password must be at least ${input.dataset.minlength} characters.`;
        } else if (input.id === 'confirmPassword') {
          const pass = form.querySelector('#password');
          if (pass && value !== pass.value.trim()) {
            fieldValid = false;
            if (feedback) feedback.textContent = 'Passwords do not match.';
          }
        } else if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
          fieldValid = false;
          if (feedback) feedback.textContent = 'You must accept the terms before proceeding.';
        }

        if (!fieldValid) {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          if (value || input.checked) {
            input.classList.add('is-valid');
          }
        }
      });

      // Inline notification handling
      const alertBox = form.querySelector('.form-alert-box') || document.querySelector('.global-form-alert');
      if (isValid) {
        if (alertBox) {
          alertBox.className = 'form-alert-box alert-success';
          alertBox.textContent = form.dataset.successMsg || 'Action completed successfully! Our farm team will be in touch shortly.';
          alertBox.style.display = 'block';
        }
        form.reset();
        // Remove valid classes after 3 seconds
        setTimeout(() => {
          inputs.forEach(input => input.classList.remove('is-valid'));
        }, 3000);
      } else {
        if (alertBox) {
          alertBox.className = 'form-alert-box alert-danger';
          alertBox.textContent = 'Please correct the highlighted fields and try again.';
          alertBox.style.display = 'block';
        }
      }
    });

    // Real-time input clearing
    const interactiveInputs = form.querySelectorAll('input, textarea');
    interactiveInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  });
}

/* ==========================================================================
   5. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonials() {
  const testimonials = [
    {
      quote: "Switching to Aura Dairy's raw A2 milk changed our morning routine. The rich cream top and pure grass-fed flavor take me back to childhood memories on my grandparents' farm.",
      author: "Eleanor Vance",
      role: "Artisanal Baker & Culinary Critic",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Their farm-to-table traceability is unmatched. As a chef at a Michelin-rated bistro, knowing their cows graze freely on pesticide-free pastures gives me total confidence in their cultured butter and ghee.",
      author: "Marcus Sterling",
      role: "Executive Head Chef",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Daily morning doorstep delivery at 6:00 AM without fail! Glass bottles are eco-friendly, sanitized, and the paneer melts effortlessly in the mouth.",
      author: "Dr. Sarah Al-Mansoor",
      role: "Holistic Nutrition Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    }
  ];

  let currentIndex = 0;
  const quoteEl = document.querySelector('.testimonial-quote');
  const nameEl = document.querySelector('.testimonial-author-name');
  const roleEl = document.querySelector('.testimonial-author-role');
  const avatarEl = document.querySelector('.testimonial-author-avatar');
  const prevBtn = document.querySelector('#prevTestimonial');
  const nextBtn = document.querySelector('#nextTestimonial');

  if (quoteEl && nameEl && prevBtn && nextBtn) {
    const updateTestimonial = (index) => {
      const item = testimonials[index];
      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = `"${item.quote}"`;
        nameEl.textContent = item.author;
        roleEl.textContent = item.role;
        if (avatarEl) avatarEl.src = item.avatar;
        quoteEl.style.opacity = '1';
      }, 200);
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonial(currentIndex);
    });
  }
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   7. PRODUCT CATEGORY FILTER TABS
   ========================================================================== */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-item-wrap');

  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

/* ==========================================================================
   8. COMING SOON COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const timerDays = document.querySelector('#timerDays');
  const timerHours = document.querySelector('#timerHours');
  const timerMins = document.querySelector('#timerMins');
  const timerSecs = document.querySelector('#timerSecs');

  if (timerDays && timerHours && timerMins && timerSecs) {
    // 45 days from current date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerDays.textContent = String(days).padStart(2, '0');
      timerHours.textContent = String(hours).padStart(2, '0');
      timerMins.textContent = String(minutes).padStart(2, '0');
      timerSecs.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }
}


  /* ==========================================================================
     PASSWORD TOGGLE
     ========================================================================== */
  function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll(".password-toggle-btn");
    toggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.previousElementSibling;
        const icon = btn.querySelector("i");
        if (input && input.tagName === "INPUT") {
          if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("ph-eye");
            icon.classList.add("ph-eye-slash");
          } else {
            input.type = "password";
            icon.classList.remove("ph-eye-slash");
            icon.classList.add("ph-eye");
          }
        }
      });
    });
  }



  /* ==========================================================================
     BACK TO TOP BUTTON
     ========================================================================== */
  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
