import React from "react";
import { Optional } from "@comp-sci-maths/lib/dist/types";
import Table from "../../../Bootstrap/Table";
import { roundTo2Dp } from "@comp-sci-maths/lib/dist/algorithms/pageRank/pageRank";

interface Item {
  node: string;
  cost: number;
  viaNode: Optional<string>;
}

interface Props {
  items: Item[];
}

const ShortestPathWithNodeTable = ({
  items,
}: Props) => {
  const tableData = React.useMemo(
    () =>
      items.map(({ node, cost, viaNode }) => ({
        node,
        cost: roundTo2Dp(cost),
        viaNode: viaNode || "None",
      })),
    [items]
  );

  return <Table headings={["node", "cost", "viaNode"]} data={tableData} />;
};

export default ShortestPathWithNodeTable;
