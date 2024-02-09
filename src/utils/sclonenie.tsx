function getNounEnding(number: number, noun: string): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const forms = ['единица', 'единицы', 'единиц'];

  let index: number;
  if (number % 100 > 4 && number % 100 < 20) {
    index = 2;
  } else {
    index = cases[Math.min(number % 10, 5)];
  }

  return `${number} ${forms[index]} ${noun}`;
}

// Пример использования
console.log(getNounEnding(1, 'яблоко')); // 1 единица яблоко
console.log(getNounEnding(5, 'яблоко')); // 5 единиц яблоко
console.log(getNounEnding(10, 'яблоко')); // 10 единиц яблоко
