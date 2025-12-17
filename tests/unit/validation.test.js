/**
 * Validation Module Unit Tests
 */

import { test, describe, it } from 'node:test';
import assert from 'node:assert';

describe('Email Validation Pattern', () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('should accept valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.org',
      'user+tag@example.co.uk',
    ];

    validEmails.forEach((email) => {
      assert.strictEqual(
        emailPattern.test(email),
        true,
        `Expected ${email} to be valid`
      );
    });
  });

  it('should reject invalid email addresses', () => {
    const invalidEmails = [
      'invalid',
      'invalid@',
      '@example.com',
      'user @example.com',
      'user@example',
    ];

    invalidEmails.forEach((email) => {
      assert.strictEqual(
        emailPattern.test(email),
        false,
        `Expected ${email} to be invalid`
      );
    });
  });
});

describe('Phone Validation Pattern', () => {
  const phonePattern = /^[\d\s\-+()]{10,}$/;

  it('should accept valid phone numbers', () => {
    const validPhones = [
      '1234567890',
      '+1 (555) 123-4567',
      '555-123-4567',
      '+44 20 7946 0958',
    ];

    validPhones.forEach((phone) => {
      assert.strictEqual(
        phonePattern.test(phone),
        true,
        `Expected ${phone} to be valid`
      );
    });
  });

  it('should reject invalid phone numbers', () => {
    const invalidPhones = ['123', 'abc', '12345'];

    invalidPhones.forEach((phone) => {
      assert.strictEqual(
        phonePattern.test(phone),
        false,
        `Expected ${phone} to be invalid`
      );
    });
  });
});

describe('Required Field Validation', () => {
  it('should identify empty strings as invalid for required fields', () => {
    const emptyValues = ['', '   ', '\t', '\n'];

    emptyValues.forEach((value) => {
      const trimmed = value.trim();
      assert.strictEqual(
        trimmed.length === 0,
        true,
        `Expected "${value}" to be empty after trim`
      );
    });
  });

  it('should identify non-empty strings as valid', () => {
    const validValues = ['a', 'test', 'hello world'];

    validValues.forEach((value) => {
      const trimmed = value.trim();
      assert.strictEqual(
        trimmed.length > 0,
        true,
        `Expected "${value}" to be non-empty`
      );
    });
  });
});

describe('MinLength Validation', () => {
  it('should validate minimum length correctly', () => {
    const minLength = 5;

    assert.strictEqual('test'.length >= minLength, false);
    assert.strictEqual('hello'.length >= minLength, true);
    assert.strictEqual('hello world'.length >= minLength, true);
  });
});
