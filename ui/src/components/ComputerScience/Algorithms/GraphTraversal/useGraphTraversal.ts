import React from "react";
import { depthFirstSearch, breadthFirstSearch } from "@comp-sci-maths/lib/dist/";
import { VisitFunction, StringGraphVertex } from "@comp-sci-maths/lib/dist/types";

import { BREADTH_FIRST_SEARCH, DEPTH_FIRST_SEARCH } from "./common";
import Graph from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";

interface Props {
  algorithmName: string;
  graph: Graph<StringGraphVertex>;
  startVertex?: StringGraphVertex;
}

export interface UseGraphTraversal {
  visitedItems: StringGraphVertex[];
}

const useGraphTraversal = ({
  algorithmName,
  graph,
  startVertex,
}: Props): UseGraphTraversal => {
  const visitedItems: StringGraphVertex[] = React.useMemo(() => {
    const items: StringGraphVertex[] = [];
    const visit: VisitFunction<StringGraphVertex> = (d) => items.push(d);

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
