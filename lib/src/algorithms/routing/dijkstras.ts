import PriorityQueue from "../../dataStructures/queue/PriorityQueue";
import Graph, { Edge } from "../../dataStructures/graph/Graph";
import {
  ShortestPathTree,
  ShortestPathWithNode,
  HeuristicCostFunction,
  ShortestPathForNode,
  RoutingObserver,
  EdgeWithCost,
  EdgeCurrentWeightCalcType,
} from "./types";
import { emptyObserver } from "../../common";
import { AnyGraphVertex } from "../../types";

/**
 * Calls the walkPath generator function and puts all the nodes into an array, returns the array.
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} destinationNode
 * @returns An array containing the path (walking backwards), it will be empty if no route was found
 */
function getPathTo<T extends AnyGraphVertex>({
  graph,
  shortestPathTree,
  node,
}: WalkPath<T>) {
  const path: T[] = [];

  // If there is no available path to the destination, feed back empty list
  const endpoint = shortestPathTree[node.key];
  if (!endpoint || endpoint.viaNode === undefined) {
    return path;
  }

  for (const p of walkPath({ graph, shortestPathTree, node })) {
    path.push(p);
  }
  return path.reverse();
}

interface WalkPath<T extends AnyGraphVertex> {
  graph: Graph<T>;
  shortestPathTree: ShortestPathTree<T>;
  node: T;
}

/**
 * Given a shortestPathTree taken from the dijkstra function below,
 * this walks from one node to another through the shortest path identified
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} viaNode The start point of the journey
 * @param {string} destinationNode The end point of the journey
 */
function* walkPath<T extends AnyGraphVertex>({
  shortestPathTree,
  node,
}: WalkPath<T>) {
  while (!!node) {
    yield node;
    const thisShortestPath: ShortestPathForNode<T> = shortestPathTree[node.key];
    if (thisShortestPath === undefined) {
      break;
    }
    node = thisShortestPath.viaNode;
  }
}

// These are the arguments that the routing algorithm requires
// Some of them are optional, so it is easier to use an object of named args
// that can be given default values in the routing function.
interface Args<T extends AnyGraphVertex> {
  graph: Graph<T>;
  sourceNodeKey: string;
  destinationNodeKey?: string;
  getHeuristicCost?: HeuristicCostFunction<T>;
  observer?: RoutingObserver<T>;
}

// A hueristic that always returns a constant value will have no effect.
export const emptyHeuristic: HeuristicCostFunction<any> = () => 0;

/**
 * Executes Dijkstras routing algorithm, returning the shortest path tree for the given source node.
 *
 * This algorithm can end early if the toNode is specified, here is a discussion of the validity of this...
 * https://stackoverflow.com/questions/23906530/dijkstras-end-condition
 *
 * This algorithm accepts a heuristic cost function, which allows it to be used
 * to execute the A* algorithm.
 *
 * @param {Graph} graph The graph that contains all the nodes and links
 * @param {string} sourceNode The node we are travelling from
 * @param {string | undefined} destinationNode // The node we are aiming for, can be omitted
 * @param {function} getHeuristicCost // Given a node, returns an estimated remaining cost to the destination.
 * @param {function} observer // Allows the caller to monitor the steps of the algorithm.
 * @returns Shortest Path Tree { [node] : {cost: number, viaNode: string} }
 */
function dijstraks<T extends AnyGraphVertex>({
  graph,
  sourceNodeKey,
  destinationNodeKey,
  getHeuristicCost = emptyHeuristic,
  observer = emptyObserver,
}: Args<T>): ShortestPathTree<T> {
  const sourceNode: T = graph.getVertex(sourceNodeKey);
  const destinationNode =
    destinationNodeKey && graph.getVertex(destinationNodeKey);

  // The output of this function is the shortest path tree, derived by the algorithm.
  // The caller can then use this tree to derive a path using the getPathTo function above.
  const shortestPathTree: ShortestPathTree<T> = {};

  // Build a priority queue, where the nodes are arranged in order of
  // distance from the source (smallest to largest)
  const currentDistances = new PriorityQueue<ShortestPathWithNode<T>>();

  // Add the 'from' node, it doesn't go via anything, and it's distance is zero
  currentDistances.enqueue({
    node: sourceNode,
    viaNode: undefined,
    cost: 0,
    priority: Infinity,
  });

  // Add all the other nodes, with a distance of Infinity
  graph.vertices
    .filter((node) => !graph.areVerticesEqual(node, sourceNode))
    .map((node) => ({ node, viaNode: undefined, cost: Infinity, priority: 0 }))
    .forEach((n) => currentDistances.enqueue(n));

  // Give the observer the START
  observer({ shortestPathTree, currentDistances, outgoing: [] });

  // While there are items in the queue to check...
  while (!currentDistances.isEmpty()) {
    // Take the node that is the shortest distance from our source node
    const currentItem = currentDistances.dequeue();

    // Work out what amendments to make to the priority queue
    const outgoing: EdgeWithCost<T>[] = graph
      .getOutgoing(currentItem.node.key)
      .filter(({ to }) => shortestPathTree[to.key] === undefined) // only those that aren't in our tree already
      .map((edge) => {
        const { to: node, weight } = edge;
        let totalCost = weight;
        let calcResult = EdgeCurrentWeightCalcType.unknown;

        // Remove the matching item from our current known distances
        // It will either be replaced as is, or replaced with updated details
        const otherItem = currentDistances.removeMatch((d) =>
          graph.areVerticesEqual(d.node, node)
        );

        // What is the distance to this other node, from our current node?
        const newPotentialDistance =
          currentItem.cost + weight + getHeuristicCost(currentItem.node);

        // Have we found a shorter route?
        if (newPotentialDistance < otherItem.cost) {
          totalCost = newPotentialDistance;
          // Replace the node with our new distance and via details
          currentDistances.enqueue({
            node,
            cost: newPotentialDistance,
            viaNode: currentItem.node,
            priority: 1 / newPotentialDistance,
          });
          calcResult = EdgeCurrentWeightCalcType.shorterRouteFound;
        } else {
          totalCost = otherItem.cost;
          // Just put the current one back
          currentDistances.enqueue(otherItem);
          calcResult = EdgeCurrentWeightCalcType.existingRouteStillQuickest;
        }

        return {
          edge,
          totalCost,
          calcResult,
        };
      });
    // Tell any observer the step
    observer({ currentItem, shortestPathTree, currentDistances, outgoing });

    // Put this item into our set (using node as a key)
    shortestPathTree[currentItem.node.key] = {
      cost: currentItem.cost,
      viaNode: currentItem.viaNode,
      priority: 1 / currentItem.cost,
    };

    // Have we reached the destination? Quit early
    if (
      !!destinationNode &&
      graph.areVerticesEqual(currentItem.node, destinationNode)
    ) {
      break;
    }
  }

  // Give the Observer the END
  observer({ shortestPathTree, currentDistances, outgoing: [] });

  return shortestPathTree;
}

export { dijstraks, getPathTo, walkPath };
