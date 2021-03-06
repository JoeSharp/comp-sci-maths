import algorithms from "@comp-sci-maths/lib/dist/algorithms/sort";
import { generateRandomNumbers } from "@comp-sci-maths/lib/dist/common";
import {
  SplitObserver,
  JoinObserver,
  SplitList,
  PositionVars,
} from "@comp-sci-maths/lib/dist/types";
import { SortObserver } from "@comp-sci-maths/lib/dist/algorithms/sort/types";
import simpleLogger from './simpleLogger';

algorithms
  .filter(({ name }) => name === "Merge Sort")
  .forEach(({ name, sort }) => {
    const inputList: number[] = generateRandomNumbers(0, 100, 20);
    simpleLogger.info(`Testing ${name} on data ${inputList}`);

    const observe: SortObserver<number> = (
      stageName: string,
      data: number[],
      positionVars: PositionVars
    ) => {
      simpleLogger.info(
        `Stage: ${stageName} with Data: ${data}, Positions Vars: ${JSON.stringify(
          positionVars
        )}`
      );
    };

    const split: SplitObserver<number> = (
      parentKey: string,
      listA: SplitList<number>,
      listB: SplitList<number>
    ) => {
      simpleLogger.info(
        `Splitting ${parentKey} -> ${listA.key}=${listA.data} and ${listB.key}=${listB.data}`
      );
    };
    const join: JoinObserver<number> = (
      listA: SplitList<number>,
      listB: SplitList<number>,
      joinedList: number[]
    ) => {
      simpleLogger.info(
        `Joining ${listA.data} + ${listB.data} -> ${joinedList}`
      );
    };

    // Execute the sort
    const outputList: number[] = sort(inputList, {
      observe,
      split,
      join,
    });
  });
