import { SplitList } from "../../types";
import {
  emptyObserver,
  anyComparator,
  ROOT_RECURSION_KEY,
} from "../../common";
import { SortUtility } from "./types";

function mergeSortR<T>(
  inputList: T[],
  utilities: SortUtility<T>,
  leftPointer?: number,
  rightPointer?: number,
  parentKey: number = ROOT_RECURSION_KEY,
  levelAdjust: number = ROOT_RECURSION_KEY / 2
): T[] {

  // Have we reached the bottom of our recursion? This is the exit condition!
  if (leftPointer === rightPointer) {
    return [inputList[leftPointer]];
  }

  const {
    compare = anyComparator,
    observe = emptyObserver,
    split = emptyObserver,
    join = emptyObserver,
  } = utilities;

  // Calculate the mid point
  const middle = Math.floor((leftPointer + rightPointer) / 2);

  const listA: SplitList<T> = {
    key: (parentKey - levelAdjust).toString(10),
    data: inputList.slice(leftPointer, middle + 1),
  };
  const listB: SplitList<T> = {
    key: (parentKey + levelAdjust).toString(10),
    data: inputList.slice(middle + 1, rightPointer + 1),
  };
  observe("Recursing", inputList, { leftPointer, rightPointer, middle });
  split(parentKey.toString(10), listA, listB);

  // Recurse sort both halves to yield the two lists to merge
  const firstHalf = mergeSortR(
    inputList,
    utilities,
    leftPointer,
    middle,
    parentKey - levelAdjust,
    levelAdjust / 2
  );
  const secondHalf = mergeSortR(
    inputList,
    utilities,
    middle + 1,
    rightPointer,
    parentKey + levelAdjust,
    levelAdjust / 2
  );

  // Merge the two halves into a single sorted list
  const outputList = [];
  let firstPtr = 0;
  let secondPtr = 0;
  while (firstPtr < firstHalf.length && secondPtr < secondHalf.length) {
    // Comparator returns +ve if the second item is larger than first
    if (
      compare(firstHalf[firstPtr], secondHalf[secondPtr], {
        aIndex: leftPointer + firstPtr,
        bIndex: middle + secondPtr,
      }) > 0
    ) {
      outputList.push(secondHalf[secondPtr]);
      secondPtr += 1;
    } else {
      outputList.push(firstHalf[firstPtr]);
      firstPtr += 1;
    }
  }

  // Push any stragglers from whichever list has items remaining
  firstHalf.filter((_, i) => i >= firstPtr).forEach((i) => outputList.push(i));
  secondHalf
    .filter((_, i) => i >= secondPtr)
    .forEach((i) => outputList.push(i));
  join(listA, listB, outputList);

  return outputList;
}

function mergeSort<T>(inputList: T[],
  utilities: SortUtility<T>): T[] {

  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  return mergeSortR(inputList, utilities, 0, inputList.length - 1)
}

export default mergeSort;
