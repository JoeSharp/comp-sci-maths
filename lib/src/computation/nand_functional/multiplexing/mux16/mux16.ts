import mux from "../mux/mux";

/**
 * 16-bit multiplexor:
 * for i = 0..15 out[i] = a[i] if sel == 0
 *                        b[i] if sel == 1
 */
export default (a: boolean[], b: boolean[], sel: boolean) =>
  a.map((ai, i) => mux(ai, b[i], sel));
