import { Optional } from "../../types";
import PriorityQueue, {
  PrioritisedItem,
} from "../../dataStructures/queue/PriorityQueue";
import { Edge } from "../../dataStructures/graph/graphReducer";

export interface ShortestPathForNode extends PrioritisedItem {
  cost: number;
  viaNode: Optional<string>;
}

export interface ShortestPathWithNode
  extends ShortestPathForNode {
  node: string;
}

export interface ShortestPathTree {
  [nodeAsStr: string]: ShortestPathForNode;
}

export type HeuristicCostFunction = (
  node: string
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

export interface EdgeWithCost {
  edge: Edge;
  totalCost: number;
  calcResult: EdgeCurrentWeightCalcType;
}
export interface ObserverArgs {
  currentItem?: ShortestPathWithNode;
  shortestPathTree: ShortestPathTree;
  currentDistances: PriorityQueue<ShortestPathWithNode>;
  outgoing: EdgeWithCost[];
}
export interface ObserverArgsWithPathFrom
  extends ObserverArgs {
  pathFrom: string[];
}
export type RoutingObserver = (
  args: ObserverArgs
) => void;
