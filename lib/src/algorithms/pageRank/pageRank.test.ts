import {
  initialisePageRank,
  iteratePageRank,
  extractPageRank,
} from "./pageRank";
import { addUnidirectionalEdge, createInitialState } from "../../dataStructures/graph/graphReducer";
import { PageRankState } from "./types";
import percentageError from "../../maths/percentageError";

test("Page Rank", () => {
  const graph = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'A' },
    { from: 'B', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'D', to: 'A' },
  ].reduce((acc, { from, to }) => addUnidirectionalEdge(acc, from, to), createInitialState());

  let pageRankState: PageRankState = initialisePageRank(
    graph
  );

  // Iterate the rank 5 times
  for (let i = 0; i < 5; i++) {
    pageRankState = iteratePageRank(pageRankState);
  }

  const pageRankA = extractPageRank(pageRankState, "A");
  const pageRankB = extractPageRank(pageRankState, "B");
  const pageRankC = extractPageRank(pageRankState, "C");
  const pageRankD = extractPageRank(pageRankState, "D");

  expect(percentageError(pageRankA, 0.67)).toBeLessThan(5);
  expect(percentageError(pageRankB, 0.72)).toBeLessThan(5);
  expect(percentageError(pageRankC, 0.35)).toBeLessThan(5);
  expect(percentageError(pageRankD, 0.35)).toBeLessThan(5);
});
