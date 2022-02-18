import { PositionVars } from "@comp-sci-maths/lib/dist/types";

export interface SearchObservation {
  stageName: string;
  positionVars: PositionVars;
}

export const DEFAULT_SEARCH_OBS: SearchObservation = {
  stageName: "DEFAULT",
  positionVars: {},
};

export interface SearchingData<T> {
  stages: SearchObservation[];
  matchIndex: number;
  searchItem: string;
  data: T[];
}
