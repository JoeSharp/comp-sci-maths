import graphApi, { Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import React from "react";
import p5 from "p5";
import { Point } from "../../../../p5/Boid/types";

interface Props {
  rows: number;
  columns: number;
}

export interface UseGridGraph {
  topLeft: Point;
  bottomRight: Point;
  graph: Graph<Point>;
  connect: (vertex: Point) => void;
  disconnect: (vertex: Point) => void;
  toggleConnection: (vertex: Point) => void;
}

export function createP5Vector(x: number, y: number): p5.Vector {
  return p5.Vector.random2D().set(x, y);
}

export function pointToStr({ x, y }: Point): string {
  return `${x}-${y}`;
}

const initialState: Graph<Point> = graphApi.createInitialState<Point>();

const useGridGraph = ({ rows, columns }: Props): UseGridGraph => {

  const [graph, graphDispatch] = React.useReducer(graphApi.reduce, initialState);

  const connect = React.useCallback(
    (point: Point) => {
      const from = pointToStr(point);
      if (point.y > 0) {
        graphDispatch({
          type: 'addBidirectionalEdge',
          from,
          to: pointToStr({ x: point.x, y: point.y - 1 })
        })
      }
      if (point.y < rows - 1) {
        graphDispatch({
          type: 'addBidirectionalEdge', from, to: pointToStr({
            x: point.x,
            y: point.y + 1
          })
        })
      }
      if (point.x > 0) {
        graphDispatch({
          type: 'addBidirectionalEdge', from, to: pointToStr({
            x: point.x - 1,
            y: point.y
          })
        })
      }
      if (point.x < columns - 1) {

        graphDispatch({
          type: 'addBidirectionalEdge', from, to: pointToStr({
            x: point.x + 1,
            y: point.y
          })
        })
      }
    },
    [rows, columns]
  );
  const disconnect = React.useCallback(
    (vertex: Point) => graphDispatch({ type: 'disconnectVertex', vertex: pointToStr(vertex) }),
    []
  );

  const toggleConnection = React.useCallback(
    (vertex: Point) => {
      if (
        graphApi.getIncoming(graph, pointToStr(vertex)).length > 0 ||
        graphApi.getOutgoing(graph, pointToStr(vertex)).length > 0
      ) {
        disconnect(vertex);
      } else {
        connect(vertex);
      }
    },
    [graph, disconnect, connect]
  );

  React.useEffect(() => {
    graphDispatch({ type: 'reset' });

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        const point = { x: col, y: row };
        graphDispatch({ type: 'addVertex', vertex: pointToStr(point), value: point })
      }
    }

    graph.vertices.map(v => graphApi.getVertexValue(graph, v) as Point).forEach((v) => connect(v));
    disconnect({ x: 0, y: 7 });
    disconnect({ x: 1, y: 6 });
    disconnect({ x: 2, y: 5 });
    disconnect({ x: 3, y: 4 });
    disconnect({ x: 4, y: 3 });
    disconnect({ x: 4, y: 4 });
    disconnect({ x: 4, y: 5 });
    disconnect({ x: 8, y: 1 });
    disconnect({ x: 8, y: 2 });
    disconnect({ x: 8, y: 3 });
    disconnect({ x: 8, y: 4 });

    disconnect({ x: 9, y: 4 });
    disconnect({ x: 9, y: 7 });
    disconnect({ x: 10, y: 3 });
    disconnect({ x: 11, y: 1 });
    disconnect({ x: 11, y: 6 });
    disconnect({ x: 11, y: 7 });

    disconnect({ x: 12, y: 1 });
    disconnect({ x: 12, y: 4 });
    disconnect({ x: 12, y: 5 });
  }, [graph, rows, columns, connect, disconnect]);

  return {
    topLeft: React.useMemo(() => ({ x: 0, y: 0 }), []),
    bottomRight: React.useMemo(() => ({ x: columns - 1, y: rows - 1 }), [
      rows,
      columns,
    ]),
    graph: graph as Graph<Point>,
    connect,
    disconnect,
    toggleConnection,
  };
};

export default useGridGraph;