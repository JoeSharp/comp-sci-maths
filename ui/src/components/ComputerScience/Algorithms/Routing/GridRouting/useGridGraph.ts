import graphApi, { Graph, GraphAction } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import React from "react";
import p5 from "p5";
import { Point } from "../../../../p5/Boid/types";
import { Consumer } from "@comp-sci-maths/lib/dist/types";

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

const createInitialState = (rows: number, columns: number): Graph<Point> => {
  let graph: Graph<Point> = {
    vertices: [],
    edges: [],
    vertexValues: {}
  };

  const connect = createConnect((action) => graph = graphApi.reduce(graph, action), rows, columns);
  const disconnect = (vertex: Point) => graph = graphApi.reduce(graph, { type: 'disconnectVertex', vertex: pointToStr(vertex) });

  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      const point = { x: col, y: row };
      graph = graphApi.addVertex(graph, pointToStr(point), point);
    }
  }

  graph.vertices.map(v => graphApi.getVertexValue(graph, v)).forEach(v => connect(v));

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

  return graph;
}

const createConnect = (graphDispatch: React.Dispatch<GraphAction<Point>>, rows: number, columns: number): Consumer<Point> => {
  return (point: Point) => {
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
  };
}

const useGridGraph = ({ rows, columns }: Props): UseGridGraph => {

  const initialState: Graph<Point> = React.useMemo(() => createInitialState(rows, columns), [rows, columns]);

  const [graph, graphDispatch] = React.useReducer(graphApi.reduce, initialState);

  // es lint does'nt like the fact it can't easily interrogate the createConnect function.
  // eslint-disable-next-line
  const connect = React.useCallback(
    createConnect(graphDispatch, rows, columns),
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

  const topLeft = React.useMemo(() => ({ x: 0, y: 0 }), []);
  const bottomRight = React.useMemo(() => ({ x: columns - 1, y: rows - 1 }), [
    rows,
    columns,
  ]);

  return {
    topLeft,
    bottomRight,
    graph: graph as Graph<Point>,
    connect,
    disconnect,
    toggleConnection,
  };
};

export default useGridGraph;