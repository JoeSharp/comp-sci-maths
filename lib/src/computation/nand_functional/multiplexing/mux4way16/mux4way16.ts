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
export default (input: boolean[][], sel: boolean[]): boolean[] => {
  const aOrB = mux16(input[0], input[1], sel[0]);
  const cOrD = mux16(input[2], input[3], sel[0]);
  return mux16(aOrB, cOrD, sel[1]);
};

export const createMux4Way16 = (output: boolean[] = [...ZERO_WORD]) => {
  const { op: mux16AOrB } = createMux16();
  const { op: mux16COrD } = createMux16();
  const { op: mux16Output } = createMux16(output);

  return {
    output,
    op: (input: boolean[][], sel: boolean[]) => {
      const aOrB = mux16AOrB(input[0], input[1], sel[0]);
      const cOrD = mux16COrD(input[2], input[3], sel[0]);
      return mux16Output(aOrB, cOrD, sel[1]);
    },
  };
};
