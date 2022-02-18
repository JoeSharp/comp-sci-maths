import React from "react";
import BinaryTree from "@comp-sci-maths/lib/dist/dataStructures/binaryTree/BinaryTree";
import { stringComparator } from "@comp-sci-maths/lib/dist/common";

export interface UseBinaryTreeBuilder {
  binaryTree: BinaryTree<string>;
  version: number;
  addValue: (value: string) => void;
  clearAll: () => void;
}

export const defaultBinaryTree: BinaryTree<string> = new BinaryTree<string>(
  stringComparator
)
  .add("B")
  .add("A")
  .add("D")
  .add("E")
  .add("C")
  .add("F");

const useBinaryTreeBuilder = (
  initialTree: BinaryTree<string> = defaultBinaryTree
): UseBinaryTreeBuilder => {
  const binaryTree = React.useRef(initialTree);
  const [version, tickVersion] = React.useReducer((s) => s + 1, 0);

  const addValue = React.useCallback(
    (value: string) => {
      binaryTree.current.add(value);
      tickVersion();
    },
    [binaryTree]
  );

  const clearAll = React.useCallback(() => {
    binaryTree.current.value = undefined;
    binaryTree.current.leftBranch = undefined;
    binaryTree.current.rightBranch = undefined;
    tickVersion();
  }, []);

  return {
    binaryTree: binaryTree.current,
    clearAll,
    addValue,
    version,
  };
};

export default useBinaryTreeBuilder;
