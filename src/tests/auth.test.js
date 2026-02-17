import { describe, it, expect } from 'vitest';
import { validateCredentials } from '../features/auth/authUtils';

describe('Authentication Utilities', () => {
  it('should return true for valid hardcoded credentials', () => {
    const isValid = validateCredentials('intern@demo.com', 'intern123');
    expect(isValid).toBe(true);
  });

  it('should return false for invalid credentials', () => {
    const isValid = validateCredentials('wrong@email.com', 'wrongpass');
    expect(isValid).toBe(false);
  });
});