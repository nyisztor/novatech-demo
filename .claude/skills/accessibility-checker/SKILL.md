---
name: accessibility-checker
description: Check HTML pages for accessibility issues and WCAG 2.1 compliance. Automatically loads when working on HTML accessibility, ARIA labels, or screen reader compatibility.
allowed-tools:
  - Read
  - Grep
  - Glob
---

# Accessibility Checker Skill

This skill provides guidance for checking and improving web accessibility.

## WCAG 2.1 AA Checklist

### Perceivable
- [ ] All images have meaningful `alt` text
- [ ] Videos have captions/transcripts
- [ ] Color is not the only way to convey information
- [ ] Text has sufficient contrast ratio (4.5:1 normal, 3:1 large)
- [ ] Content is readable at 200% zoom

### Operable
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Skip links for navigation
- [ ] Focus indicators visible
- [ ] Touch targets at least 44x44px
- [ ] Page titles are descriptive

### Understandable
- [ ] Language is declared (`<html lang="en">`)
- [ ] Error messages are clear and helpful
- [ ] Labels are associated with form inputs
- [ ] Navigation is consistent across pages

### Robust
- [ ] Valid HTML structure
- [ ] ARIA attributes used correctly
- [ ] Works with assistive technologies

## Common Issues to Check

### Images
```html
<!-- Bad -->
<img src="logo.png">

<!-- Good -->
<img src="logo.png" alt="NovaTech Solutions logo">

<!-- Decorative (empty alt is intentional) -->
<img src="decoration.png" alt="" role="presentation">
```

### Forms
```html
<!-- Bad -->
<input type="email" placeholder="Email">

<!-- Good -->
<label for="email">Email</label>
<input type="email" id="email" aria-describedby="email-hint">
<span id="email-hint">We'll never share your email</span>
```

### Navigation
```html
<!-- Include skip link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Use landmarks -->
<nav aria-label="Main navigation">
<main id="main-content">
<footer>
```

## Automated Checks

When reviewing a file, check for:

1. Missing `alt` attributes on images
2. Empty links or buttons
3. Missing form labels
4. Missing language declaration
5. Missing landmark regions
6. Improper heading hierarchy (h1 → h2 → h3)
7. Missing ARIA labels on icon-only buttons

## Output Format

```
## Accessibility Review: [filename]

### Critical Issues
- [Issue description] (Line X)

### Warnings
- [Issue description] (Line X)

### Passed Checks
- ✓ [What's done correctly]

### Recommendations
- [Suggestion for improvement]
```
