import mux16 from "../mux16";

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
