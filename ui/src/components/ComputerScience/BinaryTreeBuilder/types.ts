import BinaryTree from "@comp-sci-maths/lib/dist/dataStructures/binaryTree/BinaryTree";

export enum TreeDirection {
  up = "up",
  down = "down",
}

export interface Config<T> {
  binaryTree: BinaryTree<T>;
  treeDirection: TreeDirection;
  toString: (v: T) => string;
}
