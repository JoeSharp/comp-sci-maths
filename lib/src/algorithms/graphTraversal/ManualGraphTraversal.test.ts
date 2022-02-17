import { depthFirstManualTraversal, breadthFirstManualTraversal } from "./ManualGraphTraversal"

import createTestGraph, { vertexS, vertexA, vertexB, vertexC, vertexD, vertexE, vertexF, vertexG } from "./createTestGraph";

describe("Manual Graph Traversal", () => {
    test("Breadth First with No Errors", () => {
        const graph = createTestGraph();

        const traversal = breadthFirstManualTraversal();
        traversal.start(graph, vertexS.key)
            .assertNext(vertexS.key)
            .assertNext(vertexA.key)
            .assertNext(vertexC.key)
            .assertNext(vertexB.key)
            .assertNext(vertexD.key)
            .assertNext(vertexF.key)
            .assertNext(vertexE.key)
            .assertNext(vertexG.key)
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);

        traversal.start(graph, vertexS.key)
            .assertNext(vertexS.key)
            .assertNext(vertexB.key)
            .assertNext(vertexC.key)
            .assertNext(vertexA.key)
            .assertNext(vertexE.key)
            .assertNext(vertexF.key)
            .assertNext(vertexD.key)
            .assertNext(vertexG.key)
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);
    });

    test("Breadth First with Some Errors in Middle", () => {
        const graph = createTestGraph();

        const traversal = breadthFirstManualTraversal();
        traversal.start(graph, vertexS.key)
            .assertNext(vertexS.key)
            .assertNext(vertexA.key)
            .assertNext(vertexC.key)
            .assertNext(vertexG.key)
            .assertNext(vertexE.key)
            .assertNext(vertexB.key)
            .assertNext(vertexD.key)
            .assertNext(vertexF.key)
            .assertNext(vertexE.key)
            .assertNext(vertexA.key)
            .assertNext(vertexG.key)
            .assertFinished();
        expect(traversal.getErrors()).toBe(3);
    });

    test("Depth First with No Errors", () => {
        const graph = createTestGraph();
        const traversal = depthFirstManualTraversal();

        traversal.start(graph, vertexS.key)
            .assertNext(vertexS.key)
            .assertNext(vertexA.key)
            .assertNext(vertexD.key)
            .assertNext(vertexG.key)
            .assertNext(vertexE.key)
            .assertNext(vertexB.key)
            .assertNext(vertexF.key)
            .assertNext(vertexC.key)
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);

        traversal.start(graph, vertexS.key)
            .assertNext(vertexS.key)
            .assertNext(vertexB.key)
            .assertNext(vertexE.key)
            .assertNext(vertexG.key)
            .assertNext(vertexF.key)
            .assertNext(vertexC.key)
            .assertNext(vertexD.key)
            .assertNext(vertexA.key)
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);
    });
})