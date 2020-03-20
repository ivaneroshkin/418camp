const {
  displayFieldAsString,
  playerMove,
  getSwitch,
  getCell,
  checkMoveResult
} = require('./utils');

const {
  eventStartGame,
  eventPlayerMove,
  eventPlayerWin,
  eventBusyCell,
  eventDeadHeat
} = require('./events');

const initialField = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

function main() {
  eventStartGame();
  let playerSwitcher = 1;
  while (true) {
    eventPlayerMove(playerSwitcher);
    const fieldSnapshot = JSON.parse(JSON.stringify(initialField));
    const [verticalCell, horizontalCell] = playerMove();

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

main();
