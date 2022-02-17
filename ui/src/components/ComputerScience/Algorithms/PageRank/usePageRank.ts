import React from "react";

import { PageRanks } from "./types";
import {
  initialisePageRank,
  iteratePageRank,
  BLANK_PAGE_RANK_STATE,
} from "comp-sci-maths-lib/dist/algorithms/pageRank/pageRank";
import { PageRankState } from "comp-sci-maths-lib/dist/algorithms/pageRank/types";
import Graph from "comp-sci-maths-lib/dist/dataStructures/graph/Graph";
import { StringDataItem } from "../../../p5/Boid/types";

interface Props {
  dampingFactor: number;
  graph: Graph<StringDataItem>;
}

interface UsePageRank {
  iterations: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
  begin: () => void;
  iterate: () => void;
}

interface IterateAction {
  type: "iterate";
}

interface InitialiseAction {
  type: "initialise";
  dampingFactor: number;
  graph: Graph<StringDataItem>;
}

type RankReducerAction = IterateAction | InitialiseAction;

const rankReducer = (
  state: PageRankState<StringDataItem>,
  action: RankReducerAction
): PageRankState<StringDataItem> => {
  switch (action.type) {
    case "iterate": {
      return iteratePageRank(state);
    }
    case "initialise":
      return initialisePageRank(action.graph, action.dampingFactor);
  }
};

const usePageRank = ({ graph, dampingFactor }: Props): UsePageRank => {
  const [rankState, dispatch] = React.useReducer(
    rankReducer,
    BLANK_PAGE_RANK_STATE
  );

  const iterate = React.useCallback(() => dispatch({ type: "iterate" }), []);

  const begin = React.useCallback(
    () => dispatch({ type: "initialise", graph, dampingFactor }),
    [graph, dampingFactor]
  );

  React.useEffect(begin, [begin]);
  const { ranks, iterations, rankHistory } = rankState;

  return {
    iterations,
    ranks,
    rankHistory,
    begin: begin,
    iterate,
  };
};

export default usePageRank;
