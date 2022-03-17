import { ShortestPathTree, ObserverArgs } from "./types";
import { Graph, createInitialState } from "../../dataStructures/graph/graphReducer";

import { dijkstras, getPathTo } from "./dijkstras";

test("Routing Algorithms - Dead End", () => {
  const myGraph: Graph = {
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

  const myGraph: Graph = {
    vertices: ["S", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
    edges: [
      { from: "S", to: "A", weight: 7 },
      { from: "S", to: "B", weight: 2 },
      { from: "S", to: "C", weight: 3 },
      { from: "A", to: "D", weight: 4 },
      { from: "A", to: "B", weight: 3 },
      { from: "B", to: "D", weight: 4 },
      { from: "B", to: "H", weight: 1 },
      { from: "C", to: "L", weight: 2 },
      { from: "D", to: "F", weight: 5 },
      { from: "E", to: "K", weight: 5 },
      { from: "E", to: "G", weight: 2 },
      { from: "F", to: "H", weight: 3 },
      { from: "G", to: "H", weight: 2 },
      { from: "I", to: "L", weight: 4 },
      { from: "I", to: "K", weight: 4 },
      { from: "J", to: "L", weight: 4 },
      { from: "J", to: "K", weight: 4 }
    ]
  }

  const observations: ObserverArgs[] = [];
  const shortestPathTreeStoE: ShortestPathTree = dijkstras({
    graph: myGraph,
    sourceNode: "S",
    destinationNode: "E",
    getHeuristicCost: (d) => euclideanDistances[d],
    observer: (d) => observations.push(d),
  });

  expect(observations.length).toBeGreaterThan(1);

  const pathStoE: string[] = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeStoE,
    node: "E",
  });
  expect(pathStoE).toEqual(["S", "B", "H", "G", "E"]);
});

// https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
test("Routing Algorithms - Dijkstra", () => {
  const myGraph: Graph = {
    vertices: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    edges: [
      { from: "A", to: "B", weight: 4 },
      { from: "A", to: "H", weight: 8 },
      { from: "B", to: "C", weight: 8 },
      { from: "B", to: "H", weight: 11 },
      { from: "C", to: "D", weight: 7 },
      { from: "C", to: "I", weight: 2 },
      { from: "C", to: "F", weight: 4 },
      { from: "D", to: "E", weight: 9 },
      { from: "D", to: "F", weight: 14 },
      { from: "E", to: "F", weight: 10 },
      { from: "F", to: "G", weight: 2 },
      { from: "G", to: "H", weight: 1 },
      { from: "G", to: "I", weight: 6 },
      { from: "H", to: "I", weight: 7 },
    ]
  }

  const viaNode = "A";
  const shortestPathTreeAll: ShortestPathTree = dijkstras({
    graph: myGraph,
    sourceNode: viaNode,
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
      sourceNode: viaNode,
      destinationNode: "E",
    } // this time specifying the toNode
  );
  const pathTo4only = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTree4only,
    node: "E",
  });
  expect(pathTo4only).toEqual(["A", "H", "G", "F", "E"]);
});
