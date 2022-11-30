export type NoughtsCrossesBoard = number[][];

const DIMENSION = 3;

export const createBoard = () => {
  Array(DIMENSION)
    .fill(null)
    .map(() => Array(DIMENSION).fill(0));
};
