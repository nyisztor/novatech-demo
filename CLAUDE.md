# NovaTech Solutions

## Project Overview

NovaTech Solutions is a tech consultancy website. This project demonstrates advanced Claude Code features for the Pluralsight course.

## Tech Stack

- HTML5 semantic markup
- CSS3 with custom properties (design tokens)
- Vanilla JavaScript (ES6+ modules)
- No frameworks — intentionally simple for learning

## Project Structure

```
src/pages/     → HTML pages (index, services, portfolio, team, contact)
src/css/       → Stylesheets organized by scope
src/js/        → JavaScript modules
tests/         → E2E (Playwright) and unit tests
docs/          → Design specs and API documentation
```

## Code Conventions

### HTML
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Include ARIA labels for accessibility
- Keep pages under 200 lines

### CSS
- Follow BEM naming: `.block__element--modifier`
- Use CSS custom properties from `variables.css`
- Mobile-first responsive design

### JavaScript
- ES6 modules with named exports
- JSDoc comments for public functions
- No global variables

## Git Workflow

- `main` — Production-ready code
- `feature/*` — New features
- `bugfix/*` — Bug fixes

Commit message format: `type: description`

Examples:
- `feat: add contact form validation`
- `fix: correct mobile nav toggle`
- `docs: update README setup instructions`

## Testing

Run tests before committing:

```bash
npm run test        # All tests
npm run test:unit   # Unit tests only
npm run test:e2e    # E2E tests only
```

## Current Focus Areas

- Accessibility improvements (WCAG 2.1 AA)
- Form validation enhancements
- Mobile navigation refinements
