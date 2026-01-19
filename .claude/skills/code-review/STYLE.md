# NovaTech Style Guide

## CSS Conventions

### BEM Naming

Use Block__Element--Modifier pattern for all CSS classes.

```css
/* Block: Standalone component */
.card { }

/* Element: Part of a block */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier: Variation of block or element */
.card--featured { }
.card__header--compact { }
```

### Naming Examples

```css
/* GOOD: Clear BEM structure */
.hero { }
.hero__title { }
.hero__subtitle { }
.hero__cta { }
.hero--dark { }
.hero__cta--primary { }

/* BAD: Avoid these patterns */
.heroTitle { }        /* camelCase */
.hero-title { }       /* hyphens without BEM */
.hero_title { }       /* single underscore */
.title { }            /* too generic */
```

### CSS Organization

```css
/* 1. Layout properties */
.component {
  display: flex;
  flex-direction: column;
  position: relative;
  
  /* 2. Box model */
  width: 100%;
  max-width: 600px;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  
  /* 3. Typography */
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: 1.5;
  
  /* 4. Visual */
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  
  /* 5. Misc */
  cursor: pointer;
  transition: transform 0.2s ease;
}
```

### CSS Custom Properties

Always use design tokens for consistency:

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

## JavaScript Conventions

### Naming

```javascript
// Variables and functions: camelCase
const userName = 'Alice';
function calculateTotal(items) { }

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = '/api/v1';

// Classes and components: PascalCase
class UserService { }
function NavigationMenu() { }

// Private members: leading underscore
class Service {
  _privateMethod() { }
}
```

### Functions

```javascript
// Prefer arrow functions for callbacks
const doubled = numbers.map(n => n * 2);

// Use named functions for top-level declarations
function handleFormSubmit(event) {
  event.preventDefault();
  // ...
}

// Default parameters over conditionals
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

// Destructure parameters for clarity
function createUser({ name, email, role = 'user' }) {
  // ...
}
```

### Modern JavaScript

```javascript
// Use const by default, let when reassignment needed
const config = { debug: true };
let counter = 0;

// Template literals for string interpolation
const message = `Hello, ${user.name}!`;

// Optional chaining
const city = user?.address?.city;

// Nullish coalescing
const value = input ?? defaultValue;

// Async/await over raw promises
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

## HTML Conventions

### Semantic Structure

```html
<!-- Use semantic elements -->
<header>
  <nav>...</nav>
</header>

<main>
  <article>
    <h1>Title</h1>
    <section>...</section>
  </article>
  <aside>...</aside>
</main>

<footer>...</footer>
```

### Accessibility Requirements

```html
<!-- All images need alt text -->
<img src="photo.jpg" alt="Team meeting in conference room">

<!-- Form inputs need labels -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email">

<!-- Interactive elements need focus states -->
<button type="submit">Submit</button>

<!-- Use ARIA when needed -->
<div role="alert" aria-live="polite">
  Form submitted successfully
</div>
```

### Attribute Order

```html
<input
  type="email"
  id="user-email"
  name="email"
  class="form__input form__input--large"
  placeholder="you@example.com"
  required
  aria-describedby="email-help"
>
```

Order: type, id, name, class, data-*, aria-*, other attributes

## Documentation

### JSDoc Comments

```javascript
/**
 * Calculates the total price including tax and discounts.
 * 
 * @param {Object[]} items - Array of cart items
 * @param {string} items[].id - Item identifier
 * @param {number} items[].price - Item price in cents
 * @param {number} items[].quantity - Number of items
 * @param {number} [taxRate=0.08] - Tax rate as decimal
 * @returns {number} Total price in cents
 * @throws {Error} If items array is empty
 * 
 * @example
 * const total = calculateTotal([
 *   { id: 'abc', price: 1000, quantity: 2 }
 * ], 0.07);
 */
function calculateTotal(items, taxRate = 0.08) {
  // ...
}
```

### Component Documentation

```javascript
/**
 * Navigation menu with responsive behavior.
 * 
 * @component
 * @example
 * <NavigationMenu
 *   items={menuItems}
 *   onItemClick={handleNavigation}
 *   isOpen={menuOpen}
 * />
 */
```

## Style Checklist

- [ ] BEM naming used for all CSS classes
- [ ] CSS custom properties used for values
- [ ] JavaScript follows naming conventions
- [ ] Modern ES6+ syntax used appropriately
- [ ] Semantic HTML elements used
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] JSDoc comments on public functions
