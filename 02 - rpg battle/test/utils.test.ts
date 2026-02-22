import {
  difficultyArray,
  setLevel,
  getRandomNumber,
  roundHealth,
  dropCooldowns,
  displayMoveChars,
  endRoundStats,
  requireChooseMove,
  sayAboutChoose
} from '../src/utils';
import { Move, Cooldowns } from '../src/types';

describe('Utils Module', () => {
  describe('difficultyArray', () => {
    it('should contain all difficulty levels', () => {
      expect(difficultyArray).toEqual(['Easy', 'Medium', 'Hard', 'Nightmare']);
    });
  });

  describe('setLevel', () => {
    it('should return 20 for Easy difficulty', () => {
      expect(setLevel('Easy')).toBe(20);
    });

    it('should return 15 for Medium difficulty', () => {
      expect(setLevel('Medium')).toBe(15);
    });

    it('should return 10 for Hard difficulty', () => {
      expect(setLevel('Hard')).toBe(10);
    });

    it('should return 7 for Nightmare difficulty', () => {
      expect(setLevel('Nightmare')).toBe(7);
    });

    it('should return 15 for unknown difficulty (default)', () => {
      expect(setLevel('Unknown')).toBe(15);
      expect(setLevel('')).toBe(15);
    });
  });

  describe('getRandomNumber', () => {
    it('should return a number between 0 and size-1', () => {
      const size = 10;
      const result = getRandomNumber(size);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(size);
    });

    it('should return 0 for size 1', () => {
      expect(getRandomNumber(1)).toBe(0);
    });

    it('should return a valid number within range for multiple calls', () => {
      const size = 5;
      for (let i = 0; i < 100; i++) {
        const result = getRandomNumber(size);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(size);
      }
    });
  });

  describe('roundHealth', () => {
    const baseMove: Move = {
      name: 'Test Move',
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 0
    };

    it('should reduce health by physical damage with no armor', () => {
      const health = 100;
      const defender = { ...baseMove };
      const attacker = { ...baseMove, physicalDmg: 10 };
      
      expect(roundHealth(health, defender, attacker)).toBe(90);
    });

    it('should reduce health by magic damage with no armor', () => {
      const health = 100;
      const defender = { ...baseMove };
      const attacker = { ...baseMove, magicDmg: 5 };
      
      expect(roundHealth(health, defender, attacker)).toBe(95);
    });

    it('should reduce physical damage with physical armor', () => {
      const health = 100;
      const defender = { ...baseMove, physicArmorPercents: 50 };
      const attacker = { ...baseMove, physicalDmg: 10 };
      
      expect(roundHealth(health, defender, attacker)).toBe(95);
    });

    it('should reduce magic damage with magic armor', () => {
      const health = 100;
      const defender = { ...baseMove, magicArmorPercents: 50 };
      const attacker = { ...baseMove, magicDmg: 10 };
      
      expect(roundHealth(health, defender, attacker)).toBe(95);
    });

    it('should handle both physical and magic damage', () => {
      const health = 100;
      const defender = { ...baseMove };
      const attacker = { ...baseMove, physicalDmg: 5, magicDmg: 3 };
      
      expect(roundHealth(health, defender, attacker)).toBe(92);
    });

    it('should handle both physical and magic armor', () => {
      const health = 100;
      const defender = { ...baseMove, physicArmorPercents: 50, magicArmorPercents: 50 };
      const attacker = { ...baseMove, physicalDmg: 10, magicDmg: 6 };
      
      expect(roundHealth(health, defender, attacker)).toBe(92);
    });

    it('should handle 100% armor (complete block)', () => {
      const health = 100;
      const defender = { ...baseMove, physicArmorPercents: 100, magicArmorPercents: 100 };
      const attacker = { ...baseMove, physicalDmg: 10, magicDmg: 10 };
      
      expect(roundHealth(health, defender, attacker)).toBe(100);
    });
  });

  describe('dropCooldowns', () => {
    it('should decrease all cooldowns by 1', () => {
      const cooldowns: Cooldowns = {
        'Move1': 3,
        'Move2': 2,
        'Move3': 1
      };
      
      dropCooldowns(cooldowns);
      
      expect(cooldowns['Move1']).toBe(2);
      expect(cooldowns['Move2']).toBe(1);
      expect(cooldowns['Move3']).toBe(0);
    });

    it('should not decrease cooldowns below 0', () => {
      const cooldowns: Cooldowns = {
        'Move1': 1,
        'Move2': 0
      };
      
      dropCooldowns(cooldowns);
      
      expect(cooldowns['Move1']).toBe(0);
      expect(cooldowns['Move2']).toBe(0);
    });

    it('should handle empty cooldowns object', () => {
      const cooldowns: Cooldowns = {};
      
      expect(() => dropCooldowns(cooldowns)).not.toThrow();
    });
  });

  describe('displayMoveChars', () => {
    it('should log move characteristics without throwing', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const move: Move = {
        name: 'Test Move',
        physicalDmg: 5,
        magicDmg: 3,
        physicArmorPercents: 20,
        magicArmorPercents: 10,
        cooldown: 2
      };
      
      displayMoveChars(move);
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('endRoundStats', () => {
    it('should display health bars without throwing', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      endRoundStats(8, 15, 10, 20);
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle zero health', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      endRoundStats(0, 0, 10, 20);
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle negative health', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      endRoundStats(-5, -3, 10, 20);
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('requireChooseMove', () => {
    it('should log message without throwing', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      requireChooseMove();
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('sayAboutChoose', () => {
    it('should log message for Monster', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      sayAboutChoose('Monster', 'Fire Breath');
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should log message for Wizard', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      sayAboutChoose('Wizard', 'Fireball');
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
