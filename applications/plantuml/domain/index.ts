import { TypedString } from '@/generic/string';

export interface Clazz {
  name: ClazzName;
}

export type ClazzName = TypedString<'ClazzName'>;

export interface Link {
  left: LinkTerminal;
  right: LinkTerminal
}

interface LinkTerminal {
  target: ClazzName;
}
