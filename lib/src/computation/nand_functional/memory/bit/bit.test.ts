import simpleBit, { createBit } from "./bit";

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
    const myBit = createBit();

    myBit.bit(false, false);
    expect(myBit.state.output).toBe(false);

    myBit.bit(true, true);
    expect(myBit.state.output).toBe(false);
    myBit.clock();
    expect(myBit.state.output).toBe(true);
    myBit.bit(false, true);
    expect(myBit.state.output).toBe(true);
    myBit.clock();
    expect(myBit.state.output).toBe(false);
  });
});
