import {parseNaiveInt} from './number';

describe('parseNaiveInt', () => {
  const testCases: [string, number][] = [
    ['1234', 1234],
    ['-1234', -1234],
    ['1e2', NaN],
    ['-1e2', NaN],
    ['1.2', NaN],
    ['-1.2', NaN],
    ['abc', NaN],
  ];
  it.each(testCases)('%d', (str, expected) => {
    const result = parseNaiveInt(str);
    if (isNaN(expected)) {
      expect(result).toBeNaN();
    } else {
      expect(result).toBe(expected);
    }
  });
})