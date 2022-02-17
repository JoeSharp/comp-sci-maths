import { Comparator, PositionVars, SplitObserver, JoinObserver } from "types";



export type SortObserver<T> = (
  stageName: string,
  data: T[],
  positionVars: PositionVars
) => void;

export type SwapFunction<T> = (arr: T[], from: number, to: number) => void;

export interface SortUtility<T> {
  compare?: Comparator<T>;
  observe?: SortObserver<T>;
  split?: SplitObserver<T>;
  join?: JoinObserver<T>;
  swap?: SwapFunction<T>;
}

export type BasicSortFunction<T> = (inputList: T[]) => T[];

export interface NamedBasicSort {
  name: string;
  sort: BasicSortFunction<any>;
}

export type GenericSortFunction<T> = (inputList: T[], comparator: Comparator<T>) => T[];

export interface NamedGenericSort {
  name: string;
  sort: GenericSortFunction<any>;
}

export interface NamedBasicSort {
  name: string;
  sort: BasicSortFunction<any>;
}

export type CustomisableSortFunction<T> = (
  inputList: T[],
  utilities: SortUtility<T>
) => T[];

export interface NamedCustomisableSort {
  name: string;
  sort: CustomisableSortFunction<any>;
}