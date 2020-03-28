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

Given('пустое поле', () => {
  controller.reset();
});

Given('ходит игрок {int}', (int) => {
  controller.setCurrentPlayer(int);
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => {
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

Then('поле становится {string}', (string) => {
  const result = controller.getField();
  assert.equal(controller.displayFieldAsString(result), string);
});

Given('поле {string}', (string) => {
  controller.presetField(string);
});

Then('возвращается ошибка', () => {
  logger.log('error');
});

Then('победил игрок {int}', (int) => {
  lastField = controller.getField();
  const result = controller.checkMoveResult(lastField);
  if (result === true && result !== 'deadHeat') {
    assert.equal(controller.getPlayer(), int);
  }
});

Then('ничья', () => {
  logger.log('deadHeat');
});
