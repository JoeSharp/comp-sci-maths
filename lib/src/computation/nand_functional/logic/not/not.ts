import nand from "../nand";

/**
 * Not gate:
 * out = not in
 */
export default (a: boolean): boolean => nand(a, a);
