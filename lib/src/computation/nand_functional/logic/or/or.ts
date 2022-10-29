import nand from "../nand";
import not from "../not";

/**
 * Or gate:
 * out = 1 if (a == 1 or b == 1)
 *       0 otherwise
 */
export default (a: boolean, b: boolean): boolean => nand(not(a), not(b));
