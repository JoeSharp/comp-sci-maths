import halfAdder, { createHalfAdder } from "./halfAdder";

const { op: built } = createHalfAdder();

describe("Half Adder - Functional", () => {
  describe.each([
    ["simple", halfAdder],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      a        | b        | sum      | carry
      ${false} | ${false} | ${false} | ${false}
      ${false} | ${true}  | ${true}  | ${false}
      ${true}  | ${false} | ${true}  | ${false}
      ${true}  | ${true}  | ${false} | ${true}
    `("$a + $b = $sum carry $carry", ({ a, b, sum, carry }) => {
      const result = op(a, b);
      expect(result.sum).toBe(sum);
      expect(result.carry).toBe(carry);
    });
  });
});
