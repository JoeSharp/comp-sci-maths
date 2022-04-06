import { Edge, addBidirectionalEdge, createInitialState } from "../../dataStructures/graph/graphReducer";

const createTestGraph = () => {
    return ([
        { from: "S", to: "A" },
        { from: "S", to: "B" },
        { from: "S", to: "C" },
        { from: "A", to: "D" },
        { from: "D", to: "G" },
        { from: "B", to: "E" },
        { from: "E", to: "G" },
        { from: "C", to: "F" },
        { from: "F", to: "G" }
    ] as Edge[]).reduce((acc, { from, to, weight }) => addBidirectionalEdge(acc, from, to, weight), createInitialState());
}

export default createTestGraph;