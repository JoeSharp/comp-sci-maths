import and from "../and";
import not from "../not";
import or from "../or";

/**
 * Exclusive-or gate:
 * out = not (a == b)
 */
export default (a: boolean, b: boolean): boolean => {
  const notA = not(a);
  const notB = not(b);
  const aAndNotB = and(a, notB);
  const notAAndB = and(notA, b);
  return or(aAndNotB, notAAndB);
};
