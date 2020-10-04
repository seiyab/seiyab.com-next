export type TypedString<K extends string> = string & {
  [key in K]: never
};

export const find = <S extends string, T>(record: Record<S, T>, key: S): T | null => {
  return (record as Record<string, T>)[key as string] ?? null;
}