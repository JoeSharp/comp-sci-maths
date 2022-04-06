import React from "react";
import { Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { cloneDeep } from "lodash";

import {
  dijkstras,
  getPathTo,
} from "@comp-sci-maths/lib/dist/algorithms/routing/dijkstras";
import {
  ShortestPathTree,
  ObserverArgsWithPathFrom,
  HeuristicCostFunction,
  RoutingObserver,
} from "@comp-sci-maths/lib/dist/algorithms/routing/types";
import { HeuristicCostById } from "./types";
import p5 from "p5";
import { Optional } from "@comp-sci-maths/lib/dist/types";

export interface Props<T> {
  sourceNode?: string;
  destinationNode?: string;
  getPositionOfNode: (vertex: string) => Optional<p5.Vector>;
  graph: Graph<T>;
}

export interface UseRoutingAlgorithm {
  shortestPathTree: ShortestPathTree;
  path: string[];
  heuristicCosts: HeuristicCostById;
  stages: ObserverArgsWithPathFrom[];
  onHarvestDistances: () => void;
  onResetDistances: () => void;
}

const useRoutingAlgorithm = <T>({
  sourceNode,
  destinationNode,
  graph,
  getPositionOfNode,
}: Props<T>): UseRoutingAlgorithm => {

  const [heuristicCosts, setHeuristicsCosts] = React.useState<
    HeuristicCostById
  >({});

  const getHeuristicCost: HeuristicCostFunction = React.useCallback(
    (vertex: string) =>
      heuristicCosts[vertex] ? heuristicCosts[vertex].distance : 0,
    [heuristicCosts]
  );

  const onResetDistances = React.useCallback(() => setHeuristicsCosts({}), [
    setHeuristicsCosts,
  ]);

  const onHarvestDistances = React.useCallback(() => {
    if (destinationNode !== undefined) {
      const destinationPosition = getPositionOfNode(destinationNode);
      if (!!destinationPosition) {
        const costs: HeuristicCostById = graph.vertices
          .map((vertex) => ({
            vertex,
            position: getPositionOfNode(vertex) || destinationPosition,
          }))
          .map(({ vertex, position }) => ({
            vertex,
            position,
            distance: p5.Vector.sub(position, destinationPosition).mag(),
          }))
          .reduce(
            (acc, { position, vertex, distance }) => ({
              ...acc,
              [vertex]: { label: vertex, position, distance },
            }),
            {}
          );

        setHeuristicsCosts(costs);
      }
    }
    // eslint-disable-next-line
  }, [destinationNode, getPositionOfNode, graph.vertices, setHeuristicsCosts]);

  const { stages, shortestPathTree, path } = React.useMemo(() => {
    const stages: ObserverArgsWithPathFrom[] = [];
    const observer: RoutingObserver = ({
      shortestPathTree,
      currentDistances,
      currentItem,
      outgoing,
    }) => {
      const endNode: string =
        currentItem !== undefined && currentItem.viaNode !== undefined
          ? currentItem.viaNode
          : destinationNode !== undefined
            ? destinationNode
            : (sourceNode as string);
      const observerArgs: ObserverArgsWithPathFrom = {
        currentItem,
        currentDistances,
        shortestPathTree,
        outgoing,
        pathFrom: [
          ...getPathTo({
            graph,
            shortestPathTree,
            node: endNode,
          }),
          endNode,
        ],
      };
      stages.push(cloneDeep(observerArgs));
    };
    const shortestPathTree: ShortestPathTree =
      (sourceNode !== undefined && destinationNode !== undefined)
        ? dijkstras({
          graph,
          sourceNode,
          destinationNode,
          getHeuristicCost,
          observer,
        })
        : {};
    const path =
      destinationNode !== undefined
        ? getPathTo({ graph, shortestPathTree, node: destinationNode })
        : [];

    return {
      shortestPathTree,
      path,
      stages,
    };
    // eslint-disable-next-line
  }, [getHeuristicCost, sourceNode, destinationNode, graph]);

  return {
    stages,
    shortestPathTree,
    path,
    heuristicCosts,
    onHarvestDistances,
    onResetDistances,
  };
};

export default useRoutingAlgorithm;