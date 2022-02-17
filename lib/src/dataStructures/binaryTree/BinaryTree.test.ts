import BinaryTree from "./BinaryTree";
import { simpleLogger } from "common";
import BinaryTreeString from "./BinaryTreeString";
import BinaryTreeNumber from "./BinaryTreeNumber";

describe("Binary Tree", () => {
  test("Contains", () => {
    const myTree = new BinaryTreeString();

    myTree.add("B");
    myTree.add("A");
    myTree.add("D");
    myTree.add("E");
    myTree.add("C");
    myTree.add("F");

    const positive = myTree.contains("C");
    const negative = myTree.contains("X");

    expect(positive).toBeTruthy();
    expect(negative).toBeFalsy();
  });

  test("With Duplicates", () => {
    const myTree = new BinaryTreeNumber();

    myTree.add(56);
    myTree.add(2);
    myTree.add(28);
    myTree.add(2);
    myTree.add(14);
    myTree.add(2);
    myTree.add(7);

    simpleLogger.debug(myTree.toString());
  });

})