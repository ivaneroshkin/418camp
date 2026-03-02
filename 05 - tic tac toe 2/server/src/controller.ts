type Player = 0 | 1 | 2;
type GameField = Player[][];
type MoveResult = boolean | 'deadHeat';

let field: GameField = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let currentPlayer: 1 | 2 = 1;

export function getField(): GameField {
  return field;
}

export function getPlayer(): 1 | 2 {
  return currentPlayer;
}

export function makeMove(y: number, x: number): void {
  field[y][x] = currentPlayer;
}

export function reset(): void {
  field = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}

export function presetField(newField: string): void {
  field = newField
    .split('|')
    .map((el) => el.split('').map((string) => Number(string) as Player));
}

export function displayFieldAsString(array: GameField): string {
  return array
    .flat()
    .join('')
    .match(/\d{1,3}/g)!
    .join('|');
}

export function setCurrentPlayer(number: 1 | 2): void {
  currentPlayer = number;
}

export function switchPlayer(): void {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

export function checkMoveResult(gameField: GameField): MoveResult {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const currentState = gameField.flat();

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
