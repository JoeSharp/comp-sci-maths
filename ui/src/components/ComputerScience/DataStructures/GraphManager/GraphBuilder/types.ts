import { GraphState } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { PositionByVertex } from "../types";

export interface GraphSketchConfig {
  graph: GraphState<string>;
  vertexPositions: PositionByVertex;
  physicsEnabled: boolean;
}
