import { Optional } from "../../types";

interface GraphReplaceAction {
    type: 'replace',
    newState: GraphState;
}

interface GraphAddVertexAction {
    type: 'addVertex',
    vertex: string
}

interface GraphRemoveVertex {
    type: 'removeVertex',
    vertex: string
}

interface GraphRemoveEdge {
    type: 'removeEdge',
    from: string,
    to: string
}

interface GraphAddUnidirectionalEdge {
    type: 'addUnidirectionalEdge',
    from: string,
    to: string,
    weight?: number
}

interface GraphAddBidirectionalEdge {
    type: 'addBidirectionalEdge',
    from: string,
    to: string,
    weight?: number
}

interface GraphResetAction {
    type: 'reset'
}

export type GraphAction = GraphAddVertexAction |
    GraphRemoveVertex |
    GraphRemoveEdge |
    GraphAddUnidirectionalEdge |
    GraphAddBidirectionalEdge |
    GraphResetAction |
    GraphReplaceAction;

export interface Edge {
    from: string;
    to: string;
    weight: number;
}

export interface GraphState {
    vertices: string[];
    edges: Edge[];
}

/**
 * Retrieve a vertex from the graph
 *
 * @param state The graph state
 * @param asString The vertex as a string
 * @returns The original vertex value, if found
 */
export const getVertex = ({ vertices }: GraphState, asString: string): Optional<string> =>
    vertices.find(v => v === asString);

/**
 * Retrieve the edge that exists between the two given vertices
 *
 * @param state The graph state
 * @param from The from vertex
 * @param to The to vertex
 * @returns The edge that exists between the two (if there is one)
 */
export const getEdge = ({ edges }: GraphState, from: string, to: string): Optional<Edge> =>
    edges.find((l) => l.from === from && l.to === to)

/**
 * Access edges coming into a specific vertex
 * @param vertex The from vertex
 */
export const getIncoming = ({ edges }: GraphState, toKey: string): Edge[] =>
    edges.filter((l) => l.to === toKey);

/**
 *
 * @param state of graph
 * @param fromKey The from vertex
 * @returns The edges
 */
export const getOutgoing = ({ edges }: GraphState, fromKey: string): Edge[] =>
    edges.filter((l) => l.from === fromKey);

/**
 * This function will look for a Edge between the two vertexs (in that specific direction)
 * It will return the weight of the Edge between the two.
 * If there is no Edge, it will return Infinity.
 *
 * @param {string} from The source vertex
 * @param {string} to The destination vertex
 * @return The weight of the Edge, or Infinity if there is no Edge.
 */
export const getEdgeWeight = (state: GraphState, from: string, to: string): number => {
    const edge = getEdge(state, from, to);
    return !!edge ? edge.weight : Infinity;
}

/**
 * Create a new graph state.
 *
 * @param toString A function that can convert the given type to a string
 * @param areVerticesEqual A function that can compare two vertices
 * @returns An empty graph state.
 */
export const createInitialState = (): GraphState => ({
    vertices: [],
    edges: [],
})

/**
 * Add a vertex to the graph.
 *
 * @param state Current graph state
 * @param vertex The vertex to add
 * @returns new graph state after changes
 */
export const graphAddVertex = (state: GraphState, vertex: string): GraphState => ({
    ...state,
    vertices: [
        ...state.vertices.filter(v => v !== vertex),
        vertex
    ],
});

/**
 *
 * @param state Current graph state
 * @param vertex The vertex to remove
 * @returns new graph state after changes
 */
export const graphRemoveVertex = (state: GraphState, vertex: string): GraphState => ({
    ...state,
    vertices: state.vertices.filter(
        v => (v !== vertex)
    ),
    edges: state.edges.filter(
        ({ from, to }) => !((from === vertex) || (to === vertex))
    )
})

/**
 *
 * @param state Current graph state
 * @param from
 * @param to
 * @returns new graph state after changes
 */
export const graphRemoveEdge = (state: GraphState, from: string, to: string): GraphState => ({
    ...state,
    edges: state.edges.filter(
        (l) => !(l.from === from && l.to === to)
    )
})

/**
 *
 * @param state Current graph state
 * @param from
 * @param to
 * @param weight
 * @returns new graph state after changes
 */
export const graphAddUnidirectionalEdge = (
    state: GraphState,
    from: string,
    to: string,
    weight: number = 1.0
): GraphState => ({
    ...state,
    vertices: [
        ...state.vertices,
        ...[from, to].filter(vertex => state.vertices.find(v => v === vertex) === undefined)
    ],
    edges: [
        ...state.edges.filter(
            (l) => !(l.from === from && l.to === to)
        ), // filter any existing Edge in this direction
        { from, to, weight },
    ]
});

/**
 *
 * @param state Current graph state
 * @param from
 * @param to
 * @param weight
 * @returns new graph state after changes
 */
export const graphAddBidirectionalEdge = (
    state: GraphState,
    from: string,
    to: string,
    weight: number = 1.0
): GraphState => ({
    ...state,
    vertices: [
        ...state.vertices,
        ...[from, to].filter(vertex => state.vertices.find(v => v === vertex) === undefined)
    ],
    edges: [
        ...state.edges.filter(
            (l) =>
                !(
                    ((l.from === from) && (l.to === to)) ||
                    ((l.from === to) && (l.to === from))
                )
        ), // filter any existing Edge in this direction
        { from, to, weight },
        { to, from, weight },
    ]
});

/**
 *
 * @param state Current graph state
 * @param action
 * @returns new graph state after changes
 */
export const graphReducer = (state: GraphState, action: GraphAction): GraphState => {
    switch (action.type) {
        case 'addVertex': return graphAddVertex(state, action.vertex);
        case 'removeVertex': return graphRemoveVertex(state, action.vertex);
        case 'removeEdge': return graphRemoveEdge(state, action.from, action.to);
        case 'addUnidirectionalEdge': return graphAddUnidirectionalEdge(state, action.from, action.to, action.weight);
        case 'addBidirectionalEdge': return graphAddBidirectionalEdge(state, action.from, action.to, action.weight);
        case 'reset': return createInitialState();
        case 'replace': return action.newState;
    }
}

export default graphReducer;