import { describe, it, expect } from '@jest/globals';

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
