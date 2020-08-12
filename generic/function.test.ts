import { pipe } from './function';

describe('pipe', () => {
  it('number computation', () => {
    const result = pipe(1)
      .then((x) => x + 2)
      .then((x) => x * 3)
      .run();
    
    expect(result).toBe(9);
  });

  it('different type', () => {
    const result = pipe(5)
      .then((x) => `${x}`)
      .run();
    
    expect(result).toBe('5');
  });
});