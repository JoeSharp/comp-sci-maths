import { VisitFunction } from "../../types";
import { Graph, getOutgoing } from "../../dataStructures/graph/graphReducer";
import { Producer } from "../../types";
import {
    LinearDataStructureReducer,
    LinearStructureState
} from "src/dataStructures/linearDataStructure/linearDataStructure";

/**
 * Breadth first and Depth first traversals have a common shape.
 * This function allows us to create generic traversals with different
 * linear data structures.
 *
 * Given a factory for a linear data structure, this function returns
 * a function which can then be used for traversing a graph.
 */
const graphTraversal = (
    getInitialState: Producer<LinearStructureState<string>>,
    reducer: LinearDataStructureReducer<string, LinearStructureState<string>>
) =>
    (graph: Graph, startingVertex: string, visit: VisitFunction<string>) => {
        const visited: string[] = [];
        let visitDataStructure: LinearStructureState<string> = getInitialState();
        visitDataStructure = reducer(visitDataStructure, { type: 'push', value: startingVertex });

        while (visitDataStructure.size > 0) {
            visitDataStructure = reducer(visitDataStructure, { type: 'pop' });
            const visiting = visitDataStructure.lastResult;
            if (visiting === undefined) break; // shouldn't happen

            // Stack/Queue may contain same vertex twice, if we've already seen it, skip it
            if (!visited.includes(visiting)) {
                visit(visiting);
                visited.push(visiting);
            }

            visitDataStructure = getOutgoing(graph, visiting) // you could attack these in any order
                .filter(n => !visited.includes(n.to))
                .reduce((acc, curr) => reducer(acc, { type: 'push', value: curr.to }), visitDataStructure);
        }
    }

export default graphTraversal;
