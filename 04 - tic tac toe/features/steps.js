const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const {
  displayFieldAsString,
  displayStringAsField,
  getSwitch,
  getCell,
  checkMoveResult
} = require('../utils');

const {
  eventBusyCell
} = require('../events');


let initialField;
let playerSwitcher;
let horizontalCell;
let verticalCell;

Given('пустое поле', () => {
  initialField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
});

Given('ходит игрок {int}', (input) => {
  playerSwitcher = input;
});

When('игрок ходит в клетку {int}, {int}', (int, int2) => {
  const fieldSnapshot = JSON.parse(JSON.stringify(initialField));
  [verticalCell, horizontalCell] = [int, int2];
  getCell(verticalCell, horizontalCell, initialField, playerSwitcher);
  if (JSON.stringify(fieldSnapshot) !== JSON.stringify(initialField)) {
    playerSwitcher = getSwitch(playerSwitcher);
  }
});

Then('поле становится {string}', (string) => {
  assert.equal(displayFieldAsString(initialField), string);
});

Given('поле {string}', (string) => {
  initialField = displayStringAsField(string);
});

Then('возвращается ошибка', () => {
  eventBusyCell();
});

Then('победил игрок {int}', (int) => {
  let winner = 0;
  if (checkMoveResult(initialField)) {
    winner = getSwitch(playerSwitcher);
  }
  assert.equal(int, winner);
});

Then('ничья', () => {
  const isGameFinished = checkMoveResult(initialField);
  assert.equal('deadHeat', isGameFinished);
});
