import fullAdder from "./fullAdder";

describe("Full Adder - Functional", () => {
  it.each`
    a        | b        | c        | sum      | carry
    ${false} | ${false} | ${false} | ${false} | ${false}
    ${false} | ${false} | ${true}  | ${true}  | ${false}
    ${false} | ${true}  | ${false} | ${true}  | ${false}
    ${false} | ${true}  | ${true}  | ${false} | ${true}
    ${true}  | ${false} | ${false} | ${true}  | ${false}
    ${true}  | ${false} | ${true}  | ${false} | ${true}
    ${true}  | ${true}  | ${false} | ${false} | ${true}
    ${true}  | ${true}  | ${true}  | ${true}  | ${true}
  `("$a + $b + $c = $sum with carry $carry", ({ a, b, c, sum, carry }) => {
    const result = fullAdder(a, b, c);
    expect(result.sum).toBe(sum);
    expect(result.carry).toBe(carry);
  });
});
