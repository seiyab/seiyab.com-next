import { TypedNumber } from '@/generic/number';

export interface State {
  memories: Memory[];
  registers: {
    RSP: Address,
    RBP: Address,
    RAX: number,
  }
}

export interface Memory {
  address: Address;
  content: number;
}

export type Address = TypedNumber<'Address'>;

export const incrementAddress = (address: Address): Address => address + 1 as Address;
export const decrementAddress = (address: Address): Address => address - 1 as Address;

export type Register = keyof (State['registers']);

type Action = (state: State) => State;

export const initialState = (size: number): State => {
  return {
    memories: Array.from(Array(size).keys()).map(
      (i) => ({address: i as Address, content: 0})
    ), 
    registers: {
      RSP: 0 as Address,
      RBP: 0 as Address,
      RAX: 0,
    }
  }
}

export const push = (value: number): Action => (state: State): State => {
  const { memories, registers } = state;
  const newRSP = incrementAddress(registers.RSP);
  if (newRSP >= memories.length) return state;

  return {
    memories: memories.map(
      (memory) => memory.address === newRSP ? {...memory, content: value} : memory,
    ),
    registers: {
      ...registers,
      RSP: newRSP,
    }
  };
}

export const pop = (operand: Register): Action => (state: State) => {
  const { memories, registers } = state;
  const newRSP = decrementAddress(registers.RSP);
  if (newRSP < 0) return state;

  const value = memories.find((memory) => memory.address === registers.RSP)?.content;
  if (value === undefined) return state;

  return {
    memories,
    registers: {
      ...registers,
      RSP: newRSP,
      [operand]: value,
    }
  }
};