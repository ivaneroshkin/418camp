function checkDuplicates(array) {
  return array.length !== new Set(array).size;
}

function getRandomNumber(numberLenght) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  digits.sort(function() {
    return Math.random() - 0.5;
  });
  return digits.slice(0, numberLenght);
}

module.exports = {
  checkDuplicates,
  getRandomNumber
};
