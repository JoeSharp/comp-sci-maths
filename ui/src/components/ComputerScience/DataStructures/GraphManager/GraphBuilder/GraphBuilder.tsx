import React from "react";
import VertexRow from "./VertexRow";

import "./graphBuilder.css";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../../Bootstrap/Buttons/ButtonBar";
import Checkbox from '../../../../Bootstrap/Checkbox';
import { GraphState, GraphAction } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

interface Props {
  graph: GraphState<string>;
  dispatch: (action: GraphAction<string>) => void;
}

const GraphBuilder: React.FunctionComponent<Props> = ({ graph, dispatch }: Props) => {
  const [pendingFrom, prepareEdge] = React.useState<string | undefined>(
    undefined
  );

  const [newEdgeWeight, setNewEdgeWeight] = React.useState<number>(1);
  const onNewEdgeWeightChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewEdgeWeight(parseInt(value)),
    [setNewEdgeWeight]
  );

  const [newEdgeBidirectional, setNewEdgeBidirectional] = React.useState<boolean>(true);
  const onNewEdgeBidirectionalChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setNewEdgeBidirectional(checked),
    [setNewEdgeBidirectional]
  );


  const completeEdge = React.useCallback(
    (to: string, weight: number) => {
      if (pendingFrom !== undefined) {
        if (newEdgeBidirectional) {
          dispatch({
            type: 'addBidirectionalEdge',
            from: pendingFrom,
            to,
            weight
          })
        } else {
          dispatch({
            type: 'addUnidirectionalEdge',
            from: pendingFrom,
            to,
            weight
          })
        }
      }
      prepareEdge(undefined);
    },
    [pendingFrom, newEdgeBidirectional, dispatch]
  );
  const cancelEdge = React.useCallback(() => prepareEdge(undefined), [
    prepareEdge,
  ]);

  const clearAll = React.useCallback(() => {
    dispatch({ type: 'reset' });
  }, [dispatch]);

  const [newVertexName, setNewVertexName] = React.useState<string>("Z");
  const onNewVertexChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewVertexName(value),
    [setNewVertexName]
  );

  const onAddVertex = React.useCallback(() => {
    if (newVertexName.length > 0) {
      dispatch({ type: 'addVertex', vertex: newVertexName })
    }
  }, [newVertexName, dispatch]);

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          onClick: onAddVertex,
          text: "Add Vertex",
          styleType: "primary",
        },
        {
          onClick: clearAll,
          text: "Clear All",
          styleType: "danger",
        },
      ],
    }),
    [clearAll, onAddVertex]
  );

  return (
    <div>
      <h2>Edit Graph</h2>
      <form>
        <div className="form-group">
          <label htmlFor="newVertexName">New Vertex Name</label>
          <input
            id="newVertexName"
            className="form-control"
            value={newVertexName}
            onChange={onNewVertexChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newEdgeWeight">New Edge Weight</label>
          <input
            id="newEdgeWeight"
            className="form-control"
            type="number"
            value={newEdgeWeight}
            onChange={onNewEdgeWeightChange}
          />
        </div>
        <div className='form-group'>
          <Checkbox
            label='New Edges Bidirectional'
            id='chkNewEdgeBidirectional'
            checked={newEdgeBidirectional}
            onChange={onNewEdgeBidirectionalChange} />
        </div>
      </form>
      <ButtonBar {...buttonBarProps} />

      <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th>Vertex</th>
            <th>Outgoing</th>
            <th>Incoming</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {graph.vertices.map((vertex, i) => (
            <VertexRow
              key={i}
              {...{
                vertex,
                clearAll,
                graph,
                dispatch,
                newEdgeWeight,
                cancelEdge,
                completeEdge,
                prepareEdge,
                pendingFrom,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GraphBuilder;
