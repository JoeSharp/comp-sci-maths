import graphReducer, {
    createInitialState,
    getEdgeWeight,
    getOutgoing
} from './graphReducer';

describe("Graph (functional)", () => {
    test("Add Vertex", () => {
        let state = createInitialState();

        state = graphReducer(state, { type: 'addVertex', vertex: 'A' });
        state = graphReducer(state, { type: 'addVertex', vertex: 'B' });
        state = graphReducer(state, { type: 'addVertex', vertex: 'C' });
        state = graphReducer(state, { type: 'addVertex', vertex: 'D' });
        state = graphReducer(state, { type: 'addVertex', vertex: 'E' });
        state = graphReducer(state, { type: 'addVertex', vertex: 'F' });
    });

    test("Graph - Weighted (strings)", () => {
        let state = createInitialState();

        state = graphReducer(state, { type: 'addBidirectionalEdge', from: "A", to: "B", weight: 1.0 });
        state = graphReducer(state, { type: 'addBidirectionalEdge', from: "A", to: "C" });
        state = graphReducer(state, { type: 'addUnidirectionalEdge', from: "A", to: "D", weight: 4.0 });
        state = graphReducer(state, { type: 'addUnidirectionalEdge', from: "D", to: "A", weight: 2.0 });
        state = graphReducer(state, { type: 'addUnidirectionalEdge', from: "C", to: "E" });

        const fromA = getOutgoing(state, 'A').map(v => v.to);
        expect(fromA.length).toBe(3);
        ['B', 'C', 'D'].forEach(oa => expect(fromA).toContain(oa));

        const ad = getEdgeWeight(state, "A", "D");
        expect(ad).toBe(4.0);

        const ac = getEdgeWeight(state, "A", "C");
        expect(ac).toBe(1.0);

        const da = getEdgeWeight(state, "D", "A");
        expect(da).toBe(2.0);

        const bd = getEdgeWeight(state, "B", "D");
        expect(bd).toBe(Infinity);

        const ce = getEdgeWeight(state, "C", "E");
        expect(ce).toBe(1.0);

        const ec = getEdgeWeight(state, "E", "C");
        expect(ec).toBe(Infinity);

        const vertices = state.vertices;
        ["A", "B", "C", "D", "E"].forEach((v) =>
            expect(vertices.includes(v)).toBeTruthy()
        );

        // Execute some removals
        state = graphReducer(state, { type: 'removeEdge', from: "A", to: "C" })
        state = graphReducer(state, { type: 'removeVertex', vertex: "B" })

        const acPostDelete = getEdgeWeight(state, "A", "C");
        expect(acPostDelete).toBe(Infinity);
        const verticesPostDelete = state.vertices;
        expect(verticesPostDelete.includes("B")).toBeFalsy();
    });
});