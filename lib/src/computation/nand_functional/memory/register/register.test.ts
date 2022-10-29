import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import register from "./register";

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
