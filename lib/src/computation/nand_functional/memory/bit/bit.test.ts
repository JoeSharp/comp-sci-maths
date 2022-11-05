import simpleBit, { bit } from "./bit";

describe("bit - Functional", () => {
  it.each`
    input    | load     | previousOutput | expected
    ${false} | ${false} | ${undefined}   | ${false}
    ${true}  | ${false} | ${undefined}   | ${false}
    ${true}  | ${true}  | ${undefined}   | ${true}
    ${false} | ${false} | ${false}       | ${false}
    ${false} | ${false} | ${true}        | ${true}
    ${false} | ${true}  | ${false}       | ${false}
    ${false} | ${true}  | ${true}        | ${false}
    ${true}  | ${false} | ${false}       | ${false}
    ${true}  | ${false} | ${true}        | ${true}
    ${true}  | ${true}  | ${false}       | ${true}
    ${true}  | ${true}  | ${true}        | ${true}
  `(
    "Input: $input, Load: %load, Previous: $previous = $expected",
    ({ input, load, previousOutput, expected }) =>
      expect(simpleBit(input, load, previousOutput)).toBe(expected)
  );

  it("Output assumes input based on load correctly", () => {
    const out1 = simpleBit(false, false);
    const out2 = simpleBit(true, true, out1);
    const out3 = simpleBit(false, false, out2);
    const out4 = simpleBit(false, true, out3);
    const out5 = simpleBit(true, true, out4);

    expect(out1).toBeFalsy();
    expect(out2).toBeTruthy();
    expect(out3).toBeTruthy();
    expect(out4).toBeFalsy();
    expect(out5).toBeTruthy();
  });

  it("Using the staged bit", () => {
    const myBit = bit.create();

    const v1 = myBit(false, false);

    expect(bit.read(v1)).toBe(false);

    const v2 = myBit(true, true);
    expect(bit.read(v2)).toBe(false);
    bit.clock(v2);
    expect(bit.read(v2)).toBe(true);
    const v3 = myBit(false, true);
    expect(bit.read(v3)).toBe(true);
    bit.clock(v3);
    expect(bit.read(v3)).toBe(false);
  });
});
