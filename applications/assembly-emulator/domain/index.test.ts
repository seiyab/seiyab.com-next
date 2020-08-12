import { pipe } from '@/generic/function';
import {push, pop, initialState} from '.';

it('monkey', () => {
  const state1 = initialState(10);

  const state2 = pipe(state1)
    .then(push(3))
    .then(push(2))
    .then(push(1))
    .run();
  expect(state2.memories[1].content).toBe(3);
  expect(state2.memories[2].content).toBe(2);
  expect(state2.memories[3].content).toBe(1);
  expect(state2.registers.RSP).toBe(3);

  const state3 = pipe(state2)
    .then(pop("RAX"))
    .then(pop("RBP"))
    .run();

  expect(state3.memories[1].content).toBe(3);
  expect(state3.registers.RSP).toBe(1);
  expect(state3.registers.RAX).toBe(1);
  expect(state3.registers.RBP).toBe(2);
});
