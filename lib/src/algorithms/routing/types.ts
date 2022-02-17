import { Optional, AnyGraphVertex } from "types";
import PriorityQueue, {
  PrioritisedItem,
} from "dataStructures/queue/PriorityQueue";
import { Edge } from "dataStructures/graph/Graph";

export interface ShortestPathForNode<T> extends PrioritisedItem {
  cost: number;
  viaNode: Optional<T>;
}

export interface ShortestPathWithNode<T extends AnyGraphVertex>
  extends ShortestPathForNode<T> {
  node: T;
}

export interface ShortestPathTree<T extends AnyGraphVertex> {
  [nodeAsStr: string]: ShortestPathForNode<T>;
}

export type HeuristicCostFunction<T extends AnyGraphVertex> = (
  node: T
) => number;

export enum EdgeCurrentWeightCalcType {
  unknown,
  shorterRouteFound,
  existingRouteStillQuickest,
}

export const getCurrentWeightCalcTypeStr = (
  value: EdgeCurrentWeightCalcType
): string => {
  switch (value) {
    case EdgeCurrentWeightCalcType.existingRouteStillQuickest:
      return "Existing Route";
    case EdgeCurrentWeightCalcType.shorterRouteFound:
      return "Shorter Route";
    case EdgeCurrentWeightCalcType.unknown:
      return "ERROR";
  }
};

export interface EdgeWithCost<T extends AnyGraphVertex> {
  edge: Edge<T>;
  totalCost: number;
  calcResult: EdgeCurrentWeightCalcType;
}
export interface ObserverArgs<T extends AnyGraphVertex> {
  currentItem?: ShortestPathWithNode<T>;
  shortestPathTree: ShortestPathTree<T>;
  currentDistances: PriorityQueue<ShortestPathWithNode<T>>;
  outgoing: EdgeWithCost<T>[];
}
export interface ObserverArgsWithPathFrom<T extends AnyGraphVertex>
  extends ObserverArgs<T> {
  pathFrom: T[];
}
export type RoutingObserver<T extends AnyGraphVertex> = (
  args: ObserverArgs<T>
) => void;
