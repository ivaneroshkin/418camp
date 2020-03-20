function eventStartGame() {
  console.log(`Это игра «Крестики-Нолики»
  Игровое поле выглядит так:
    000
    000
    000
  `);
}

function eventChooseCell() {
  console.log('Необходимо выбрать клетку');
}

function eventBusyCell() {
  console.log(
    'Выбранная клетка занята другим игроком! Необходимо выбрать другую клетку'
  );
}

function eventPlayerMove(player) {
  console.log(`Ход игрока ${player} :`);
}

function eventPlayerWin(player) {
  console.log(`Поздравляем! Победил игрок ${player}`);
}

function eventDeadHeat() {
  console.log('Ничья!');
}

module.exports = {
  eventStartGame,
  eventPlayerMove,
  eventPlayerWin,
  eventChooseCell,
  eventBusyCell,
  eventDeadHeat
};
