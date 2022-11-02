import { ZERO_WORD } from "../../../nand/types";
import mux16 from "../mux16";
import { createMux16 } from "../mux16/mux16";
import mux4way16 from "../mux4way16";
import { createMux4Way16 } from "../mux4way16/mux4way16";

/**
 * 8-way 16-bit multiplexor:
 * out = a if sel == 000
 *       b if sel == 001
 *       etc.
 *       h if sel == 111
 */
export default (
  a: boolean[],
  b: boolean[],
  c: boolean[],
  d: boolean[],
  e: boolean[],
  f: boolean[],
  g: boolean[],
  h: boolean[],
  sel: boolean[]
): boolean[] => {
  const abcd = mux4way16(a, b, c, d, sel.slice(0, 2));
  const efgh = mux4way16(e, f, g, h, sel.slice(0, 2));
  return mux16(abcd, efgh, sel[2]);
};

export const createMux8Way16 = (output: boolean[] = [...ZERO_WORD]) => {
  const { op: mux4way16_abcd } = createMux4Way16();
  const { op: mux4way16_efgh } = createMux4Way16();
  const { op: mux16_output } = createMux16(output);

  return {
    output,
    op: (
      a: boolean[],
      b: boolean[],
      c: boolean[],
      d: boolean[],
      e: boolean[],
      f: boolean[],
      g: boolean[],
      h: boolean[],
      sel: boolean[]
    ) => {
      const abcd = mux4way16_abcd(a, b, c, d, sel.slice(0, 2));
      const efgh = mux4way16_efgh(e, f, g, h, sel.slice(0, 2));
      return mux16_output(abcd, efgh, sel[2]);
    },
  };
};
