import Graph from "dataStructures/graph/Graph";
import { VisitFunction, AnyGraphVertex } from "types";

export type GraphTraversal<T extends AnyGraphVertex> = (
  graph: Graph<T>,
  startVertex: T,
  visit: VisitFunction<T>
) => void;
