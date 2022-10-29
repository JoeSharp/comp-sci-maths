import not from "./not";

describe("NOT - Functional", () => {
  it.each`
    input    | expected
    ${false} | ${true}
    ${true}  | ${false}
  `(`NOT $in = $expected`, ({ input, expected }) => {
    expect(not(input)).toBe(expected);
  });
});
