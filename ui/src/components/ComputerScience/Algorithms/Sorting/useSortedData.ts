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
import { StringDataItem } from "../../../p5/Boid/types";
import {
  NamedCustomisableSort,
  SortUtility,
} from "@comp-sci-maths/lib/dist/algorithms/sort/types";

interface Props {
  algorithm?: NamedCustomisableSort;
}

const useSortedData = ({ algorithm }: Props): SortingData<StringDataItem> => {
  const inputList: StringDataItem[] = React.useMemo(
    () =>
      generateRandomLetters(10, { sorted: false }).map((d, i) => ({
        key: i.toString(),
        label: d,
        value: d,
      })),
    []
  );
  const {
    sortedData,
    stages,
  }: SortingData<StringDataItem> = React.useMemo(() => {
    let sortedData = inputList;
    let stages: SortStage<StringDataItem>[] = [];
    let lastObservation: SortObservation<StringDataItem>;

    const sortUtilities: SortUtility<StringDataItem> = {
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
        const result = stringComparator(a.value, b.value, meta);
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
