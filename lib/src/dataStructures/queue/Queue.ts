import LinkedList from "../linkedList/LinkedList";
import { ILinearDataStructure, ObservableVersioned } from "common";

export default class Queue<T> extends ObservableVersioned implements ILinearDataStructure<T> {
  items: LinkedList<T>;

  constructor() {
    super();
    this.items = new LinkedList();
  }

  toString() {
    return JSON.stringify(this.items);
  }

  size(): number {
    return this.items.size();
  }

  getItems() {
    return this.items.toArray();
  }

  empty(): this {
    this.items.empty();
    return this;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  push(item: T): this {
    this.items.append(item);
    this.tickVersion();
    return this;
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    this.tickVersion();
    return this.items.remove(0);
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    return this.items.get(0);
  }
}
