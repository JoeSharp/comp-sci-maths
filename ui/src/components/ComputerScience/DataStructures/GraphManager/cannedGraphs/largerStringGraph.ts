import {
  GraphState,
  createInitialState,
  graphAddBidirectionalEdge,
  Edge
} from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { PositionByVertex } from "../types";

const graph = (): GraphState<string> => {
  return ([
    { from: "S", to: "A" },
    { from: "S", to: "B" },
    { from: "S", to: "C" },
    { from: "A", to: "D" },
    { from: "D", to: "G" },
    { from: "B", to: "E" },
    { from: "E", to: "G" },
    { from: "C", to: "F" },
    { from: "F", to: "G" }
  ] as Edge<string>[]).reduce((acc, { from, to, weight }) => graphAddBidirectionalEdge(acc, from, to, weight), createInitialState<string>());
};

export default graph;

export const vertexPositions: PositionByVertex = {
  "S": { x: 60, y: 35 },
  "A": { x: 57, y: 142 },
  "B": { x: 196, y: 35 },
  "C": { x: 127, y: 97 },
  "D": { x: 113, y: 227 },
  "G": { x: 208, y: 214 },
  "E": { x: 280, y: 111 },
  "F": { x: 209, y: 126 },
};
