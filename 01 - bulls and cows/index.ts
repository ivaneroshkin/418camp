import readlineSync from 'readline-sync';
import { styleText } from 'node:util';
import * as utils from './utils.js';
import * as score from './score.js';

startGame();

function startGame(): void {
  console.log(styleText(['green', 'bold'], `This is the game "Bulls and Cows". Shall we play?`));
  while (true) {
    let numberLength = readlineSync.question(
      `Choose difficulty (from 3 to 6 digits): `
    );
    if (Number(numberLength) < 3 || Number(numberLength) > 6) {
      console.log(styleText(['bgRed'], `Difficulty cannot be less than 3 or more than 6 digits`));
      continue;
    }
    bullsAndCows(Number(numberLength));
  }
}

interface AttemptResult {
  bulls: number;
  cows: number;
}

function bullsAndCows(numberLength: number): void {
  const numberInGame = utils.getRandomNumber(numberLength);
  console.log(`The secret number contains ${numberLength} digits`);
  let moves = 0;

  while (true) {
    moves++;
    let attempt = getAttempt(moves, numberLength);
    let result = attemptResult(numberInGame, attempt);

    if (result.bulls == numberLength) {
      score.finalScore(moves);
      console.log(styleText(['green', 'bold'], `Continue? (To quit the game: CTRL+C)`));
      return;
    }
    score.attemptScore(result.bulls, result.cows);
  }
}

function attemptResult(numberInGame: number[], attempt: string[]): AttemptResult {
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

function getAttempt(moves: number, numberLength: number): string[] {
  while (true) {
    console.log(`Attempt number ${moves}`);
    let attempt = readlineSync.question(`Enter a number: `);
    const attemptArray = String(attempt).split('');

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
