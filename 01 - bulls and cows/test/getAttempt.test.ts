import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { getAttempt } from '../index.js';
import readlineSync from 'readline-sync';

describe('getAttempt', () => {
  let consoleLogSpy: ReturnType<typeof jest.spyOn>;
  let questionSpy: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    questionSpy = jest.spyOn(readlineSync, 'question');
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    questionSpy.mockRestore();
  });

  it('should return valid input without duplicates', () => {
    questionSpy.mockReturnValueOnce('1234');
    
    const result = getAttempt(1, 4);
    
    expect(result).toEqual(['1', '2', '3', '4']);
    expect(consoleLogSpy).toHaveBeenCalledWith('Attempt number 1');
  });

  it('should reject input with wrong length and retry', () => {
    questionSpy
      .mockReturnValueOnce('12')
      .mockReturnValueOnce('1234');
    
    const result = getAttempt(2, 4);
    
    expect(result).toEqual(['1', '2', '3', '4']);
    expect(consoleLogSpy).toHaveBeenCalledWith('Enter a number from 4 digits');
  });

  it('should reject input with duplicates and retry', () => {
    questionSpy
      .mockReturnValueOnce('1123')
      .mockReturnValueOnce('1234');
    
    const result = getAttempt(3, 4);
    
    expect(result).toEqual(['1', '2', '3', '4']);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Digits must not be repeated!'));
  });
});
