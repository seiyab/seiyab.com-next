import { pipe } from '@/generic/function';
import {push, pop, mov, initialState, Address} from '.';

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
    .then(pop({ kind: 'Register', value: "RAX" }))
    .then(pop({ kind: 'Register', value: "RBP" }))
    .run();

  expect(state3.memories[1].content).toBe(3);
  expect(state3.registers.RSP).toBe(1);
  expect(state3.registers.RAX).toBe(1);
  expect(state3.registers.RBP).toBe(2);

  const state4 = pop({ kind: 'Memory', value: 7 as Address })(state3);

  expect(state4.memories[7].content).toBe(3);
  expect(state4.registers.RSP).toBe(0);
});

it('mov', () => {
  const state1 = initialState(10);

  const state2 = pipe(state1)
    .then(mov({ kind: 'Register', value: 'RAX' }, { kind: 'Immediate', value: 1}))
    .then(mov({ kind: 'Memory', value: 0 as Address }, { kind: 'Immediate', value: 2 }))
    .then(mov({ kind: 'Memory', value: 1 as Address }, { kind: 'Register', value: 'RAX' }))
    .then(mov({ kind: 'Register', value: 'RSP' }, { kind: 'Memory', value: 0 as Address }))
    .run();
  
  expect(state2.registers.RAX).toBe(1);
  expect(state2.memories[0].content).toBe(2);
  expect(state2.registers.RSP).toBe(2);
  expect(state2.memories[1].content).toBe(1);
});
