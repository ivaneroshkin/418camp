import readlineSync from 'readline-sync';
import { styleText } from 'node:util';
import * as utils from './src/utils.js';
import { bullsAndCows } from './src/gameLogic.js';

if (process.env.NODE_ENV !== 'test') {
  startGame();
}

export function startGame(): void {
  console.log(styleText(['green', 'bold'], `This is the game "Bulls and Cows". Shall we play?`));
  while (true) {
    let numberLength = readlineSync.question(
      `Choose difficulty (from 3 to 6 digits): `
    );
    
    if (!utils.isDigitsOnly(numberLength)) {
      console.log(styleText(['bgRed'], `Please enter digits only!`));
      continue;
    }
    
    const difficultyLevel = Number(numberLength);
    if (difficultyLevel < 3 || difficultyLevel > 6) {
      console.log(styleText(['bgRed'], `Difficulty cannot be less than 3 or more than 6 digits`));
      continue;
    }
    bullsAndCows(difficultyLevel);
  }
}
