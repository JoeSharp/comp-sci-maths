import Queue from "dataStructures/queue/Queue";
import Stack from "dataStructures/stack/Stack";
import Graph from "dataStructures/graph/Graph";
import LinkedList from "dataStructures/linkedList/LinkedList";
import { ILinearDataStructure } from "common";
import { Producer } from "types";

class ManualGraphTraversal {
    linearDataStructureFactory: Producer<ILinearDataStructure<LinkedList<string>>>;

    graph: Graph<any>;
    linearDataStructure: ILinearDataStructure<LinkedList<string>>;
    visited: string[];
    errors: number;

    constructor(linearDataStructureFactory: Producer<ILinearDataStructure<LinkedList<string>>>) {
        this.linearDataStructureFactory = linearDataStructureFactory;
    }

    start(graph: Graph<any>, startingVertex: string): this {
        this.visited = [];
        this.graph = graph;
        this.linearDataStructure = this.linearDataStructureFactory();
        this.linearDataStructure.push(new LinkedList<string>().append(startingVertex));
        this.visited.push(startingVertex);
        this.errors = 0;
        return this;
    }

    getErrors(): number {
        return this.errors;
    }

    assertNext(key: string): this {
        const options = this.getNextOptions();
        if (options !== undefined && options.contains(o => o === key)) {
            this.visit(key);

            // Get all the possible avenues from this point
            const optionsFromVisiting: string[] = this.graph.getOutgoing(key)
                .filter(n => !this.visited.includes(n.to.key))
                .map(n => n.to.key);

            // Push the list of them onto our linear data structure
            if (optionsFromVisiting.length > 0) {
                this.linearDataStructure.push(new LinkedList<string>().appendAll(...optionsFromVisiting));
            }
        } else {
            this.errors++;
        }

        return this;
    }

    assertFinished(): this {
        // If there are items remaining on the linear data structure, then this declaration is incorrect
        if (this.getNextOptions() !== undefined) {
            this.errors++;
        }

        return this;
    }

    getNextOptions(): LinkedList<string> | undefined {
        if (this.linearDataStructure.isEmpty()) {
            return undefined;
        }

        let list = this.linearDataStructure.peek();
        while (list.isEmpty() && !this.linearDataStructure.isEmpty()) {
            this.linearDataStructure.pop();
            if (!this.linearDataStructure.isEmpty()) {
                list = this.linearDataStructure.peek();
            }
        }
        return list.size() > 0 ? list : undefined;
    }

    visit(key: string) {
        // Strip out the visited key from all sub linked lists
        this.linearDataStructure.getItems().forEach(l => l.removeMatch(k => k === key));
        this.visited.push(key);
    }
}

export const breadthFirstManualTraversal = () => new ManualGraphTraversal(() => new Queue<LinkedList<string>>());
export const depthFirstManualTraversal = () => new ManualGraphTraversal(() => new Stack<LinkedList<string>>());

export default ManualGraphTraversal;