import {
  binaryToBoolArray,
  booleanToBinArray,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import inc16 from "./inc16";

describe("Inc16 - Functional", () => {
  it.each`
    input                 | expected
    ${"0000000000000000"} | ${"0000000000000001"}
    ${"1111111111111111"} | ${"0000000000000000"}
    ${"0000000000000101"} | ${"0000000000000110"}
    ${"1111111111111011"} | ${"1111111111111100"}
  `("input + 1 = $expected", ({ input, expected }) => {
    const inputBool = binaryToBoolArray(input);
    const result = inc16(inputBool);
    const resultBool = booleanToBinArray(result.sum);
    expect(resultBool).toBe(expected);
  });
});
