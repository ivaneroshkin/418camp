// scalable config

const difficultyArray = ['Легкий', 'Средний', 'Сложный', 'Кошмар'];

function setLevel(answer) {
  let result;
  switch (answer) {
    case 'Легкий':
      result = 20;
      break;
    case 'Средний':
      result = 15;
      break;
    case 'Сложный':
      result = 10;
      break;
    case 'Кошмар':
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
  Физический урон: ${obj.physicalDmg}
  Магический урон: ${obj.magicDmg}
  Физическая броня: ${obj.physicArmorPercents}
  Магическая броня: ${obj.magicArmorPercents}
  Ходов на восстановление: ${obj.cooldown}
`);
}

function endRoundStats(enemyHealth, playerHealth) {
  console.log(`Конец раунда!
    Здоровье монстра: ${enemyHealth.toFixed(1)}
    Здоровье мага: ${playerHealth.toFixed(1)}
  `);
}

function requireChooseMove() {
  console.log(`Необходимо выбрать удар!`);
}

function sayAboutChoose(name, move) {
  console.log(`${name} выбирает ход: ${move.toLocaleUpperCase()}`);
}

exports.getRandomNumber = getRandomNumber;
exports.difficultyArray = difficultyArray;
exports.setLevel = setLevel;
exports.roundHealth = roundHealth;
exports.dropCooldowns = dropCooldowns;
exports.displayMoveChars = displayMoveChars;
exports.endRoundStats = endRoundStats;
exports.requireChooseMove = requireChooseMove;
exports.sayAboutChoose = sayAboutChoose;
