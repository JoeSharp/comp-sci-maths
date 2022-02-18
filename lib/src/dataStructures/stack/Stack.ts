import { ILinearDataStructure, ObservableVersioned } from "../../common";

export default class Stack<T> extends ObservableVersioned implements ILinearDataStructure<T> {
  items: T[];
  stackPointer = 0;

  constructor() {
    super();

    // Use an array for the items, common exam question
    this.items = []
  }

  size(): number {
    return this.stackPointer;
  }

  empty(): this {
    this.stackPointer = 0;
    return this;
  }

  isEmpty() {
    return this.stackPointer === 0;
  }

  getItems() {
    return this.items.filter((_, i) => i < this.stackPointer);
  }

  toString(itemToString: (x: T) => string) {
    return `Items: ${this.items.map(itemToString).join('\n\t')}`
  }

  push(item: T): this {
    this.items[this.stackPointer++] = item;
    this.tickVersion();
    return this;
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }
    this.tickVersion();
    return this.items[--this.stackPointer];
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }

    return this.items[this.stackPointer - 1];
  }
}
