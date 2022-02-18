import React from "react";
import BinaryTree from "@comp-sci-maths/lib/dist/dataStructures/binaryTree/BinaryTree";
import traversePreOrder from "@comp-sci-maths/lib/dist/algorithms/binaryTreeTraversal/traversePreOrder";
import traverseInOrder from "@comp-sci-maths/lib/dist/algorithms/binaryTreeTraversal/traverseInOrder";
import traversePostOrder from "@comp-sci-maths/lib/dist/algorithms/binaryTreeTraversal/traversePostOrder";
import { VisitFunction } from "@comp-sci-maths/lib/dist/types";

import { PRE_ORDER, IN_ORDER, POST_ORDER } from "./common";

interface Props<T> {
  version: number;
  algorithmName: string;
  binaryTree: BinaryTree<T>;
}

export interface UseBinaryTreeTraversal<T> {
  visitedItems: T[];
}

const useBinaryTreeTraversal = <T>({
  version,
  algorithmName,
  binaryTree,
}: Props<T>): UseBinaryTreeTraversal<T> => {
  const visitedItems: T[] = React.useMemo(() => {
    const items: T[] = [];
    const visit: VisitFunction<T> = (d: T) => items.push(d);

    switch (algorithmName) {
      case PRE_ORDER:
        traversePreOrder(binaryTree, visit);
        break;
      case IN_ORDER:
        traverseInOrder(binaryTree, visit);
        break;
      case POST_ORDER:
        traversePostOrder(binaryTree, visit);
        break;
    }

    return items;
    /// ewwww
    // eslint-disable-next-line
  }, [version, algorithmName, binaryTree]);

  return { visitedItems };
};

export default useBinaryTreeTraversal;
