import simpleLogger from "./simpleLogger";
import { StringReporter } from "comp-sci-maths-lib/dist/types";
import { getPrimeFactorTree } from "comp-sci-maths-lib/dist/algorithms/primeNumbers/primeFactors";

const reportLog: StringReporter = (s) => simpleLogger.info(s);

const values: number[] = [234, 673937, 10912374];

reportLog("Testing Prime Factor Trees");
values.forEach((value) => {
  const tree = getPrimeFactorTree(value);
  simpleLogger.info(`Prime Factor Tree for ${value}:\n ${tree.toString()}`);
});
