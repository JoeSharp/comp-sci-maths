import React from "react";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../../lib/useLocalStorage";

import {
  graphs as cannedGraphs,
  vertexPositionsByGraphName,
} from "./cannedGraphs";
import { createInitialState, Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import {
  GraphsById,
  PositionsForGraphName,
  PositionByVertex,
  SavedGraphState,
} from "./types";
import cogoToast from "cogo-toast";

export interface UseSavedGraph {
  names: string[];
  graphs: GraphsById;
  vertexPositionsByGraph: PositionsForGraphName;
  createNew(name: string): void;
  save(name: string, graph: Graph<any>, positions: PositionByVertex): void;
  reset: () => void;
}

const defaultSavedGraphState: SavedGraphState = Object.entries(cannedGraphs)
  .map(([name, generator]) => ({ name, graph: generator() }))
  .reduce((acc, { name, graph }) => ({ ...acc, [name]: graph }), {});

const defaultSavedVertexState: PositionsForGraphName = vertexPositionsByGraphName;

const useSavedGraph = (): UseSavedGraph => {
  const {
    value: graphsData,
    reduceValue: reduceGraphs,
    setValue: setGraphs,
  } = useLocalStorage<SavedGraphState>(
    "saved-graphs-fn",
    defaultSavedGraphState,
    useStoreObjectFactory()
  );

  const {
    value: vertexPositionsByGraph,
    reduceValue: reduceVertexPositions,
    setValue: setVertexPositions,
  } = useLocalStorage<PositionsForGraphName>(
    "saved-graph-positions-fn",
    defaultSavedVertexState,
    useStoreObjectFactory()
  );

  const names: string[] = React.useMemo(() => Object.keys(graphsData), [
    graphsData,
  ]);
  const graphs: GraphsById = React.useMemo(
    () =>
      Object.entries(graphsData)
        .map(([name, graphData]) => {
          // Build full graphs from the base data
          const graph = createInitialState();
          graph.vertices = graphData.vertices;
          graph.edges = graphData.edges;
          return { name, graph };
        })
        .reduce((acc, { name, graph }) => ({ ...acc, [name]: graph }), {}),
    [graphsData]
  );

  const createNew = React.useCallback(
    (name: string) => {
      if (name.length < 3) {
        cogoToast.error("Could not save graph with short name (length < 3)");
      } else if (names.includes(name)) {
        cogoToast.error("This name already exists");
      } else {
        reduceGraphs((existing: SavedGraphState) => ({
          ...existing,
          [name]: createInitialState(),
        }));
      }
    },
    [reduceGraphs, names]
  );

  const save = React.useCallback(
    (name: string, graph: Graph<any>, positions: PositionByVertex) => {
      reduceGraphs((existing: SavedGraphState) => ({
        ...existing,
        [name]: graph,
      }));
      reduceVertexPositions((existing: PositionsForGraphName) => ({
        ...existing,
        [name]: positions,
      }));
    },
    [reduceGraphs, reduceVertexPositions]
  );

  const reset = React.useCallback(() => {
    setGraphs(defaultSavedGraphState);
    setVertexPositions({});
  }, [setGraphs, setVertexPositions]);

  return {
    names,
    graphs,
    vertexPositionsByGraph,
    createNew,
    save,
    reset,
  };
};

export default useSavedGraph;
