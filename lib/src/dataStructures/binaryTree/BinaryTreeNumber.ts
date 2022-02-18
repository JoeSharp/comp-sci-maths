import { arithmeticComparator } from "../../common";
import BinaryTree from "./BinaryTree";

export default class BinaryTreeNumber extends BinaryTree<number> {
  constructor(value?: number) {
    super(arithmeticComparator, value);
  }
}
