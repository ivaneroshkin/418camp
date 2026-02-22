import {
  getSwitch,
  displayFieldAsString,
  displayStringAsField,
  getCell,
  checkMoveResult,
  type GameField
} from '../src/utils.js';

describe('getSwitch', () => {
  it('should switch player 1 to player 2', () => {
    expect(getSwitch(1)).toBe(2);
  });

  it('should switch player 2 to player 1', () => {
    expect(getSwitch(2)).toBe(1);
  });
});

describe('displayFieldAsString', () => {
  it('should convert empty field to string', () => {
    const field: GameField = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    expect(displayFieldAsString(field)).toBe('000|000|000');
  });

  it('should convert field with moves to string', () => {
    const field: GameField = [
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 0]
    ];
    expect(displayFieldAsString(field)).toBe('100|020|000');
  });
});

describe('displayStringAsField', () => {
  it('should convert string to empty field', () => {
    const result = displayStringAsField('000|000|000');
    expect(result).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  });

  it('should convert string to field with moves', () => {
    const result = displayStringAsField('100|020|000');
    expect(result).toEqual([
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 0]
    ]);
  });
});

describe('getCell', () => {
  it('should place player mark in empty cell', () => {
    const field: GameField = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    getCell(1, 1, field, 1);
    expect(field[0][0]).toBe(1);
  });

  it('should not overwrite occupied cell', () => {
    const field: GameField = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    getCell(1, 1, field, 2);
    expect(field[0][0]).toBe(1);
  });
});

describe('checkMoveResult', () => {
  it('should return false for incomplete game', () => {
    const field: GameField = [
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 0]
    ];
    expect(checkMoveResult(field)).toBe(false);
  });

  it('should detect horizontal win', () => {
    const field: GameField = [
      [1, 1, 1],
      [0, 2, 0],
      [0, 0, 0]
    ];
    expect(checkMoveResult(field)).toBe(true);
  });

  it('should detect vertical win', () => {
    const field: GameField = [
      [1, 0, 2],
      [1, 0, 0],
      [1, 0, 0]
    ];
    expect(checkMoveResult(field)).toBe(true);
  });

  it('should detect diagonal win (left to right)', () => {
    const field: GameField = [
      [1, 0, 2],
      [0, 1, 0],
      [2, 0, 1]
    ];
    expect(checkMoveResult(field)).toBe(true);
  });

  it('should detect diagonal win (right to left)', () => {
    const field: GameField = [
      [1, 0, 2],
      [0, 2, 0],
      [2, 0, 1]
    ];
    expect(checkMoveResult(field)).toBe(true);
  });

  it('should detect draw', () => {
    const field: GameField = [
      [1, 2, 1],
      [1, 1, 2],
      [2, 1, 2]
    ];
    expect(checkMoveResult(field)).toBe('deadHeat');
  });
});
