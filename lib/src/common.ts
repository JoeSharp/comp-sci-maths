import {
  EqualityCheck,
  ToString,
  Comparator,
  IVersioned,
  LineReference,
  RawLineRef,
} from "./types";

function isString(x: any): x is string {
  return typeof x === "string";
}

let nextId = 0;
const generateUniqueId = (): string => `${nextId++}`;

export const generateLineRef = (rawLineRef?: RawLineRef): LineReference => {
  if (rawLineRef === undefined) {
    return {
      id: generateUniqueId(),
    };
  }
  if (isString(rawLineRef)) {
    return {
      id: generateUniqueId(),
      originalLine: rawLineRef,
    };
  }

  if ("id" in rawLineRef) {
    return rawLineRef;
  } else {
    return {
      id: generateUniqueId(),
      ...rawLineRef,
    };
  }
};

export const ROOT_RECURSION_KEY = 50;

export interface IndexWindow {
  start: number;
  end: number;
}

export const bytesToString = (
  contents: number[],
  columns: number,
  window: IndexWindow
) => {
  return contents
    .filter((_, i) => i >= window.start && i < window.end)
    .map((x, i) =>
      i % columns === 0
        ? `\n${(i + window.start).toString(10)}: ${x.toString(10)}`
        : x.toString(10)
    )
    .join(", ");
};

export const defaultEqualityCheck: EqualityCheck<any> = (a: any, b: any) =>
  a === b;
export const defaultToString: ToString<any> = (a) => `${a}`;

export function simpleSwap<T>(arr: T[], from: number, to: number) {
  const swapItem: T = arr[from];
  arr[from] = arr[to];
  arr[to] = swapItem;
}

export function objToString(o?: object) {
  return !!o
    ? Object.entries(o)
        .map((k) => `${k[0]}=${k[1]}`)
        .join(" ")
    : "none";
}

// tslint:disable-next-line: no-empty
export const emptyObserver = () => {};

// This needs to work for strings and numbers, which is why I cannot use b-a
export const anyComparator: Comparator<any> = (a: any, b: any) => {
  if (a > b) {
    return +1;
  } else if (b > a) {
    return -1;
  } else {
    return 0;
  }
};

/**
 * Comparator function that uses simple arithmetic comparison.
 * based on https://www.w3schools.com/js/js_array_sort.asp
 * If the result is negative a is sorted before b.
 * If the result is positive b is sorted before a.
 * If the result is 0 no changes are done with the sort order of the two values.
 *
 * @param {number | string} a First item
 * @param {number | string} b Second item
 */
export const numberComparator: Comparator<number> = (a: number, b: number) =>
  a - b;

export const stringComparator: Comparator<string> = (a: string, b: string) =>
  a.localeCompare(b);

interface GenerationOpts {
  sorted?: boolean;
  unique?: boolean;
}

const defaultGenOpts: GenerationOpts = {
  sorted: false,
  unique: false,
};

export function fisherYatesShuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const generateRandomNumber = (from: number, to: number): number =>
  from + Math.floor((to - from) * Math.random());

/**
 * Generate a list of random numbers in array of given length
 * @param {number} length
 * @return {array} the list of random numbers
 */
export function generateRandomNumbers(
  from: number,
  to: number,
  length: number,
  opts?: GenerationOpts
): number[] {
  const { sorted = false, unique = true } = { ...defaultGenOpts, ...opts };

  let data: number[];
  if (unique) {
    data = Array(length)
      .fill(null)
      .map((i) => from + i);
    fisherYatesShuffle(data);
  } else {
    data = Array(length).fill(null).map(generateRandomNumber);
  }

  if (sorted) {
    data.sort();
  }

  return data;
}

const LETTERS: string[] = [];
for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
  LETTERS.push(String.fromCharCode(i));
}

export const generateRandomLetter = () =>
  LETTERS[Math.floor(Math.random() * LETTERS.length)];

/**
 * A general form for a linear data structure.
 * Can be used to implement either FIFO or FILO buffers. (Queues and Stacks)
 */
export interface ILinearDataStructure<T> {
  push: (item: T) => this;
  pop: () => T | undefined;
  peek: () => T | undefined;
  size: () => number;
  isEmpty: () => boolean;
  empty: () => this;
  getItems: () => T[];
}

export class ObservableVersioned implements IVersioned {
  version: number;
  tickObserver: () => any;

  constructor() {
    this.version = 0;
    this.tickObserver = emptyObserver;
  }

  setTickObserver(tickObserver: () => any) {
    this.tickObserver = tickObserver;
  }

  tickVersion() {
    this.version += 1;
    this.tickObserver();
  }
}

export const generateRandomLetters = (
  length: number,
  opts?: GenerationOpts
): string[] => {
  const { sorted = false, unique = true } = { ...defaultGenOpts, ...opts };

  let data: string[] = [];

  if (unique) {
    data = Array(length)
      .fill(null)
      .map((_, i) => LETTERS[i]);
    fisherYatesShuffle(data);
  } else {
    data = Array(length).fill(null).map(generateRandomLetter);
  }
  if (sorted) {
    data.sort();
  }
  return data;
};

export const getAllEnumKeys = (enumType: any): string[] =>
  Object.keys(enumType).filter((key) => isNaN(Number(key)));
export const getAllEnumValues = (enumType: any) =>
  getAllEnumKeys(enumType).map((key: string) => enumType[key]);
export const getAllEnumEntries = (enumType: any) =>
  getAllEnumKeys(enumType).map((key: string) => [key, enumType[key]]);

export function pickRandomIndex(from: any[]): number {
  return Math.floor(from.length * Math.random());
}

/**
 * Given an array, picks a random element
 */
export function pickRandom<T>(from: T[]): T {
  return from[pickRandomIndex(from)];
}

export function validateArrayIndices(arr: any[], ...index: number[]) {
  index.forEach((i) => {
    if (i >= arr.length || i < 0) {
      throw new Error(
        `Invalid index ${index} to access array of index ${arr.length}`
      );
    }
  });
}

/**
 * Check that an array is in order.
 *
 * @param arr The array
 * @param comparator A method for comparing items in the array
 * @returns True if the array is in order
 */
export function arrayIsInOrder<T>(
  arr: T[],
  comparator: Comparator<T>
): boolean {
  if (arr.length < 2) return true;

  for (let i = 1; i < arr.length; i++) {
    if (comparator(arr[i - 1], arr[i]) > 0) {
      return false;
    }
  }

  return true;
}
