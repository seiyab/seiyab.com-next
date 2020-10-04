export type TypedString<K extends string> = string & {
  [key in K]: never
};

export const find = <S extends string, T>(record: Record<S, T>, key: S): T | null => {
  return (<Record<string, T>>record)[<string>key] ?? null;
}

export const put = <S extends string, T>(record: Record<S, T>, key: S, value: T): void => {
  (<Record<string, T>>record)[<string>key] = value;
}