import {
  Graph,
  createInitialState,
  graphAddBidirectionalEdge,
  Edge
} from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { PositionByVertex } from "../types";

const graph = (): Graph<string> => {
  return ([
    { from: "M1_1", to: "M1_2", weight: 1 },
    { from: "M1_2", to: "M1_3", weight: 1 },
    { from: "M1_3", to: "M1_4", weight: 1 },
    { from: "M1_4", to: "M1_5", weight: 1 },
    { from: "A", to: "M1_3", weight: 10 },
    { from: "M1_3", to: "B", weight: 10 }
  ] as Edge<string>[]).reduce((acc, { from, to, weight }) => graphAddBidirectionalEdge(acc, from, to, weight), createInitialState<string>());
};

export default graph;

export const vertexPositions: PositionByVertex = {
  "A": {
    x: 192,
    y: 199,
  },
  "M1_2": {
    x: 316,
    y: 183,
  },
  "M1_1": { x: 361, y: 249 },
  "M1_3": {
    x: 262,
    y: 126,
  },
  "M1_4": {
    x: 201,
    y: 75,
  },
  "M1_5": { x: 116, y: 47 },
  "B": {
    x: 325,
    y: 60,
  },
};
