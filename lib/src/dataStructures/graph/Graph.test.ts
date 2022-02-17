import Graph from "./Graph";
import SimpleStringGraph from "./SimpleStringGraph";
import { getStringVertex } from "common";

test("Graph - Simple String", () => {
  const graph = new SimpleStringGraph()
    .addLink("A", "B")
    .addLink("A", "C")
    .addLink("B", "D")
    .addLink("B", "E")
    .addLink("C", "D");

  const fromA = graph.getConnectedVertices("A");
  ["B", "C"].forEach((x) => expect(fromA.includes(x)).toBeTruthy());
  ["D", "E", "F"].forEach((x) => expect(fromA.includes(x)).toBeFalsy());
});

test("Graph - Weighted (strings)", () => {
  const vertexA = getStringVertex("A");
  const vertexB = getStringVertex("B");
  const vertexC = getStringVertex("C");
  const vertexD = getStringVertex("D");
  const vertexE = getStringVertex("E");

  const graph = new Graph()
    .addBiDirectionalEdge(vertexA, vertexB, 1.0)
    .addBiDirectionalEdge(vertexA, vertexC)
    .addUnidirectionalEdge(vertexA, vertexD, 4.0)
    .addUnidirectionalEdge(vertexD, vertexA, 2.0)
    .addUnidirectionalEdge(vertexC, vertexE);

  const ad = graph.getEdgeWeight(vertexA, vertexD);
  expect(ad).toBe(4.0);

  const ac = graph.getEdgeWeight(vertexA, vertexC);
  expect(ac).toBe(1.0);

  const da = graph.getEdgeWeight(vertexD, vertexA);
  expect(da).toBe(2.0);

  const bd = graph.getEdgeWeight(vertexB, vertexD);
  expect(bd).toBe(Infinity);

  const ce = graph.getEdgeWeight(vertexC, vertexE);
  expect(ce).toBe(1.0);

  const ec = graph.getEdgeWeight(vertexE, vertexC);
  expect(ec).toBe(Infinity);

  const vertices = graph.vertices;
  [vertexA, vertexB, vertexC, vertexD, vertexE].forEach((v) =>
    expect(vertices.includes(v)).toBeTruthy()
  );

  // Execute some removals
  graph.removeEdge(vertexA, vertexC);
  graph.removeVertex(vertexB);

  const acPostDelete = graph.getEdgeWeight(vertexA, vertexC);
  expect(acPostDelete).toBe(Infinity);
  const verticesPostDelete = graph.vertices;
  expect(verticesPostDelete.includes(vertexB)).toBeFalsy();
});
