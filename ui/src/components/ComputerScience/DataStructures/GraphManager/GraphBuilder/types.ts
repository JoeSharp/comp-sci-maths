import { Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { PositionByVertex } from "../types";

export interface GraphSketchConfig {
  graph: Graph<string>;
  vertexPositions: PositionByVertex;
  physicsEnabled: boolean;
}
