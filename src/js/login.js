/**
 * Login page — form validation and interaction
 */

import { validateField } from './validation.js';

const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const toggleBtn = document.querySelector('.login-form__toggle-password');
const submitBtn = document.querySelector('.login-form__submit');
const formStatus = document.getElementById('form-status');

function runValidation() {
  const emailResult = validateField(emailInput);
  const passwordResult = validateField(passwordInput);
  return emailResult.isValid && passwordResult.isValid;
}

// Toggle password visibility
toggleBtn?.addEventListener('click', () => {
  const isShowing = passwordInput.type === 'text';
  passwordInput.type = isShowing ? 'password' : 'text';
  toggleBtn.setAttribute('aria-pressed', String(!isShowing));
  toggleBtn.setAttribute('aria-label', isShowing ? 'Show password' : 'Hide password');
});

// Inline validation on blur
emailInput?.addEventListener('blur', () => validateField(emailInput));
passwordInput?.addEventListener('blur', () => validateField(passwordInput));

// Form submission
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!runValidation()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in…';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    // Simulated auth — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    formStatus.textContent = 'Sign in successful! Redirecting…';
    formStatus.classList.add('form-status--success');
  } catch {
    formStatus.textContent = 'Sign in failed. Please check your credentials and try again.';
    formStatus.classList.add('form-status--error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
  }
});
