import { Point } from "../../../p5/Boid/types";
import { Graph, Edge } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

export interface SavedGraphState {
  [name: string]: {
    vertices: string[];
    edges: Edge[];
  };
}

export interface GraphsById {
  [name: string]: Graph<string>;
}

export interface PositionByVertex {
  [key: string]: Point;
}

export interface PositionsForGraphName {
  [name: string]: PositionByVertex;
}
