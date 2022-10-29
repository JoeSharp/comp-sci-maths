import assert from "assert";

export const BUS_WIDTH = 16;

export const BINARY_ONE = Array(BUS_WIDTH)
  .fill(false)
  .map((_, i) => i === 0);

export const validateBus = (arr: boolean[]) =>
  assert(arr.length === BUS_WIDTH, "Invalid Bus Width");
