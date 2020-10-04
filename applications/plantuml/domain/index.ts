import { TypedString } from '@/generic/string';

export interface Clazz {
  name: ClazzName;
}

export type ClazzName = TypedString<'ClazzName'>;

export interface Link {
  src: LinkTerminal;
  dst: LinkTerminal
}

interface LinkTerminal {
  target: ClazzName;
}
