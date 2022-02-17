import React from "react";
import BinaryTreeBuilder from "../../BinaryTreeBuilder";
import useBinaryTreeBuilder from "../../BinaryTreeBuilder/useBinaryTreeBuilder";

const BinaryTreeComponent: React.FunctionComponent = () => {
  const binaryTreeBuilder = useBinaryTreeBuilder();

  return (
    <div>
      <BinaryTreeBuilder binaryTreeBuilder={binaryTreeBuilder} />
    </div>
  );
};

export default BinaryTreeComponent;
