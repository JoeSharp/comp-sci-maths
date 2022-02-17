import { simpleLogger } from "common";
import { StringReporter } from "types";
import { getPrimeFactorTree } from "./primeFactors";

const reportLog: StringReporter = (s) => simpleLogger.info(s);

const values: number[] = [234, 673937, 10912374];

reportLog("Testing Prime Factor Trees");
values.forEach((value) => {
  const tree = getPrimeFactorTree(value);
  simpleLogger.info(`Prime Factor Tree for ${value}:\n ${tree.toString()}`);
});
