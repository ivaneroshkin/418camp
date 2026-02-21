// basic monster config

const monster = {
  maxHealth: 10,
  name: 'Fierce',
  moves: [
    {
      name: 'Clawed Paw Strike',
      physicalDmg: 3, // physical damage
      magicDmg: 0, // magic damage
      physicArmorPercents: 20, // physical armor
      magicArmorPercents: 20, // magic armor
      cooldown: 0 // turns to recover
    },
    {
      name: 'Fire Breath',
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3
    },
    {
      name: 'Tail Strike',
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2
    }
  ]
};

exports.monster = monster;
