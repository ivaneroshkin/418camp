import { wizard } from '../src/wizard';

describe('Wizard Character', () => {
  it('should have exactly 4 moves', () => {
    expect(wizard.moves).toHaveLength(4);
  });

  it('should have Battle Censer Strike move', () => {
    const move = wizard.moves.find((m) => m.name === 'Battle Censer Strike');
    expect(move).toBeDefined();
    expect(move?.physicalDmg).toBe(2);
    expect(move?.magicDmg).toBe(0);
    expect(move?.physicArmorPercents).toBe(0);
    expect(move?.magicArmorPercents).toBe(50);
    expect(move?.cooldown).toBe(0);
  });

  it('should have Left Heel Spin move', () => {
    const move = wizard.moves.find((m) => m.name === 'Left Heel Spin');
    expect(move).toBeDefined();
    expect(move?.physicalDmg).toBe(4);
    expect(move?.magicDmg).toBe(0);
    expect(move?.physicArmorPercents).toBe(0);
    expect(move?.magicArmorPercents).toBe(0);
    expect(move?.cooldown).toBe(4);
  });

  it('should have Canonical Fireball move', () => {
    const move = wizard.moves.find((m) => m.name === 'Canonical Fireball');
    expect(move).toBeDefined();
    expect(move?.physicalDmg).toBe(0);
    expect(move?.magicDmg).toBe(5);
    expect(move?.physicArmorPercents).toBe(0);
    expect(move?.magicArmorPercents).toBe(0);
    expect(move?.cooldown).toBe(3);
  });

  it('should have Magic Block move', () => {
    const move = wizard.moves.find((m) => m.name === 'Magic Block');
    expect(move).toBeDefined();
    expect(move?.physicalDmg).toBe(0);
    expect(move?.magicDmg).toBe(0);
    expect(move?.physicArmorPercents).toBe(100);
    expect(move?.magicArmorPercents).toBe(100);
    expect(move?.cooldown).toBe(4);
  });

  it('should have all moves with required properties', () => {
    wizard.moves.forEach((move) => {
      expect(move).toHaveProperty('name');
      expect(move).toHaveProperty('physicalDmg');
      expect(move).toHaveProperty('magicDmg');
      expect(move).toHaveProperty('physicArmorPercents');
      expect(move).toHaveProperty('magicArmorPercents');
      expect(move).toHaveProperty('cooldown');
    });
  });

  it('should have at least one move with no cooldown', () => {
    const noCooldownMoves = wizard.moves.filter((m) => m.cooldown === 0);
    expect(noCooldownMoves.length).toBeGreaterThan(0);
  });
});
