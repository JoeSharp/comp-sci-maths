import not from "../not";

/**
 * 16-bit Not:
 * for i=0..15: out[i] = not in[i]
 */
export default (a: boolean[]): boolean[] => a.map((ai) => not(ai));
