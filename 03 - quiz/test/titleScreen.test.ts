import { titleScreen, getRandomColor, COLORS } from '../src/titleScreen';

describe('getRandomColor', () => {
  it('should return a color from the COLORS array', () => {
    const color = getRandomColor();
    expect(COLORS).toContain(color);
  });

  it('should return valid color values', () => {
    const validColors = ['green', 'yellow', 'blue', 'magenta'];
    const color = getRandomColor();
    expect(validColors).toContain(color);
  });

  it('should potentially return different colors on multiple calls', () => {
    const colors = new Set<string>();
    
    for (let i = 0; i < 20; i++) {
      colors.add(getRandomColor());
    }

    expect(colors.size).toBeGreaterThan(1);
  });
});

describe('titleScreen', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleClearSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleClearSpy = jest.spyOn(console, 'clear').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleClearSpy.mockRestore();
  });

  it('should clear the console', () => {
    titleScreen();
    expect(consoleClearSpy).toHaveBeenCalled();
  });

  it('should display the logo ASCII art', () => {
    titleScreen();
    
    expect(consoleLogSpy).toHaveBeenCalled();
    const allOutput = consoleLogSpy.mock.calls.flat().join(' ');
    expect(allOutput).toContain('___');
    expect(allOutput).toContain('/ _ \\');
  });

  it('should display the rules', () => {
    titleScreen();
    
    const allOutput = consoleLogSpy.mock.calls.flat().join(' ');
    expect(allOutput).toContain('Answer 5 random questions');
  });

  it('should call console.log at least twice', () => {
    titleScreen();
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
  });
});
