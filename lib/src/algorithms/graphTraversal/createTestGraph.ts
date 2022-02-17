import Graph from "dataStructures/graph/Graph";
import { StringGraphVertex } from "types";
import { getStringVertex } from "common";

export const vertexA = getStringVertex("A");
export const vertexB = getStringVertex("B");
export const vertexC = getStringVertex("C");
export const vertexD = getStringVertex("D");
export const vertexE = getStringVertex("E");
export const vertexF = getStringVertex("F");
export const vertexG = getStringVertex("G");
export const vertexS = getStringVertex("S");

const createTestGraph = () => {
    return new Graph<StringGraphVertex>()
        .addBiDirectionalEdge(vertexS, vertexA)
        .addBiDirectionalEdge(vertexS, vertexB)
        .addBiDirectionalEdge(vertexS, vertexC)
        .addBiDirectionalEdge(vertexA, vertexD)
        .addBiDirectionalEdge(vertexD, vertexG)
        .addBiDirectionalEdge(vertexB, vertexE)
        .addBiDirectionalEdge(vertexE, vertexG)
        .addBiDirectionalEdge(vertexC, vertexF)
        .addBiDirectionalEdge(vertexF, vertexG);
}

export default createTestGraph;