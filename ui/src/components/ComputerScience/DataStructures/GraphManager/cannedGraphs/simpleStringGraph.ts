import {
  Graph,
  createInitialState,
  graphAddBidirectionalEdge,
  Edge
} from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { PositionByVertex } from "../types";

const graph = (): Graph<string> => {
  return ([
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "B", to: "D" },
    { from: "D", to: "A" }
  ] as Edge<string>[]).reduce((acc, { from, to, weight }) => graphAddBidirectionalEdge(acc, from, to, weight), createInitialState<string>());
};

export default graph;

export const vertexPositions: PositionByVertex = {
  "A": { x: 166, y: 38 },
  "B": { x: 211, y: 102 },
  "C": { x: 93, y: 141 },
  "D": { x: 279, y: 63 },
};
