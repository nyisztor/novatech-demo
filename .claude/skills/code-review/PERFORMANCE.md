# Performance Review Patterns

## JavaScript Performance

### Avoid Unnecessary Work

```javascript
// BAD: Recalculating on every call
function getFilteredItems(items, filter) {
  return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
}

// GOOD: Normalize once
function getFilteredItems(items, filter) {
  const normalizedFilter = filter.toLowerCase();
  return items.filter(item => item.name.toLowerCase().includes(normalizedFilter));
}
```

### Debounce Expensive Operations

```javascript
// BAD: Fires on every keystroke
input.addEventListener('input', (e) => {
  searchAPI(e.target.value);
});

// GOOD: Debounce API calls
input.addEventListener('input', debounce((e) => {
  searchAPI(e.target.value);
}, 300));
```

### Use Appropriate Data Structures

```javascript
// BAD: Array lookup O(n)
const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
const item = items.find(i => i.id === targetId);

// GOOD: Map lookup O(1) for repeated access
const itemsMap = new Map(items.map(i => [i.id, i]));
const item = itemsMap.get(targetId);
```

## DOM Performance

### Batch DOM Updates

```javascript
// BAD: Multiple reflows
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item.name;
  container.appendChild(el);
});

// GOOD: Single reflow with fragment
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item.name;
  fragment.appendChild(el);
});
container.appendChild(fragment);
```

### Avoid Layout Thrashing

```javascript
// BAD: Read-write-read-write pattern
elements.forEach(el => {
  const height = el.offsetHeight; // Read (forces layout)
  el.style.height = height + 10 + 'px'; // Write
});

// GOOD: Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
```

### Use Event Delegation

```javascript
// BAD: Handler per element
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// GOOD: Single delegated handler
container.addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleClick(e);
  }
});
```

## Network Performance

### Minimize Requests

- Combine multiple API calls when possible
- Use GraphQL or batch endpoints for related data
- Cache responses appropriately

### Optimize Payloads

- Request only needed fields
- Compress responses (gzip/brotli)
- Use pagination for large datasets

### Preload Critical Resources

```html
<!-- Preload critical assets -->
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="preload" href="/api/initial-data" as="fetch" crossorigin>

<!-- Prefetch likely next pages -->
<link rel="prefetch" href="/dashboard">
```

## CSS Performance

### Avoid Expensive Selectors

```css
/* BAD: Universal and deep selectors */
* { box-sizing: border-box; }
.container div span a { color: blue; }

/* GOOD: Specific, shallow selectors */
*, *::before, *::after { box-sizing: border-box; } /* Only at root */
.nav__link { color: blue; }
```

### Minimize Repaints

```css
/* BAD: Animating layout properties */
.animate {
  transition: width 0.3s, height 0.3s;
}

/* GOOD: Animate composite properties */
.animate {
  transition: transform 0.3s, opacity 0.3s;
}
```

### Use `will-change` Sparingly

```css
/* Only when animation is imminent */
.card:hover {
  will-change: transform;
}

.card.animating {
  transform: scale(1.05);
}
```

## Memory Management

### Clean Up Event Listeners

```javascript
// Always remove listeners when done
const handler = () => { /* ... */ };
element.addEventListener('click', handler);

// Later, when cleaning up:
element.removeEventListener('click', handler);
```

### Clear Intervals and Timeouts

```javascript
// Store references for cleanup
const intervalId = setInterval(poll, 1000);

// Clean up when component unmounts
clearInterval(intervalId);
```

### Avoid Memory Leaks

Common causes:
- Forgotten event listeners
- Closures holding large objects
- Uncleared timers
- Detached DOM nodes with references
- Growing arrays/maps without bounds

## Performance Checklist

- [ ] No unnecessary computations in loops
- [ ] Expensive operations are debounced/throttled
- [ ] DOM updates are batched
- [ ] Event delegation used where appropriate
- [ ] No layout thrashing patterns
- [ ] Network requests are optimized
- [ ] Memory is properly cleaned up
- [ ] CSS animations use composite properties
