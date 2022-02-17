import React from "react";
import { Optional } from "comp-sci-maths-lib/dist/types";
import Table from "../../../Bootstrap/Table";
import { roundTo2Dp } from "comp-sci-maths-lib/dist/algorithms/pageRank/pageRank";
import { DisplayDataItem } from "../../../p5/Boid/types";

interface Item<DATA_ITEM extends DisplayDataItem<any>> {
  node: string;
  cost: number;
  viaNode: Optional<DATA_ITEM>;
}

interface Props<DATA_ITEM extends DisplayDataItem<any>> {
  items: Item<DATA_ITEM>[];
}

const ShortestPathWithNodeTable = <DATA_ITEM extends DisplayDataItem<any>>({
  items,
}: Props<DATA_ITEM>) => {
  const tableData = React.useMemo(
    () =>
      items.map(({ node, cost, viaNode }) => ({
        node,
        cost: roundTo2Dp(cost),
        viaNode: viaNode ? viaNode.label : "NONE",
      })),
    [items]
  );

  return <Table headings={["node", "cost", "viaNode"]} data={tableData} />;
};

export default ShortestPathWithNodeTable;
