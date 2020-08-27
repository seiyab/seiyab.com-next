import { matchOn } from 'ts-union-tools';

import { TypedNumber } from '@/generic/number';
import { unreachable } from '@/generic/syntax';

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

export type OperandKind = 'Immediate' | 'Register' | 'Memory';

export type Operand<K extends OperandKind = OperandKind> = ({
  kind: 'Immediate',
  value: number,
} | {
  kind: 'Register',
  value: Register,
} | {
  kind: 'Memory',
  value: Address,
}) & {
  kind: K,
};

export type SrcOperand = Operand;
export type DstOperand = Operand<'Register'| 'Memory'>;

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

export const pop = (operand: DstOperand): Action => (state: State) => {
  const { memories, registers } = state;
  const newRSP = decrementAddress(registers.RSP);
  if (newRSP < 0) return state;

  const value = memories.find((memory) => memory.address === registers.RSP)?.content;
  if (value === undefined) return state;

  if (operand.kind === 'Register') {
    return {
      memories,
      registers: {
        ...registers,
        RSP: newRSP,
        [operand.value]: value,
      }
    }
  }

  if (operand.kind === 'Memory') {
    const newMemories = memories.map(
      (memory) => memory.address === operand.value ? {...memory, content: value} : memory,
    )
    return {
      memories: newMemories,
      registers: {
        ...registers,
        RSP: newRSP,
      },
    }
  }

  return unreachable(operand);
};

export const mov = (dst: DstOperand, src: SrcOperand): Action => (state: State): State => {
  const { memories, registers } = state;

  const value = matchOn('kind', src, {
    'Immediate': (s) => s.value,
    'Register': (s) => registers[s.value],
    'Memory': (s) => memories.find((m) => m.address === s.value)?.content ?? 0,
  });

  return matchOn('kind', dst, {
    'Register': (d) => ({
      memories,
      registers: {
        ...registers,
        [d.value]: value,
      }
    }),
    'Memory': (d) => ({
      memories: memories.map(
        (memory) => memory.address === d.value ? {...memory, content: value} : memory,
      ),
      registers,
    }),
  });
}