import { ZERO_WORD } from "../../../nand/types";
import mux16 from "../mux16";
import { createMux16 } from "../mux16/mux16";

/**
 * 4-way 16-bit multiplexor:
 * out = a if sel == 00
 *       b if sel == 01
 *       c if sel == 10
 *       d if sel == 11
 */
export default (
  a: boolean[],
  b: boolean[],
  c: boolean[],
  d: boolean[],
  sel: boolean[]
): boolean[] => {
  const aOrB = mux16(a, b, sel[0]);
  const cOrD = mux16(c, d, sel[0]);
  return mux16(aOrB, cOrD, sel[1]);
};

export const createMux4Way16 = (output: boolean[] = [...ZERO_WORD]) => {
  const mux16_aOrB = createMux16();
  const mux16_cOrD = createMux16();
  const mux16_output = createMux16(output);

  return (
    a: boolean[],
    b: boolean[],
    c: boolean[],
    d: boolean[],
    sel: boolean[]
  ) => {
    const aOrB = mux16_aOrB(a, b, sel[0]);
    const cOrD = mux16_cOrD(c, d, sel[0]);
    return mux16_output(aOrB, cOrD, sel[1]);
  };
};
