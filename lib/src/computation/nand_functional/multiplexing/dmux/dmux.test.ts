import dmux, { createDmux } from "./dmux";

const { op: built } = createDmux();

describe("AND16 - Functional", () => {
  describe.each([
    ["simple", dmux],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      input    | sel      | expectedA | expectedB
      ${false} | ${false} | ${false}  | ${false}
      ${false} | ${true}  | ${false}  | ${false}
      ${true}  | ${false} | ${true}   | ${false}
      ${true}  | ${true}  | ${false}  | ${true}
    `(
      "DMUX $input with $selector, a=$a, b=$b",
      ({ input, sel, expectedA, expectedB }) => {
        const { a, b } = op(input, sel);
        expect(a).toBe(expectedA);
        expect(b).toBe(expectedB);
      }
    );
  });
});
