import React from "react";

import {
  stringComparator,
  generateRandomLetters,
} from "@comp-sci-maths/lib/dist/common";
import { NamedSearch, SearchUtilities } from "@comp-sci-maths/lib/dist/types";

import { SearchingData, SearchObservation } from "./types";
import { NO_MATCH } from "@comp-sci-maths/lib/dist/algorithms/search/common";
import { StringDataItem } from "../../../p5/Boid/types";

interface Props {
  algorithm?: NamedSearch;
  searchItem: string;
}

const useSearchedData = ({
  algorithm,
  searchItem,
}: Props): SearchingData<StringDataItem> => {
  const data: StringDataItem[] = React.useMemo(
    () =>
      generateRandomLetters(20, { unique: true, sorted: true }).map((d, i) => ({
        key: i.toString(),
        label: d,
        value: d,
      })),
    []
  );

  const { matchIndex, stages } = React.useMemo(() => {
    let stages: SearchObservation[] = [];
    let lastObservation: SearchObservation;

    const searchUtilities: SearchUtilities<StringDataItem> = {
      compare: (a, b) => stringComparator(a.value, b.value),
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
        { key: "NONE", label: searchItem, value: searchItem },
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
