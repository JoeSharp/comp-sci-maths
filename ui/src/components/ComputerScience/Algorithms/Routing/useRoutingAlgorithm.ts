import React from "react";
import Graph from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";
import { cloneDeep } from "lodash";

import {
  dijstraks,
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
import { DisplayDataItem } from "../../../p5/Boid/types";

export interface Props<DATA_ITEM extends DisplayDataItem<any>> {
  sourceNode?: DATA_ITEM;
  destinationNode?: DATA_ITEM;
  getPositionOfNode: (vertex: DATA_ITEM) => Optional<p5.Vector>;
  graph: Graph<DATA_ITEM>;
  version: number;
}

export interface UseRoutingAlgorithm<DATA_ITEM extends DisplayDataItem<any>> {
  shortestPathTree: ShortestPathTree<DATA_ITEM>;
  path: DATA_ITEM[];
  heuristicCosts: HeuristicCostById;
  stages: ObserverArgsWithPathFrom<DATA_ITEM>[];
  onHarvestDistances: () => void;
  onResetDistances: () => void;
}

const useRoutingAlgorithm = <DATA_ITEM extends DisplayDataItem<any>>({
  sourceNode,
  version,
  destinationNode,
  graph,
  getPositionOfNode,
}: Props<DATA_ITEM>): UseRoutingAlgorithm<DATA_ITEM> => {

  const [heuristicCosts, setHeuristicsCosts] = React.useState<
    HeuristicCostById
  >({});

  const getHeuristicCost: HeuristicCostFunction<DATA_ITEM> = React.useCallback(
    (vertex: DATA_ITEM) =>
      heuristicCosts[vertex.key] ? heuristicCosts[vertex.key].distance : 0,
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
              [vertex.key]: { label: vertex.label, position, distance },
            }),
            {}
          );

        setHeuristicsCosts(costs);
      }
    }
    // eslint-disable-next-line
  }, [destinationNode, getPositionOfNode, version, graph.vertices, setHeuristicsCosts]);

  const { stages, shortestPathTree, path } = React.useMemo(() => {
    const stages: ObserverArgsWithPathFrom<DATA_ITEM>[] = [];
    const observer: RoutingObserver<DATA_ITEM> = ({
      shortestPathTree,
      currentDistances,
      currentItem,
      outgoing,
    }) => {
      const endNode: DATA_ITEM =
        currentItem !== undefined && currentItem.viaNode !== undefined
          ? currentItem.viaNode
          : destinationNode !== undefined
            ? destinationNode
            : (sourceNode as DATA_ITEM);
      const observerArgs: ObserverArgsWithPathFrom<DATA_ITEM> = {
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
    const shortestPathTree: ShortestPathTree<DATA_ITEM> =
      (sourceNode !== undefined && destinationNode !== undefined)
        ? dijstraks({
          graph,
          sourceNodeKey: sourceNode.key,
          destinationNodeKey: destinationNode.key,
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
  }, [getHeuristicCost, sourceNode, destinationNode, graph, version]);

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