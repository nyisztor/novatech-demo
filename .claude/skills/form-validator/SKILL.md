---
name: form-validator
description: Implement client-side form validation. Automatically loads when adding form validation, handling form errors, or improving form UX.
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
---

# Form Validator Skill

This skill provides patterns for implementing robust client-side form validation.

## Validation Patterns

### Email Validation
```javascript
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return EMAIL_PATTERN.test(email);
}
```

### Phone Validation
```javascript
const PHONE_PATTERN = /^[\d\s\-+()]{10,}$/;

function isValidPhone(phone) {
  return PHONE_PATTERN.test(phone);
}
```

### Required Field
```javascript
function isRequired(value) {
  return value.trim().length > 0;
}
```

## HTML Structure

### Form Field with Validation
```html
<div class="form-group">
  <label for="email" class="form-label">
    Email <span class="required">*</span>
  </label>
  <input 
    type="email" 
    id="email" 
    name="email" 
    class="form-input" 
    required
    aria-describedby="email-error"
  >
  <span class="form-error" id="email-error" role="alert"></span>
</div>
```

### Error Display Pattern
```javascript
function showError(field, message) {
  const errorEl = document.getElementById(`${field.id}-error`);
  field.classList.add('is-invalid');
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearError(field) {
  const errorEl = document.getElementById(`${field.id}-error`);
  field.classList.remove('is-invalid');
  if (errorEl) {
    errorEl.textContent = '';
  }
}
```

## Validation Strategy

### On Blur (Field Level)
```javascript
field.addEventListener('blur', () => {
  if (field.hasAttribute('required') || field.value) {
    validateField(field);
  }
});
```

### On Submit (Form Level)
```javascript
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const result = validateForm(form);
  
  if (!result.isValid) {
    const firstInvalid = form.querySelector('.is-invalid');
    if (firstInvalid) firstInvalid.focus();
    return;
  }
  
  submitForm(form);
});
```

## Error Messages

| Validation | Bad | Good |
|------------|-----|------|
| Required | "Error" | "This field is required" |
| Email | "Invalid" | "Please enter a valid email address" |
| Min length | "Too short" | "Please enter at least 10 characters" |

## Accessibility Considerations

1. Use `aria-describedby` to link inputs to error messages
2. Use `role="alert"` on error containers
3. Don't rely only on color to indicate errors
4. Provide clear, actionable error messages
5. Don't clear the form on validation failure

## Security Notes

- Client-side validation is for UX only
- Always validate on the server
- Sanitize inputs before display
