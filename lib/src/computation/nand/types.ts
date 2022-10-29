import Chip from "./Chip";
import Clock from "./Clock";

export interface TwoInOneOutTestCase {
  a: boolean;
  b: boolean;
  expected: boolean;
}

export type ChipProducer = (clock: Clock) => Chip;
export interface ChipFactory {
  [name: string]: ChipProducer;
}

export const WORD_LENGTH = 16;
export const ZERO_WORD = Array(WORD_LENGTH).fill(false);
export const BINARY_ONE = Array(WORD_LENGTH)
  .fill(false)
  .map((_, i) => i === 0);

// Arrays need reversing, binary numbers are read right to left
export const getTestName = (parameters: object) =>
  Object.entries(parameters)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
export const generateRandomBinary = (width: number) =>
  Array(width)
    .fill(null)
    .map(() => Math.random() > 0.5);
export const generateRandomWord = () => generateRandomBinary(WORD_LENGTH);

export const PIN_A = "a";
export const PIN_B = "b";
export const PIN_INPUT = "in";
export const PIN_OUTPUT = "out";
export const PIN_SELECTOR = "sel";
export const PIN_LOAD = "load";
export const PIN_ADDRESS = "address";
