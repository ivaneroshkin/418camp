import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { eventChooseCell } from './events.js';

export type GameField = number[][];
export type Player = 1 | 2;

export function getSwitch(player: Player): Player {
  return player === 1 ? 2 : 1;
}

export function displayFieldAsString(array: GameField): string {
  return array
    .flat()
    .join('')
    .match(/\d{1,3}/g)!
    .join('|');
}

export function displayStringAsField(string: string): GameField {
  return string.split('|').map((el) => el.split('').map(Number));
}

export async function playerMove(): Promise<[number, number]> {
  const rl = readline.createInterface({ input, output });

  while (true) {
    try {
      const verticalInput = await rl.question('Vertical cell position (1-3): ');
      const verticalCell = parseInt(verticalInput, 10);

      if (verticalCell < 1 || verticalCell > 3 || isNaN(verticalCell)) {
        eventChooseCell();
        continue;
      }

      const horizontalInput = await rl.question('Horizontal cell position (1-3): ');
      const horizontalCell = parseInt(horizontalInput, 10);

      if (horizontalCell < 1 || horizontalCell > 3 || isNaN(horizontalCell)) {
        eventChooseCell();
        continue;
      }

      rl.close();
      return [horizontalCell, verticalCell];
    } catch {
      eventChooseCell();
      continue;
    }
  }
}

export function getCell(
  verticalCell: number,
  horizontalCell: number,
  field: GameField,
  player: Player
): GameField {
  if (Number(field[horizontalCell - 1][verticalCell - 1]) === 0) {
    field[horizontalCell - 1][verticalCell - 1] = player;
  }
  return field;
}

export function checkMoveResult(gameField: GameField): boolean | 'deadHeat' {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const currentState = gameField.flat();

  if (!currentState.includes(0)) {
    return 'deadHeat';
  }

  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = currentState[winCondition[0]];
    const b = currentState[winCondition[1]];
    const c = currentState[winCondition[2]];
    if (a === 0 || b === 0 || c === 0) {
      continue;
    }
    if (a === b && b === c) {
      return true;
    }
  }
  return false;
}
