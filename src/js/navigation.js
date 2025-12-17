/**
 * Navigation Module
 * Handles mobile navigation toggle
 */

const NAV_SELECTORS = {
  toggle: '.nav__toggle',
  menu: '.nav__menu',
};

const CLASSES = {
  open: 'is-open',
};

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
  const toggle = document.querySelector(NAV_SELECTORS.toggle);
  const menu = document.querySelector(NAV_SELECTORS.menu);

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle(CLASSES.open);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInside = toggle.contains(event.target) || menu.contains(event.target);

    if (!isClickInside && menu.classList.contains(CLASSES.open)) {
      menu.classList.remove(CLASSES.open);
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains(CLASSES.open)) {
      menu.classList.remove(CLASSES.open);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}
