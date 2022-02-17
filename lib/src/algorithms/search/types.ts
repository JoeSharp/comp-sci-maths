import { Comparator } from "types";

export type GenericSearchFunction = <T>(
  inputList: T[],
  searchItem: T,
  comparator: Comparator<T>
) => number;

export interface NamedGenericSearchFunction {
  name: string;
  search: GenericSearchFunction;
}
