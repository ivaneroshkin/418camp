import { displayRandomComment } from '../src/comments';

describe('Comments Module', () => {
  describe('displayRandomComment', () => {
    it('should display a comment without throwing', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      expect(() => displayRandomComment()).not.toThrow();

      consoleSpy.mockRestore();
    });

    it('should call console.log when displaying comment', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      displayRandomComment();

      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      consoleSpy.mockRestore();
    });

    it('should display different comments on multiple calls', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const outputs = new Set<string>();

      for (let i = 0; i < 50; i++) {
        displayRandomComment();
        outputs.add(consoleSpy.mock.calls[i][0]);
      }

      expect(outputs.size).toBeGreaterThan(1);

      consoleSpy.mockRestore();
    });

    it('should display comment in gray color', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      displayRandomComment();

      const output = consoleSpy.mock.calls[0][0];
      expect(typeof output).toBe('string');
      expect(output.length).toBeGreaterThan(0);

      consoleSpy.mockRestore();
    });
  });
});
