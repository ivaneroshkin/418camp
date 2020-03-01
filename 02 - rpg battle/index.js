const readlineSync = require('readline-sync');
const { monster } = require('./monster');
const { wizard } = require('./wizard');
const {
  getRandomNumber,
  difficultyArray,
  setLevel,
  roundHealth,
  dropCooldowns,
  displayMoveChars,
  endRoundStats,
  requireChooseMove,
  sayAboutChoose
} = require('./utils');

// initial config
const nameMonster = `Монстр`;
const wizardName = `Евстафий`;
let enemyHealth = monster.maxHealth;
let enemyAllMoves = monster.moves.length;
let playerHealth;

const monsterCooldowns = {};
const wizardCooldowns = {};

game();

function game() {
  console.log(`Добро пожаловать в игру RPG баттл!`);
  let difficultyGame = readlineSync.keyInSelect(
    difficultyArray,
    `Выберите сложность игры:`
  );
  if (difficultyGame < 0) {
    console.log(`Нет пути назад...`);
  }
  playerHealth = setLevel(difficultyArray[difficultyGame]);

  let moveSwitcher = 0;

  while (true) {
    console.log(`Новый раунд`);

    let roundMonsterMove;
    let roundWizardMove;

    if (!moveSwitcher) {
      roundMonsterMove = monsterMove();
      roundWizardMove = wizardMove();
    } else {
      roundWizardMove = wizardMove();
      roundMonsterMove = monsterMove();
    }

    enemyHealth = roundHealth(enemyHealth, roundMonsterMove, roundWizardMove);
    playerHealth = roundHealth(playerHealth, roundWizardMove, roundMonsterMove);

    endRoundStats(enemyHealth, playerHealth);

    if (enemyHealth <= 0 && playerHealth <= 0) {
      console.log(`Все погибли на поле`);
      return;
    }
    if (enemyHealth <= 0) {
      console.log(`Противник повержен! Вы выиграли игру`);
      return;
    }
    if (playerHealth <= 0) {
      console.log(`YOU DIED!
      ${wizardName} пал смертью храбрых...
      `);
      return;
    }

    dropCooldowns(monsterCooldowns);
    dropCooldowns(wizardCooldowns);

    moveSwitcher = moveSwitcher ? 0 : 1;
    continue;
  }
}

function monsterMove() {
  while (true) {
    let randomNumberMoves = getRandomNumber(enemyAllMoves);
    let currentMonsterMove = monster.moves[randomNumberMoves];
    if (monsterCooldowns[currentMonsterMove.name] > 0) {
      continue;
    }
    sayAboutChoose(nameMonster, currentMonsterMove.name);
    displayMoveChars(currentMonsterMove);
    monsterCooldowns[currentMonsterMove.name] = currentMonsterMove.cooldown;
    return currentMonsterMove;
  }
}

function wizardMove() {
  while (true) {
    let availableWizardMoves = wizard.moves.map(elem => {
      return elem.name;
    });
    let currentWizardMove = readlineSync.keyInSelect(
      availableWizardMoves,
      `Какой удар выберет Боевой маг?`
    );
    if (currentWizardMove < 0) {
      requireChooseMove();
      continue;
    }
    if (wizardCooldowns[availableWizardMoves[currentWizardMove]] > 0) {
      console.log(
        `${wizardName} еще не восстановил этот удар. Удар будет доступен через ${
          wizardCooldowns[availableWizardMoves[currentWizardMove]]
        } ходов`
      );
      continue;
    }

    sayAboutChoose(wizardName, availableWizardMoves[currentWizardMove]);
    wizard.moves.forEach(elem => {
      if (elem.name === availableWizardMoves[currentWizardMove]) {
        displayMoveChars(elem);
      }
    });
    if (readlineSync.keyInYN(`Выбор сделан?`)) {
      console.log(`ДА`);
      let result;
      wizard.moves.forEach(elem => {
        if (elem.name === availableWizardMoves[currentWizardMove]) {
          result = elem;
          wizardCooldowns[elem.name] = elem.cooldown;
        }
      });
      return result;
    } else {
      requireChooseMove();
      continue;
    }
  }
}
