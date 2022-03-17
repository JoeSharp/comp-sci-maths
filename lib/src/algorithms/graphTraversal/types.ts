import { Graph } from "../../dataStructures/graph/graphReducer";
import { VisitFunction } from "../../types";

export type GraphTraversal = (
  graph: Graph,
  startVertex: string,
  visit: VisitFunction<string>
) => void;
