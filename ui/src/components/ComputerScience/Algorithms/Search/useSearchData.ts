import React from "react";

import {
  stringComparator,
  generateRandomLetters,
} from "@comp-sci-maths/lib/dist/common";
import { NamedSearch, SearchUtilities } from "@comp-sci-maths/lib/dist/types";

import { SearchingData, SearchObservation } from "./types";
import { NO_MATCH } from "@comp-sci-maths/lib/dist/algorithms/search/common";

interface Props {
  algorithm?: NamedSearch;
  searchItem: string;
}

const useSearchedData = ({
  algorithm,
  searchItem,
}: Props): SearchingData<string> => {
  const data: string[] = React.useMemo(
    () =>
      generateRandomLetters(20, { unique: true, sorted: true }).map((d, i) => i.toString(10)),
    []
  );

  const { matchIndex, stages } = React.useMemo(() => {
    let stages: SearchObservation[] = [];
    let lastObservation: SearchObservation;

    const searchUtilities: SearchUtilities<string> = {
      compare: (a, b) => stringComparator(a, b),
      observe: (stageName, positionVars) => {
        lastObservation = {
          stageName,
          positionVars: { ...positionVars },
        };
        stages.push(lastObservation);
      },
    };

    // Add explicit Start Observation
    stages.push({
      stageName: "Starting",
      positionVars: {},
    });

    // Run the algorithm
    let matchIndex: number = NO_MATCH;
    if (!!algorithm) {
      matchIndex = algorithm.search(
        data,
        searchItem,
        searchUtilities
      );
    }

    // Add explicit End Observation
    stages.push({
      stageName: "Finished",
      positionVars: {
        matchIndex,
      },
    });

    return { matchIndex, stages };
  }, [data, searchItem, algorithm]);

  return {
    data,
    searchItem,
    matchIndex,
    stages,
  };
};
export default useSearchedData;
