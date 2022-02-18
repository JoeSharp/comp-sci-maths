import { Optional } from "../../types";

export default class LinkedItem<T> {
  value: T;
  nextItem: Optional<LinkedItem<T>>;

  constructor(value: T, nextItem?: LinkedItem<T>) {
    this.value = value;
    this.nextItem = nextItem;
  }

  setNextItem(item: LinkedItem<T>) {
    this.nextItem = item;
  }

  getNextItem(): LinkedItem<T> {
    return this.nextItem;
  }

  getValue(): T {
    return this.value;
  }
}
