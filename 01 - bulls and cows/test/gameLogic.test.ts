import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { attemptResult, getAttempt } from '../src/gameLogic.js';
import rl from '../src/readline.js';

describe('gameLogic', () => {
  describe('attemptResult', () => {
    it('should return all bulls when guess matches completely', () => {
      const result = attemptResult([1, 2, 3, 4], ['1', '2', '3', '4']);
      expect(result.bulls).toBe(4);
      expect(result.cows).toBe(0);
    });

    it('should return all cows when all digits match but in wrong positions', () => {
      const result = attemptResult([1, 2, 3, 4], ['4', '3', '2', '1']);
      expect(result.bulls).toBe(0);
      expect(result.cows).toBe(4);
    });

    it('should return mixed bulls and cows', () => {
      const result = attemptResult([1, 2, 3, 4], ['1', '3', '2', '5']);
      expect(result.bulls).toBe(1);
      expect(result.cows).toBe(2);
    });

    it('should return zero bulls and cows when no digits match', () => {
      const result = attemptResult([1, 2, 3, 4], ['5', '6', '7', '8']);
      expect(result.bulls).toBe(0);
      expect(result.cows).toBe(0);
    });

    it('should handle partial matches correctly', () => {
      const result = attemptResult([5, 6, 7, 8], ['5', '7', '9', '0']);
      expect(result.bulls).toBe(1);
      expect(result.cows).toBe(1);
    });

    it('should prioritize bulls over cows for same position', () => {
      const result = attemptResult([1, 2, 3], ['1', '2', '3']);
      expect(result.bulls).toBe(3);
      expect(result.cows).toBe(0);
    });

    it('should work with 3-digit numbers', () => {
      const result = attemptResult([5, 6, 7], ['7', '5', '6']);
      expect(result.bulls).toBe(0);
      expect(result.cows).toBe(3);
    });

    it('should work with 6-digit numbers', () => {
      const result = attemptResult([1, 2, 3, 4, 5, 6], ['1', '2', '3', '4', '5', '6']);
      expect(result.bulls).toBe(6);
      expect(result.cows).toBe(0);
    });
  });

  describe('getAttempt', () => {
    let consoleLogSpy: ReturnType<typeof jest.spyOn>;
    let questionSpy: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      questionSpy = jest.spyOn(rl, 'question');
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
      questionSpy.mockRestore();
    });

    it('should return valid input without duplicates', async () => {
      questionSpy.mockResolvedValueOnce('1234');

      const result = await getAttempt(1, 4);

      expect(result).toEqual(['1', '2', '3', '4']);
      expect(consoleLogSpy).toHaveBeenCalledWith('Attempt number 1');
    });

    it('should reject input with wrong length and retry', async () => {
      questionSpy.mockResolvedValueOnce('12').mockResolvedValueOnce('1234');

      const result = await getAttempt(2, 4);

      expect(result).toEqual(['1', '2', '3', '4']);
      expect(consoleLogSpy).toHaveBeenCalledWith('Enter a number from 4 digits');
    });

    it('should reject input with duplicates and retry', async () => {
      questionSpy.mockResolvedValueOnce('1123').mockResolvedValueOnce('1234');

      const result = await getAttempt(3, 4);

      expect(result).toEqual(['1', '2', '3', '4']);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Digits must not be repeated!')
      );
    });
  });
});
