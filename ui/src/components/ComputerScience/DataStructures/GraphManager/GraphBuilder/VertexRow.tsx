import React from "react";

import Graph, {
  Edge,
} from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";
import EdgesCell from "./EdgeCell";
import { StringDataItem } from "../../../../p5/Boid/types";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../../Bootstrap/Buttons/ButtonBar";
import { Props as ButtonProps } from "../../../../Bootstrap/Buttons/Button";

interface Props {
  vertex: StringDataItem;
  version: number;
  graph: Graph<StringDataItem>;
  pendingFrom: StringDataItem | undefined;
  newEdgeWeight: number;
  prepareEdge: (from: StringDataItem) => void;
  cancelEdge: () => void;
  completeEdge: (to: StringDataItem, weight: number) => void;
  clearAll: () => void;
  tickVersion: () => void;
}

const GET_EDGE_FROM = (edge: Edge<StringDataItem>) => edge.from;
const GET_EDGE_TO = (edge: Edge<StringDataItem>) => edge.to;

const VertexRow: React.FunctionComponent<Props> = ({
  vertex,
  version,
  tickVersion,
  newEdgeWeight,
  graph,
  pendingFrom,
  prepareEdge,
  completeEdge,
  cancelEdge,
}) => {
  const onPrepareEdge = React.useCallback(() => prepareEdge(vertex), [
    vertex,
    prepareEdge,
  ]);
  const onCompleteEdge = React.useCallback(
    () => completeEdge(vertex, newEdgeWeight),
    [vertex, newEdgeWeight, completeEdge]
  );
  const onCancelEdge = React.useCallback(() => cancelEdge(), [cancelEdge]);
  const onRemoveVertex = React.useCallback(() => {
    graph.removeVertex(vertex);
    tickVersion();
  }, [vertex, graph, tickVersion]);

  const filterOutgoing = React.useCallback(
    (edge: Edge<StringDataItem>) => graph.areVerticesEqual(edge.from, vertex),
    [vertex, graph]
  );
  const filterIncoming = React.useCallback(
    (edge: Edge<StringDataItem>) => graph.areVerticesEqual(edge.to, vertex),
    [vertex, graph]
  );
  const buttonBarProps: ButtonBarProps = React.useMemo(() => {
    const buttons: ButtonProps[] = [];

    if (pendingFrom === undefined) {
      buttons.push({
        onClick: onPrepareEdge,
        className: "btn-sm",
        text: "Edge From",
        styleType: "primary",
      });
    }

    if (pendingFrom !== undefined && pendingFrom !== vertex) {
      buttons.push({
        onClick: onCompleteEdge,
        className: "btn-sm",
        text: "Edge To",
        styleType: "success",
      });
    }

    if (pendingFrom === vertex) {
      buttons.push({
        onClick: onCancelEdge,
        className: "btn-sm",
        styleType: "warning",
        text: "Cancel",
      });
    }
    buttons.push({
      onClick: onRemoveVertex,
      className: "btn-sm",
      styleType: "danger",
      text: "Remove Vertex",
    });

    return { buttons };
  }, [
    pendingFrom,
    vertex,
    onPrepareEdge,
    onCompleteEdge,
    onRemoveVertex,
    onCancelEdge,
  ]);

  return (
    <tr>
      <td>{vertex.label}</td>
      <td>
        <EdgesCell
          version={version}
          tickVersion={tickVersion}
          filter={filterOutgoing}
          getOtherEnd={GET_EDGE_TO}
          graph={graph}
        />
      </td>
      <td>
        <EdgesCell
          version={version}
          tickVersion={tickVersion}
          filter={filterIncoming}
          getOtherEnd={GET_EDGE_FROM}
          graph={graph}
        />
      </td>
      <td>
        <ButtonBar {...buttonBarProps} />
      </td>
    </tr>
  );
};

export default VertexRow;
