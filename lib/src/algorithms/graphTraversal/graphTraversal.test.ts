import breadthFirstSearch from "./breadthFirstSearch";
import depthFirstSearch from "./depthFirstSearch";
import { Graph, createInitialState, addBidirectionalEdge } from "../../dataStructures/graph/graphReducer";
import createTestGraph from "./createTestGraph";

function checkTraversalContainsEverythingOnce<T>(
  graph: Graph,
  items: T[]
) {
  // Should visit all nodes exactly once
  const itemsInSet = new Set(items);
  const verticesInSet = new Set(graph.vertices);
  expect(itemsInSet.size).toEqual(items.length);
  expect(itemsInSet).toEqual(verticesInSet);
}

test("Graph - Breadth First Search", () => {
  const myGraph = createTestGraph();

  const items: string[] = [];
  breadthFirstSearch(myGraph, "S", (d) => items.push(d));
  checkTraversalContainsEverythingOnce(myGraph, items);

  expect(items.length).toBe(myGraph.vertices.length);

  const directlyEdgeed = ["A", "B", "C"];
  const transitivelyEdgeed = ["D", "E", "F", "G"];
  directlyEdgeed.forEach((i) =>
    transitivelyEdgeed.forEach((t) => {
      const indexOfI = items.indexOf(i);
      const indexOfT = items.indexOf(t);
      expect(indexOfI).not.toBe(-1);
      expect(indexOfT).not.toBe(-1);
      expect(indexOfI).toBeLessThan(indexOfT);
    })
  );
});

test("Graph - DFS Very Simple", () => {
  const myGraph: Graph = [{ from: "A", to: "B" }]
    .reduce((acc, { from, to }) => addBidirectionalEdge(acc, from, to), createInitialState());


  const items: string[] = [];
  depthFirstSearch(myGraph, "A", (x) => items.push(x));

  checkTraversalContainsEverythingOnce(myGraph, items);
});

test("Graph - Depth First Search", () => {
  const myGraph = createTestGraph();

  const items: string[] = [];
  depthFirstSearch(myGraph, "S", (d) => items.push(d));
  checkTraversalContainsEverythingOnce(myGraph, items);

  // Should visit all nodes exactly once
  const itemsInSet = new Set(items);
  const verticesInSet = new Set(myGraph.vertices);
  expect(itemsInSet.size).toEqual(items.length);
  expect(itemsInSet).toEqual(verticesInSet);

  const directRelatives = [
    { direct: "C", transitive: "F" },
    { direct: "A", transitive: "D" },
    { direct: "B", transitive: "E" },
  ].map(({ direct, transitive }) => ({
    direct,
    transitive,
    indexOfDirect: items.indexOf(direct),
    indexOfTransitive: items.indexOf(transitive),
  }));
  directRelatives.sort((a, b) => a.indexOfDirect - b.indexOfDirect);

  // Just check we have all the right bits
  expect(directRelatives.length).toBe(3);

  // This is the common transitive link from all 3 start points
  const indexOfG = items.indexOf("G");

  // For all but the first one
  directRelatives
    .filter((_, i) => i !== 0)
    .forEach(({ indexOfDirect, indexOfTransitive }) => {
      expect(indexOfDirect).toBeGreaterThan(directRelatives[0].indexOfDirect);
      expect(indexOfTransitive).toBeGreaterThan(
        directRelatives[0].indexOfDirect
      );

      // The first direct link will go through G and then back up to this direct link
      expect(indexOfDirect).toBeGreaterThan(indexOfG);
      expect(indexOfTransitive).toBeGreaterThan(indexOfG);

      // The transitive dep will have been hoovered up already
      expect(indexOfTransitive).toBeLessThan(indexOfDirect);
    });
});
