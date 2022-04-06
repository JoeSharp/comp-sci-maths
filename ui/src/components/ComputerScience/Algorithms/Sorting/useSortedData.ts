import React from "react";

import {
  stringComparator,
  generateRandomLetters,
  simpleSwap,
} from "@comp-sci-maths/lib/dist/common";

import {
  SortStage,
  SortingData,
  SortStageType,
  SortObservation,
} from "./types";
import { NO_MATCH } from "@comp-sci-maths/lib/dist/algorithms/search/common";
import {
  NamedCustomisableSort,
  SortUtility,
} from "@comp-sci-maths/lib/dist/algorithms/sort/types";

interface Props {
  algorithm?: NamedCustomisableSort;
}

const useSortedData = ({ algorithm }: Props): SortingData<string> => {
  const inputList: string[] = React.useMemo(
    () =>
      generateRandomLetters(10, { sorted: false }).map((d, i) => i.toString()),
    []
  );
  const {
    sortedData,
    stages,
  }: SortingData<string> = React.useMemo(() => {
    let sortedData = inputList;
    let stages: SortStage<string>[] = [];
    let lastObservation: SortObservation<string>;

    const sortUtilities: SortUtility<string> = {
      swap: (data, from, to) => {
        stages.push({
          type: SortStageType.swap,
          from,
          to,
          lastObservation,
        });
        simpleSwap(data, from, to);
      },
      compare: (a, b, meta) => {
        const result = stringComparator(a, b, meta);
        stages.push({
          type: SortStageType.compare,
          a,
          b,
          aIndex: !!meta ? meta.aIndex : NO_MATCH,
          bIndex: !!meta ? meta.bIndex : NO_MATCH,
          result,
          lastObservation,
        });
        return result;
      },
      observe: (stageName, data, positionVars) => {
        lastObservation = {
          type: SortStageType.observation,
          stageName,
          data: [...data],
          positionVars: { ...positionVars },
        };
        stages.push(lastObservation);
      },
    };

    // Add explicit Start Observation
    stages.push({
      type: SortStageType.observation,
      stageName: "Starting",
      data: [...inputList],
      positionVars: {},
    });

    // Run the algorithm
    if (!!algorithm) {
      sortedData = algorithm.sort(inputList, sortUtilities);
    }

    // Add explicit End Observation
    stages.push({
      type: SortStageType.observation,
      stageName: "Finished",
      data: [...sortedData],
      positionVars: {},
    });

    return { sortedData, stages };
  }, [algorithm, inputList]);

  return { sortedData, stages };
};
export default useSortedData;
