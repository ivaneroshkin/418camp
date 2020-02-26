const readlineSync = require('readline-sync');
const utils = require('./utils');
const score = require('./score');

startGame();

function startGame() {
  console.log(`Это игра «Быки и коровы». Сыграем?`);
  while (true) {
    let numberLenght = readlineSync.question(
      `Выбери сложность (от 3 до 6 цифр): `
    );
    if (Number(numberLenght) < 3 || Number(numberLenght) > 6) {
      console.log(`Сложность не может быть меньше 3 или больше 6 цифр`);
      continue;
    }
    bullsAndCows(numberLenght);
  }
}

function bullsAndCows(numberLenght) {
  const numberInGame = utils.getRandomNumber(numberLenght);
  console.log(`Секретное число содержит ${numberLenght} цифр`);
  let moves = 0;

  while (true) {
    moves++;
    let attempt = getAttempt(moves, numberLenght);
    let result = attemptResult(numberInGame, attempt);

    if (result.bulls == numberLenght) {
      score.finalScore(moves);
      console.log(`Продолжаем? (Завершить игру: CTRL+C)`);
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
    console.log(`Попытка номер ${moves}`);
    let attempt = readlineSync.question(`Введи число: `);
    attempt = String(attempt).split('');

    if (attempt.length != numberLenght) {
      console.log(`Введи число из ${numberLenght} цифр`);
      continue;
    }
    if (utils.checkDuplicates(attempt)) {
      console.log(`Цифры не должны повторяться!`);
      continue;
    }
    return attempt;
  }
}
