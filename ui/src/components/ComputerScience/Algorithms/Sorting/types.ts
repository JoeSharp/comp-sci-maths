export interface PositionVars {
  [k: string]: number;
}

export enum SortStageType {
  observation,
  swap,
  compare,
}

export interface SortObservation<T> {
  type: SortStageType.observation;
  stageName: string;
  positionVars: PositionVars;
  data: T[];
}

export interface SortSwap<T> {
  type: SortStageType.swap;
  from: number;
  to: number;
  lastObservation: SortObservation<T>;
}

export interface SortCompare<T> {
  type: SortStageType.compare;
  a: T;
  b: T;
  aIndex: number;
  bIndex: number;
  result: number;
  lastObservation: SortObservation<T>;
}

export type SortStage<T> = SortObservation<T> | SortSwap<T> | SortCompare<T>;

export const DEFAULT_SORT_STAGE: SortStage<any> = {
  type: SortStageType.observation,
  data: [],
  positionVars: {},
  stageName: "empty",
};

export interface SortingData<T> {
  stages: SortStage<T>[];
  sortedData: T[];
}
