import React from "react";

import { PageRanks } from "./types";
import { roundTo2Dp } from "@comp-sci-maths/lib/dist/algorithms/pageRank/pageRank";
import { StringDataItem } from "../../../p5/Boid/types";

interface Props {
  pages: StringDataItem[];
  rankHistory: PageRanks[];
}

const RankHistoryTable: React.FunctionComponent<Props> = ({
  pages,
  rankHistory,
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Page</th>
          {rankHistory.map((r, i) => (
            <th key={i}>{i}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pages.map((page) => (
          <tr key={page.key}>
            <td>{page.value}</td>
            {rankHistory.map((r, i) => (
              <td key={i}>{roundTo2Dp(r[page.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankHistoryTable;
