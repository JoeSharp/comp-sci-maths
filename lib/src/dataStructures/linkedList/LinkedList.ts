import LinkedItem from "./LinkedItem";
import { MatchFunction, Optional } from "../../types";
import { ObservableVersioned } from "../../common";
import { NO_MATCH } from "../../algorithms/search/common";

export default class LinkedList<T> extends ObservableVersioned {
  startItem: Optional<LinkedItem<T>>;
  length: number;

  constructor() {
    super();
    this.startItem = undefined;
    this.length = 0;
  }

  *[Symbol.iterator]() {
    let cItem = this.startItem;
    while (!!cItem) {
      yield cItem.getValue();
      cItem = cItem.getNextItem();
    }
  }

  size(): number {
    return this.length;
  }

  toArray() {
    const arr: T[] = [];
    for (const i of this) {
      arr.push(i);
    }
    return arr;
  }

  isEmpty() {
    return this.length === 0;
  }

  empty(): this {
    this.startItem = undefined;
    this.length = 0;
    return this;
  }

  insert(index: number, item: T) {
    let inserted = false;
    const newItem: LinkedItem<T> = new LinkedItem<T>(item);

    if (index === 0) {
      newItem.setNextItem(this.startItem);
      this.startItem = newItem;
      inserted = true;
    } else {
      let tIndex: number = 1;
      let currentItem: LinkedItem<T> = this.startItem;
      while (!!currentItem) {
        if (tIndex === index) {
          newItem.setNextItem(currentItem.getNextItem());
          currentItem.setNextItem(newItem);
          inserted = true;
          break;
        }

        tIndex += 1;
        currentItem = currentItem.getNextItem();
      }
    }

    if (inserted) {
      this.length += 1;
      this.tickVersion();
    }

    return inserted;
  }

  get(index: number): T {
    let tIndex = 0;
    let cItem = this.startItem;
    while (!!cItem) {
      if (tIndex === index) {
        return cItem.getValue();
      }
      cItem = cItem.getNextItem();
      tIndex += 1;
    }

    return undefined;
  }

  appendAll(...items: T[]): this {
    items.forEach(i => this.append(i));
    return this;
  }

  append(item: T): this {
    const newItem = new LinkedItem(item);

    if (!!this.startItem) {
      let currentItem = this.startItem;

      while (!!currentItem.getNextItem()) {
        currentItem = currentItem.getNextItem();
      }

      currentItem.setNextItem(newItem);
    } else {
      this.startItem = newItem;
    }

    this.length += 1;
    this.tickVersion();
    return this;
  }

  contains(matchFunction: MatchFunction<T>): boolean {
    return this.findMatch(matchFunction) !== NO_MATCH;
  }

  findMatch(matchFunction: MatchFunction<T>): number {
    let index: number = 0;
    let cItem: LinkedItem<T> = this.startItem;
    while (!!cItem) {
      if (matchFunction(cItem.getValue())) {
        return index;
      }
      cItem = cItem.getNextItem();
      index += 1;
    }
    this.tickVersion();

    return NO_MATCH;
  }

  /**
   * Removes
   * @param {function} matchFunction Returns true for the object being removed
   * @returns The removed item
   */
  removeMatch(matchFunction: MatchFunction<T>): Optional<T> {
    let removed: Optional<T>;
    let index: number = 0;
    let cItem: LinkedItem<T> = this.startItem;
    while (!!cItem) {
      if (matchFunction(cItem.getValue())) {
        removed = this.remove(index);
        break;
      }
      cItem = cItem.getNextItem();
      index += 1;
    }
    this.tickVersion();

    return removed;
  }

  /**
   * Remove an item in a specific position
   * @param {number} index The index of the object to remove
   * @returns The removed item
   */
  remove(index: number): T {
    let removed: Optional<T>;

    if (index === 0) {
      if (!!this.startItem) {
        removed = this.startItem.getValue();
        this.startItem = this.startItem.getNextItem();
      }
    } else {
      let tIndex = 1;
      let currentItem = this.startItem;
      while (!!currentItem.getNextItem()) {
        if (tIndex === index) {
          const toRemove = currentItem.getNextItem();
          if (!!toRemove) {
            removed = toRemove.getValue();
            currentItem.setNextItem(toRemove.getNextItem());
            break;
          }
        }
        currentItem = currentItem.getNextItem();
        tIndex += 1;
      }
    }

    if (removed) {
      this.length -= 1;
      this.tickVersion();
    }

    return removed;
  }

  toString(): string {
    // return [this].reduce((acc, curr) => (acc += ` ${curr.getValue()}`), "");
    const arr: T[] = [];
    for (const i of this) {
      arr.push(i);
    }
    return arr.join(" ");
  }
}
