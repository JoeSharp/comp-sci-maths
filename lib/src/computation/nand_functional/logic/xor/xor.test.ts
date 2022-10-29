import xor from "./xor";

describe("XOR - Functional", () => {
  it.each`
    a        | b        | expected
    ${false} | ${false} | ${false}
    ${false} | ${true}  | ${true}
    ${true}  | ${false} | ${true}
    ${true}  | ${true}  | ${false}
  `(`$a XOR $b = $expected`, ({ a, b, expected }) => {
    expect(xor(a, b)).toBe(expected);
  });
});
