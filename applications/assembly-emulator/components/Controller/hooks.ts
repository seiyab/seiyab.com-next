import { useCallback } from 'react';

import {
  Memory,
  Register,
  CpuRegisters,
  incrementAddress,
  decrementAddress,
} from "@asm/domain";

export const usePush = (
  value: number,
  setMemories: (apply: (memories: Memory[]) => Memory[]) => void,
  setRegister: (apply: (register: CpuRegisters) => CpuRegisters) => void,
): () => void => useCallback(
  () => {
    if (isNaN(value)) return;

    setRegister((register: CpuRegisters) => {
      const newRSP = incrementAddress(register.RSP);
      setMemories((memories) => {
        const newMemories = [...memories];
        if (newMemories.findIndex((memory) => memory.address === newRSP) === -1) {
          newMemories.push({ address: newRSP, content: value})
          return newMemories;
        }
        return newMemories.map(
          (memory) => memory.address === newRSP ? {...memory, content: value} : memory,
        );
      })
      return {
        ...register,
        RSP: newRSP,
      };
    })
  },
  [setMemories, setRegister, value],
);

export const usePop = (
  operand: Register,
  memories: Memory[],
  setRegister: (apply: (register: CpuRegisters) => CpuRegisters) => void,
) => useCallback(
  () => {
    setRegister((register) => {
      if (register.RSP <= 0) return register;
      const newRSP = decrementAddress(register.RSP);
      const value = memories.find((memory) => memory.address === register.RSP);
      if (value === undefined) return {...register, RSP: newRSP};
      return {
        ...register,
        RSP: newRSP,
        [operand]: value.content,
      };
    });
  },
  [operand, memories, setRegister] ,
)