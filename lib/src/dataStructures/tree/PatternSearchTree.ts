import { EqualityCheck, Optional, ToString } from "../../types";
import Tree from "./Tree";

interface TreeCount<F> {
    value: Optional<F>,
    sequenceThusFar: F[],
    count: number
}

/**
 * This can be used to find common patterns in sequences of data.
 * It is fed with sequences, it uses trees to count how many times
 * it sees sequences in the input.
 * You can then count how many times specific patterns appear.
 */
class PatternSearchTree<T> {
    itemToString: ToString<T>;
    equalityCheck: EqualityCheck<T>;
    root: Tree<TreeCount<T>>
    maxLength: number;

    constructor(
        equalityCheck: EqualityCheck<T>,
        itemToString: ToString<T>,
        maxLength: number) {
        this.maxLength = maxLength;
        this.itemToString = itemToString;
        this.equalityCheck = equalityCheck;
        this.root = new Tree({
            value: undefined,
            sequenceThusFar: [],
            count: 0
        });
    }

    findTopHits(): TreeCount<T>[] {
        const hits: TreeCount<T>[] = [];

        this.root.visit(h => hits.push(h));

        return hits.sort((a, b) => a.count - b.count);
    }

    /**
     * Given a sequence of values, counts how many times that sequence was seen in the input.
     * @param values The sequence of values to find
     * @returns The number of times that was seen.
     */
    count(...values: T[]): number {
        let item: Tree<TreeCount<T>> = this.root;

        if (values.length >= this.maxLength)
            throw new Error(`This search tree is only configured for patterns up to ${this.maxLength} long`)

        for (const value of values) {
            item = item.getChildren().find(child => this.equalityCheck(value, child.getValue().value));

            if (item === undefined) {
                break;
            }
        }

        return !!item ? item.getValue().count : 0;
    }

    /**
     * Record a series of values, this class will us it to populate the tree with counts of patterns seen.
     * @param values The values to index through
     * @returns this for Method chaining
     */
    record(...values: T[]): this {
        if (values.length === 0) {
            throw new Error("Cannot add item with zero length key");
        }

        while (values.length > 0) {
            let item: Tree<TreeCount<T>> = this.root;
            for (const [index, value] of values.entries()) {
                if (index >= this.maxLength) break;

                let childItem: Tree<TreeCount<T>> = item.getChildren().find(child => this.equalityCheck(value, child.getValue().value));
                if (!!childItem) {
                    childItem.getValue().count += 1;
                } else {
                    childItem = new Tree({
                        value,
                        sequenceThusFar: [...values],
                        count: 1
                    });
                    item.addChild(childItem);
                }
                item = childItem;
            };
            values.shift();
        }

        return this;
    }
}

export default PatternSearchTree;