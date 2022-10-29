import { validateBus } from "./common";

describe("Functional NAND - Common", () => {
  it("validates a 16 wide bus correctly", () => {
    expect(() =>
      validateBus([
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        true,
      ])
    ).not.toThrow();
  });

  it("invalidates a 8 wide bus correctly", () => {
    expect(() =>
      validateBus([false, false, true, false, true, false, false, false])
    ).toThrow();
  });
});
