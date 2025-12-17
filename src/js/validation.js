/**
 * Validation Module
 * Reusable form validation utilities
 */

const CLASSES = {
  invalid: 'is-invalid',
};

const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-+()]{10,}$/,
};

const MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min) => `Please enter at least ${min} characters`,
  maxLength: (max) => `Please enter no more than ${max} characters`,
};

/**
 * Get validation rules for a field
 * @param {HTMLElement} field - Form field
 * @returns {Object} Validation rules
 */
function getValidationRules(field) {
  return {
    required: field.hasAttribute('required'),
    type: field.type,
    minLength: field.minLength > 0 ? field.minLength : null,
    maxLength: field.maxLength > 0 ? field.maxLength : null,
    pattern: field.pattern || null,
  };
}

/**
 * Validate a single field
 * @param {HTMLElement} field - Form field to validate
 * @returns {Object} Validation result { isValid, message }
 */
export function validateField(field) {
  const rules = getValidationRules(field);
  const value = field.value.trim();
  const errorEl = document.getElementById(`${field.id}-error`);

  let isValid = true;
  let message = '';

  // Required check
  if (rules.required && !value) {
    isValid = false;
    message = MESSAGES.required;
  }

  // Email check
  else if (rules.type === 'email' && value && !PATTERNS.email.test(value)) {
    isValid = false;
    message = MESSAGES.email;
  }

  // Phone check
  else if (rules.type === 'tel' && value && !PATTERNS.phone.test(value)) {
    isValid = false;
    message = MESSAGES.phone;
  }

  // Min length check
  else if (rules.minLength && value && value.length < rules.minLength) {
    isValid = false;
    message = MESSAGES.minLength(rules.minLength);
  }

  // Max length check
  else if (rules.maxLength && value && value.length > rules.maxLength) {
    isValid = false;
    message = MESSAGES.maxLength(rules.maxLength);
  }

  // Update UI
  if (isValid) {
    field.classList.remove(CLASSES.invalid);
    if (errorEl) {
      errorEl.textContent = '';
    }
  } else {
    field.classList.add(CLASSES.invalid);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  return { isValid, message };
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - Form to validate
 * @returns {Object} Validation result { isValid, errors }
 */
export function validateForm(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  const errors = [];

  fields.forEach((field) => {
    if (field.hasAttribute('required') || field.value) {
      const result = validateField(field);
      if (!result.isValid) {
        errors.push({
          field: field.name || field.id,
          message: result.message,
        });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return PATTERNS.email.test(email);
}

/**
 * Check if phone is valid
 * @param {string} phone - Phone to validate
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return PATTERNS.phone.test(phone);
}
