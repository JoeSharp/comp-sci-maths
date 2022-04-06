import React from "react";
import { PageRanks } from "./types";

interface Props {
  pages: string[];
  ranks: PageRanks;
}

const InOrderList: React.FunctionComponent<Props> = ({ pages, ranks }) => {
  const pagesInOrder: string[] = React.useMemo(
    () =>
      Object.entries(ranks)
        .sort((r1, r2) => r2[1] - r1[1]) // compare the values
        .map((r) => r[0]),
    [ranks]
  );

  return (
    <ol>
      {pagesInOrder.map((page) => (
        <li key={page}>{page}</li>
      ))}
    </ol>
  );
};

export default InOrderList;
