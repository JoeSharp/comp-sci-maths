import React from "react";
import {
  getPrimeFactors,
  getPrimeFactorTree,
} from "@comp-sci-maths/lib/dist/maths/primeNumbers/primeFactors";
import {
  Graph,
  createInitialState,
  addVertex,
  getOutgoing,
  addUnidirectionalEdge
} from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

interface UsePrimeFactorTree {
  primeFactors: number[];
  primeFactorTree: Graph<number>;
}

const usePrimeFactorTree = (value: number): UsePrimeFactorTree =>
  React.useMemo(() => {
    const primeFactors = getPrimeFactors(value);
    const rawPrimeFactorTree = getPrimeFactorTree(value);

    let primeFactorTree: Graph<number> = createInitialState();

    // Convert to data items
    rawPrimeFactorTree.vertices.forEach((v) => {
      primeFactorTree = addVertex(primeFactorTree, v);

      getOutgoing(rawPrimeFactorTree, v).forEach((edge) => {
        primeFactorTree = addUnidirectionalEdge(primeFactorTree, v, edge.to, edge.weight);
      });
    });

    return {
      primeFactors,
      primeFactorTree,
    };
  }, [value]);

export default usePrimeFactorTree;