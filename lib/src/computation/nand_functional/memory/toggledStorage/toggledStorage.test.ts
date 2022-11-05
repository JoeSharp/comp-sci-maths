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

    expect(state).toStrictEqual({ input: [false, false, false] });
  });

  it("Toggles correctly", () => {
    const s = createToggledStorage<TestBus>(() => ({
      input: [false, false, false],
    }));

    const s1 = s();
    const s2 = s();
    const s3 = s();
    const s4 = s();

    expect(s1.now === s3.now).toBeTruthy();
    expect(s2.now === s4.now).toBeTruthy();
    expect(s1.now === s2.now).toBeFalsy();
  });
});
