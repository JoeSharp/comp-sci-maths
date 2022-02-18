import BinaryTree from "../../dataStructures/binaryTree/BinaryTree";
import traverseInOrder from "../../algorithms/binaryTreeTraversal/traverseInOrder";
import traversePostOrder from "../../algorithms/binaryTreeTraversal/traversePostOrder";
import traversePreOrder from "../../algorithms/binaryTreeTraversal/traversePreOrder";
import { stringComparator } from "../../common";

test("Binary Tree - Traversal", () => {
  const myTree: BinaryTree<string> = new BinaryTree<string>(stringComparator)
    .add("B")
    .add("A")
    .add("D")
    .add("E")
    .add("C")
    .add("F");

  let results: string[] = [];
  traverseInOrder(myTree, (n: string) => results.push(n));
  expect(results).toEqual(["A", "B", "C", "D", "E", "F"]);

  results = []; // clear previous results
  traversePreOrder(myTree, (n: string) => results.push(n));
  expect(results).toEqual(["B", "A", "D", "C", "E", "F"]);

  results = []; // clear previous results
  traversePostOrder(myTree, (n: string) => results.push(n));
  expect(results).toEqual(["A", "C", "F", "E", "D", "B"]);
});
