import { depthFirstManualTraversal, breadthFirstManualTraversal } from "./ManualGraphTraversal"

import createTestGraph from "./createTestGraph";

describe("Manual Graph Traversal", () => {
    test("Breadth First with No Errors", () => {
        const graph = createTestGraph();

        const traversal = breadthFirstManualTraversal();
        traversal.start(graph, "S")
            .assertNext("S")
            .assertNext("A")
            .assertNext("C")
            .assertNext("B")
            .assertNext("D")
            .assertNext("F")
            .assertNext("E")
            .assertNext("G")
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);

        traversal.start(graph, "S")
            .assertNext("S")
            .assertNext("B")
            .assertNext("C")
            .assertNext("A")
            .assertNext("E")
            .assertNext("F")
            .assertNext("D")
            .assertNext("G")
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);
    });

    test("Breadth First with Some Errors in Middle", () => {
        const graph = createTestGraph();

        const traversal = breadthFirstManualTraversal();
        traversal.start(graph, "S")
            .assertNext("S")
            .assertNext("A")
            .assertNext("C")
            .assertNext("G")
            .assertNext("E")
            .assertNext("B")
            .assertNext("D")
            .assertNext("F")
            .assertNext("E")
            .assertNext("A")
            .assertNext("G")
            .assertFinished();
        expect(traversal.getErrors()).toBe(3);
    });

    test("Depth First with No Errors", () => {
        const graph = createTestGraph();
        const traversal = depthFirstManualTraversal();

        traversal.start(graph, "S")
            .assertNext("S")
            .assertNext("A")
            .assertNext("D")
            .assertNext("G")
            .assertNext("E")
            .assertNext("B")
            .assertNext("F")
            .assertNext("C")
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);

        traversal.start(graph, "S")
            .assertNext("S")
            .assertNext("B")
            .assertNext("E")
            .assertNext("G")
            .assertNext("F")
            .assertNext("C")
            .assertNext("D")
            .assertNext("A")
            .assertFinished();
        expect(traversal.getErrors()).toBe(0);
    });
})