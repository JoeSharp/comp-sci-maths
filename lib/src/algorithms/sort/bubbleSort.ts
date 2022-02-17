import { SortUtility } from "./types";
import { simpleSwap, emptyObserver, anyComparator } from "common";

const defaultUtility: SortUtility<any> = {
  compare: anyComparator,
  observe: emptyObserver,
  swap: simpleSwap,
};

function bubbleSort<T>(
  inputList: T[],
  {
    compare = anyComparator,
    observe = emptyObserver,
    swap = simpleSwap,
  }: SortUtility<T> = defaultUtility
): T[] {
  const outputList: T[] = [...inputList];

  for (let top: number = outputList.length - 1; top > 0; top--) {
    observe("Iterating Top Value", outputList, { top });
    let anySwapsMade = false;
    for (let current: number = 0; current < top; current++) {
      observe("Bubbling", outputList, { top, current });
      if (
        compare(outputList[current], outputList[current + 1], {
          aIndex: current,
          bIndex: current + 1,
        }) > 0
      ) {
        swap(outputList, current, current + 1);
        anySwapsMade = true;
      }
    }

    if (!anySwapsMade) break;
  }

  return outputList;
}

export default bubbleSort;
