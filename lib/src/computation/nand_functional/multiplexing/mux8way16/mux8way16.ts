import mux16 from "../mux16";
import mux4way16 from "../mux4way16";
import { Mux4Way16Input } from "../mux4way16/mux4way16";

interface Mux8Way16Input extends Mux4Way16Input {
  e: boolean[];
  f: boolean[];
  g: boolean[];
  h: boolean[];
}

/**
 * 8-way 16-bit multiplexor:
 * out = a if sel == 000
 *       b if sel == 001
 *       etc.
 *       h if sel == 111
 */
export default ({ a, b, c, d, e, f, g, h, sel }: Mux8Way16Input): boolean[] => {
  const abcd = mux4way16({ a, b, c, d, sel: sel.slice(0, 2) });
  const efgh = mux4way16({ a: e, b: f, c: g, d: h, sel: sel.slice(0, 2) });
  return mux16({ a: abcd, b: efgh, sel: sel[2] });
};
