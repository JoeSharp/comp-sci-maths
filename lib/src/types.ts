

export type MatchFunction<T> = (a: T) => boolean;

export type Optional<T> = T | undefined;

export type Producer<T> = () => T;
export type Consumer<T> = (v: T) => void;

export type ToString<T> = (a: T) => string;

export type EqualityCheck<T> = (a: T, b: T) => boolean;

export type StringReporter = (s: string) => void;

export interface IKeyWithValue<T> {
  key: string;
  value: T;
}
export type AnyGraphVertex = IKeyWithValue<any>;
export type StringGraphVertex = IKeyWithValue<string>;
export type NumberGraphVertex = IKeyWithValue<number>;

export interface IVersioned {
  version: number;
}

export type DivisibilityRule = (
  value: number,
  reporter: StringReporter
) => boolean;

export interface NamedDivisibilityRule {
  factor: number;
  explanation: string[];
  rule: DivisibilityRule;
}

export interface CompareMeta {
  aIndex: number;
  bIndex: number;
}
export type Comparator<T> = (a: T, b: T, meta?: CompareMeta) => number;

export type VisitFunction<T> = (n: T) => any;

export interface PositionVars {
  [k: string]: number;
}

export interface WorkingLists<T> {
  [k: string]: T[];
}

export type SearchObserver = (
  stageName: string,
  positionVars?: PositionVars
) => void;

export interface SplitList<T> {
  key: string;
  data: T[];
}

export type SplitObserver<T> = (
  thisKey: string,
  listA: SplitList<T>,
  listB: SplitList<T>
) => void;

export type JoinObserver<T> = (
  listA: SplitList<T>,
  listB: SplitList<T>,
  joinedList: T[]
) => void;

export interface SearchUtilities<T> {
  compare: Comparator<T>;
  observe?: SearchObserver;
  split?: SplitObserver<T>;
  join?: JoinObserver<T>;
}

export type SearchFunction = <T>(
  inputList: T[],
  searchItem: T,
  utilities: SearchUtilities<T>
) => number;

export interface NamedSearch {
  name: string;
  search: SearchFunction;
}

export interface LineRefMinusId {
  sourceId?: string;
  sourceFilename?: string;
  originalLineNumber?: number;
  originalLine?: string;
}

export interface LineReference extends LineRefMinusId {
  id: string;
}

export type RawLineRef = LineRefMinusId | LineReference | string;