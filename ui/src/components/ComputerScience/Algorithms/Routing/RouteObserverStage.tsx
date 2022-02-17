import React from "react";
import ShortestPathWithNodeTable from "./ShortestPathWithNodeTable";
import {
  ObserverArgsWithPathFrom,
  getCurrentWeightCalcTypeStr,
} from "comp-sci-maths-lib/dist/algorithms/routing/types";
import Table from "../../../Bootstrap/Table";
import { DisplayDataItem } from "../../../p5/Boid/types";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { roundTo2Dp } from "comp-sci-maths-lib/dist/algorithms/pageRank/pageRank";

interface Props<DATA_ITEM extends DisplayDataItem<any>> {
  graph: Graph<DATA_ITEM>;
  currentStage: ObserverArgsWithPathFrom<DATA_ITEM>;
}

const RouteObserverStage = <DATA_ITEM extends DisplayDataItem<any>>({
  graph,
  currentStage: { shortestPathTree, currentItem, currentDistances, outgoing },
}: Props<DATA_ITEM>) => {
  const shortestPathTreeItems = React.useMemo(
    () =>
      Object.entries(shortestPathTree).map(([node, { cost, viaNode }]) => ({
        node: graph.getVertex(node)?.label || "NONE", // Ideally we would fetch back the original node...
        cost,
        viaNode,
      })),
    [shortestPathTree, graph]
  );
  const queueItems = React.useMemo(
    () =>
      currentDistances.toArray().map(({ node, cost, viaNode }) => ({
        node: node.label,
        cost,
        viaNode,
      })),
    [currentDistances]
  );
  const currentItemForTable = React.useMemo(() => {
    if (currentItem !== undefined) {
      return [{ ...currentItem, node: currentItem.node.label }];
    }
    return [];
  }, [currentItem]);

  const outgoingData = React.useMemo(
    () =>
      outgoing.map(({ totalCost, calcResult, edge: { to, weight } }) => ({
        to: to.label,
        weight,
        totalCost: roundTo2Dp(totalCost),
        calcResult: getCurrentWeightCalcTypeStr(calcResult),
      })),
    [outgoing]
  );

  return (
    <React.Fragment>
      <h4>Current Item</h4>
      <ShortestPathWithNodeTable items={currentItemForTable} />
      <div className="routing-visual">
        <div className="mr-5">
          <h4>Unvisited Outgoing Links</h4>
          <Table
            headings={["to", "weight", "totalCost", "calcResult"]}
            data={outgoingData}
          />
        </div>
        <div className="mr-5">
          <h4>Routing Queue (After)</h4>
          <ShortestPathWithNodeTable items={queueItems} />
        </div>
        <div>
          <h4>Visited Nodes</h4>
          <ShortestPathWithNodeTable items={shortestPathTreeItems} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RouteObserverStage;
