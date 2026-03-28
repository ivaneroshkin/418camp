import rl from './readline.js';
import { styleText } from 'node:util';
import * as utils from './utils.js';
import * as score from './score.js';

export interface AttemptResult {
  bulls: number;
  cows: number;
}

export async function bullsAndCows(numberLength: number): Promise<boolean> {
  const numberInGame = utils.getRandomNumber(numberLength);
  console.log(`The secret number contains ${numberLength} digits`);
  let moves = 0;

  while (true) {
    moves++;
    let attempt = await getAttempt(moves, numberLength);

    if (attempt === null) {
      console.log(styleText(['yellow'], `Game ended. Thanks for playing!`));
      return false;
    }

    let result = attemptResult(numberInGame, attempt);

    if (result.bulls == numberLength) {
      score.finalScore(moves);
      return true;
    }
    score.attemptScore(result.bulls, result.cows);
  }
}

export function attemptResult(numberInGame: number[], attempt: string[]): AttemptResult {
  const result: AttemptResult = { bulls: 0, cows: 0 };

  const attemptString = attempt.join('');
  for (let i = 0; i < numberInGame.length; i++) {
    let attemptCow = attemptString.search(String(numberInGame[i])) != -1;
    if (String(numberInGame[i]) == attempt[i]) {
      result.bulls++;
    } else if (attemptCow) {
      result.cows++;
    }
  }
  return result;
}

export async function getAttempt(moves: number, numberLength: number): Promise<string[] | null> {
  while (true) {
    console.log(`Attempt number ${moves}`);
    let attempt = await rl.question(`Enter a number (or 'q' to quit): `);
    const attemptString = String(attempt).trim();

    if (attemptString.toLowerCase() === 'q' || attemptString.toLowerCase() === 'quit') {
      return null;
    }

    if (!utils.isDigitsOnly(attemptString)) {
      console.log(styleText(['bgRed'], `Please enter digits only!`));
      continue;
    }

    const attemptArray = attemptString.split('');

    if (attemptArray.length != numberLength) {
      console.log(`Enter a number from ${numberLength} digits`);
      continue;
    }
    if (utils.checkDuplicates(attemptArray)) {
      console.log(styleText(['bgGreen'], `Digits must not be repeated!`));
      continue;
    }
    return attemptArray;
  }
}
