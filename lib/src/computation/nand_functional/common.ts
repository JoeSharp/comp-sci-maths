import assert from "assert";
import { ZERO_WORD } from "../nand/types";
import { createRegisterState, RegisterState } from "./memory/register";

export const WORD_LENGTH = 16;

export const validateBus = (arr: boolean[]) =>
  assert(arr.length === WORD_LENGTH, "Invalid Bus Width");

export type Memory = boolean[][];

export const createMemory = (registers: number): Memory =>
  Array(registers)
    .fill(null)
    .map(() => Array(WORD_LENGTH).fill(false));

export type PersistentMemory = {
  output: boolean[];
  contents: RegisterState[];
};

export const createPersistentMemory = (
  registers: number
): PersistentMemory => ({
  output: [...ZERO_WORD],
  contents: Array(registers)
    .fill(null)
    .map(() => createRegisterState()),
});

export type MemoryFn = (
  input: boolean[],
  address: boolean[],
  load: boolean,
  contents?: Memory
) => {
  out: boolean[];
  contents: Memory;
};
