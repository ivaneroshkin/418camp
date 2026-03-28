import { describe, it, expect } from '@jest/globals';
import { checkDuplicates, getRandomNumber, isDigitsOnly } from '../src/utils.js';

describe('utils', () => {
  describe('isDigitsOnly', () => {
    it('should return true for strings containing only digits', () => {
      expect(isDigitsOnly('123')).toBe(true);
      expect(isDigitsOnly('0')).toBe(true);
      expect(isDigitsOnly('9876543210')).toBe(true);
    });

    it('should return false for strings containing non-digit characters', () => {
      expect(isDigitsOnly('12a3')).toBe(false);
      expect(isDigitsOnly('abc')).toBe(false);
      expect(isDigitsOnly('12.3')).toBe(false);
      expect(isDigitsOnly('12-3')).toBe(false);
      expect(isDigitsOnly('12 3')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isDigitsOnly('')).toBe(false);
    });

    it('should return false for strings with special characters', () => {
      expect(isDigitsOnly('!@#')).toBe(false);
      expect(isDigitsOnly('12+34')).toBe(false);
    });
  });

  describe('checkDuplicates', () => {
    it('should return true when array has duplicate elements', () => {
      expect(checkDuplicates(['1', '2', '1'])).toBe(true);
      expect(checkDuplicates(['5', '5'])).toBe(true);
      expect(checkDuplicates(['1', '2', '3', '1'])).toBe(true);
    });

    it('should return false when array has no duplicates', () => {
      expect(checkDuplicates(['1', '2', '3'])).toBe(false);
      expect(checkDuplicates(['0', '1'])).toBe(false);
      expect(checkDuplicates(['5', '6', '7', '8'])).toBe(false);
    });

    it('should return false for empty array', () => {
      expect(checkDuplicates([])).toBe(false);
    });

    it('should return false for single element array', () => {
      expect(checkDuplicates(['1'])).toBe(false);
    });
  });

  describe('getRandomNumber', () => {
    it('should return array of specified length', () => {
      expect(getRandomNumber(3)).toHaveLength(3);
      expect(getRandomNumber(4)).toHaveLength(4);
      expect(getRandomNumber(6)).toHaveLength(6);
    });

    it('should return array with unique digits', () => {
      const result = getRandomNumber(5);
      const uniqueDigits = new Set(result);
      expect(uniqueDigits.size).toBe(5);
    });

    it('should return digits between 0 and 9', () => {
      const result = getRandomNumber(6);
      result.forEach((digit) => {
        expect(digit).toBeGreaterThanOrEqual(0);
        expect(digit).toBeLessThanOrEqual(9);
      });
    });

    it('should not generate duplicates for maximum length', () => {
      const result = getRandomNumber(10);
      const uniqueDigits = new Set(result);
      expect(uniqueDigits.size).toBe(10);
      expect(result).toHaveLength(10);
    });
  });
});
