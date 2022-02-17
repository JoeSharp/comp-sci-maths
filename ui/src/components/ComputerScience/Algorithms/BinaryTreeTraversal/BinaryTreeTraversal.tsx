import React from "react";
import BinaryTreeTraversalAlgorithmPicker, {
  usePicker,
} from "./BinaryTreeTraversalAlgorithmPicker";
import useBinaryTreeTraversal from "./useBinaryTreeTraversal";
import useBinaryTreeBuilder from "../../BinaryTreeBuilder/useBinaryTreeBuilder";
import BinaryTreeBuilder from "../../BinaryTreeBuilder";

const BinaryTreeTraversal: React.FunctionComponent = () => {
  const { algorithmName, componentProps } = usePicker("form-control");

  const binaryTreeBuilder = useBinaryTreeBuilder();
  const { binaryTree, version } = binaryTreeBuilder;

  const { visitedItems } = useBinaryTreeTraversal({
    binaryTree,
    algorithmName,
    version,
  });

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Algorithm</label>
          <BinaryTreeTraversalAlgorithmPicker {...componentProps} />
        </div>
      </form>

      <h2>Item Visit Order: {visitedItems.join(" -> ")}</h2>

      <BinaryTreeBuilder binaryTreeBuilder={binaryTreeBuilder} />
    </div>
  );
};

export default BinaryTreeTraversal;
