import { ShortestPathTree, ObserverArgs } from "./types";
import { GraphState, createInitialState } from "../../dataStructures/graph/graphReducer";

import { dijkstras, getPathTo } from "./dijkstras";
import { StringGraphVertex } from "../../types";

test("Routing Algorithms - Dead End", () => {
  const myGraph: GraphState = {
    vertices: ["A", "B", "C", "D", "E"],
    edges: [
      { from: "A", to: "B", weight: 1 },
      { from: "B", to: "C", weight: 1 },
      { from: "E", to: "D", weight: 1 }
    ]
  }

  const shortestPathTree = dijkstras({
    graph: myGraph,
    sourceNode: "A",
    destinationNode: "D",
  });

  // Check the unreachable nodes
  ["D", "E"].forEach((u) => {
    expect(shortestPathTree[u].cost).toBe(Infinity);
    expect(shortestPathTree[u].viaNode).toBeUndefined();
  });

  const pathTo = getPathTo({
    graph: myGraph,
    shortestPathTree,
    node: "D",
  });

  // Should be empty with no available path
  expect(pathTo).toStrictEqual([]);
});

// https://youtu.be/ySN5Wnu88nE?t=239
test("Routing Algorithms - A*", () => {
  // The addition that A* has is the use of a heuristic to
  // provide the algorithm with a sense of direction.
  const euclideanDistances: { [n: string]: number } = {
    S: 10,
    A: 9,
    B: 7,
    C: 8,
    D: 8,
    E: 0,
    F: 6,
    G: 3,
    H: 6,
    I: 4,
    J: 4,
    K: 3,
    L: 6,
  };

  const myGraph = new Graph()
    .addBiDirectionalEdge("S", "A", 7)
    .addBiDirectionalEdge("S", "B", 2)
    .addBiDirectionalEdge("S", "C", 3)
    .addBiDirectionalEdge("A", "D", 4)
    .addBiDirectionalEdge("A", "B", 3)
    .addBiDirectionalEdge("B", "D", 4)
    .addBiDirectionalEdge("B", "H", 1)
    .addBiDirectionalEdge("C", "L", 2)
    .addBiDirectionalEdge("D", "F", 5)
    .addBiDirectionalEdge("E", "K", 5)
    .addBiDirectionalEdge("E", "G", 2)
    .addBiDirectionalEdge("F", "H", 3)
    .addBiDirectionalEdge("G", "H", 2)
    .addBiDirectionalEdge("I", "L", 4)
    .addBiDirectionalEdge("I", "K", 4)
    .addBiDirectionalEdge("J", "L", 4)
    .addBiDirectionalEdge("J", "K", 4);

  const observations: ObserverArgs<StringGraphVertex>[] = [];
  const shortestPathTreeStoE: ShortestPathTree = dijkstras({
    graph: myGraph,
    sourceNodeKey: "S",
    destinationNodeKey: "E",
    getHeuristicCost: (d) => euclideanDistances[d],
    observer: (d) => observations.push(d),
  });

  expect(observations.length).toBeGreaterThan(1);

  const pathStoE: StringGraphVertex[] = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeStoE,
    node: "E",
  });
  expect(pathStoE).toEqual(["S", "B", "H", "G", "E"]);
});

// https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
test("Routing Algorithms - Dijkstra", () => {
  const myGraph = new Graph()
    .addBiDirectionalEdge("A", "B", 4)
    .addBiDirectionalEdge("A", "H", 8)
    .addBiDirectionalEdge("B", "C", 8)
    .addBiDirectionalEdge("B", "H", 11)
    .addBiDirectionalEdge("C", "D", 7)
    .addBiDirectionalEdge("C", "I", 2)
    .addBiDirectionalEdge("C", "F", 4)
    .addBiDirectionalEdge("D", "E", 9)
    .addBiDirectionalEdge("D", "F", 14)
    .addBiDirectionalEdge("E", "F", 10)
    .addBiDirectionalEdge("F", "G", 2)
    .addBiDirectionalEdge("G", "H", 1)
    .addBiDirectionalEdge("G", "I", 6)
    .addBiDirectionalEdge("H", "I", 7);

  const viaNode = "A";
  const shortestPathTreeAll: ShortestPathTree = dijkstras({
    graph: myGraph,
    sourceNodeKey: viaNode,
  });
  expect(shortestPathTreeAll).toEqual({
    ["A"]: { cost: 0, viaNode: undefined, priority: Infinity },
    ["B"]: { cost: 4, viaNode: "A", priority: 1 / 4 },
    ["C"]: { cost: 12, viaNode: "B", priority: 1 / 12 },
    ["D"]: { cost: 19, viaNode: "C", priority: 1 / 19 },
    ["E"]: { cost: 21, viaNode: "F", priority: 1 / 21 },
    ["F"]: { cost: 11, viaNode: "G", priority: 1 / 11 },
    ["G"]: { cost: 9, viaNode: "H", priority: 1 / 9 },
    ["H"]: { cost: 8, viaNode: "A", priority: 1 / 8 },
    ["I"]: { cost: 14, viaNode: "C", priority: 1 / 14 },
  });

  const pathTo4 = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeAll,
    node: "E",
  });
  expect(pathTo4).toEqual(["A", "H", "G", "F", "E"]);

  const pathTo3 = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeAll,
    node: "D",
  });
  expect(pathTo3).toEqual(["A", "B", "C", "D"]);

  const pathTo8 = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeAll,
    node: "I",
  });
  expect(pathTo8).toEqual(["A", "B", "C", "I"]);

  // Do the same thing again, but only find the route to one node
  // It should come up with the same answer, but will make no attempt to route 'every node'
  const shortestPathTree4only: ShortestPathTree = dijkstras(
    {
      graph: myGraph,
      sourceNodeKey: viaNode,
      destinationNodeKey: "E",
    } // this time specifying the toNode
  );
  const pathTo4only = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTree4only,
    node: "E",
  });
  expect(pathTo4only).toEqual(["A", "H", "G", "F", "E"]);
});
