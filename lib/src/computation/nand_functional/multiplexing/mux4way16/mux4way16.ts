import mux16 from "../mux16";

export interface Mux4Way16Input {
  a: boolean[];
  b: boolean[];
  c: boolean[];
  d: boolean[];
  sel: boolean[];
}

/**
 * 4-way 16-bit multiplexor:
 * out = a if sel == 00
 *       b if sel == 01
 *       c if sel == 10
 *       d if sel == 11
 */
export default ({ a, b, c, d, sel }: Mux4Way16Input): boolean[] => {
  const aOrB = mux16({ a, b, sel: sel[0] });
  const cOrD = mux16({ a: c, b: d, sel: sel[0] });
  return mux16({ a: aOrB, b: cOrD, sel: sel[1] });
};
