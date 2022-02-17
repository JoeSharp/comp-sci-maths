import { AnyGraphVertex, Producer, VisitFunction } from "types";
import { ILinearDataStructure } from "common";
import Graph from "dataStructures/graph/Graph";

/**
 * Breadth first and Depth first traversals have a common shape.
 * This function allows us to create generic traversals with different
 * linear data structures.
 *
 * Given a factory for a linear data structure, this function returns
 * a function which can then be used for traversing a graph.
 */
const graphTraversal =
    <T extends AnyGraphVertex>(dataStructureFactory: Producer<ILinearDataStructure<string>>) =>
        (graph: Graph<T>, startingVertex: string, visit: VisitFunction<T>) => {
            const visited: string[] = [];
            const visitDataStructure: ILinearDataStructure<string> = dataStructureFactory();
            visitDataStructure.push(startingVertex);

            while (visitDataStructure.size() > 0) {
                const visiting = visitDataStructure.pop();
                if (visiting === undefined) break; // shouldn't happen

                // Stack/Queue may contain same vertex twice, if we've already seen it, skip it
                if (!visited.includes(visiting)) {
                    visit(graph.getVertex(visiting));
                    visited.push(visiting);
                }

                graph.getOutgoing(visiting) // you could attack these in any order
                    .filter(n => !visited.includes(n.to.key))
                    .forEach(n => visitDataStructure.push(n.to.key));
            }
        }

export default graphTraversal;
