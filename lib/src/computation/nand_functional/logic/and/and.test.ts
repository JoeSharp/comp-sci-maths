import and from "./and";

describe("AND - Functional", () => {
  it.each`
    a        | b        | expected
    ${false} | ${false} | ${false}
    ${false} | ${true}  | ${false}
    ${true}  | ${false} | ${false}
    ${true}  | ${true}  | ${true}
  `(`$a AND $b = $expected`, ({ a, b, expected }) => {
    expect(and(a, b)).toBe(expected);
  });
});
