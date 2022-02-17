import { PageRanks, PageRankState } from "algorithms/pageRank/types";
import Graph from "dataStructures/graph/Graph";
import { AnyGraphVertex } from "types";

const MAX_ITERATIONS = 20;

/**
 * Utility function to round a number to 2 decimal places.
 * Required enough to warran it's own function, page ranks should be displayed this way.
 *
 * @param x The number to round
 * @returns The rounded number
 */
export const roundTo2Dp = (x: number): number =>
  x !== undefined ? parseFloat(x.toFixed(2)) : 0;

export const BLANK_PAGE_RANK_STATE: PageRankState<any> = {
  iterations: 0,
  graph: new Graph(),
  ranks: {},
  rankHistory: [],
  dampingFactor: 0.85,
};

/**
 * Create an initial state for the page rank algorithm.
 * The returned state object can be used in a reducer, it stores everything successive iterations will need.
 *
 * @param graph The graph which describes the linked pages.
 * @param dampingFactor The damping factor to apply during the page rank iterations
 */
export const initialisePageRank = <T extends AnyGraphVertex>(
  graph: Graph<T>,
  dampingFactor: number = 0.85
) => {
  const firstRanks = [...graph.vertices]
    .map((v) => v.key)
    .reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {});
  return {
    iterations: 0,
    graph,
    ranks: firstRanks,
    rankHistory: [firstRanks],
    dampingFactor,
  };
};

/**
 * Extracts the page rank of a page, rounded to 2 d.p.
 * @param state The page rank state, as yielded by the iterate function
 * @param page The specific page we are interested in
 */
export const extractPageRank = <T extends AnyGraphVertex>(
  { ranks }: PageRankState<T>,
  page: string
): number => {
  return ranks[page];
};

/**
 * Processes one iteration of the page rank algorithm.
 * Is a pure function which accepts current state and returns new state after the iteration.
 *
 * @param state The current page rank state
 * @returns The new page rank state
 */
export const iteratePageRank = <T extends AnyGraphVertex>({
  iterations,
  graph,
  ranks,
  rankHistory,
  dampingFactor,
}: PageRankState<T>): PageRankState<T> => {
  if (iterations > MAX_ITERATIONS) {
    return {
      iterations,
      graph,
      ranks,
      rankHistory,
      dampingFactor,
    };
  }

  const newRanks: PageRanks = { ...ranks };

  graph.vertices.forEach((page) => {
    const rank: number = graph.edges
      .filter((edge) => graph.areVerticesEqual(edge.to, page))
      .map((edge) => edge.from)
      .map(
        (incoming) =>
          newRanks[incoming.key] /
          graph.edges.filter((l) => graph.areVerticesEqual(l.from, incoming))
            .length
      )
      .reduce((acc, curr) => acc + curr, 0);

    newRanks[page.key] = 1 - dampingFactor + dampingFactor * rank;
  });

  return {
    iterations: iterations + 1,
    graph,
    ranks: newRanks,
    rankHistory: [...rankHistory, newRanks],
    dampingFactor,
  };
};
