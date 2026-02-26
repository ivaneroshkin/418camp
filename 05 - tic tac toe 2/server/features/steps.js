/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const { Given, Then } = require('cucumber');
const assert = require('assert');
const request = require('supertest');
const logger = require('../src/lib/logger');
const controller = require('../src/controller');
const app = require('../src/server');

let lastField = [];
let lastResult = {};

Given('empty field', () => {
  controller.reset();
});

Given('player {int} moves', (int) => {
  controller.setCurrentPlayer(int);
});

Given('player moves to cell {int}, {int}', (x, y) => {
  x -= 1;
  y -= 1;
  lastField = controller.getField();
  if (lastField[y][x] === 0) {
    return request(app)
      .post('/move')
      .send({ y, x })
      .then((res) => {
        lastResult = res;
      });
  }
});

Then('field becomes {string}', (string) => {
  const result = controller.getField();
  assert.equal(controller.displayFieldAsString(result), string);
});

Given('field {string}', (string) => {
  controller.presetField(string);
});

Then('error is returned', () => {
  logger.log('error');
});

Then('player {int} wins', (int) => {
  lastField = controller.getField();
  const result = controller.checkMoveResult(lastField);
  if (result === true && result !== 'deadHeat') {
    assert.equal(controller.getPlayer(), int);
  }
});

Then('draw', () => {
  logger.log('deadHeat');
});
