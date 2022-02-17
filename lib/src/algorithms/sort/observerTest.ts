import {
  simpleLogger,
  generateRandomNumbers,
  arithmeticComparator,
  objToString,
} from "common";

import algorithms from ".";
import { SortObserver } from "./types";

const observe: SortObserver<number> = (
  stageName: string,
  data: number[],
  positionVars: { [k: string]: number }
) => {
  simpleLogger.info(
    `${stageName}: Data: ${JSON.stringify(data)}, Position Vars: ${objToString(
      positionVars
    )}`
  );
};

// Create a test for each algorithm
algorithms.forEach(({ name, sort }) => {
  simpleLogger.info(`Running Sort Algorithm ${name}`);

  // Generate a list of random numbers
  const inputList: number[] = generateRandomNumbers(0, 100, 10);

  // Execute the sort
  sort(inputList, { compare: arithmeticComparator, observe });
});
