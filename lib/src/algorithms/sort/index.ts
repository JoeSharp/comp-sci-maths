import bubbleSort from "./bubbleSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import insertionSort from "./insertionSort";
import { NamedCustomisableSort } from "./types";

const algorithms: NamedCustomisableSort[] = [
  { name: "Bubble Sort", sort: bubbleSort },
  {
    name: "Merge Sort",
    sort: mergeSort,
  },
  { name: "Insertion Sort", sort: insertionSort },
  { name: "Quick Sort", sort: quickSort },
];
export default algorithms;
