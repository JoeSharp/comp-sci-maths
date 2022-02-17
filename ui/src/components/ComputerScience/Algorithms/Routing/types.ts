import p5 from "p5";

export interface HeuristicCost {
  vertexLabel: string;
  position: p5.Vector;
  distance: number;
}

export interface HeuristicCostById {
  [id: string]: HeuristicCost;
}
