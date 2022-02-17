import BinaryTree from "dataStructures/binaryTree/BinaryTree";
import { VisitFunction } from "types";

function traversePostOrder<T>(tree: BinaryTree<T>, visit: VisitFunction<T>) {
  if (!!tree.leftBranch) {
    traversePostOrder(tree.leftBranch, visit);
  }
  if (!!tree.rightBranch) {
    traversePostOrder(tree.rightBranch, visit);
  }
  if (!!tree.value) {
    visit(tree.value);
  }
}

export default traversePostOrder;
