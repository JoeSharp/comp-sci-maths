import { createSimpleStringDataItem } from "../../../../p5/Boid/DataItemBoid";
import Graph from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "../../../../p5/Boid/types";
import { PositionByVertex } from "../types";

const createDataItem = (content: string) =>
  createSimpleStringDataItem("csg-1", content);

const VERTEX_A = createDataItem("A");
const VERTEX_B = createDataItem("B");
const VERTEX_C = createDataItem("C");
const VERTEX_D = createDataItem("D");
const VERTEX_E = createDataItem("E");
const VERTEX_F = createDataItem("F");
const VERTEX_G = createDataItem("G");
const VERTEX_H = createDataItem("H");
const VERTEX_I = createDataItem("I");
const VERTEX_J = createDataItem("J");
const VERTEX_K = createDataItem("K");
const VERTEX_L = createDataItem("L");
const VERTEX_S = createDataItem("S");

const graph = () => {
  return new Graph<StringDataItem>()
    .addBiDirectionalEdge(VERTEX_S, VERTEX_A, 7)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_B, 2)
    .addBiDirectionalEdge(VERTEX_S, VERTEX_C, 3)
    .addBiDirectionalEdge(VERTEX_A, VERTEX_D, 4)
    .addBiDirectionalEdge(VERTEX_A, VERTEX_B, 3)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_D, 4)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_H, 1)
    .addBiDirectionalEdge(VERTEX_C, VERTEX_L, 2)
    .addBiDirectionalEdge(VERTEX_D, VERTEX_F, 5)
    .addBiDirectionalEdge(VERTEX_E, VERTEX_K, 5)
    .addBiDirectionalEdge(VERTEX_E, VERTEX_G, 2)
    .addBiDirectionalEdge(VERTEX_F, VERTEX_H, 3)
    .addBiDirectionalEdge(VERTEX_G, VERTEX_H, 2)
    .addBiDirectionalEdge(VERTEX_I, VERTEX_L, 4)
    .addBiDirectionalEdge(VERTEX_I, VERTEX_K, 4)
    .addBiDirectionalEdge(VERTEX_J, VERTEX_L, 4)
    .addBiDirectionalEdge(VERTEX_J, VERTEX_K, 4);
};

export default graph;

export const vertexPositions: PositionByVertex = {
  "csg-1-S": { x: 153, y: 65 },
  "csg-1-A": { x: 229, y: 52 },
  "csg-1-B": { x: 214, y: 140 },
  "csg-1-C": { x: 77, y: 84 },
  "csg-1-D": { x: 307, y: 62 },
  "csg-1-H": { x: 309, y: 172 },
  "csg-1-L": { x: 70, y: 164 },
  "csg-1-F": { x: 364, y: 115 },
  "csg-1-E": { x: 236, y: 272 },
  "csg-1-K": { x: 157, y: 263 },
  "csg-1-G": { x: 310, y: 250 },
  "csg-1-I": { x: 81, y: 243 },
  "csg-1-J": { x: 160, y: 188 },
};
