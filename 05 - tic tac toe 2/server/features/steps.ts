import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import * as controller from '../src/controller.js';
import app from '../src/server.js';

let lastResponse: request.Response;

Given('empty field', () => {
  controller.reset();
});

Given('player {int} moves', (player: number) => {
  controller.setCurrentPlayer(player as 1 | 2);
});

Given('field {string}', (fieldString: string) => {
  controller.presetField(fieldString);
});

When('player moves to cell {int}, {int}', async (x: number, y: number) => {
  x -= 1;
  y -= 1;
  lastResponse = await request(app).post('/move').send({ y, x });
  assert.strictEqual(lastResponse.status, 200);
});

When('player moves to occupied cell {int}, {int}', async (x: number, y: number) => {
  x -= 1;
  y -= 1;
  lastResponse = await request(app).post('/move').send({ y, x });
});

Then('field becomes {string}', (expected: string) => {
  const result = controller.getField();
  assert.strictEqual(controller.displayFieldAsString(result), expected);
});

Then('error is returned', () => {
  assert.strictEqual(lastResponse.status, 400);
});

Then('player {int} wins', (player: number) => {
  const field = controller.getField();
  const result = controller.checkMoveResult(field);
  assert.strictEqual(result, true);
  assert.strictEqual(controller.getPlayer(), player);
});

Then('draw', () => {
  const field = controller.getField();
  const result = controller.checkMoveResult(field);
  assert.strictEqual(result, 'deadHeat');
});
