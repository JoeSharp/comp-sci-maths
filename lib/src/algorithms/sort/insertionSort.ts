import { anyComparator, emptyObserver, simpleSwap } from "../../common";
import { SortUtility } from "./types";

function insertionSort<T>(
  inputList: T[],
  {
    compare = anyComparator,
    observe = emptyObserver,
    swap = simpleSwap,
  }: SortUtility<T>
): T[] {
  if (inputList.length < 2) {
    return inputList;
  }

  // Don't modify the input
  const outputList: T[] = [...inputList];

  for (let index = 1; index < outputList.length; index++) {
    observe("Placing Item", outputList, { index });
    let itemPlace: number = index;
    while (itemPlace > 0) {
      const lower: number = itemPlace - 1;
      const upper: number = itemPlace;

      observe("Seeking Place", outputList, {
        index,
        lower,
        upper,
      });

      const comparison: number = compare(outputList[lower], outputList[upper], {
        aIndex: lower,
        bIndex: upper,
      });

      // The compare returns -ve if the first item is 'greater than' the second one
      if (comparison > 0) {
        // Temporary variable to prevent overwrites
        swap(outputList, lower, upper);
      } else {
        itemPlace = upper;
        break;
      }

      itemPlace -= 1;
    }
  }

  return outputList;
}

export default insertionSort;
