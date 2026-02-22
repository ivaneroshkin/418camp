import { titleScreen } from '../src/titleScreen';

describe('Title Screen', () => {
  it('should display title screen without throwing', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    expect(() => titleScreen()).not.toThrow();
    
    consoleSpy.mockRestore();
  });

  it('should call console.log when displaying title screen', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    titleScreen();
    
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    
    consoleSpy.mockRestore();
  });

  it('should display title with RPG BATTLE text', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    titleScreen();
    
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain('BATTLE');
    
    consoleSpy.mockRestore();
  });
});
