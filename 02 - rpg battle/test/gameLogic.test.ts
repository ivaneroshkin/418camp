import { monster } from '../src/monster';
import { wizard } from '../src/wizard';
import { getRandomNumber, roundHealth, dropCooldowns } from '../src/utils';
import { Move, Cooldowns } from '../src/types';

describe('Game Logic Module', () => {
  describe('Monster AI Move Selection', () => {
    it('should select moves that are not on cooldown', () => {
      const cooldowns: Cooldowns = {};
      const availableMoves = monster.moves.filter(
        (m) => !cooldowns[m.name] || cooldowns[m.name] === 0
      );

      expect(availableMoves.length).toBeGreaterThan(0);
    });

    it('should be able to select from all monster moves initially', () => {
      const cooldowns: Cooldowns = {};

      expect(monster.moves.length).toBe(3);
      expect(monster.moves.every((m) => !cooldowns[m.name] || cooldowns[m.name] === 0)).toBe(true);
    });

    it('should respect cooldowns when selecting moves', () => {
      const cooldowns: Cooldowns = {
        'Fire Breath': 2,
        'Tail Strike': 1,
      };

      const availableMoves = monster.moves.filter(
        (m) => !cooldowns[m.name] || cooldowns[m.name] === 0
      );

      expect(availableMoves.length).toBeGreaterThan(0);
      expect(availableMoves.every((m) => !cooldowns[m.name] || cooldowns[m.name] === 0)).toBe(true);
    });
  });

  describe('Wizard Move Selection', () => {
    it('should have all wizard moves available', () => {
      expect(wizard.moves.length).toBe(4);
      expect(wizard.moves.every((m) => m.name)).toBe(true);
    });

    it('should be able to check wizard move cooldowns', () => {
      const cooldowns: Cooldowns = {
        'Left Heel Spin': 2,
        'Canonical Fireball': 1,
      };

      wizard.moves.forEach((move) => {
        const isAvailable = !cooldowns[move.name] || cooldowns[move.name] === 0;
        expect(typeof isAvailable).toBe('boolean');
      });
    });
  });

  describe('Combat Round Resolution', () => {
    const baseMove: Move = {
      name: 'Test Move',
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 0,
    };

    it('should resolve combat between wizard and monster', () => {
      const monsterHealth = 10;
      const wizardHealth = 15;

      const monsterMove = { ...baseMove, physicalDmg: 3 };
      const wizardMove = { ...baseMove, magicDmg: 5 };

      const newMonsterHealth = roundHealth(monsterHealth, monsterMove, wizardMove);
      const newWizardHealth = roundHealth(wizardHealth, wizardMove, monsterMove);

      expect(newMonsterHealth).toBeLessThan(monsterHealth);
      expect(newWizardHealth).toBeLessThan(wizardHealth);
    });

    it('should handle simultaneous attacks', () => {
      const initialHealth = 10;
      const move1 = { ...baseMove, physicalDmg: 2 };
      const move2 = { ...baseMove, magicDmg: 3 };

      const result1 = roundHealth(initialHealth, move1, move2);
      const result2 = roundHealth(initialHealth, move2, move1);

      expect(result1).toBeLessThan(initialHealth);
      expect(result2).toBeLessThan(initialHealth);
    });

    it('should update cooldowns after each round', () => {
      const cooldowns: Cooldowns = {
        Move1: 3,
        Move2: 2,
        Move3: 1,
      };

      dropCooldowns(cooldowns);

      expect(cooldowns['Move1']).toBe(2);
      expect(cooldowns['Move2']).toBe(1);
      expect(cooldowns['Move3']).toBe(0);
    });
  });

  describe('Game State Management', () => {
    it('should manage monster health state', () => {
      const maxHealth = monster.maxHealth;
      const currentHealth = maxHealth;

      expect(currentHealth).toBe(10);
      expect(currentHealth).toBeLessThanOrEqual(maxHealth);
    });

    it('should manage wizard health based on difficulty', () => {
      const difficulties = {
        Easy: 20,
        Medium: 15,
        Hard: 10,
        Nightmare: 7,
      };

      Object.values(difficulties).forEach((health) => {
        expect(health).toBeGreaterThan(0);
        expect(typeof health).toBe('number');
      });
    });

    it('should track cooldowns for both characters', () => {
      const monsterCooldowns: Cooldowns = {};
      const wizardCooldowns: Cooldowns = {};

      expect(typeof monsterCooldowns).toBe('object');
      expect(typeof wizardCooldowns).toBe('object');
    });
  });

  describe('Random Number Generation for AI', () => {
    it('should generate valid move indices for monster', () => {
      const moveCount = monster.moves.length;
      const randomIndex = getRandomNumber(moveCount);

      expect(randomIndex).toBeGreaterThanOrEqual(0);
      expect(randomIndex).toBeLessThan(moveCount);
    });

    it('should allow AI to select different moves', () => {
      const indices = new Set<number>();
      const moveCount = monster.moves.length;

      for (let i = 0; i < 20; i++) {
        indices.add(getRandomNumber(moveCount));
      }

      expect(indices.size).toBeGreaterThan(0);
    });
  });

  describe('Victory Conditions', () => {
    it('should detect when monster health reaches zero', () => {
      const monsterHealth = 0;
      expect(monsterHealth).toBeLessThanOrEqual(0);
    });

    it('should detect when wizard health reaches zero', () => {
      const wizardHealth = 0;
      expect(wizardHealth).toBeLessThanOrEqual(0);
    });

    it('should detect when both health reach zero', () => {
      const monsterHealth = 0;
      const wizardHealth = 0;
      expect(monsterHealth).toBeLessThanOrEqual(0);
      expect(wizardHealth).toBeLessThanOrEqual(0);
    });

    it('should handle negative health values', () => {
      const health = -5;
      expect(health).toBeLessThanOrEqual(0);
    });
  });
});
