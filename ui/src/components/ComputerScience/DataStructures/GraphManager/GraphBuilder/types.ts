import Graph from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";
import { DisplayDataItem } from "../../../../p5/Boid/types";
import { PositionByVertex } from "../types";

export interface GraphSketchConfig<DATA_ITEM extends DisplayDataItem<any>> {
  graph: Graph<DATA_ITEM>;
  vertexPositions: PositionByVertex;
  physicsEnabled: boolean;
}
