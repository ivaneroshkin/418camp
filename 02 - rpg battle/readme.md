# Project 2. RPG Battle

Battle mage Eustace fights against a fierce monster. The monster is described by the following object:

```
const monster = {
        maxHealth: 10,
        name: "Fierce",
        moves: [
            {
                "name": "Clawed Paw Strike",
                "physicalDmg": 3, // physical damage
                "magicDmg": 0,    // magic damage
                "physicArmorPercents": 20, // physical armor
                "magicArmorPercents": 20,  // magic armor
                "cooldown": 0     // turns to recover
            },
            {
                "name": "Fire Breath",
                "physicalDmg": 0,
                "magicDmg": 4,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 3
            },
            {
                "name": "Tail Strike",
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 50,
                "magicArmorPercents": 0,
                "cooldown": 2
            },
        ]
    }
```

Battle mage Eustace is capable of the following:

```
moves: [
            {
                "name": "Battle Censer Strike",
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 50,
                "cooldown": 0
            },
            {
                "name": "Left Heel Spin",
                "physicalDmg": 4,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 4
            },
            {
                "name": "Canonical Fireball",
                "physicalDmg": 0,
                "magicDmg": 5,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 3
            },
            {
                "name": "Magic Block",
                "physicalDmg": 0,
                "magicDmg": 0,
                "physicArmorPercents": 100,
                "magicArmorPercents": 100,
                "cooldown": 4
            },
        ]
```

The battle proceeds in turns. Each turn the computer (Fierce) randomly selects one of the available actions and announces what it's going to do. In response, the player (Eustace) must choose their action.

After that, mutual damage is dealt. Magic armor blocks magic damage, physical armor blocks physical damage.

After performing an action, it cannot be selected again for the duration of its cooldown turns.

The battle continues until one of the opponents is defeated.

Before the battle begins, the player chooses the difficulty (Eustace's starting health).

## Running the Game

```sh
npm i
npm start
```
