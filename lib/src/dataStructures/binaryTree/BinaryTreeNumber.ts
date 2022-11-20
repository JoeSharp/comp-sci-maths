import { numberComparator } from "../../common";
import BinaryTree from "./BinaryTree";

export default class BinaryTreeNumber extends BinaryTree<number> {
  constructor(value?: number) {
    super(numberComparator, value);
  }
}
