import sieveOfEratosthenes from "./sieveOfEratosthenes";
import { isDivisibleBy, isPrime } from "./divisibilityRules";
import {
  Graph,
  createInitialState,
  addVertex,
  addUnidirectionalEdge
} from "../../dataStructures/graph/graphReducer";

export function getPrimeFactors(value: number): number[] {
  const factors: number[] = [];

  // Get the list of prime numbers up to the square root of our value
  const primes: number[] = sieveOfEratosthenes(Math.ceil(Math.sqrt(value)));

  let currentValue = value;
  while (!isPrime(currentValue)) {
    const prime = primes.find((p) => isDivisibleBy(currentValue, p));
    if (prime === undefined)
      throw new Error(`Could not find a divisor for ${currentValue}`);
    factors.push(prime);
    currentValue /= prime;
  }

  // Whatever we are left with is a prime
  factors.push(currentValue);

  return factors;
}

export function getPrimeFactorTree(value: number): Graph<number> {
  const primeFactors: number[] = getPrimeFactors(value);
  let graph = createInitialState<number>()

  let k = 0;
  const nextKey = (): string => {
    k += 1;
    return k.toString(10);
  };
  let currentItem = {
    key: nextKey(),
    value,
  };
  graph = addVertex(graph, currentItem.key, currentItem.value);
  primeFactors
    .slice(0, primeFactors.length - 1) // Skip the last one
    .forEach((factor) => {
      const newItem = {
        key: nextKey(),
        value: currentItem.value / factor,
      };
      const otherNewItem = {
        key: nextKey(),
        value: factor,
      }
      graph = addVertex(graph, newItem.key, newItem.value);
      graph = addVertex(graph, otherNewItem.key, otherNewItem.value);
      graph = addUnidirectionalEdge(graph, currentItem.key, otherNewItem.key);
      graph = addUnidirectionalEdge(graph, currentItem.key, newItem.key);
      currentItem = newItem;
    });

  return graph;
}
