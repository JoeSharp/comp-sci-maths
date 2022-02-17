import React from "react";
import VertexRow from "./VertexRow";

import "./graphBuilder.css";
import { v4 as uuidv4 } from "uuid";
import { StringDataItem } from "../../../../p5/Boid/types";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../../Bootstrap/Buttons/ButtonBar";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import Checkbox from '../../../../Bootstrap/Checkbox';

interface Props {
  graph: Graph<StringDataItem>;
}

const GraphBuilder: React.FunctionComponent<Props> = ({ graph }: Props) => {
  const [version, tickVersion] = React.useReducer((s) => s + 1, 0);

  const [pendingFrom, prepareEdge] = React.useState<StringDataItem | undefined>(
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
    (to: StringDataItem, weight: number) => {
      if (pendingFrom !== undefined) {
        if (newEdgeBidirectional) {
          graph.addBiDirectionalEdge(pendingFrom, to, weight);

        } else {
          graph.addUnidirectionalEdge(pendingFrom, to, weight);
        }
      }
      prepareEdge(undefined);
      tickVersion();
    },
    [pendingFrom, graph, newEdgeBidirectional]
  );
  const cancelEdge = React.useCallback(() => prepareEdge(undefined), [
    prepareEdge,
  ]);

  const clearAll = React.useCallback(() => {
    graph.vertices.forEach((v) => graph.removeVertex(v));
    tickVersion();
  }, [tickVersion, graph]);

  const [newVertexName, setNewVertexName] = React.useState<string>("Z");
  const onNewVertexChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewVertexName(value),
    [setNewVertexName]
  );

  const onAddVertex = React.useCallback(() => {
    if (newVertexName.length > 0) {
      graph.addVertex({
        key: uuidv4(),
        label: newVertexName,
        value: newVertexName,
      });
      tickVersion();
    }
  }, [newVertexName, graph]);

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

  // Ewww...it doesn't like keeping an eye on the version, when version is not then used...
  // eslint-disable-next-line
  const vertices = React.useMemo(() => graph.vertices, [graph, version]);

  return (
    <div>
      <h2>Edit Graph (v{version})</h2>
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
          {vertices.map((vertex, i) => (
            <VertexRow
              key={i}
              {...{
                vertex,
                version,
                clearAll,
                tickVersion,
                graph,
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
