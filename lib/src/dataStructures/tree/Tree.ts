import { Consumer, ToString } from "../../types";

class Tree<T> {
    value: T;
    children: Tree<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    visit(visitor: Consumer<T>) {
        visitor(this.value);
        this.children.forEach(child => child.visit(visitor));
    }

    toString(valueToString: ToString<T>): string {
        if (this.children.length > 0) {
            return `${valueToString(this.value)} -> [${this.children.map(c => c.toString(valueToString)).join(',')}]`
        } else {
            return valueToString(this.value);
        }
    }

    addChildValue(value: T): this {
        return this.addChild(new Tree(value));
    }

    addChild(child: Tree<T>): this {
        this.children.push(child);
        return this;
    }

    getValue() {
        return this.value;
    }

    getChildren(): Tree<T>[] {
        return this.children;
    }
}

export default Tree;