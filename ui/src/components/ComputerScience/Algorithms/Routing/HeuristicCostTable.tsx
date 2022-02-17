import React from "react";
import { HeuristicCostById } from "./types";
import Table from "../../../Bootstrap/Table";
import { roundTo2Dp } from "comp-sci-maths-lib/dist/algorithms/pageRank/pageRank";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";

interface Props {
  graph: Graph<any>;
  heuristicCostsById: HeuristicCostById;
}

const HeuristicCostTable: React.FunctionComponent<Props> = ({
  graph,
  heuristicCostsById,
}) => {
  const tableData = React.useMemo(
    () =>
      Object.entries(heuristicCostsById).map(
        ([
          id,
          {
            position: { x, y },
            distance,
          },
        ]) => ({
          name: graph.vertices.find((v) => v.key === id)?.label,
          position: `x: ${roundTo2Dp(x)}, y: ${roundTo2Dp(y)}`,
          distance: roundTo2Dp(distance),
        })
      ),
    [graph, heuristicCostsById]
  );

  return <Table data={tableData} headings={["name", "position", "distance"]} />;
};

export default HeuristicCostTable;
