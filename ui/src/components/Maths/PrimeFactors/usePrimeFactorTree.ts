import React from "react";
import {
  getPrimeFactors,
  getPrimeFactorTree,
} from "@comp-sci-maths/lib/dist/algorithms/primeNumbers/primeFactors";
import Graph from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";
import { DisplayDataItem } from "../../p5/Boid/types";
import { NumberGraphVertex } from "@comp-sci-maths/lib/dist/types";

export type PrimeFactorDataItem = DisplayDataItem<NumberGraphVertex>;

interface UsePrimeFactorTree {
  primeFactors: number[];
  primeFactorTree: Graph<PrimeFactorDataItem>;
}

const getDataItem = (p: NumberGraphVertex): PrimeFactorDataItem => ({
  key: p.key,
  label: p.value.toString(10),
  value: p,
});

const usePrimeFactorTree = (value: number): UsePrimeFactorTree =>
  React.useMemo(() => {
    const primeFactors = getPrimeFactors(value);
    const rawPrimeFactorTree = getPrimeFactorTree(value);

    const primeFactorTree = new Graph<PrimeFactorDataItem>();

    // Convert to data items
    rawPrimeFactorTree.vertices.forEach((v) => {
      const dataItem: PrimeFactorDataItem = getDataItem(v);
      primeFactorTree.addVertex(dataItem);

      rawPrimeFactorTree.getOutgoing(v.key).forEach((edge) => {
        primeFactorTree.addUnidirectionalEdge(
          dataItem,
          getDataItem(edge.to),
          edge.weight
        );
      });
    });

    return {
      primeFactors,
      primeFactorTree,
    };
  }, [value]);

export default usePrimeFactorTree;