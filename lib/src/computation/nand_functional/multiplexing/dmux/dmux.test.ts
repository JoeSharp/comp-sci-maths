import dmux from "./dmux";

describe("DMUX - Functional", () => {
  it.each`
    input    | sel      | expectedA | expectedB
    ${false} | ${false} | ${false}  | ${false}
    ${false} | ${true}  | ${false}  | ${false}
    ${true}  | ${false} | ${true}   | ${false}
    ${true}  | ${true}  | ${false}  | ${true}
  `(
    "DMUX $input with $selector, a=$a, b=$b",
    ({ input, sel, expectedA, expectedB }) => {
      const { a, b } = dmux(input, sel);
      expect(a).toBe(expectedA);
      expect(b).toBe(expectedB);
    }
  );
});
