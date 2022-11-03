import { ZERO_WORD } from "../../../nand/types";
import mux from "../mux";

/**
 * 16-bit multiplexor:
 * for i = 0..15 out[i] = a[i] if sel == 0
 *                        b[i] if sel == 1
 */
export default (a: boolean[], b: boolean[], sel: boolean) =>
  a.map((ai, i) => mux(ai, b[i], sel));

export const createMux16 =
  (output: boolean[] = [...ZERO_WORD]) =>
  (a: boolean[], b: boolean[], sel: boolean) => {
    a.forEach((ai, i) => (output[i] = mux(ai, b[i], sel)));

    return output;
  };
