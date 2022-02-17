import { ShortestPathTree, ObserverArgs } from "./types";
import Graph from "dataStructures/graph/Graph";

import { dijstraks, getPathTo } from "./dijkstras";
import { getStringVertex } from "common";
import { StringGraphVertex } from "types";

const vertexA = getStringVertex("A");
const vertexB = getStringVertex("B");
const vertexC = getStringVertex("C");
const vertexD = getStringVertex("D");
const vertexE = getStringVertex("E");
const vertexF = getStringVertex("F");
const vertexG = getStringVertex("G");
const vertexH = getStringVertex("H");
const vertexI = getStringVertex("I");
const vertexJ = getStringVertex("J");
const vertexK = getStringVertex("K");
const vertexL = getStringVertex("L");
const vertexS = getStringVertex("S");

test("Routing Algorithms - Dead End", () => {
  const myGraph = new Graph()
    .addBiDirectionalEdge(vertexA, vertexB)
    .addBiDirectionalEdge(vertexB, vertexC)
    .addBiDirectionalEdge(vertexE, vertexD);

  const shortestPathTree = dijstraks({
    graph: myGraph,
    sourceNodeKey: vertexA.key,
    destinationNodeKey: vertexD.key,
  });

  // Check the unreachable nodes
  [vertexD, vertexE].forEach((u) => {
    expect(shortestPathTree[u.key].cost).toBe(Infinity);
    expect(shortestPathTree[u.key].viaNode).toBeUndefined();
  });

  const pathTo = getPathTo({
    graph: myGraph,
    shortestPathTree,
    node: vertexD,
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
    .addBiDirectionalEdge(vertexS, vertexA, 7)
    .addBiDirectionalEdge(vertexS, vertexB, 2)
    .addBiDirectionalEdge(vertexS, vertexC, 3)
    .addBiDirectionalEdge(vertexA, vertexD, 4)
    .addBiDirectionalEdge(vertexA, vertexB, 3)
    .addBiDirectionalEdge(vertexB, vertexD, 4)
    .addBiDirectionalEdge(vertexB, vertexH, 1)
    .addBiDirectionalEdge(vertexC, vertexL, 2)
    .addBiDirectionalEdge(vertexD, vertexF, 5)
    .addBiDirectionalEdge(vertexE, vertexK, 5)
    .addBiDirectionalEdge(vertexE, vertexG, 2)
    .addBiDirectionalEdge(vertexF, vertexH, 3)
    .addBiDirectionalEdge(vertexG, vertexH, 2)
    .addBiDirectionalEdge(vertexI, vertexL, 4)
    .addBiDirectionalEdge(vertexI, vertexK, 4)
    .addBiDirectionalEdge(vertexJ, vertexL, 4)
    .addBiDirectionalEdge(vertexJ, vertexK, 4);

  const observations: ObserverArgs<StringGraphVertex>[] = [];
  const shortestPathTreeStoE: ShortestPathTree<StringGraphVertex> = dijstraks({
    graph: myGraph,
    sourceNodeKey: vertexS.key,
    destinationNodeKey: vertexE.key,
    getHeuristicCost: (d) => euclideanDistances[d.key],
    observer: (d) => observations.push(d),
  });

  expect(observations.length).toBeGreaterThan(1);

  const pathStoE: StringGraphVertex[] = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeStoE,
    node: vertexE,
  });
  expect(pathStoE).toEqual([vertexS, vertexB, vertexH, vertexG, vertexE]);
});

// https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
test("Routing Algorithms - Dijkstra", () => {
  const myGraph = new Graph()
    .addBiDirectionalEdge(vertexA, vertexB, 4)
    .addBiDirectionalEdge(vertexA, vertexH, 8)
    .addBiDirectionalEdge(vertexB, vertexC, 8)
    .addBiDirectionalEdge(vertexB, vertexH, 11)
    .addBiDirectionalEdge(vertexC, vertexD, 7)
    .addBiDirectionalEdge(vertexC, vertexI, 2)
    .addBiDirectionalEdge(vertexC, vertexF, 4)
    .addBiDirectionalEdge(vertexD, vertexE, 9)
    .addBiDirectionalEdge(vertexD, vertexF, 14)
    .addBiDirectionalEdge(vertexE, vertexF, 10)
    .addBiDirectionalEdge(vertexF, vertexG, 2)
    .addBiDirectionalEdge(vertexG, vertexH, 1)
    .addBiDirectionalEdge(vertexG, vertexI, 6)
    .addBiDirectionalEdge(vertexH, vertexI, 7);

  const viaNode = vertexA;
  const shortestPathTreeAll: ShortestPathTree<StringGraphVertex> = dijstraks({
    graph: myGraph,
    sourceNodeKey: viaNode.key,
  });
  expect(shortestPathTreeAll).toEqual({
    [vertexA.key]: { cost: 0, viaNode: undefined, priority: Infinity },
    [vertexB.key]: { cost: 4, viaNode: vertexA, priority: 1 / 4 },
    [vertexC.key]: { cost: 12, viaNode: vertexB, priority: 1 / 12 },
    [vertexD.key]: { cost: 19, viaNode: vertexC, priority: 1 / 19 },
    [vertexE.key]: { cost: 21, viaNode: vertexF, priority: 1 / 21 },
    [vertexF.key]: { cost: 11, viaNode: vertexG, priority: 1 / 11 },
    [vertexG.key]: { cost: 9, viaNode: vertexH, priority: 1 / 9 },
    [vertexH.key]: { cost: 8, viaNode: vertexA, priority: 1 / 8 },
    [vertexI.key]: { cost: 14, viaNode: vertexC, priority: 1 / 14 },
  });

  const pathTo4 = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeAll,
    node: vertexE,
  });
  expect(pathTo4).toEqual([vertexA, vertexH, vertexG, vertexF, vertexE]);

  const pathTo3 = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeAll,
    node: vertexD,
  });
  expect(pathTo3).toEqual([vertexA, vertexB, vertexC, vertexD]);

  const pathTo8 = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTreeAll,
    node: vertexI,
  });
  expect(pathTo8).toEqual([vertexA, vertexB, vertexC, vertexI]);

  // Do the same thing again, but only find the route to one node
  // It should come up with the same answer, but will make no attempt to route 'every node'
  const shortestPathTree4only: ShortestPathTree<StringGraphVertex> = dijstraks(
    {
      graph: myGraph,
      sourceNodeKey: viaNode.key,
      destinationNodeKey: vertexE.key,
    } // this time specifying the toNode
  );
  const pathTo4only = getPathTo({
    graph: myGraph,
    shortestPathTree: shortestPathTree4only,
    node: vertexE,
  });
  expect(pathTo4only).toEqual([vertexA, vertexH, vertexG, vertexF, vertexE]);
});
