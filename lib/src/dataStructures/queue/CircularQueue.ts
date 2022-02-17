import { ObservableVersioned } from "common";

export default class CircularQueue<T> extends ObservableVersioned {
  frontPointer: number;
  rearPointer: number;
  items: T[];
  size: number;
  capacity: number;

  constructor(capacity = 10) {
    super();
    this.frontPointer = 0;
    this.rearPointer = 0;
    this.items = new Array(capacity);
    this.size = 0;
    this.capacity = capacity;
  }

  getSize(): number {
    return this.size;
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(item: T) {
    if (this.isFull()) {
      throw new Error("Queue Full");
    }

    this.items[this.rearPointer] = item;
    this.rearPointer += 1;
    this.rearPointer %= this.items.length;
    this.size += 1;
    this.tickVersion();
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    const item = this.items[this.frontPointer];
    this.frontPointer += 1;
    this.frontPointer %= this.items.length;
    this.size -= 1;
    this.tickVersion();
    return item;
  }
}
