import { EqualityCheck, Optional, ToString } from "../../types";

interface GraphAddVertexAction<T> {
    type: 'addVertex',
    vertex: T
}

interface GraphRemoveVertex<T> {
    type: 'removeVertex',
    vertex: T
}

interface GraphRemoveEdge<T> {
    type: 'removeEdge',
    from: T,
    to: T
}

interface GraphAddUnidirectionalEdge<T> {
    type: 'addUnidirectionalEdge',
    from: T,
    to: T,
    weight?: number
}

interface GraphAddBidirectionalEdge<T> {
    type: 'addBidirectionalEdge',
    from: T,
    to: T,
    weight?: number
}

interface GraphResetAction {
    type: 'reset'
}

export type GraphAction<T> = GraphAddVertexAction<T> |
    GraphRemoveVertex<T> |
    GraphRemoveEdge<T> |
    GraphAddUnidirectionalEdge<T> |
    GraphAddBidirectionalEdge<T> |
    GraphResetAction;

export interface Edge<T> {
    from: T;
    to: T;
    weight: number;
}

export interface GraphState<T> {
    vertices: T[];
    edges: Edge<T>[];
    toString: ToString<T>
    areVerticesEqual: EqualityCheck<T>;
}

/**
 * Retrieve a vertex from the graph
 * 
 * @param state The graph state
 * @param asString The vertex as a string
 * @returns The original vertex value, if found
 */
export const getVertex = <T>({ toString, vertices }: GraphState<T>, asString: string): Optional<T> =>
    vertices.find(v => toString(v) === asString);

/**
 * Retrieve the edge that exists between the two given vertices
 * 
 * @param state The graph state
 * @param from The from vertex
 * @param to The to vertex
 * @returns The edge that exists between the two (if there is one)
 */
export const getEdge = <T>({ edges, areVerticesEqual }: GraphState<T>, from: T, to: T): Optional<Edge<T>> =>
    edges.find(
        (l) =>
            areVerticesEqual(l.from, from) && areVerticesEqual(l.to, to)
    )

/**
 * Access edges coming into a specific vertex
 * @param vertex The from vertex
 */
export const getIncoming = <T>({ edges, toString }: GraphState<T>, toKey: string): Edge<T>[] => {
    return edges.filter((l) => toString(l.to) === toKey);
}

/**
 * This function will look for a Edge between the two vertexs (in that specific direction)
 * It will return the weight of the Edge between the two.
 * If there is no Edge, it will return Infinity.
 *
 * @param {string} from The source vertex
 * @param {string} to The destination vertex
 * @return The weight of the Edge, or Infinity if there is no Edge.
 */
export const getEdgeWeight = <T>(state: GraphState<T>, from: T, to: T): number => {
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
export const createInitialState = <T>(
    toString: ToString<T>,
    areVerticesEqual: EqualityCheck<T>
): GraphState<T> => ({
    vertices: [],
    edges: [],
    toString,
    areVerticesEqual
})

/**
 * Add a vertex to the graph.
 * 
 * @param state Current graph state
 * @param vertex The vertex to add
 * @returns new graph state after changes
 */
export const graphAddVertex = <T>(state: GraphState<T>, vertex: T): GraphState<T> => ({
    ...state,
    vertices: [
        ...state.vertices.filter(v => !state.areVerticesEqual(v, vertex)),
        vertex
    ],
});

/**
 * 
 * @param state Current graph state
 * @param vertex The vertex to remove
 * @returns new graph state after changes
 */
export const graphRemoveVertex = <T>(state: GraphState<T>, vertex: T): GraphState<T> => ({
    ...state,
    vertices: state.vertices.filter(
        v => !state.areVerticesEqual(v, vertex)
    ),
    edges: state.edges.filter(
        ({ from, to }) =>
            !(
                state.areVerticesEqual(from, vertex) ||
                state.areVerticesEqual(to, vertex)
            )
    )
})

/**
 * 
 * @param state Current graph state
 * @param from 
 * @param to 
 * @returns new graph state after changes
 */
export const graphRemoveEdge = <T>(state: GraphState<T>, from: T, to: T): GraphState<T> => ({
    ...state,
    edges: state.edges.filter(
        (l) =>
            !(
                state.areVerticesEqual(l.from, from) && state.areVerticesEqual(l.to, to)
            )
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
export const graphAddUnidirectionalEdge = <T>(
    state: GraphState<T>,
    from: T,
    to: T,
    weight: number = 1.0
): GraphState<T> => ({
    ...state,
    vertices: [
        ...state.vertices,
        ...[from, to].filter(vertex => state.vertices.find(v => state.areVerticesEqual(v, vertex)) === undefined)
    ],
    edges: [
        ...state.edges.filter(
            (l) =>
                !(
                    state.areVerticesEqual(l.from, from) &&
                    state.areVerticesEqual(l.to, to)
                )
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
export const graphAddBidirectionalEdge = <T>(
    state: GraphState<T>,
    from: T,
    to: T,
    weight: number = 1.0
): GraphState<T> => ({
    ...state,
    vertices: [
        ...state.vertices,
        ...[from, to].filter(vertex => state.vertices.find(v => state.areVerticesEqual(v, vertex)) === undefined)
    ],
    edges: [
        ...state.edges.filter(
            (l) =>
                !(
                    (state.areVerticesEqual(l.from, from) &&
                        state.areVerticesEqual(l.to, to)) ||
                    (state.areVerticesEqual(l.from, to) &&
                        state.areVerticesEqual(l.to, from))
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
export const graphReducer = <T>(state: GraphState<T>, action: GraphAction<T>): GraphState<T> => {
    switch (action.type) {
        case 'addVertex': return graphAddVertex(state, action.vertex);
        case 'removeVertex': return graphRemoveVertex(state, action.vertex);
        case 'removeEdge': return graphRemoveEdge(state, action.from, action.to);
        case 'addUnidirectionalEdge': return graphAddUnidirectionalEdge(state, action.from, action.to, action.weight);
        case 'addBidirectionalEdge': return graphAddBidirectionalEdge(state, action.from, action.to, action.weight);
        case 'reset': return createInitialState(state.toString, state.areVerticesEqual);
    }
}

export default graphReducer;