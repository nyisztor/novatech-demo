---
name: code-documentation
description: Generates comprehensive code documentation following JSDoc standards. Use when writing documentation, adding docstrings, or documenting APIs.
---

# Code Documentation Skill

## Instructions

When asked to document code:

1. Use JSDoc format for JavaScript/TypeScript
2. Include @param, @returns, and @example tags
3. Write descriptions that explain the "why," not just the "what"
4. Add @throws annotations for functions that can throw

## Example

For a function like:
```javascript
function calculateDiscount(price, percentage) {
  return price * (1 - percentage / 100);
}

Generate:
/**
 * Calculates the discounted price based on a percentage reduction.
 * Useful for applying promotional discounts at checkout.
 * 
 * @param {number} price - Original price before discount
 * @param {number} percentage - Discount percentage (0-100)
 * @returns {number} The price after applying the discount
 * @example
 * calculateDiscount(100, 20) // Returns 80
 */
