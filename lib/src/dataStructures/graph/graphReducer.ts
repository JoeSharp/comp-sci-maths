import { Optional } from "../../types";

interface GraphReplaceAction<T = string> {
    type: 'replace',
    newState: Graph<T>;
}

interface AddVertexAction<T = string> {
    type: 'addVertex',
    vertex: string,
    value?: T
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

interface DisconnectVertexAction {
    type: 'disconnectVertex',
    vertex: string
}

interface AddUnidirectionalEdge {
    type: 'addUnidirectionalEdge',
    from: string,
    to: string,
    weight?: number
}

interface AddBidirectionalEdge {
    type: 'addBidirectionalEdge',
    from: string,
    to: string,
    weight?: number
}

interface GraphResetAction {
    type: 'reset'
}

export type GraphAction<T = string> = AddVertexAction<T> |
    GraphRemoveVertex |
    GraphRemoveEdge |
    AddUnidirectionalEdge |
    AddBidirectionalEdge |
    GraphResetAction |
    GraphReplaceAction<T> |
    DisconnectVertexAction;

export interface Edge {
    from: string;
    to: string;
    weight: number;
}

export interface Graph<T = string> {
    vertices: string[];
    edges: Edge[];
    vertexValues?: {
        [vertex: string]: T
    }
}

/**
 * Retrieve a vertex from the graph
 *
 * @param state The graph state
 * @param asString The vertex as a string
 * @returns The original vertex value, if found
 */
export const getVertex = <T = string>({ vertices }: Graph<T>, asString: string): Optional<string> =>
    vertices.find(v => v === asString);


/**
 * Retrieve the value associated with a given vertex.
 * @param Graph state
 * @param vertex The vertex we want to find
 * @returns The associated value with that vertex, if such a value has been registered.
 */
export const getVertexValue = <T = string>({ vertexValues }: Graph<T>, vertex: string): T => vertexValues !== undefined ? vertexValues[vertex] : undefined;

/**
 * Retrieve the edge that exists between the two given vertices
 *
 * @param state The graph state
 * @param from The from vertex
 * @param to The to vertex
 * @returns The edge that exists between the two (if there is one)
 */
export const getEdge = <T = string>({ edges }: Graph<T>, from: string, to: string): Optional<Edge> =>
    edges.find((l) => l.from === from && l.to === to)

/**
 * Access edges coming into a specific vertex
 * @param vertex The from vertex
 */
export const getIncoming = <T = string>({ edges }: Graph<T>, toKey: string): Edge[] =>
    edges.filter((l) => l.to === toKey);

/**
 *
 * @param state of graph
 * @param fromKey The from vertex
 * @returns The edges
 */
export const getOutgoing = <T = string>({ edges }: Graph<T>, fromKey: string): Edge[] =>
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
export const getEdgeWeight = <T = string>(state: Graph<T>, from: string, to: string): number => {
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
export const createInitialState = <T = string>(): Graph<T> => ({
    vertices: [],
    edges: [],
    vertexValues: {}
})

/**
 * Add a vertex to the graph.
 *
 * @param state Current graph state
 * @param vertex The vertex to add
 * @returns new graph state after changes
 */
export const addVertex = <T = string>(state: Graph<T>, vertex: string, value: Optional<T> = undefined): Graph<T> => ({
    ...state,
    vertices: [
        ...state.vertices.filter(v => v !== vertex),
        vertex
    ],
    vertexValues: {
        ...state.vertexValues,
        [vertex]: value
    }
});

export const disconnectVertex = <T = string>(state: Graph<T>, vertex: string): Graph<T> => ({
    ...state,
    edges: state.edges.filter(
        ({ from, to }) => !((from === vertex) || (to === vertex))
    )
})

/**
 *
 * @param state Current graph state
 * @param vertex The vertex to remove
 * @returns new graph state after changes
 */
export const removeVertex = <T = string>(state: Graph<T>, vertex: string): Graph<T> => ({
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
export const removeEdge = <T = string>(state: Graph<T>, from: string, to: string): Graph<T> => ({
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
export const addUnidirectionalEdge = <T = string>(
    state: Graph<T>,
    from: string,
    to: string,
    weight: number = 1.0
): Graph<T> => ({
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
export const addBidirectionalEdge = <T = string>(
    state: Graph<T>,
    from: string,
    to: string,
    weight: number = 1.0
): Graph<T> => ({
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
        { from: to, to: from, weight },
    ]
});

/**
 *
 * @param state Current graph state
 * @param action
 * @returns new graph state after changes
 */
export const reduce = <T = string>(state: Graph<T>, action: GraphAction<T>): Graph<T> => {
    switch (action.type) {
        case 'addVertex': return addVertex(state, action.vertex, action.value);
        case 'removeVertex': return removeVertex(state, action.vertex);
        case 'removeEdge': return removeEdge(state, action.from, action.to);
        case 'addUnidirectionalEdge': return addUnidirectionalEdge(state, action.from, action.to, action.weight);
        case 'addBidirectionalEdge': return addBidirectionalEdge(state, action.from, action.to, action.weight);
        case 'reset': return createInitialState();
        case 'disconnectVertex': return disconnectVertex(state, action.vertex);
        case 'replace': return action.newState;
    }
}

export default {
    reduce,
    createInitialState,

    getEdge,
    getIncoming,
    getOutgoing,
    getEdgeWeight,
    getVertexValue,

    addVertex,
    removeVertex,
    addUnidirectionalEdge,
    addBidirectionalEdge
};