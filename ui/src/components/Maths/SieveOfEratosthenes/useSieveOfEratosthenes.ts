import React from "react";

import { cloneDeep } from "lodash";

import sieveOfEratosthenes, {
  PrimeCallbackArgs,
  PrimeCallback,
} from "comp-sci-maths-lib/dist/algorithms/primeNumbers/sieveOfEratosthenes";

interface Props {
  limit: number;
}

interface UseSieveOfEratosthenes {
  iterations: PrimeCallbackArgs[];
  primeNumbers: number[];
}

const useSieveOfEratosthenes = ({ limit }: Props): UseSieveOfEratosthenes =>
  React.useMemo(() => {
    const iterations: PrimeCallbackArgs[] = [];
    const callback: PrimeCallback = (args) => iterations.push(cloneDeep(args));

    const primeNumbers: number[] = sieveOfEratosthenes(limit, callback);

    return {
      iterations,
      primeNumbers,
    };
  }, [limit]);

export default useSieveOfEratosthenes;
