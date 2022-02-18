import { StringDataItem, Point } from "../../../p5/Boid/types";
import Graph, {
  Edge,
} from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";

export interface SavedGraphState {
  [name: string]: {
    vertices: StringDataItem[];
    edges: Edge<StringDataItem>[];
  };
}

export interface GraphsById {
  [name: string]: Graph<StringDataItem>;
}

export interface PositionByVertex {
  [key: string]: Point;
}

export interface PositionsForGraphName {
  [name: string]: PositionByVertex;
}
