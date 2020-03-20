const readlineSync = require('readline-sync');
const { eventChooseCell } = require('./events');

function getSwitch(player) {
  return player === 1 ? 2 : 1;
}

function displayFieldAsString(array) {
  return array
    .flat()
    .join('')
    .match(/\d{1,3}/g)
    .join('|');
}

function displayStringAsField(string) {
  return string.split('|').map((el) => el.split(''));
}


function playerMove() {
  const arrayCells = [1, 2, 3];
  while (true) {
    const verticalCell = readlineSync.keyInSelect(
      arrayCells,
      'Позиция клетки по вертикали?'
    );
    if (verticalCell < 0) {
      eventChooseCell();
      continue;
    }
    const horizontalCell = readlineSync.keyInSelect(
      arrayCells,
      'Позиция клетки по горизонтали?'
    );
    if (horizontalCell < 0) {
      eventChooseCell();
      continue;
    }
    return [horizontalCell + 1, verticalCell + 1];
  }
}

function getCell(verticalCell, horizontalCell, field, player) {
  const changedField = field;
  if (Number(field[horizontalCell - 1][verticalCell - 1]) === 0) {
    changedField[horizontalCell - 1][verticalCell - 1] = player;
  }
  return changedField;
}

function checkMoveResult(gameField) {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const currentState = gameField.flat();

  // Dead heat case
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

module.exports = {
  displayFieldAsString,
  displayStringAsField,
  playerMove,
  getSwitch,
  getCell,
  checkMoveResult
};
