import assert from "assert";

export const WORD_LENGTH = 16;

export const validateBus = (arr: boolean[]) =>
  assert(arr.length === WORD_LENGTH, "Invalid Bus Width");

export type Memory = boolean[][];

export const createMemory = (registers: number): Memory =>
  Array(registers)
    .fill(null)
    .map(() => Array(WORD_LENGTH).fill(false));
