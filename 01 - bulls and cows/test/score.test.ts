import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { attemptScore, finalScore } from '../src/score.js';

describe('score', () => {
  let consoleLogSpy: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('attemptScore', () => {
    it('should display bulls and cows count', () => {
      attemptScore(2, 1);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Digits in wrong positions - 1, digits in correct positions - 2'
      );
    });

    it('should display zero bulls and cows', () => {
      attemptScore(0, 0);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Digits in wrong positions - 0, digits in correct positions - 0'
      );
    });

    it('should display only bulls', () => {
      attemptScore(4, 0);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Digits in wrong positions - 0, digits in correct positions - 4'
      );
    });

    it('should display only cows', () => {
      attemptScore(0, 3);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Digits in wrong positions - 3, digits in correct positions - 0'
      );
    });
  });

  describe('finalScore', () => {
    it('should display winning message with move count', () => {
      finalScore(5);
      expect(consoleLogSpy).toHaveBeenCalledWith('Congratulations! You won! Moves needed: 5');
    });

    it('should display winning message with single move', () => {
      finalScore(1);
      expect(consoleLogSpy).toHaveBeenCalledWith('Congratulations! You won! Moves needed: 1');
    });

    it('should display winning message with many moves', () => {
      finalScore(20);
      expect(consoleLogSpy).toHaveBeenCalledWith('Congratulations! You won! Moves needed: 20');
    });
  });
});
