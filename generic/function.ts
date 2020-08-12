type Fn<S, T> = (s: S) => T;

interface Pipe<T> {
  then: <U>(f: Fn<T, U>) => Pipe<U>;
  run: () => T;
}

export const pipe = <T>(t: T): Pipe<T> => pipeL(() => t);

const pipeL = <T>(l: Fn<void, T>): Pipe<T> => ({
  then: <U>(f: Fn<T, U>) => pipeL(() => f(l())),
  run: () => l(),
})
