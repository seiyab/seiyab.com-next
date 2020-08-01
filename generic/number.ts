export type TypedNumber<K extends string> = number & {
  [key in K]: never
};

const naiveIntRegex = /^-?[0-9]+$/;
export const parseNaiveInt = (str: string): number => {
  if (!naiveIntRegex.test(str)) return NaN;
  return parseInt(str, 10);
}