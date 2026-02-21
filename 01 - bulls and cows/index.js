const readlineSync = require('readline-sync');
const utils = require('./utils');
const score = require('./score');

startGame();

function startGame() {
  console.log(`This is the game "Bulls and Cows". Shall we play?`);
  while (true) {
    let numberLenght = readlineSync.question(
      `Choose difficulty (from 3 to 6 digits): `
    );
    if (Number(numberLenght) < 3 || Number(numberLenght) > 6) {
      console.log(`Difficulty cannot be less than 3 or more than 6 digits`);
      continue;
    }
    bullsAndCows(numberLenght);
  }
}

function bullsAndCows(numberLenght) {
  const numberInGame = utils.getRandomNumber(numberLenght);
  console.log(`The secret number contains ${numberLenght} digits`);
  let moves = 0;

  while (true) {
    moves++;
    let attempt = getAttempt(moves, numberLenght);
    let result = attemptResult(numberInGame, attempt);

    if (result.bulls == numberLenght) {
      score.finalScore(moves);
      console.log(`Continue? (To quit the game: CTRL+C)`);
      return;
    }
    score.attemptScore(result.bulls, result.cows);
  }
}

function attemptResult(numberInGame, attempt) {
  const result = { bulls: 0, cows: 0 };

  const attemptString = attempt.join('');
  for (let i = 0; i < numberInGame.length; i++) {
    let attemptCow = attemptString.search(numberInGame[i]) != -1;
    if (numberInGame[i] == attempt[i]) {
      result.bulls++;
    } else if (attemptCow) {
      result.cows++;
    }
  }
  return result;
}

function getAttempt(moves, numberLenght) {
  while (true) {
    console.log(`Attempt number ${moves}`);
      let attempt = readlineSync.question(`Enter a number: `);
    attempt = String(attempt).split('');

    if (attempt.length != numberLenght) {
      console.log(`Enter a number from ${numberLenght} digits`);
      continue;
    }
    if (utils.checkDuplicates(attempt)) {
      console.log(`Digits must not be repeated!`);
      continue;
    }
    return attempt;
  }
}
