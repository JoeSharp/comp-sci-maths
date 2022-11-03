import { ZERO_WORD } from "../../../nand/types";
import not from "../not";

/**
 * 16-bit Not:
 * for i=0..15: out[i] = not in[i]
 */
export default (a: boolean[]): boolean[] => a.map((ai) => not(ai));

/**
 * Create an AND16 with a consistent output bus
 */
export const createNot16 =
  (output: boolean[] = [...ZERO_WORD]) =>
  (a: boolean[]) => {
    a.forEach((ai, i) => (output[i] = not(ai)));

    return output;
  };
