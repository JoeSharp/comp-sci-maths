import algorithms from "comp-sci-maths-lib/dist/algorithms/search";
import {
  simpleLogger,
  arithmeticComparator,
  generateRandomNumbers,
  objToString,
} from "common";
import { SearchObserver } from "types";

const observe: SearchObserver = (
  stageName: string,
  positionVars: { [k: string]: number }
) => {
  simpleLogger.info(
    `Observing ${stageName}, Position Vars: ${objToString(positionVars)}`
  );
};

algorithms.forEach(({ name, search }) => {
  simpleLogger.info(`Running Sort Algorithm ${name}`);
  // Generate a list of random numbers
  const inputList: number[] = generateRandomNumbers(0, 100, 20);

  // Binary search requires sorted array, so lets just sort it for all tests
  inputList.sort(arithmeticComparator);

  // Search for some specific indices
  [1, 10, 14, 19].forEach((index) => {
    simpleLogger.info(`Searching for inputList[${index}]=${inputList[index]}`);

    // Search for the 15th one
    const found = search(inputList, inputList[index], {
      compare: arithmeticComparator,
      observe,
    });

    simpleLogger.info(`Found at ${found}`);
  });
});
