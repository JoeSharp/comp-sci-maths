import nand from "../nand";
import not from "../not";

/**
 * And gate:
 * out = 1 if (a == 1 and b == 1)
 *       0 otherwise
 */
export default (a: boolean, b: boolean): boolean => not(nand(a, b));
