import React from "react";

import {
  Graph,
  GraphAction,
  Edge,
} from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import EdgesCell from "./EdgeCell";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../../Bootstrap/Buttons/ButtonBar";
import { Props as ButtonProps } from "../../../../Bootstrap/Buttons/Button";

interface Props {
  vertex: string;
  graph: Graph<string>;
  dispatch: (action: GraphAction<string>) => void;
  pendingFrom: string | undefined;
  newEdgeWeight: number;
  prepareEdge: (from: string) => void;
  cancelEdge: () => void;
  completeEdge: (to: string, weight: number) => void;
  clearAll: () => void;
}

const GET_EDGE_FROM = (edge: Edge) => edge.from;
const GET_EDGE_TO = (edge: Edge) => edge.to;

const VertexRow: React.FunctionComponent<Props> = ({
  vertex,
  dispatch,
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
    dispatch({ type: 'removeVertex', vertex });
  }, [vertex, dispatch]);

  const filterOutgoing = React.useCallback(
    (edge: Edge) => edge.from === vertex,
    [vertex]
  );
  const filterIncoming = React.useCallback(
    (edge: Edge) => edge.to === vertex,
    [vertex]
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
      <td>{vertex}</td>
      <td>
        <EdgesCell
          filter={filterOutgoing}
          getOtherEnd={GET_EDGE_TO}
          graph={graph}
          dispatch={dispatch}
        />
      </td>
      <td>
        <EdgesCell
          filter={filterIncoming}
          getOtherEnd={GET_EDGE_FROM}
          graph={graph}
          dispatch={dispatch}
        />
      </td>
      <td>
        <ButtonBar {...buttonBarProps} />
      </td>
    </tr>
  );
};

export default VertexRow;
