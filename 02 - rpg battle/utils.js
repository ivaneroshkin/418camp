// scalable config

const difficultyArray = ['Easy', 'Medium', 'Hard', 'Nightmare'];

function setLevel(answer) {
  let result;
  switch (answer) {
    case 'Easy':
      result = 20;
      break;
    case 'Medium':
      result = 15;
      break;
    case 'Hard':
      result = 10;
      break;
    case 'Nightmare':
      result = 7;
      break;
    default:
      result = 15;
      break;
  }
  return result;
}

function getRandomNumber(size) {
  return Math.floor(Math.random() * Math.floor(size));
}

function roundHealth(health, defender, attacker) {
  const physical =
    attacker.physicalDmg -
    damageProof(attacker.physicalDmg, defender.physicArmorPercents);
  const magical =
    attacker.magicDmg -
    damageProof(attacker.magicDmg, defender.magicArmorPercents);
  return health - (physical + magical);
}

function damageProof(dam, per) {
  return dam * (per / 100);
}

function dropCooldowns(cooldowns) {
  for (key in cooldowns) {
    if (cooldowns[key] > 0) {
      cooldowns[key]--;
    }
  }
}

function displayMoveChars(obj) {
  console.log(`
  Physical damage: ${obj.physicalDmg}
  Magic damage: ${obj.magicDmg}
  Physical armor: ${obj.physicArmorPercents}
  Magic armor: ${obj.magicArmorPercents}
  Turns to recover: ${obj.cooldown}
`);
}

function endRoundStats(enemyHealth, playerHealth) {
  console.log(`End of round!
    Monster health: ${enemyHealth.toFixed(1)}
    Mage health: ${playerHealth.toFixed(1)}
  `);
}

function requireChooseMove() {
  console.log(`You must choose a move!`);
}

function sayAboutChoose(name, move) {
  console.log(`${name} chooses move: ${move.toLocaleUpperCase()}`);
}

module.exports = {
  getRandomNumber,
  difficultyArray,
  setLevel,
  roundHealth,
  dropCooldowns,
  displayMoveChars,
  endRoundStats,
  requireChooseMove,
  sayAboutChoose
};
