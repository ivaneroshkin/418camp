import {
  displayFieldAsString,
  playerMove,
  getSwitch,
  getCell,
  checkMoveResult,
  type GameField,
  type Player
} from './utils.js';

import {
  eventStartGame,
  eventPlayerMove,
  eventPlayerWin,
  eventBusyCell,
  eventDeadHeat
} from './events.js';

const initialField: GameField = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

export async function main(): Promise<void> {
  eventStartGame();
  let playerSwitcher: Player = 1;
  
  while (true) {
    eventPlayerMove(playerSwitcher);
    const fieldSnapshot = JSON.parse(JSON.stringify(initialField));
    const [verticalCell, horizontalCell] = await playerMove();

    eventPlayerMove(playerSwitcher);
    getCell(verticalCell, horizontalCell, initialField, playerSwitcher);

    if (JSON.stringify(fieldSnapshot) === JSON.stringify(initialField)) {
      eventBusyCell();
      continue;
    }
    console.log(displayFieldAsString(initialField));

    const isGameFinished = checkMoveResult(initialField);
    if (isGameFinished === 'deadHeat') {
      eventDeadHeat();
      return;
    }

    if (isGameFinished) {
      eventPlayerWin(playerSwitcher);
      return;
    }

    playerSwitcher = getSwitch(playerSwitcher);
  }
}
