import { styleText } from 'node:util';

export function eventStartGame(): void {
  console.log(styleText('cyan', `This is the "Tic-Tac-Toe" game
  The game field looks like this:
    000
    000
    000
  `));
}

export function eventChooseCell(): void {
  console.log(styleText('yellow', 'You must choose a cell'));
}

export function eventBusyCell(): void {
  console.log(
    styleText('red', 'The selected cell is occupied by another player! You must choose a different cell')
  );
}

export function eventPlayerMove(player: number): void {
  console.log(styleText('blue', `Player ${player}'s turn:`));
}

export function eventPlayerWin(player: number): void {
  console.log(styleText('green', `Congratulations! Player ${player} wins!`));
}

export function eventDeadHeat(): void {
  console.log(styleText('yellow', 'Draw!'));
}
