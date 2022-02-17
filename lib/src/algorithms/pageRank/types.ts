import Graph from "dataStructures/graph/Graph";
import { AnyGraphVertex } from "types";

export interface PageRanks {
  [s: string]: number;
}
export interface PageRankState<T extends AnyGraphVertex> {
  iterations: number;
  graph: Graph<T>;
  dampingFactor: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
}
