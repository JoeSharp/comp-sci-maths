import React from "react";
import ShortestPathWithNodeTable from "./ShortestPathWithNodeTable";
import {
  ObserverArgsWithPathFrom,
  getCurrentWeightCalcTypeStr,
  ShortestPathWithNode,
} from "@comp-sci-maths/lib/dist/algorithms/routing/types";
import Table from "../../../Bootstrap/Table";
import { linkedListTraverse } from '@comp-sci-maths/lib/dist/dataStructures/linkedList/linkedListReducer'
import { roundTo2Dp } from "@comp-sci-maths/lib/dist/algorithms/pageRank/pageRank";

interface Props {
  currentStage: ObserverArgsWithPathFrom;
}

const RouteObserverStage = ({
  currentStage: { shortestPathTree, currentItem, currentDistances, outgoing },
}: Props) => {
  const shortestPathTreeItems = React.useMemo(
    () =>
      Object.entries(shortestPathTree).map(([node, { cost, viaNode }]) => ({
        node: node || "NONE", // Ideally we would fetch back the original node...
        cost,
        viaNode,
      })),
    [shortestPathTree]
  );
  const queueItems = React.useMemo(
    () => {
      const asArray: ShortestPathWithNode[] = [];
      linkedListTraverse(currentDistances, ({ value: { value } }) => {
        asArray.push(value);
        return false;
      })
      return asArray;
    },
    [currentDistances]
  );
  const currentItemForTable = React.useMemo(() => {
    if (currentItem !== undefined) {
      return [{ ...currentItem, node: currentItem.node }];
    }
    return [];
  }, [currentItem]);

  const outgoingData = React.useMemo(
    () =>
      outgoing.map(({ totalCost, calcResult, edge: { to, weight } }) => ({
        to,
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
