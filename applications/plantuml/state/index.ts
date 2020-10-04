import { atom } from 'recoil';

import {
  ClazzName,
  Clazz,
  Link,
} from '@puml/domain';

export const empty: () => State = () => ({
  clazzes: {},
  links: [],
});

export const globalState = atom<State>({
  key: 'globalState',
  default: empty(),
});

export interface State {
  clazzes: Record<ClazzName, Clazz>,
  links: Link[];
}
