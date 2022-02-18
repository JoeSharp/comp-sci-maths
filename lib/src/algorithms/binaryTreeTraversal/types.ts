import BinaryTree from "../../dataStructures/binaryTree/BinaryTree";

export type BinaryTreeTraversal<T> = (
  tree: BinaryTree<T>,
  visit: (n: T) => any
) => void;
