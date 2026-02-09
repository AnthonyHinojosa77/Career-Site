(function () {
  var body = document.body;
  var header = document.querySelector('[data-site-header]') || document.querySelector('.site-header');
  var toggle = document.querySelector('[data-menu-toggle]') || document.querySelector('.menu-toggle');
  var mobileMenu = document.querySelector('[data-mobile-menu]') || document.querySelector('.mobile-menu');
  var mobilePanel = document.querySelector('[data-mobile-panel]') || document.querySelector('.mobile-menu-panel');
  var closeMenuBtn = document.querySelector('[data-menu-close]');
  var focusTrapHandler = null;

  function setHeaderOnScroll() {
    if (!header) {
      return;
    }
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  function currentPageName() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1);
    return file || 'index.html';
  }

  function setActiveNavLinks() {
    var page = currentPageName();
    var links = document.querySelectorAll('[data-nav-link], .nav-link, .mobile-menu a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === page) {
        link.classList.add('is-active');
        if (!link.getAttribute('aria-current')) {
          link.setAttribute('aria-current', 'page');
        }
      }
    });
  }

  function getFocusableInMenu() {
    if (!mobileMenu) {
      return [];
    }
    return Array.prototype.slice.call(
      mobileMenu.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function trapMenuFocus(event) {
    if (!mobileMenu || !mobileMenu.classList.contains('is-open') || event.key !== 'Tab') {
      return;
    }

    var focusables = getFocusableInMenu();
    if (!focusables.length) {
      return;
    }

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMenu() {
    if (!mobileMenu || !toggle) {
      return;
    }
    mobileMenu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';

    var focusables = getFocusableInMenu();
    if (focusables.length) {
      focusables[0].focus();
    }

    focusTrapHandler = trapMenuFocus;
    document.addEventListener('keydown', focusTrapHandler);
  }

  function closeMenu() {
    if (!mobileMenu || !toggle) {
      return;
    }
    mobileMenu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';

    if (focusTrapHandler) {
      document.removeEventListener('keydown', focusTrapHandler);
      focusTrapHandler = null;
    }
  }

  function initMenu() {
    if (!toggle || !mobileMenu) {
      return;
    }

    toggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', closeMenu);
    }

    mobileMenu.addEventListener('click', function (event) {
      if (!mobilePanel || !mobilePanel.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    });
  }

  function initFilterGroups() {
    var groups = document.querySelectorAll('[data-filter-group]');
    groups.forEach(function (group) {
      var buttons = group.querySelectorAll('[data-filter]');
      var targetName = group.getAttribute('data-filter-group');
      var items = document.querySelectorAll('[data-filter-item="' + targetName + '"]');

      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          var value = button.getAttribute('data-filter');

          buttons.forEach(function (btn) {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-pressed', 'false');
          });

          button.classList.add('is-active');
          button.setAttribute('aria-pressed', 'true');

          items.forEach(function (item) {
            var categories = (item.getAttribute('data-category') || '').split(' ');
            var show = value === 'all' || categories.indexOf(value) >= 0;
            item.hidden = !show;
          });
        });
      });
    });
  }

  function initReveal() {
    var revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealItems.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showFieldError(form, fieldName, message) {
    var field = form.querySelector('[name="' + fieldName + '"]');
    var errorEl = form.querySelector('[data-error-for="' + fieldName + '"]');
    if (!errorEl && field) {
      var parent = field.closest('.form-field');
      if (parent) {
        errorEl = parent.querySelector('.field-error');
      }
    }
    if (field) {
      if (message) {
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    }
    if (errorEl) {
      errorEl.textContent = message || '';
    }
  }

  function setFormStatus(form, message, type) {
    var status = form.querySelector('[data-form-status]') || form.querySelector('.form-status');
    if (!status) {
      return;
    }

    status.textContent = message || '';
    status.classList.remove('is-success', 'is-error');
    if (type) {
      status.classList.add(type === 'success' ? 'is-success' : 'is-error');
    }
  }

  function initContactValidation() {
    var form = document.querySelector('[data-contact-form]') || document.getElementById('contact-form');
    if (!form) {
      return;
    }

    form.addEventListener('submit', function (event) {
      var name = form.elements.name ? form.elements.name.value.trim() : '';
      var email = form.elements.email ? form.elements.email.value.trim() : '';
      var message = form.elements.message ? form.elements.message.value.trim() : '';
      var endpoint = form.getAttribute('action') || '';

      var hasErrors = false;
      showFieldError(form, 'name', '');
      showFieldError(form, 'email', '');
      showFieldError(form, 'message', '');
      setFormStatus(form, '', null);

      if (!name) {
        showFieldError(form, 'name', 'Please add your name.');
        hasErrors = true;
      }

      if (!email) {
        showFieldError(form, 'email', 'Please add an email address.');
        hasErrors = true;
      } else if (!validateEmail(email)) {
        showFieldError(form, 'email', 'Please enter a valid email address.');
        hasErrors = true;
      }

      if (!message || message.length < 20) {
        showFieldError(form, 'message', 'Please include at least 20 characters.');
        hasErrors = true;
      }

      if (hasErrors) {
        event.preventDefault();
        setFormStatus(form, 'Please fix the highlighted fields and try again.', 'error');
        return;
      }

      if (endpoint.indexOf('YOUR_FORM_ID') > -1) {
        event.preventDefault();
        setFormStatus(
          form,
          'Formspree endpoint placeholder detected. Replace YOUR_FORM_ID to enable submissions.',
          'error'
        );
      }
    });
  }

  setHeaderOnScroll();
  setActiveNavLinks();
  initMenu();
  initFilterGroups();
  initReveal();
  initContactValidation();

  window.addEventListener('scroll', setHeaderOnScroll, { passive: true });
})();
