import * as readlineSync from 'readline-sync';
import { monster } from './monster';
import { wizard } from './wizard';
import {
  getRandomNumber,
  difficultyArray,
  setLevel,
  roundHealth,
  dropCooldowns,
  displayMoveChars,
  endRoundStats,
  requireChooseMove,
  sayAboutChoose
} from './utils';
import { Move, Cooldowns } from './types';

const nameMonster = `Monster`;
const wizardName = `Eustace`;
let enemyHealth = monster.maxHealth;
const enemyAllMoves = monster.moves.length;
let playerHealth: number;

const monsterCooldowns: Cooldowns = {};
const wizardCooldowns: Cooldowns = {};

export function game(): void {
  console.log(`Welcome to RPG Battle!`);
  const difficultyGame = readlineSync.keyInSelect(
    difficultyArray,
    `Choose game difficulty:`
  );
  if (difficultyGame < 0) {
    console.log(`There's no turning back...`);
  }
  playerHealth = setLevel(difficultyArray[difficultyGame]);

  let moveSwitcher = 0;

  while (true) {
    console.log(`New round`);

    let roundMonsterMove: Move;
    let roundWizardMove: Move;

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
      console.log(`Everyone perished on the battlefield`);
      return;
    }
    if (enemyHealth <= 0) {
      console.log(`Enemy defeated! You won the game`);
      return;
    }
    if (playerHealth <= 0) {
      console.log(`YOU DIED!
      ${wizardName} fell a hero's death...
      `);
      return;
    }

    dropCooldowns(monsterCooldowns);
    dropCooldowns(wizardCooldowns);

    moveSwitcher = moveSwitcher ? 0 : 1;
    continue;
  }
}

function monsterMove(): Move {
  while (true) {
    const randomNumberMoves = getRandomNumber(enemyAllMoves);
    const currentMonsterMove = monster.moves[randomNumberMoves];
    if (monsterCooldowns[currentMonsterMove.name] > 0) {
      continue;
    }
    sayAboutChoose(nameMonster, currentMonsterMove.name);
    displayMoveChars(currentMonsterMove);
    monsterCooldowns[currentMonsterMove.name] = currentMonsterMove.cooldown;
    return currentMonsterMove;
  }
}

function wizardMove(): Move {
  while (true) {
    const availableWizardMoves = wizard.moves.map(elem => {
      return elem.name;
    });
    const currentWizardMove = readlineSync.keyInSelect(
      availableWizardMoves,
      `Which move will the Battle Mage choose?`
    );
    if (currentWizardMove < 0) {
      requireChooseMove();
      continue;
    }
    if (wizardCooldowns[availableWizardMoves[currentWizardMove]] > 0) {
      console.log(
        `${wizardName} hasn't recovered this move yet. Move will be available in ${
          wizardCooldowns[availableWizardMoves[currentWizardMove]]
        } turns`
      );
      continue;
    }

    sayAboutChoose(wizardName, availableWizardMoves[currentWizardMove]);
    wizard.moves.forEach(elem => {
      if (elem.name === availableWizardMoves[currentWizardMove]) {
        displayMoveChars(elem);
      }
    });
    if (readlineSync.keyInYN(`Confirm choice?`)) {
      console.log(`YES`);
      let result: Move | undefined;
      wizard.moves.forEach(elem => {
        if (elem.name === availableWizardMoves[currentWizardMove]) {
          result = elem;
          wizardCooldowns[elem.name] = elem.cooldown;
        }
      });
      return result!;
    } else {
      requireChooseMove();
      continue;
    }
  }
}
