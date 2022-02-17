import { createSimpleStringDataItem } from "../../../../p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "../../../../p5/Boid/types";
import { PositionByVertex } from "../types";

const createDataItem = (content: string) =>
  createSimpleStringDataItem("lsg-1", content);

const VERTEX_A = createDataItem("A");
const VERTEX_B = createDataItem("B");
const VERTEX_C = createDataItem("C");
const VERTEX_D = createDataItem("D");
const VERTEX_E = createDataItem("E");
const VERTEX_F = createDataItem("F");
const VERTEX_G = createDataItem("G");
const VERTEX_S = createDataItem("S");

const graph = () => {
  return new Graph<StringDataItem>()
    .addBiDirectionalEdge(VERTEX_S, VERTEX_A)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_B)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_C)
    .addBiDirectionalEdge(VERTEX_A, VERTEX_D)
    .addBiDirectionalEdge(VERTEX_D, VERTEX_G)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_E)
    .addBiDirectionalEdge(VERTEX_E, VERTEX_G)
    .addBiDirectionalEdge(VERTEX_C, VERTEX_F)
    .addBiDirectionalEdge(VERTEX_F, VERTEX_G);
};
export default graph;

export const vertexPositions: PositionByVertex = {
  "lsg-1-S": { x: 60, y: 35 },
  "lsg-1-A": { x: 57, y: 142 },
  "lsg-1-B": { x: 196, y: 35 },
  "lsg-1-C": { x: 127, y: 97 },
  "lsg-1-D": { x: 113, y: 227 },
  "lsg-1-G": { x: 208, y: 214 },
  "lsg-1-E": { x: 280, y: 111 },
  "lsg-1-F": { x: 209, y: 126 },
};
