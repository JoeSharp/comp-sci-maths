import { Point } from "../../../p5/Boid/types";
import { GraphState, Edge } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

export interface SavedGraphState {
  [name: string]: {
    vertices: string[];
    edges: Edge<string>[];
  };
}

export interface GraphsById {
  [name: string]: GraphState<string>;
}

export interface PositionByVertex {
  [key: string]: Point;
}

export interface PositionsForGraphName {
  [name: string]: PositionByVertex;
}
