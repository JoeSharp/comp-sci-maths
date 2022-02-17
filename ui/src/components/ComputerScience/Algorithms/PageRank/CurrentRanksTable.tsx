import React from "react";
import { PageRanks } from "./types";
import { roundTo2Dp } from "comp-sci-maths-lib/dist/algorithms/pageRank/pageRank";
import Table from "../../../Bootstrap/Table";
import { StringDataItem } from "../../../p5/Boid/types";

interface Props {
  pages: StringDataItem[];
  ranks: PageRanks;
}

const CurrentRanksRable: React.FunctionComponent<Props> = ({
  pages,
  ranks,
}) => {
  const tableData = React.useMemo(
    () =>
      pages.map((page) => ({
        page: page.value,
        rank2dp: roundTo2Dp(ranks[page.key]),
        rank: ranks[page.key],
      })),
    [pages, ranks]
  );

  return <Table headings={["page", "rank2dp", "rank2dp"]} data={tableData} />;
};

export default CurrentRanksRable;
