import { PositionByVertex } from "../types";
import { createSimpleStringDataItem } from "../../../../p5/Boid/DataItemBoid";
import { StringDataItem } from "../../../../p5/Boid/types";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
const createDataItem = (content: string) =>
  createSimpleStringDataItem("mc-1", content);

const VERTEX_A = createDataItem("A");
const VERTEX_B = createDataItem("B");
const VERTEX_M1_1 = createDataItem("M1_1");
const VERTEX_M1_2 = createDataItem("M1_2");
const VERTEX_M1_3 = createDataItem("M1_3");
const VERTEX_M1_4 = createDataItem("M1_4");
const VERTEX_M1_5 = createDataItem("M1_5");

const graph = () => {
  return new Graph<StringDataItem>()
    .addBiDirectionalEdge(VERTEX_M1_1, VERTEX_M1_2, 1)
    .addBiDirectionalEdge(VERTEX_M1_2, VERTEX_M1_3, 1)
    .addBiDirectionalEdge(VERTEX_M1_3, VERTEX_M1_4, 1)
    .addBiDirectionalEdge(VERTEX_M1_4, VERTEX_M1_5, 1)
    .addBiDirectionalEdge(VERTEX_A, VERTEX_M1_3, 10)
    .addBiDirectionalEdge(VERTEX_M1_3, VERTEX_B, 10);
};
export default graph;

export const vertexPositions: PositionByVertex = {
  "mc-1-A": {
    x: 192,
    y: 199,
  },
  "mc-1-M1_2": {
    x: 316,
    y: 183,
  },
  "mc-1-M1_1": { x: 361, y: 249 },
  "mc-1-M1_3": {
    x: 262,
    y: 126,
  },
  "mc-1-M1_4": {
    x: 201,
    y: 75,
  },
  "mc-1-M1_5": { x: 116, y: 47 },
  "mc-1-B": {
    x: 325,
    y: 60,
  },
};
