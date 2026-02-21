import { Move, Cooldowns } from './types';

export const difficultyArray = ['Easy', 'Medium', 'Hard', 'Nightmare'];

export function setLevel(answer: string): number {
  let result: number;
  switch (answer) {
    case 'Easy':
      result = 20;
      break;
    case 'Medium':
      result = 15;
      break;
    case 'Hard':
      result = 10;
      break;
    case 'Nightmare':
      result = 7;
      break;
    default:
      result = 15;
      break;
  }
  return result;
}

export function getRandomNumber(size: number): number {
  return Math.floor(Math.random() * Math.floor(size));
}

export function roundHealth(health: number, defender: Move, attacker: Move): number {
  const physical =
    attacker.physicalDmg -
    damageProof(attacker.physicalDmg, defender.physicArmorPercents);
  const magical =
    attacker.magicDmg -
    damageProof(attacker.magicDmg, defender.magicArmorPercents);
  return health - (physical + magical);
}

function damageProof(dam: number, per: number): number {
  return dam * (per / 100);
}

export function dropCooldowns(cooldowns: Cooldowns): void {
  for (const key in cooldowns) {
    if (cooldowns[key] > 0) {
      cooldowns[key]--;
    }
  }
}

export function displayMoveChars(obj: Move): void {
  console.log(`
  Physical damage: ${obj.physicalDmg}
  Magic damage: ${obj.magicDmg}
  Physical armor: ${obj.physicArmorPercents}
  Magic armor: ${obj.magicArmorPercents}
  Turns to recover: ${obj.cooldown}
`);
}

export function endRoundStats(enemyHealth: number, playerHealth: number): void {
  console.log(`End of round!
    Monster health: ${enemyHealth.toFixed(1)}
    Mage health: ${playerHealth.toFixed(1)}
  `);
}

export function requireChooseMove(): void {
  console.log(`You must choose a move!`);
}

export function sayAboutChoose(name: string, move: string): void {
  console.log(`${name} chooses move: ${move.toLocaleUpperCase()}`);
}
