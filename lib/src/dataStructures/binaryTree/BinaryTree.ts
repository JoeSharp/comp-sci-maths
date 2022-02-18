import { Comparator, Optional } from "../../types";
import { ObservableVersioned } from "../../common";

export default class BinaryTree<T> extends ObservableVersioned {
  value: Optional<T>;
  compare: Comparator<T>;
  leftBranch: Optional<BinaryTree<T>>;
  rightBranch: Optional<BinaryTree<T>>;

  constructor(compare: Comparator<T>, value?: Optional<T>) {
    super();
    this.compare = compare;
    this.value = value;
    this.leftBranch = null;
    this.rightBranch = null;
  }

  clear() {
    this.value = undefined;
    this.leftBranch = null;
    this.rightBranch = null;
  }

  toString(): string {
    if (this.leftBranch !== null && this.rightBranch !== null) {
      return `(${this.leftBranch.toString()} ${this.value} ${this.rightBranch.toString()
        })`;
    } else if (this.leftBranch !== null) {
      return `(${this.leftBranch.toString()} ${this.value} null)`;
    } else if (this.rightBranch !== null) {
      return `(null ${this.value} ${this.rightBranch.toString()})`;
    } else {
      return `${this.value}`;
    }
  }

  contains(item: T) {
    if (this.value === item) {
      return true;
    } else if (this.leftBranch && this.leftBranch.contains(item)) {
      return true;
    } else if (this.rightBranch && this.rightBranch.contains(item)) {
      return true;
    }

    return false;
  }

  add(item: T): this {
    if (this.value === undefined) {
      this.value = item;
    } else if (this.compare(item, this.value) < 0) {
      if (!!this.leftBranch) {
        this.leftBranch.add(item);
      } else {
        this.leftBranch = new BinaryTree(this.compare, item);
      }
    } else {
      if (!!this.rightBranch) {
        this.rightBranch.add(item);
      } else {
        this.rightBranch = new BinaryTree(this.compare, item);
      }
    }
    this.tickVersion();
    return this;
  }
}
