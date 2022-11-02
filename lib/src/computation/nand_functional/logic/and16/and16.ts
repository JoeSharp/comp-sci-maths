import { ZERO_WORD } from "../../../nand/types";
import and from "../and";

/**
 * 16-bit bitwise And:
 * for i = 0..15: out[i] = (a[i] and b[i])
 */
export default (a: boolean[], b: boolean[]): boolean[] =>
  a.map((ai, i) => and(ai, b[i]));

/**
 * Create an AND16 with a consistent output bus
 */
export const createAnd16 = (output: boolean[] = [...ZERO_WORD]) => ({
  output,
  op: (a: boolean[], b: boolean[]) => {
    a.forEach((ai, i) => (output[i] = and(ai, b[i])));
    return output;
  },
});
