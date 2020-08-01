export type TypedString<K extends string> = string & {
  [key in K]: never
};