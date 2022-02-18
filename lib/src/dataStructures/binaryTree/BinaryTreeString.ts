import { stringComparator } from "../../common";
import BinaryTree from "./BinaryTree";

export default class BinaryTreeStrings extends BinaryTree<string> {
  constructor(value?: string) {
    super(stringComparator, value);
  }
}
