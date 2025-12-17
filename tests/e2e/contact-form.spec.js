/**
 * Contact Form E2E Tests
 */

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/contact.html');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('#name')).toHaveClass(/is-invalid/);
    await expect(page.locator('#email')).toHaveClass(/is-invalid/);
    await expect(page.locator('#message')).toHaveClass(/is-invalid/);
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'invalid-email');
    await page.fill('#message', 'This is a test message');

    await page.locator('#email').blur();

    await expect(page.locator('#email-error')).toContainText('valid email');
  });

  test('should submit form with valid data', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#company', 'Test Company');
    await page.selectOption('#service', 'consulting');
    await page.fill('#message', 'This is a test message for the contact form.');

    await page.click('button[type="submit"]');

    await expect(page.locator('#form-status')).toContainText('Thank you');
  });

  test('should clear form after successful submission', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#message', 'This is a test message.');

    await page.click('button[type="submit"]');

    await expect(page.locator('#form-status')).toContainText('Thank you');

    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#message')).toHaveValue('');
  });
});
