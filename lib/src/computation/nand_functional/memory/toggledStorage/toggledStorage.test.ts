import { createToggledStorage } from "./toggledStorage";

interface TestBus {
  input: boolean[];
}

describe("Toggled Storage", () => {
  it("initialises correctly", () => {
    const s = createToggledStorage<TestBus>(() => ({
      input: [false, false, false],
    }));

    const state = s();

    expect(state.now).toStrictEqual({ input: [false, false, false] });
    expect(state.prev).toStrictEqual({ input: [false, false, false] });
  });

  it("Toggles correctly", () => {
    const s = createToggledStorage<TestBus>(() => ({
      input: [false, false, false],
    }));

    const { now: s1 } = s();
    const { now: s2 } = s();
    const { now: s3 } = s();
    const { now: s4 } = s();

    expect(s1 === s3).toBeTruthy();
    expect(s2 === s4).toBeTruthy();
    expect(s1 === s2).toBeFalsy();
  });
});
