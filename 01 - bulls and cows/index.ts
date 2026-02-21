import readlineSync from 'readline-sync';
import { styleText } from 'node:util';
import * as utils from './src/utils.js';
import { bullsAndCows } from './src/gameLogic.js';
import { displayTitleScreen } from './src/logo.js';

if (process.env.NODE_ENV !== 'test') {
  startGame();
}

export function startGame(): void {
  displayTitleScreen();
  console.log(styleText(['green', 'bold'], `This is the game "Bulls and Cows". Shall we play?`));
  while (true) {
    let numberLength = readlineSync.question(
      `Choose difficulty (from 3 to 6 digits, or 'q' to quit): `
    );
    
    const numberLengthTrimmed = String(numberLength).trim();
    
    if (numberLengthTrimmed.toLowerCase() === 'q' || numberLengthTrimmed.toLowerCase() === 'quit') {
      console.log(styleText(['green'], `Thanks for playing! Goodbye!`));
      break;
    }
    
    if (!utils.isDigitsOnly(numberLengthTrimmed)) {
      console.log(styleText(['bgRed'], `Please enter digits only!`));
      continue;
    }
    
    const difficultyLevel = Number(numberLengthTrimmed);
    if (difficultyLevel < 3 || difficultyLevel > 6) {
      console.log(styleText(['bgRed'], `Difficulty cannot be less than 3 or more than 6 digits`));
      continue;
    }
    
    const gameCompleted = bullsAndCows(difficultyLevel);
    
    if (gameCompleted) {
      const playAgain = readlineSync.question(`Play again? (y/n): `);
      if (playAgain.toLowerCase() !== 'y' && playAgain.toLowerCase() !== 'yes') {
        console.log(styleText(['green'], `Thanks for playing! Goodbye!`));
        break;
      }
    } else {
      break;
    }
  }
}
