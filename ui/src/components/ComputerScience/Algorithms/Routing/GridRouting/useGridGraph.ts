import Graph from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";
import React from "react";
import p5 from "p5";
import { PointDataItem } from "../../../../p5/Boid//types";

interface Props {
  rows: number;
  columns: number;
}

export interface UseGridGraph {
  version: number;
  topLeft: PointDataItem;
  bottomRight: PointDataItem;
  graph: Graph<PointDataItem>;
  connect: (vertex: PointDataItem) => void;
  disconnect: (vertex: PointDataItem) => void;
  toggleConnection: (vertex: PointDataItem) => void;
}

export function createP5Vector(x: number, y: number): p5.Vector {
  return p5.Vector.random2D().set(x, y);
}

export function createKeyedPoint(x: number, y: number): PointDataItem {
  return {
    key: `${x}-${y}`,
    label: `${x}, ${y}`,
    value: { x, y },
  };
}

const useGridGraph = ({ rows, columns }: Props): UseGridGraph => {
  const [version, tickVersion] = React.useReducer((s) => s + 1, 0);

  const graph = React.useRef<Graph<PointDataItem>>(new Graph());

  const connect = React.useCallback(
    (point: PointDataItem) => {
      if (point.value.y > 0) {
        const to: PointDataItem = createKeyedPoint(
          point.value.x,
          point.value.y - 1
        );
        graph.current.addBiDirectionalEdge(point, to);
      }
      if (point.value.y < rows - 1) {
        const to: PointDataItem = createKeyedPoint(
          point.value.x,
          point.value.y + 1
        );
        graph.current.addBiDirectionalEdge(point, to);
      }
      if (point.value.x > 0) {
        const to: PointDataItem = createKeyedPoint(
          point.value.x - 1,
          point.value.y
        );
        graph.current.addBiDirectionalEdge(point, to);
      }
      if (point.value.x < columns - 1) {
        const to: PointDataItem = createKeyedPoint(
          point.value.x + 1,
          point.value.y
        );
        graph.current.addBiDirectionalEdge(point, to);
      }
      tickVersion();
    },
    [rows, columns, graph, tickVersion]
  );
  const disconnect = React.useCallback(
    (vertex: PointDataItem) => {
      graph.current.removeVertex(vertex);
      graph.current.addVertex(vertex);

      tickVersion();
    },
    [graph]
  );

  const toggleConnection = React.useCallback(
    (vertex: PointDataItem) => {
      if (
        graph.current.getIncoming(vertex.key).length > 0 ||
        graph.current.getOutgoing(vertex.key).length > 0
      ) {
        disconnect(vertex);
      } else {
        connect(vertex);
      }
    },
    [graph, disconnect, connect]
  );

  React.useEffect(() => {
    graph.current.clearAll();

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        graph.current.addVertex(createKeyedPoint(col, row));
      }
    }

    graph.current.vertices.forEach((v) => connect(v));
    disconnect(createKeyedPoint(0, 7));
    disconnect(createKeyedPoint(1, 6));
    disconnect(createKeyedPoint(2, 5));
    disconnect(createKeyedPoint(3, 4));
    disconnect(createKeyedPoint(4, 3));
    disconnect(createKeyedPoint(4, 4));
    disconnect(createKeyedPoint(4, 5));

    disconnect(createKeyedPoint(8, 1));
    disconnect(createKeyedPoint(8, 2));
    disconnect(createKeyedPoint(8, 3));
    disconnect(createKeyedPoint(8, 4));

    disconnect(createKeyedPoint(9, 4));
    disconnect(createKeyedPoint(9, 7));
    disconnect(createKeyedPoint(10, 3));
    disconnect(createKeyedPoint(11, 1));
    disconnect(createKeyedPoint(11, 6));
    disconnect(createKeyedPoint(11, 7));

    disconnect(createKeyedPoint(12, 1));
    disconnect(createKeyedPoint(12, 4));
    disconnect(createKeyedPoint(12, 5));

    tickVersion();
  }, [rows, columns, connect, disconnect]);

  return {
    version,
    topLeft: React.useMemo(() => createKeyedPoint(0, 0), []),
    bottomRight: React.useMemo(() => createKeyedPoint(columns - 1, rows - 1), [
      rows,
      columns,
    ]),
    graph: graph.current,
    connect,
    disconnect,
    toggleConnection,
  };
};

export default useGridGraph;