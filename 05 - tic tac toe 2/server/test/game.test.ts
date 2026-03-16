import request from 'supertest';
import * as controller from '../src/controller.js';
import app from '../src/server.js';

beforeEach(() => {
  controller.reset();
});

describe('Player moves', () => {
  it('should place moves on empty field alternating players', async () => {
    controller.setCurrentPlayer(1);

    await request(app).post('/move').send({ y: 0, x: 0 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('100|000|000');

    await request(app).post('/move').send({ y: 1, x: 1 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('100|020|000');

    await request(app).post('/move').send({ y: 0, x: 2 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('101|020|000');
  });

  it('should reject move to an occupied cell', async () => {
    controller.presetField('100|200|102');
    controller.setCurrentPlayer(1);

    const res = await request(app).post('/move').send({ y: 1, x: 0 });
    expect(res.status).toBe(400);
    expect(controller.displayFieldAsString(controller.getField())).toBe('100|200|102');

    await request(app).post('/move').send({ y: 1, x: 1 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('100|210|102');
  });
});

describe('Win detection', () => {
  it('should detect vertical win', async () => {
    controller.presetField('102|120|002');
    controller.setCurrentPlayer(1);

    await request(app).post('/move').send({ y: 2, x: 0 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('102|120|102');
    expect(controller.checkMoveResult(controller.getField())).toBe(true);
    expect(controller.getPlayer()).toBe(1);
  });

  it('should detect horizontal win', async () => {
    controller.presetField('101|022|001');
    controller.setCurrentPlayer(2);

    await request(app).post('/move').send({ y: 1, x: 0 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('101|222|001');
    expect(controller.checkMoveResult(controller.getField())).toBe(true);
    expect(controller.getPlayer()).toBe(2);
  });

  it('should detect diagonal win (left to right)', async () => {
    controller.presetField('000|210|201');
    controller.setCurrentPlayer(1);

    await request(app).post('/move').send({ y: 0, x: 0 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('100|210|201');
    expect(controller.checkMoveResult(controller.getField())).toBe(true);
    expect(controller.getPlayer()).toBe(1);
  });

  it('should detect diagonal win (right to left)', async () => {
    controller.presetField('112|120|000');
    controller.setCurrentPlayer(2);

    await request(app).post('/move').send({ y: 2, x: 0 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('112|120|200');
    expect(controller.checkMoveResult(controller.getField())).toBe(true);
    expect(controller.getPlayer()).toBe(2);
  });
});

describe('Draw detection', () => {
  it('should detect a draw when no empty cells remain', async () => {
    controller.presetField('121|112|202');
    controller.setCurrentPlayer(1);

    await request(app).post('/move').send({ y: 2, x: 1 });
    expect(controller.displayFieldAsString(controller.getField())).toBe('121|112|212');
    expect(controller.checkMoveResult(controller.getField())).toBe('deadHeat');
  });
});
