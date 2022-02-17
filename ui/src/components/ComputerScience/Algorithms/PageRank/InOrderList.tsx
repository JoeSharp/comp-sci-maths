import React from "react";
import { PageRanks } from "./types";
import { StringDataItem } from "../../../p5/Boid/types";

interface Props {
  pages: StringDataItem[];
  ranks: PageRanks;
}

const InOrderList: React.FunctionComponent<Props> = ({ pages, ranks }) => {
  const pagesInOrder: StringDataItem[] = React.useMemo(
    () =>
      Object.entries(ranks)
        .sort((r1, r2) => r2[1] - r1[1]) // compare the values
        .map((r) => pages.find((v) => v.key === r[0]))
        .filter((r) => r !== undefined)
        .map((r) => r as StringDataItem),
    [pages, ranks]
  );

  return (
    <ol>
      {pagesInOrder.map(({ key, label }) => (
        <li key={key}>{label}</li>
      ))}
    </ol>
  );
};

export default InOrderList;
