import nand from "./nand";

describe("NAND - Functional", () => {
  it.each`
    a        | b        | expected
    ${false} | ${false} | ${true}
    ${false} | ${true}  | ${true}
    ${true}  | ${false} | ${true}
    ${true}  | ${true}  | ${false}
  `(`$a NAND $b = $expected`, ({ a, b, expected }) => {
    expect(nand(a, b)).toBe(expected);
  });
});
