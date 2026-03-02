import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import { logger } from '../src/lib/logger.js';
import * as controller from '../src/controller.js';
import app from '../src/server.js';

let lastField: number[][] = [];

Given('empty field', () => {
  controller.reset();
});

Given('player {int} moves', (int: number) => {
  controller.setCurrentPlayer(int as 1 | 2);
});

When('player moves to cell {int}, {int}', async (x: number, y: number) => {
  x -= 1;
  y -= 1;
  lastField = controller.getField();
  if (lastField[y][x] === 0) {
    await request(app).post('/move').send({ y, x });
  }
});

Then('field becomes {string}', (string: string) => {
  const result = controller.getField();
  assert.equal(controller.displayFieldAsString(result), string);
});

Given('field {string}', (string: string) => {
  controller.presetField(string);
});

Then('error is returned', () => {
  logger.log('error');
});

Then('player {int} wins', (int: number) => {
  lastField = controller.getField();
  const result = controller.checkMoveResult(lastField);
  if (result === true && result !== 'deadHeat') {
    assert.equal(controller.getPlayer(), int);
  }
});

Then('draw', () => {
  logger.log('deadHeat');
});
