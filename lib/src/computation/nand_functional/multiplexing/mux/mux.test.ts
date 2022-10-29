import mux from "./mux";

describe("MUX - Functional", () => {
  it.each`
    a        | b        | sel      | expected
    ${false} | ${false} | ${false} | ${false}
    ${false} | ${true}  | ${false} | ${false}
    ${true}  | ${false} | ${false} | ${true}
    ${true}  | ${true}  | ${false} | ${true}
    ${false} | ${false} | ${true}  | ${false}
    ${false} | ${true}  | ${true}  | ${true}
    ${true}  | ${false} | ${true}  | ${false}
    ${true}  | ${true}  | ${true}  | ${true}
  `("$a mux $b, sel: $sel expect $expecte", ({ a, b, sel, expected }) => {
    expect(mux(a, b, sel)).toBe(expected);
  });
});
