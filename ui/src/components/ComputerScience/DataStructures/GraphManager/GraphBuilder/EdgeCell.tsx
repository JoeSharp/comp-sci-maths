import React from "react";

import Graph, {
  Edge,
} from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "../../../../p5/Boid/types";

interface Props {
  version: number;
  graph: Graph<StringDataItem>;
  filter: (edge: Edge<StringDataItem>) => boolean;
  getOtherEnd: (edge: Edge<StringDataItem>) => StringDataItem;
  tickVersion: () => void;
}

const EdgesCell: React.FunctionComponent<Props> = ({
  graph,
  tickVersion,
  filter,
  getOtherEnd,
}) => {
  return (
    <div className="btn-toolbar">
      {graph.edges.filter(filter).map((edge, i) => (
        <span key={i} className="input-group btn-group edge-buttons">
          <div className="input-group-prepend">
            <div className="input-group-text">{getOtherEnd(edge).label} </div>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              tickVersion();
              graph.removeEdge(edge.from, edge.to);
            }}
          >
            X
          </button>
        </span>
      ))}
    </div>
  );
};

export default EdgesCell;
