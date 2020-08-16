import { match } from './syntax';

it('test match', () => {
  type T = 'a' | 'b' | 'c';
  const result = match('a' as T)({
    a: 0,
    b: 1,
    c: 2,
  })

  expect(result).toBe(0);
});