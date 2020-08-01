import { TypedNumber } from '@/generic/number';

export interface Memory {
  address: Address;
  content: number;
}

export type Address = TypedNumber<'Address'>;

export const incrementAddress = (address: Address): Address => address + 1 as Address;
export const decrementAddress = (address: Address): Address => address - 1 as Address;

export type Register = keyof CpuRegisters;
export interface CpuRegisters {
  RSP: Address;
  RBP: Address;
  RAX: number;
}
