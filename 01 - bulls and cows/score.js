function attemptScore(bulls, cows) {
  console.log(
    `Cовпавших цифр не на своих местах - ${cows}, цифр на своих местах - ${bulls}`
  );
}

function finalScore(moves) {
  console.log(`Поздравляем! Вы выиграли! Ходов понадобилось: ${moves}`);
}

module.exports = {
  attemptScore,
  finalScore
};
