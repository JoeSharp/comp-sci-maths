import { ZERO_WORD } from "../../../nand/types";
import and from "../and";
import { BusLogicalOperator, BusLogicalOperatorFactory } from "../types";

/**
 * 16-bit bitwise And:
 * for i = 0..15: out[i] = (a[i] and b[i])
 */
export default (a: boolean[], b: boolean[]): boolean[] =>
  a.map((ai, i) => and(ai, b[i]));

/**
 * Create an AND16 with a consistent output bus
 */
export const createAnd16: BusLogicalOperatorFactory =
  (): BusLogicalOperator => {
    const output = [...ZERO_WORD];

    return (a, b) => {
      a.forEach((ai, i) => (output[i] = and(ai, b[i])));

      return output;
    };
  };
