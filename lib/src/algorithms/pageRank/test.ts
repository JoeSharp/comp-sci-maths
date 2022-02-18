import {
  initialisePageRank,
  iteratePageRank,
  extractPageRank,
} from "./pageRank";
import Graph from "../../dataStructures/graph/Graph";
import { PageRankState } from "./types";
import { StringGraphVertex } from "../../types";
import { getStringVertex } from "../../common";
import percentageError from "../../maths/percentageError";

test("Page Rank", () => {
  const vertexA = getStringVertex("A");
  const vertexB = getStringVertex("B");
  const vertexC = getStringVertex("C");
  const vertexD = getStringVertex("D");

  const graph = new Graph()
    .addUnidirectionalEdge(vertexA, vertexB)
    .addUnidirectionalEdge(vertexB, vertexA)
    .addUnidirectionalEdge(vertexB, vertexC)
    .addUnidirectionalEdge(vertexB, vertexD)
    .addUnidirectionalEdge(vertexD, vertexA);

  let pageRankState: PageRankState<StringGraphVertex> = initialisePageRank(
    graph
  );

  // Iterate the rank 5 times
  for (let i = 0; i < 5; i++) {
    pageRankState = iteratePageRank(pageRankState);
  }

  const pageRankA = extractPageRank(pageRankState, vertexA.key);
  const pageRankB = extractPageRank(pageRankState, vertexB.key);
  const pageRankC = extractPageRank(pageRankState, vertexC.key);
  const pageRankD = extractPageRank(pageRankState, vertexD.key);

  expect(percentageError(pageRankA, 0.67)).toBeLessThan(5);
  expect(percentageError(pageRankB, 0.72)).toBeLessThan(5);
  expect(percentageError(pageRankC, 0.35)).toBeLessThan(5);
  expect(percentageError(pageRankD, 0.35)).toBeLessThan(5);
});
