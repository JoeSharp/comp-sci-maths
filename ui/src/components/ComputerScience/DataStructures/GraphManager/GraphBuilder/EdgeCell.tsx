import React from "react";

import { Graph, Edge, GraphAction } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

interface Props {
  graph: Graph<string>;
  dispatch: (action: GraphAction<string>) => void;
  filter: (edge: Edge) => boolean;
  getOtherEnd: (edge: Edge) => string;
}

const EdgesCell: React.FunctionComponent<Props> = ({
  graph,
  dispatch,
  filter,
  getOtherEnd,
}) => {
  return (
    <div className="btn-toolbar">
      {graph.edges.filter(filter).map((edge, i) => (
        <span key={i} className="input-group btn-group edge-buttons">
          <div className="input-group-prepend">
            <div className="input-group-text">{getOtherEnd(edge)} </div>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => dispatch({ type: 'removeEdge', ...edge })}
          >
            X
          </button>
        </span>
      ))}
    </div>
  );
};

export default EdgesCell;
