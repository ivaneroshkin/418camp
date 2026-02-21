export interface Move {
  name: string;
  physicalDmg: number;
  magicDmg: number;
  physicArmorPercents: number;
  magicArmorPercents: number;
  cooldown: number;
}

export interface Character {
  moves: Move[];
}

export interface Monster extends Character {
  maxHealth: number;
  name: string;
}

export interface Cooldowns {
  [moveName: string]: number;
}
