import { styleText } from 'node:util';
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
    attacker.physicalDmg - damageProof(attacker.physicalDmg, defender.physicArmorPercents);
  const magical = attacker.magicDmg - damageProof(attacker.magicDmg, defender.magicArmorPercents);
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
  console.log(
    styleText(
      'cyan',
      `
  Physical damage: ${obj.physicalDmg}
  Magic damage: ${obj.magicDmg}
  Physical armor: ${obj.physicArmorPercents}
  Magic armor: ${obj.magicArmorPercents}
  Turns to recover: ${obj.cooldown}
`
    )
  );
}

function createHealthBar(
  current: number,
  max: number,
  name: string,
  color: 'red' | 'green'
): string {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  const filledBlocks = Math.round((percentage / 100) * 10);
  const emptyBlocks = 10 - filledBlocks;

  const bar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  const currentHP = Math.max(0, current).toFixed(1);
  const maxHP = max.toFixed(1);
  const coloredName = styleText(color, name.padEnd(8));

  return `${coloredName} [${bar}] ${percentage.toFixed(0)}% (${currentHP}/${maxHP} HP)`;
}

export function endRoundStats(
  enemyHealth: number,
  playerHealth: number,
  enemyMaxHealth: number,
  playerMaxHealth: number
): void {
  console.log(styleText('blue', '\nEnd of round!\n'));
  console.log(createHealthBar(enemyHealth, enemyMaxHealth, 'Monster:', 'red'));
  console.log(createHealthBar(playerHealth, playerMaxHealth, 'Wizard:', 'green'));
  console.log('');
}

export function requireChooseMove(): void {
  console.log(styleText('yellow', `You must choose a move!`));
}

export function sayAboutChoose(name: string, move: string): void {
  const bgColor = name === 'Monster' ? 'bgRed' : 'bgGreen';
  const fgColor = name === 'Monster' ? 'red' : 'green';
  console.log(
    styleText(['black', bgColor], name) +
      ' chooses move: ' +
      styleText(fgColor, move.toLocaleUpperCase())
  );
}
