export const matchOrDefault = <T extends string>(target: T) => <U>(options: {[K in T]?: U}, otherwise: U): U => {
  return options[target] ?? otherwise;
}

export const match = <T extends string>(target: T) => <U>(options: {[K in T]: U}): U => options[target];

// eslint-disable-next-line
export const unreachable = (_: never): never => { throw new Error('unexpected code path') };
