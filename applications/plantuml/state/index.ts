import { atom } from 'recoil';

import {
  ClazzName,
  Clazz,
  Link,
} from '@puml/domain';

export const globalState = atom<State>({
  key: 'globalState',
  default: {
    clazzes: {},
    links: [],
  },
});

export interface State {
  clazzes: Record<ClazzName, Clazz>,
  links: Link[];
}