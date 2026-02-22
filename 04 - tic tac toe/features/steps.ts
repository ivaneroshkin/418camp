import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert';
import {
  displayFieldAsString,
  displayStringAsField,
  getSwitch,
  getCell,
  checkMoveResult,
} from '../src/utils.js';

import { eventBusyCell } from '../src/events.js';

import type { Player } from '../src/utils.js';

let initialField: number[][];
let playerSwitcher: Player;
let horizontalCell: number;
let verticalCell: number;

Given('an empty field', () => {
  initialField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
});

Given('player {int} is moving', (input: number) => {
  playerSwitcher = input as Player;
});

When('the player moves to cell {int}, {int}', (int: number, int2: number) => {
  const fieldSnapshot = JSON.parse(JSON.stringify(initialField));
  [verticalCell, horizontalCell] = [int, int2];
  getCell(verticalCell, horizontalCell, initialField, playerSwitcher);
  if (JSON.stringify(fieldSnapshot) !== JSON.stringify(initialField)) {
    playerSwitcher = getSwitch(playerSwitcher);
  }
});

Then('the field becomes {string}', (string: string) => {
  assert.equal(displayFieldAsString(initialField), string);
});

Given('the field {string}', (string: string) => {
  initialField = displayStringAsField(string);
});

Then('an error is returned', () => {
  eventBusyCell();
});

Then('player {int} wins', (int: number) => {
  let winner = 0;
  if (checkMoveResult(initialField)) {
    winner = getSwitch(playerSwitcher);
  }
  assert.equal(int, winner);
});

Then("it's a draw", () => {
  const isGameFinished = checkMoveResult(initialField);
  assert.equal('deadHeat', isGameFinished);
});
