import { NamedSearch } from "../../types";

import binarySearch from "./binarySearch";
import linearSearch from "./linearSearch";

const algorithms: NamedSearch[] = [
  {
    name: "Binary Search",
    search: binarySearch,
  },
  {
    name: "Linear Search",
    search: linearSearch,
  },
];

export default algorithms;
