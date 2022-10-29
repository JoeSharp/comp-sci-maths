import halfAdder from "./halfAdder";

describe("Half Adder - Functional", () => {
  it.each`
    a        | b        | sum      | carry
    ${false} | ${false} | ${false} | ${false}
    ${false} | ${true}  | ${true}  | ${false}
    ${true}  | ${false} | ${true}  | ${false}
    ${true}  | ${true}  | ${false} | ${true}
  `("$a + $b = $sum carry $carry", ({ a, b, sum, carry }) => {
    const result = halfAdder(a, b);
    expect(result.sum).toBe(sum);
    expect(result.carry).toBe(carry);
  });
});
