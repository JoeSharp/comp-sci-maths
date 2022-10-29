import and from "../and";

/**
 * 16-bit bitwise And:
 * for i = 0..15: out[i] = (a[i] and b[i])
 */
export default (a: boolean[], b: boolean[]): boolean[] =>
  a.map((ai, i) => and(ai, b[i]));
