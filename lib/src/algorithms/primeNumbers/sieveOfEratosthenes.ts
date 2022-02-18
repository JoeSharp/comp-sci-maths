import { emptyObserver } from "../../common";

export interface MarkedNumber {
  value: number;
  divisibleBy: number[];
}

export interface PrimeCallbackArgs {
  tickedOff: number[];
  p: number;
}
export type PrimeCallback = (args: PrimeCallbackArgs) => void;

/**
 * Given a populated list of marked numbers, extracts the prime numbers.
 * @param markedNumbers The array of all the numbers, with their marking details.
 */
export const getPrimeNumbers = (markedNumbers: MarkedNumber[]): number[] =>
  markedNumbers
    .filter(({ divisibleBy }) => divisibleBy.length === 0)
    .map(({ value }) => value);

/**
 * Runs the sieve of eratosthenes algorithm up to the given limit.
 *
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 *
 * @param limit The limit to work up to.
 * @returns The list of prime numbers between 1 and the limit.
 */
function sieveOfEratosthenes(
  limit: number,
  callback: PrimeCallback = emptyObserver
): number[] {
  const markedNumbers: MarkedNumber[] = [];

  // 1. Create a list of consecutive integers from 2 through n: (2, 3, 4, ..., n).
  for (let value = 2; value <= limit; value++) {
    markedNumbers.push({ value, divisibleBy: [] });
  }

  // 2. Initially, let p equal 2, the smallest prime number.
  let p: number = 2;
  let pMultiple: number = 2 * p;

  while (true) {
    // 3 . Enumerate the multiples of p by counting in increments of p from 2p to n, and mark them in the list (these will be 2p, 3p, 4p, ...; the p itself should not be marked).
    while (pMultiple <= limit) {
      const index = pMultiple - 2; // adjust to get the array position
      markedNumbers[index].divisibleBy.push(p);

      pMultiple += p;
    }

    // Callback after we have reached the last number
    callback({
      tickedOff: markedNumbers
        .filter(({ divisibleBy }) => divisibleBy.includes(p))
        .map(({ value }) => value),
      p,
    });

    // 4. Find the smallest number in the list greater than p that is not marked. If there was no such number, stop.
    // Otherwise, let p now equal this new number (which is the next prime), and repeat from step 3.
    const nextP = markedNumbers.find(
      ({ value, divisibleBy }) => value > p && divisibleBy.length === 0
    );

    if (!!nextP) {
      p = nextP.value;

      // As a refinement, it is sufficient to mark the numbers in step 3 starting from p2,
      // as all the smaller multiples of p will have already been marked at that point.
      pMultiple = p * p;
    } else {
      break;
    }
  }

  // 5. When the algorithm terminates, the numbers remaining not marked in the list are all the primes below n.
  return getPrimeNumbers(markedNumbers);
}

export default sieveOfEratosthenes;
