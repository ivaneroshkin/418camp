import { styleText } from 'node:util';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
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
  sayAboutChoose,
} from './utils';
import { Move, Cooldowns } from './types';
import { titleScreen } from './titleScreen';
import { displayRandomComment } from './comments';

const nameMonster = `Monster`;
const wizardName = `Eustace`;
const enemyAllMoves = monster.moves.length;

const rl = readline.createInterface({ input, output });

async function keyInYN(prompt: string): Promise<boolean> {
  const answer = await rl.question(`${prompt} [y/n]: `);
  return answer.toLowerCase() === 'y';
}

async function keyInSelect(
  items: string[],
  prompt: string,
  options?: { cancel?: string }
): Promise<number> {
  console.log(prompt);
  items.forEach((item, index) => {
    console.log(`[${index + 1}] ${item}`);
  });
  if (options?.cancel) {
    console.log(`[0] ${options.cancel}`);
  }

  const answer = await rl.question('Select: ');
  const selection = parseInt(answer, 10);

  if (isNaN(selection) || selection < 0 || selection > items.length) {
    return -1;
  }

  return selection - 1;
}

function resetGameState(): {
  enemyHealth: number;
  enemyMaxHealth: number;
  playerHealth: number;
  playerMaxHealth: number;
  monsterCooldowns: Cooldowns;
  wizardCooldowns: Cooldowns;
} {
  return {
    enemyHealth: monster.maxHealth,
    enemyMaxHealth: monster.maxHealth,
    playerHealth: 0,
    playerMaxHealth: 0,
    monsterCooldowns: {} as Cooldowns,
    wizardCooldowns: {} as Cooldowns,
  };
}

export async function game(): Promise<void> {
  while (true) {
    const gameResult = await playGame();

    if (gameResult === 'quit') {
      console.log(styleText('yellow', `Thanks for playing!`));
      break;
    }

    console.log('');
    if (!(await keyInYN('Play again?'))) {
      console.log(styleText('yellow', `Thanks for playing!`));
      break;
    }
    console.log('');
  }
  rl.close();
}

async function playGame(): Promise<'quit' | 'finished'> {
  titleScreen();
  console.log(styleText('green', `Welcome to RPG Battle!`));
  const difficultyGame = await keyInSelect(difficultyArray, `Choose game difficulty:`, {
    cancel: 'Cancel',
  });
  if (difficultyGame < 0) {
    console.log(styleText('red', `Hahaha! You're a coward! There's no turning back...`));
  }

  const gameState = resetGameState();
  const maxHealth = setLevel(difficultyArray[difficultyGame]);
  gameState.playerHealth = maxHealth;
  gameState.playerMaxHealth = maxHealth;

  let moveSwitcher = 0;

  while (true) {
    console.log(styleText('green', `New round`));

    let roundMonsterMove: Move;
    let roundWizardMove: Move | 'quit';

    if (!moveSwitcher) {
      roundMonsterMove = monsterMove(gameState.monsterCooldowns);
      roundWizardMove = await wizardMove(gameState.wizardCooldowns);
    } else {
      roundWizardMove = await wizardMove(gameState.wizardCooldowns);
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

    endRoundStats(
      gameState.enemyHealth,
      gameState.playerHealth,
      gameState.enemyMaxHealth,
      gameState.playerMaxHealth
    );
    displayRandomComment();

    if (gameState.enemyHealth <= 0 && gameState.playerHealth <= 0) {
      console.log(styleText('yellow', `Everyone perished on the battlefield`));
      return 'finished';
    }
    if (gameState.enemyHealth <= 0) {
      console.log(styleText('green', `Enemy defeated! You won the game`));
      return 'finished';
    }
    if (gameState.playerHealth <= 0) {
      console.log(
        styleText(
          'red',
          `YOU DIED!
      ${wizardName} fell a hero's death...
      `
        )
      );
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

async function wizardMove(wizardCooldowns: Cooldowns): Promise<Move | 'quit'> {
  while (true) {
    const availableWizardMoves = wizard.moves.map((elem) => {
      return elem.name;
    });

    const currentWizardMove = await keyInSelect(
      availableWizardMoves,
      `Which move will the Battle Mage choose?`,
      { cancel: 'Cancel and quit' }
    );
    if (currentWizardMove < 0) {
      if (await keyInYN('Are you sure you want to quit?')) {
        return 'quit';
      }
      continue;
    }

    if (wizardCooldowns[availableWizardMoves[currentWizardMove]] > 0) {
      console.log(
        styleText(
          'bgMagenta',
          `${wizardName} hasn't recovered this move yet. Move will be available in ${
            wizardCooldowns[availableWizardMoves[currentWizardMove]]
          } turns`
        )
      );
      continue;
    }

    sayAboutChoose(wizardName, availableWizardMoves[currentWizardMove]);
    wizard.moves.forEach((elem) => {
      if (elem.name === availableWizardMoves[currentWizardMove]) {
        displayMoveChars(elem);
      }
    });
    if (await keyInYN(`Confirm choice?`)) {
      console.log(` `);
      let result: Move | undefined;
      wizard.moves.forEach((elem) => {
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
