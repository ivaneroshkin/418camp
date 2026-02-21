function attemptScore(bulls, cows) {
  console.log(
    `Digits in wrong positions - ${cows}, digits in correct positions - ${bulls}`
  );
}

function finalScore(moves) {
  console.log(`Congratulations! You won! Moves needed: ${moves}`);
}

module.exports = {
  attemptScore,
  finalScore
};
