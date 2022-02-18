import BinaryTree from "../../dataStructures/binaryTree/BinaryTree";
import { VisitFunction } from "../../types";

function traverseInOrder<T>(tree: BinaryTree<T>, visit: VisitFunction<T>) {
  if (!!tree.leftBranch) {
    traverseInOrder(tree.leftBranch, visit);
  }
  if (!!tree.value) {
    visit(tree.value);
  }
  if (!!tree.rightBranch) {
    traverseInOrder(tree.rightBranch, visit);
  }
}

export default traverseInOrder;
