import { ShortestPathTree, ObserverArgs } from "./types";
import Graph from "dataStructures/graph/Graph";

import { dijstraks, getPathTo } from "./dijkstras";
import { IKeyWithValue, StringGraphVertex } from "types";
import { simpleLogger, getStringVertex } from "common";

interface Point {
  x: number;
  y: number;
}

type PointGraphVertex = IKeyWithValue<Point>;

const getPointGraphVertex = (x: number, y: number): PointGraphVertex => ({
  key: `${x},${y}`,
  value: { x, y },
});

function testGrid() {
  const columns = 10;
  const rows = 10;

  const myGraph = new Graph<PointGraphVertex>();

  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      if (row > 1) {
        const from = getPointGraphVertex(col, row);
        const to = getPointGraphVertex(col, row - 1);
        myGraph.addBiDirectionalEdge(from, to);
      }
      if (row < rows - 1) {
        const from = getPointGraphVertex(col, row);
        const to = getPointGraphVertex(col, row + 1);
        myGraph.addBiDirectionalEdge(from, to);
      }
      if (col > 1) {
        const from = getPointGraphVertex(col, row);
        const to = getPointGraphVertex(col - 1, row);
        myGraph.addBiDirectionalEdge(from, to);
      }
      if (col < columns - 1) {
        const from = getPointGraphVertex(col, row);
        const to = getPointGraphVertex(col + 1, row);
        myGraph.addBiDirectionalEdge(from, to);
      }
    }
  }
  myGraph.disconnectVertex(getPointGraphVertex(0, 7));
  myGraph.disconnectVertex(getPointGraphVertex(1, 6));
  myGraph.disconnectVertex(getPointGraphVertex(2, 5));
  myGraph.disconnectVertex(getPointGraphVertex(3, 4));
  myGraph.disconnectVertex(getPointGraphVertex(4, 3));
  myGraph.disconnectVertex(getPointGraphVertex(4, 4));
  myGraph.disconnectVertex(getPointGraphVertex(4, 5));

  myGraph.disconnectVertex(getPointGraphVertex(8, 1));
  myGraph.disconnectVertex(getPointGraphVertex(8, 2));
  myGraph.disconnectVertex(getPointGraphVertex(8, 3));
  myGraph.disconnectVertex(getPointGraphVertex(8, 4));

  myGraph.disconnectVertex(getPointGraphVertex(9, 4));
  myGraph.disconnectVertex(getPointGraphVertex(9, 7));
  myGraph.disconnectVertex(getPointGraphVertex(10, 3));
  myGraph.disconnectVertex(getPointGraphVertex(11, 1));
  myGraph.disconnectVertex(getPointGraphVertex(11, 6));
  myGraph.disconnectVertex(getPointGraphVertex(11, 7));

  myGraph.disconnectVertex(getPointGraphVertex(12, 1));
  myGraph.disconnectVertex(getPointGraphVertex(12, 4));
  myGraph.disconnectVertex(getPointGraphVertex(12, 5));

  const sourceNode = getPointGraphVertex(0, 0);
  const destinationNode = getPointGraphVertex(columns - 1, rows - 1);
  const observations: ObserverArgs<PointGraphVertex>[] = [];

  const shortestPathTree: ShortestPathTree<PointGraphVertex> = dijstraks({
    graph: myGraph,
    sourceNodeKey: sourceNode.key,
    destinationNodeKey: destinationNode.key,
    observer: (d) => observations.push(d),
  });

  const pathToDestination: PointGraphVertex[] = getPathTo({
    graph: myGraph,
    shortestPathTree,
    node: destinationNode,
  });

  simpleLogger.info("Shortest Path Tree", shortestPathTree);
  simpleLogger.info(
    "Path Across Grid",
    pathToDestination.map((v) => v.key).join(" -> ")
  );

  simpleLogger.info("OBSERVATIONS");
  observations.forEach(({ currentItem }) => {
    simpleLogger.info(
      `Current Item: ${!!currentItem ? currentItem.node.key : "NONE"}`
    );
  });

  observations.forEach((o) => {
    const path = getPathTo({
      graph: myGraph,
      shortestPathTree: o.shortestPathTree,
      node: !!o.currentItem ? o.currentItem.node : sourceNode,
    });
    simpleLogger.info(
      `Observation: ${path.map((v) => v.key)} - ${JSON.stringify(
        o.currentItem
      )}`
    );
  });
}

function testBrokenPath() {
  const vertexA = getStringVertex("A");
  const vertexB = getStringVertex("B");
  const vertexC = getStringVertex("C");
  const vertexD = getStringVertex("E");
  const vertexE = getStringVertex("D");

  const myGraph = new Graph<StringGraphVertex>()
    .addBiDirectionalEdge(vertexA, vertexB)
    .addBiDirectionalEdge(vertexB, vertexC)
    .addBiDirectionalEdge(vertexE, vertexD);
  const observations: ObserverArgs<StringGraphVertex>[] = [];

  const shortestPathTree = dijstraks({
    graph: myGraph,
    sourceNodeKey: vertexA.key,
    destinationNodeKey: vertexD.key,
    observer: (d) => observations.push(d),
  });

  observations.forEach((o) => {
    const path = getPathTo({
      graph: myGraph,
      shortestPathTree: o.shortestPathTree,
      node: !!o.currentItem ? o.currentItem.node : vertexA,
    });
    simpleLogger.info(
      `Observation: ${path} - ${JSON.stringify(o.currentItem)}`
    );
  });
}

testGrid();
// testBrokenPath();
