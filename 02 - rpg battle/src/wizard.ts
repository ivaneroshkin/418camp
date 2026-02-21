import { Character } from './types';

export const wizard: Character = {
  moves: [
    {
      name: 'Battle Censer Strike',
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0
    },
    {
      name: 'Left Heel Spin',
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4
    },
    {
      name: 'Canonical Fireball',
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3
    },
    {
      name: 'Magic Block',
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4
    }
  ]
};
