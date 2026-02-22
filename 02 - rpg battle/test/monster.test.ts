import { monster } from '../src/monster';

describe('Monster Character', () => {
  it('should have correct name', () => {
    expect(monster.name).toBe('Fierce');
  });

  it('should have maxHealth of 10', () => {
    expect(monster.maxHealth).toBe(10);
  });

  it('should have exactly 3 moves', () => {
    expect(monster.moves).toHaveLength(3);
  });

  it('should have Clawed Paw Strike move', () => {
    const move = monster.moves.find((m) => m.name === 'Clawed Paw Strike');
    expect(move).toBeDefined();
    expect(move?.physicalDmg).toBe(3);
    expect(move?.magicDmg).toBe(0);
    expect(move?.physicArmorPercents).toBe(20);
    expect(move?.magicArmorPercents).toBe(20);
    expect(move?.cooldown).toBe(0);
  });

  it('should have Fire Breath move', () => {
    const move = monster.moves.find((m) => m.name === 'Fire Breath');
    expect(move).toBeDefined();
    expect(move?.physicalDmg).toBe(0);
    expect(move?.magicDmg).toBe(4);
    expect(move?.physicArmorPercents).toBe(0);
    expect(move?.magicArmorPercents).toBe(0);
    expect(move?.cooldown).toBe(3);
  });

  it('should have Tail Strike move', () => {
    const move = monster.moves.find((m) => m.name === 'Tail Strike');
    expect(move).toBeDefined();
    expect(move?.physicalDmg).toBe(2);
    expect(move?.magicDmg).toBe(0);
    expect(move?.physicArmorPercents).toBe(50);
    expect(move?.magicArmorPercents).toBe(0);
    expect(move?.cooldown).toBe(2);
  });

  it('should have all moves with required properties', () => {
    monster.moves.forEach((move) => {
      expect(move).toHaveProperty('name');
      expect(move).toHaveProperty('physicalDmg');
      expect(move).toHaveProperty('magicDmg');
      expect(move).toHaveProperty('physicArmorPercents');
      expect(move).toHaveProperty('magicArmorPercents');
      expect(move).toHaveProperty('cooldown');
    });
  });

  it('should have at least one move with no cooldown', () => {
    const noCooldownMoves = monster.moves.filter((m) => m.cooldown === 0);
    expect(noCooldownMoves.length).toBeGreaterThan(0);
  });

  it('should have both physical and magic damage moves', () => {
    const physicalMoves = monster.moves.filter((m) => m.physicalDmg > 0);
    const magicMoves = monster.moves.filter((m) => m.magicDmg > 0);

    expect(physicalMoves.length).toBeGreaterThan(0);
    expect(magicMoves.length).toBeGreaterThan(0);
  });
});
