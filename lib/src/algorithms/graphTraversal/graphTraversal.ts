import { Producer, VisitFunction } from "../../types";
import { ILinearDataStructure } from "../../common";
import { GraphState, getOutgoing } from "../../dataStructures/graph/graphReducer";

/**
 * Breadth first and Depth first traversals have a common shape.
 * This function allows us to create generic traversals with different
 * linear data structures.
 *
 * Given a factory for a linear data structure, this function returns
 * a function which can then be used for traversing a graph.
 */
const graphTraversal = (dataStructureFactory: Producer<ILinearDataStructure<string>>) =>
    (graph: GraphState, startingVertex: string, visit: VisitFunction<string>) => {
        const visited: string[] = [];
        const visitDataStructure: ILinearDataStructure<string> = dataStructureFactory();
        visitDataStructure.push(startingVertex);

        while (visitDataStructure.size() > 0) {
            const visiting = visitDataStructure.pop();
            if (visiting === undefined) break; // shouldn't happen

            // Stack/Queue may contain same vertex twice, if we've already seen it, skip it
            if (!visited.includes(visiting)) {
                visit(visiting);
                visited.push(visiting);
            }

            getOutgoing(graph, visiting) // you could attack these in any order
                .filter(n => !visited.includes(n.to))
                .forEach(n => visitDataStructure.push(n.to));
        }
    }

export default graphTraversal;
