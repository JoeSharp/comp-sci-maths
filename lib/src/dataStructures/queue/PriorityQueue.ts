import LinkedList from "../linkedList/LinkedList";
import { MatchFunction } from "../../types";
import { ObservableVersioned } from "../../common";

export interface PrioritisedItem {
  priority: number;
}

export default class PriorityQueue<
  T extends PrioritisedItem
  > extends ObservableVersioned {
  items: LinkedList<T>;

  constructor() {
    super();
    this.items = new LinkedList();
  }

  getSize(): number {
    return this.items.size();
  }

  toString() {
    return this.items.toString();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toArray() {
    return this.items.toArray();
  }

  /**
   * Removes
   * @param {function} matchFunction Returns true for the object being removed
   * @returns The removed item
   */
  removeMatch(matchFunction: MatchFunction<T>) {
    this.tickVersion();
    return this.items.removeMatch(matchFunction);
  }

  enqueue(newItem: T) {
    let index: number = 0;
    for (const item of this.items) {
      if (newItem.priority > item.priority) {
        // Insert item at this point and return
        this.items.insert(index, newItem);
        return;
      }

      index += 1;
    }

    // Just push onto the end
    this.items.append(newItem);
    this.tickVersion();
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    this.tickVersion();
    return this.items.remove(0);
  }
}
