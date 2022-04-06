import React from "react";
import GraphTraversalAlgorithmPicker, {
  usePicker as useAlgorithmPicker,
} from "./GraphTraversalAlgorithmPicker";
import useGraphTraversal from "./useGraphTraversal";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "../../../ComputerScience/DataStructures/GraphManager/GraphBuilder/VertexPicker";
import GraphPickerWithSketch, {
  usePicker as useGraphPicker,
} from "../../DataStructures/GraphManager/GraphPickerWithSketch";

const Traversal: React.FunctionComponent = () => {
  const {
    algorithmName,
    componentProps: algorithmPickerProps,
  } = useAlgorithmPicker("form-control");

  const { graph, componentProps: graphPickerProps } = useGraphPicker(
    "largerStringGraph"
  );

  const {
    vertex: startVertex,
    componentProps: vertexPickerProps,
  } = useVertexPicker(graph, "form-control");

  const { visitedItems } = useGraphTraversal({
    algorithmName,
    graph,
    startVertex,
  });

  return (
    <div>
      <GraphPickerWithSketch {...graphPickerProps} />
      <form>
        <div className="form-group">
          <label>Algorithm</label>
          <GraphTraversalAlgorithmPicker {...algorithmPickerProps} />
        </div>
        <div className="form-group">
          <label>Start Vertex</label>
          <VertexPicker {...vertexPickerProps} />
        </div>
      </form>

      <h2>Item Visit Order: {visitedItems.join(" -> ")}</h2>
    </div>
  );
};

export default Traversal;
