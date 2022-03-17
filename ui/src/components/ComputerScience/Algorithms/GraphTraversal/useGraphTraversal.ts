import React from "react";
import { depthFirstSearch, breadthFirstSearch } from "@comp-sci-maths/lib/dist/";
import { VisitFunction } from "@comp-sci-maths/lib/dist/types";

import { BREADTH_FIRST_SEARCH, DEPTH_FIRST_SEARCH } from "./common";
import { Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

interface Props {
  algorithmName: string;
  graph: Graph<string>;
  startVertex?: string;
}

export interface UseGraphTraversal {
  visitedItems: string[];
}

const useGraphTraversal = ({
  algorithmName,
  graph,
  startVertex,
}: Props): UseGraphTraversal => {
  const visitedItems: string[] = React.useMemo(() => {
    const items: string[] = [];
    const visit: VisitFunction<string> = (d) => items.push(d);

    if (startVertex !== undefined) {
      switch (algorithmName) {
        case BREADTH_FIRST_SEARCH:
          breadthFirstSearch(graph, startVertex.key, visit);
          break;
        case DEPTH_FIRST_SEARCH:
          depthFirstSearch(graph, startVertex.key, visit);
          break;
      }
    }

    return items;
  }, [algorithmName, graph, startVertex]);

  return { visitedItems };
};

export default useGraphTraversal;
