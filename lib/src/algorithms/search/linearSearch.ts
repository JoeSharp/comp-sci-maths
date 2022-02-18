import { NO_MATCH } from "../../algorithms/search/common";
import { SearchUtilities } from "../../types";
import { emptyObserver } from "../../common";

/**
 * perform a linear search on an array
 *
 * @param {array} data The array
 * @param {function} compare Accepts each item and
 *  returns 0 if its a match,
 * -ve if the item is 'less than'
 * +ve if item is 'greater than'
 * @return {object} The matching item in the array
 */
function linearSearch<T>(
  data: T[],
  searchItem: T,
  { compare, observe = emptyObserver }: SearchUtilities<T>
): number {
  for (let i = 0; i < data.length; i++) {
    observe("Looking", { i });
    if (compare(data[i], searchItem) === 0) {
      return i;
    }
  }

  return NO_MATCH;
}

export default linearSearch;
