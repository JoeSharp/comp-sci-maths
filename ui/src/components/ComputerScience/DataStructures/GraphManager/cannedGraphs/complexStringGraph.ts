import {
  Graph,
  createInitialState,
  addBidirectionalEdge,
  Edge
} from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { PositionByVertex } from "../types";

const graph = (): Graph<string> => {
  return ([
    { from: "S", to: "A", weight: 7 },
    { from: "S", to: "B", weight: 2 },
    { from: "S", to: "C", weight: 3 },
    { from: "A", to: "D", weight: 4 },
    { from: "A", to: "B", weight: 3 },
    { from: "B", to: "D", weight: 4 },
    { from: "B", to: "H", weight: 1 },
    { from: "C", to: "L", weight: 2 },
    { from: "D", to: "F", weight: 5 },
    { from: "E", to: "K", weight: 5 },
    { from: "E", to: "G", weight: 2 },
    { from: "F", to: "H", weight: 3 },
    { from: "G", to: "H", weight: 2 },
    { from: "I", to: "L", weight: 4 },
    { from: "I", to: "K", weight: 4 },
    { from: "J", to: "L", weight: 4 },
    { from: "J", to: "K", weight: 4 }
  ] as Edge[]).reduce((acc, { from, to, weight }) => addBidirectionalEdge(acc, from, to, weight), createInitialState<string>());
};

export default graph;

export const vertexPositions: PositionByVertex = {
  "S": { x: 153, y: 65 },
  "A": { x: 229, y: 52 },
  "B": { x: 214, y: 140 },
  "C": { x: 77, y: 84 },
  "D": { x: 307, y: 62 },
  "H": { x: 309, y: 172 },
  "L": { x: 70, y: 164 },
  "F": { x: 364, y: 115 },
  "E": { x: 236, y: 272 },
  "K": { x: 157, y: 263 },
  "G": { x: 310, y: 250 },
  "I": { x: 81, y: 243 },
  "J": { x: 160, y: 188 },
};
