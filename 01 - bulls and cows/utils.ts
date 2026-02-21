export function checkDuplicates(array: string[]): boolean {
  return array.length !== new Set(array).size;
}

export function getRandomNumber(numberLength: number): number[] {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  digits.sort(function() {
    return Math.random() - 0.5;
  });
  return digits.slice(0, numberLength);
}
