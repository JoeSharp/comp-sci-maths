import or from "./or";

describe("OR - Functional", () => {
  it.each`
    a        | b        | expected
    ${false} | ${false} | ${false}
    ${false} | ${true}  | ${true}
    ${true}  | ${false} | ${true}
    ${true}  | ${true}  | ${true}
  `(`$a OR $b = $expected`, ({ a, b, expected }) => {
    expect(or(a, b)).toBe(expected);
  });
});
