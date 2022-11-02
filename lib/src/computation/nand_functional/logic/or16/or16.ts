import { ZERO_WORD } from "../../../nand/types";
import or from "../or";
import { BusLogicalOperator, BusLogicalOperatorFactory } from "../types";

/**
 * 16-bit bitwise Or:
 * for i = 0..15 out[i] = (a[i] or b[i])
 */
export default (a: boolean[], b: boolean[]): boolean[] =>
  a.map((ai, i) => or(ai, b[i]));

/**
 * Create an OR16 with a consistent output bus
 */
export const createOr16: BusLogicalOperatorFactory = (): BusLogicalOperator => {
  const output = [...ZERO_WORD];

  return (a, b) => {
    a.forEach((ai, i) => (output[i] = or(ai, b[i])));

    return output;
  };
};
