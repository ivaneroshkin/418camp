import { styleText } from 'node:util';
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
const enemyAllMoves = monster.moves.length;

function resetGameState() {
  return {
    enemyHealth: monster.maxHealth,
    playerHealth: 0,
    monsterCooldowns: {} as Cooldowns,
    wizardCooldowns: {} as Cooldowns
  };
}

export function game(): void {
  while (true) {
    const gameResult = playGame();
    
    if (gameResult === 'quit') {
      console.log(styleText('yellow', `Thanks for playing!`));
      break;
    }
    
    console.log('');
    if (!readlineSync.keyInYN('Play again?')) {
      console.log(styleText('yellow', `Thanks for playing!`));
      break;
    }
    console.log('');
  }
}

function playGame(): 'quit' | 'finished' {
  console.log(styleText('green', `Welcome to RPG Battle!`));
  const difficultyGame = readlineSync.keyInSelect(
    difficultyArray,
    `Choose game difficulty:`
  );
  if (difficultyGame < 0) {
    console.log(styleText('red', `There's no turning back...`));
  }
  
  const gameState = resetGameState();
  gameState.playerHealth = setLevel(difficultyArray[difficultyGame]);

  let moveSwitcher = 0;

  while (true) {
    console.log(styleText('green', `New round`));

    let roundMonsterMove: Move;
    let roundWizardMove: Move | 'quit';

    if (!moveSwitcher) {
      roundMonsterMove = monsterMove(gameState.monsterCooldowns);
      roundWizardMove = wizardMove(gameState.wizardCooldowns);
    } else {
      roundWizardMove = wizardMove(gameState.wizardCooldowns);
      if (roundWizardMove === 'quit') {
        return 'quit';
      }
      roundMonsterMove = monsterMove(gameState.monsterCooldowns);
    }
    
    if (roundWizardMove === 'quit') {
      return 'quit';
    }

    gameState.enemyHealth = roundHealth(gameState.enemyHealth, roundMonsterMove, roundWizardMove);
    gameState.playerHealth = roundHealth(gameState.playerHealth, roundWizardMove, roundMonsterMove);

    endRoundStats(gameState.enemyHealth, gameState.playerHealth);

    if (gameState.enemyHealth <= 0 && gameState.playerHealth <= 0) {
      console.log(styleText('yellow', `Everyone perished on the battlefield`));
      return 'finished';
    }
    if (gameState.enemyHealth <= 0) {
      console.log(styleText('green', `Enemy defeated! You won the game`));
      return 'finished';
    }
    if (gameState.playerHealth <= 0) {
      console.log(styleText('red', `YOU DIED!
      ${wizardName} fell a hero's death...
      `));
      return 'finished';
    }

    dropCooldowns(gameState.monsterCooldowns);
    dropCooldowns(gameState.wizardCooldowns);

    moveSwitcher = moveSwitcher ? 0 : 1;
    continue;
  }
}

function monsterMove(monsterCooldowns: Cooldowns): Move {
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

function wizardMove(wizardCooldowns: Cooldowns): Move | 'quit' {
  while (true) {
    const availableWizardMoves = wizard.moves.map(elem => {
      return elem.name;
    });
    
    const currentWizardMove = readlineSync.keyInSelect(
      availableWizardMoves,
      `Which move will the Battle Mage choose?`,
      { cancel: 'Cancel and quit' }
    );
    if (currentWizardMove < 0) {
      if (readlineSync.keyInYN('Are you sure you want to quit?')) {
        return 'quit';
      }
      continue;
    }
    
    if (wizardCooldowns[availableWizardMoves[currentWizardMove]] > 0) {
      console.log(styleText('bgMagenta',
        `${wizardName} hasn't recovered this move yet. Move will be available in ${
          wizardCooldowns[availableWizardMoves[currentWizardMove]]
        } turns`
      ));
      continue;
    }

    sayAboutChoose(wizardName, availableWizardMoves[currentWizardMove]);
    wizard.moves.forEach(elem => {
      if (elem.name === availableWizardMoves[currentWizardMove]) {
        displayMoveChars(elem);
      }
    });
    if (readlineSync.keyInYN(`Confirm choice?`)) {
      console.log(styleText('magenta', `...`));
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
