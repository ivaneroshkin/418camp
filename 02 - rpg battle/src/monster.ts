import { Monster } from './types';

export const monster: Monster = {
  maxHealth: 10,
  name: 'Fierce',
  moves: [
    {
      name: 'Clawed Paw Strike',
      physicalDmg: 3,
      magicDmg: 0,
      physicArmorPercents: 20,
      magicArmorPercents: 20,
      cooldown: 0,
    },
    {
      name: 'Fire Breath',
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: 'Tail Strike',
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};
