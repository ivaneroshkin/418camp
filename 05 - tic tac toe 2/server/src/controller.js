let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let currentPlayer = 1;

function getField() {
  return field;
}

function getPlayer() {
  return currentPlayer;
}

function makeMove(y, x) {
  field[y][x] = currentPlayer;
}

function reset() {
  field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function presetField(newField) {
  field = newField.split('|').map((el) => el.split('').map((string) => Number(string)));
}

function displayFieldAsString(array) {
  return array
    .flat()
    .join('')
    .match(/\d{1,3}/g)
    .join('|');
}

function setCurrentPlayer(number) {
  currentPlayer = number;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
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
  getPlayer,
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
  switchPlayer,
  displayFieldAsString,
  checkMoveResult
};
