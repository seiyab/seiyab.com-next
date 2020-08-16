import { CSSProperties } from 'react';

export interface Props<T extends string> {
  options: Option<T>[];
  selected: T;
  name?: string;
  onChange: JSX.IntrinsicElements['select']['onChange'];
  style?: CSSProperties;
}

export interface Option<T extends string> {
  value: T,
  text: string,
}