import { Graph } from "../../dataStructures/graph/graphReducer";

export interface PageRanks {
  [s: string]: number;
}
export interface PageRankState {
  iterations: number;
  graph: Graph;
  dampingFactor: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
}
