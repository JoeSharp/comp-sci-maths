import { NO_MATCH } from "../../algorithms/search/common";
import { SearchUtilities } from "../../types";
import { emptyObserver } from "../../common";

/**
 * Executes a binary search.
 * This is the recursive form of the function.
 *
 * Based on pseudocode from
 * https://www.geeksforgeeks.org/binary-search/
 *
 * @param data The data to search through
 * @param match A function that can be used to compare any item with our criteria
 * @param left The left pointer, bounds this segment (part of the recursion)
 * @param right The right pointer, bounds this segment (part of the recursion)
 */
function binarySearchR<T>(
  data: T[],
  searchItem: T,
  utilities: SearchUtilities<T>,
  left: number,
  right: number
): number {
  // Exit condition...
  if (right < left) {
    return NO_MATCH;
  }

  const { observe = emptyObserver, compare } = utilities;

  // Calculate the mid point
  const mid = Math.floor(left + (right - left) / 2);
  observe("Recursing", { left, right, mid });

  // Compare the midpoint to our criteria
  const compareMid: number = compare(searchItem, data[mid]);

  // If the element is present in the middle itself
  if (compareMid === 0) {
    return mid;
  } else if (compareMid < 0) {
    // If element is smaller than mid, then
    // it can only be present in left subarray
    return binarySearchR(data, searchItem, utilities, left, mid - 1);
  } else {
    // Else the element can only be present
    // in right subarray
    return binarySearchR(data, searchItem, utilities, mid + 1, right);
  }
}

function binarySearch<T>(
  data: T[],
  searchItem: T,
  utilities: SearchUtilities<T>
) {
  return binarySearchR(data, searchItem, utilities, 0, data.length - 1);
}

export default binarySearch;
