import assert from "assert";

export const BUS_WIDTH = 16;

export const validateBus = (arr: boolean[]) =>
  assert(arr.length === BUS_WIDTH, "Invalid Bus Width");
