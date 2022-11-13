import { ZERO_WORD } from "../../../nand/types";
import programCounter from "./programCounter";

import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";

describe("CPU Program Counter - Functional", () => {
  it("Initialises correctly", () => {
    const pc = programCounter();

    expect(pc).toStrictEqual(ZERO_WORD);
  });

  it("Increments Correctly", () => {
    const pc = Array(5)
      .fill(null)
      .reduce(
        (acc, curr) => programCounter(ZERO_WORD, false, true, false, acc),
        programCounter()
      );

    const pcStr = arr(pc);

    expect(pcStr).toBe("0000000000000101");
  });

  it("loads correctly", () => {
    const INITIAL_VALUE = bin("0001010111110000");
    const pc = programCounter(INITIAL_VALUE, true, false, false);
    const pcStr = arr(pc);
    expect(pcStr).toBe("0001010111110000");
  });

  it("resets correctly", () => {
    const pcAfterCounting = Array(5)
      .fill(null)
      .reduce(
        (acc, curr) => programCounter(ZERO_WORD, false, true, false, acc),
        programCounter()
      );

    const pcAfterCountingStr = arr(pcAfterCounting);

    expect(pcAfterCountingStr).toBe("0000000000000101");

    const pcAfterReset = programCounter(
      ZERO_WORD,
      false,
      false,
      true,
      pcAfterCounting
    );
    expect(pcAfterReset).toStrictEqual(ZERO_WORD);
  });

  it("prioritises load over increment", () => {
    const LAST_PC = bin("0000000000000101");
    const LOAD_VALUE = bin("0001010111110000");

    const pc = programCounter(LOAD_VALUE, true, true, false, LAST_PC);

    const pcStr = arr(pc);
    expect(pcStr).toBe("0001010111110000");
  });

  it("prioritises reset over load", () => {
    const LAST_PC = bin("0000000000000101");
    const LOAD_VALUE = bin("0001010111110000");

    const pc = programCounter(LOAD_VALUE, true, true, true, LAST_PC);

    expect(pc).toStrictEqual(ZERO_WORD);
  });
});
