import mux from "../mux/mux";

interface Mux16Input {
  a: boolean[];
  b: boolean[];
  sel: boolean;
}

/**
 * 16-bit multiplexor:
 * for i = 0..15 out[i] = a[i] if sel == 0
 *                        b[i] if sel == 1
 */
export default ({ a, b, sel }: Mux16Input) =>
  a.map((ai, i) => mux({ a: ai, b: b[i], sel }));
