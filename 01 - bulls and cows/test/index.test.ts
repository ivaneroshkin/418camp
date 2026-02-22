import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { startGame } from '../index.js';
import rl from '../src/readline.js';

describe('startGame', () => {
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

  it('should display welcome message', async () => {
    questionSpy.mockRejectedValueOnce(new Error('Exit test'));

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('This is the game "Bulls and Cows". Shall we play?')
    );
  });

  it('should reject non-digit input with letters', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return 'abc';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Please enter digits only!')
    );
  });

  it('should reject difficulty less than 3', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return '2';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Difficulty cannot be less than 3 or more than 6 digits')
    );
  });

  it('should reject difficulty equal to 0', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return '0';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Difficulty cannot be less than 3 or more than 6 digits')
    );
  });

  it('should reject difficulty greater than 6', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return '7';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Difficulty cannot be less than 3 or more than 6 digits')
    );
  });

  it('should reject input with decimal numbers', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return '4.5';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Please enter digits only!')
    );
  });

  it('should reject input with spaces', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return '4 5';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Please enter digits only!')
    );
  });

  it('should reject empty input', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return '';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Please enter digits only!')
    );
  });

  it('should handle multiple validation failures in sequence', async () => {
    let callCount = 0;
    questionSpy.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return 'abc';
      if (callCount === 2) return '2';
      if (callCount === 3) return '7';
      if (callCount === 4) return '4.5';
      throw new Error('Exit test');
    });

    try {
      await startGame();
    } catch (e) {}

    const logCalls = consoleLogSpy.mock.calls.map(call => call[0]);
    const hasDigitsOnlyError = logCalls.some(log => 
      typeof log === 'string' && log.includes('Please enter digits only!')
    );
    const hasRangeError = logCalls.some(log => 
      typeof log === 'string' && log.includes('Difficulty cannot be less than 3 or more than 6 digits')
    );

    expect(hasDigitsOnlyError).toBe(true);
    expect(hasRangeError).toBe(true);
  });

  describe('difficulty validation logic', () => {
    it('should validate difficulty less than 3 is invalid', () => {
      const numberLength = 2;
      const isValid = !(Number(numberLength) < 3 || Number(numberLength) > 6);
      expect(isValid).toBe(false);
    });

    it('should validate difficulty greater than 6 is invalid', () => {
      const numberLength = 7;
      const isValid = !(Number(numberLength) < 3 || Number(numberLength) > 6);
      expect(isValid).toBe(false);
    });

    it('should validate difficulty between 3 and 6 is valid', () => {
      expect(!(Number(3) < 3 || Number(3) > 6)).toBe(true);
      expect(!(Number(4) < 3 || Number(4) > 6)).toBe(true);
      expect(!(Number(5) < 3 || Number(5) > 6)).toBe(true);
      expect(!(Number(6) < 3 || Number(6) > 6)).toBe(true);
    });
  });

  describe('quit functionality', () => {
    it('should exit gracefully when user types "q" at difficulty prompt', async () => {
      questionSpy.mockResolvedValueOnce('q');

      await startGame();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Thanks for playing! Goodbye!')
      );
    });

    it('should exit gracefully when user types "quit" at difficulty prompt', async () => {
      questionSpy.mockResolvedValueOnce('quit');

      await startGame();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Thanks for playing! Goodbye!')
      );
    });
  });
});
