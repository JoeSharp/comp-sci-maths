import and from "../../logic/and";
import not from "../../logic/not";
import or from "../../logic/or";

/**
 * Multiplexor:
 * out = a if sel == 0
 *       b otherwise
 */
export default (a: boolean, b: boolean, sel: boolean) => {
  const bAndSel = and(b, sel);
  const notSel = not(sel);
  const aAndNotSel = and(a, notSel);
  return or(aAndNotSel, bAndSel);
};
