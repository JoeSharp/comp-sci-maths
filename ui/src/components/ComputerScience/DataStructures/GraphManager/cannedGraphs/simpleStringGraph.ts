import { createSimpleStringDataItem } from "../../../../p5/Boid/DataItemBoid";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "../../../../p5/Boid/types";
import { PositionByVertex } from "../types";

const createDataItem = (content: string) =>
  createSimpleStringDataItem("sg-1", content);

const VERTEX_A = createDataItem("A");
const VERTEX_B = createDataItem("B");
const VERTEX_C = createDataItem("C");
const VERTEX_D = createDataItem("D");

const graph = () => {
  return new Graph<StringDataItem>()
    .addBiDirectionalEdge(VERTEX_A, VERTEX_B)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_A)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_C)
    .addBiDirectionalEdge(VERTEX_B, VERTEX_D)
    .addBiDirectionalEdge(VERTEX_D, VERTEX_A);
};
export default graph;

export const vertexPositions: PositionByVertex = {
  "sg-1-A": { x: 166, y: 38 },
  "sg-1-B": { x: 211, y: 102 },
  "sg-1-C": { x: 93, y: 141 },
  "sg-1-D": { x: 279, y: 63 },
};
