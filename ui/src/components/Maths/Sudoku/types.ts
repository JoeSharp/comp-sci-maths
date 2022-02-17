export interface Cell {
  fixed: boolean;
  value: number;
  allowed: Set<number>;
  error: boolean;
}

export type BoardState = {
  cells: Cell[][];
  hints: BoardAction[];
};

export interface Coordinate {
  x: number;
  y: number;
}

export type GetOtherCellsFunction = (x: number, y: number) => Coordinate[];

export interface BoardAction extends Coordinate {
  value: number;
  fix?: boolean;
}

export type CoordinateConsumer = (coord: Coordinate) => void;
export type BoardActionConsumer = (action: BoardAction) => void;
