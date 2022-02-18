import breadthFirstSearch from "./breadthFirstSearch";
import depthFirstSearch from "./depthFirstSearch";
import Graph from "../../dataStructures/graph/Graph";
import SimpleStringGraph from "../../dataStructures/graph/SimpleStringGraph";
import { AnyGraphVertex, StringGraphVertex } from "../../types";
import createTestGraph, { vertexA, vertexB, vertexC, vertexD, vertexE, vertexF, vertexG } from "./createTestGraph";

function checkTraversalContainsEverythingOnce<T extends AnyGraphVertex>(
  graph: Graph<T>,
  items: T[]
) {
  // Should visit all nodes exactly once
  const itemsInSet = new Set(items.map((x) => x.value));
  const verticesInSet = new Set(graph.vertices.map((x) => x.value));
  expect(itemsInSet.size).toEqual(items.length);
  expect(itemsInSet).toEqual(verticesInSet);
}

test("Graph - Breadth First Search", () => {
  const myGraph = createTestGraph();

  const items: StringGraphVertex[] = [];
  breadthFirstSearch(myGraph, "S", (d) => items.push(d));
  checkTraversalContainsEverythingOnce(myGraph, items);

  expect(items.length).toBe(myGraph.vertices.length);

  const directlyEdgeed = [vertexA, vertexB, vertexC];
  const transitivelyEdgeed = [vertexD, vertexE, vertexF, vertexG];
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
  const myGraph: SimpleStringGraph = new SimpleStringGraph();
  myGraph.addBiDirectionalEdge(vertexA, vertexB);

  const items: StringGraphVertex[] = [];
  depthFirstSearch(myGraph, "A", (x) => items.push(x));

  checkTraversalContainsEverythingOnce(myGraph, items);
});

test("Graph - Depth First Search", () => {
  const myGraph = createTestGraph();

  const items: StringGraphVertex[] = [];
  depthFirstSearch(myGraph, "S", (d) => items.push(d));
  checkTraversalContainsEverythingOnce(myGraph, items);

  // Should visit all nodes exactly once
  const itemsInSet = new Set(items);
  const verticesInSet = new Set(myGraph.vertices);
  expect(itemsInSet.size).toEqual(items.length);
  expect(itemsInSet).toEqual(verticesInSet);

  const directRelatives = [
    { direct: vertexC, transitive: vertexF },
    { direct: vertexA, transitive: vertexD },
    { direct: vertexB, transitive: vertexE },
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
  const indexOfG = items.indexOf(vertexG);

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
