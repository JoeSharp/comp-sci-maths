import BinaryTree from "../../dataStructures/binaryTree/BinaryTree";
import { VisitFunction } from "../../types";

function traversePreOrder<T>(tree: BinaryTree<T>, visit: VisitFunction<T>) {
  if (!!tree.value) {
    visit(tree.value);
  }
  if (!!tree.leftBranch) {
    traversePreOrder(tree.leftBranch, visit);
  }
  if (!!tree.rightBranch) {
    traversePreOrder(tree.rightBranch, visit);
  }
}

export default traversePreOrder;
