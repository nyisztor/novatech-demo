/**
 * Contact Form Module
 * Handles form validation and submission
 */

import { validateField, validateForm } from './validation.js';

const SELECTORS = {
  form: '#contact-form',
  status: '#form-status',
};

const CLASSES = {
  invalid: 'is-invalid',
  statusSuccess: 'form-status--success',
  statusError: 'form-status--error',
};

const MESSAGES = {
  success: 'Thank you! Your message has been sent. We\'ll get back to you soon.',
  error: 'Sorry, there was an error sending your message. Please try again.',
};

/**
 * Show form status message
 * @param {HTMLElement} statusEl - Status element
 * @param {string} message - Message to display
 * @param {boolean} isSuccess - Whether this is a success message
 */
function showStatus(statusEl, message, isSuccess) {
  statusEl.textContent = message;
  statusEl.classList.remove(CLASSES.statusSuccess, CLASSES.statusError);
  statusEl.classList.add(isSuccess ? CLASSES.statusSuccess : CLASSES.statusError);
}

/**
 * Clear form status message
 * @param {HTMLElement} statusEl - Status element
 */
function clearStatus(statusEl) {
  statusEl.textContent = '';
  statusEl.classList.remove(CLASSES.statusSuccess, CLASSES.statusError);
}

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const statusEl = document.querySelector(SELECTORS.status);

  clearStatus(statusEl);

  // Validate all fields
  const validationResult = validateForm(form);

  if (!validationResult.isValid) {
    // Focus first invalid field
    const firstInvalidField = form.querySelector(`.${CLASSES.invalid}`);
    if (firstInvalidField) {
      firstInvalidField.focus();
    }
    return;
  }

  // Simulate form submission
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    showStatus(statusEl, MESSAGES.success, true);
    form.reset();
  } catch (error) {
    showStatus(statusEl, MESSAGES.error, false);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

/**
 * Handle field blur for validation
 * @param {Event} event - Blur event
 */
function handleFieldBlur(event) {
  const field = event.target;

  if (field.hasAttribute('required') || field.value) {
    validateField(field);
  }
}

/**
 * Initialize contact form
 */
export function initContactForm() {
  const form = document.querySelector(SELECTORS.form);

  if (!form) {
    return;
  }

  form.addEventListener('submit', handleSubmit);

  // Add blur validation to required fields
  const fields = form.querySelectorAll('input, textarea');
  fields.forEach((field) => {
    field.addEventListener('blur', handleFieldBlur);
  });
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
// Contact form improvements in progress
