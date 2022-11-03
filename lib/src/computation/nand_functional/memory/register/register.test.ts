import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { ZERO_WORD } from "../../../nand/types";
import register, { createRegister } from "./register";

describe("Register - Built", () => {
  let built = createRegister();

  beforeEach(() => {
    built = createRegister();
  });

  it("initialises correctly", () => {
    const output = built(ZERO_WORD, false);
    expect(output).toStrictEqual(ZERO_WORD);
  });

  it("ignores value if load = false", () => {
    const VALUE = bin("0010110110101010");
    const output = built(VALUE, false);
    expect(output).toStrictEqual(ZERO_WORD);
  });

  it("Takes on value correctly", () => {
    const VALUE = bin("0010110110101010");
    const output = built(VALUE, true);
    expect(output).toStrictEqual(VALUE);
  });
});

describe("Register", () => {
  it.each`
    input                 | load     | previousOutput        | expected
    ${"0110000000000000"} | ${false} | ${undefined}          | ${"0000000000000000"}
    ${"0110000000000000"} | ${true}  | ${undefined}          | ${"0110000000000000"}
    ${"0110000000000000"} | ${false} | ${"0000000000000101"} | ${"0000000000000101"}
    ${"0110000000000000"} | ${true}  | ${"0000000000000101"} | ${"0110000000000000"}
  `(
    "Input: $input, PrevOut: $previousOutput, Load: $load, Expected: $expected",
    ({ input, previousOutput, load, expected }) => {
      const inputBool = bin(input);
      const prevOutBool = previousOutput ? bin(previousOutput) : undefined;

      const resultBool = register(inputBool, load, prevOutBool);
      const result = arr(resultBool);
      expect(result).toBe(expected);
    }
  );
});
