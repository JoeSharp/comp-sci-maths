import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import not16, { createNot16 } from "./not16";

const built = createNot16();

describe("NOT16 - Functional", () => {
  describe.each([
    ["simple", not16],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      input                 | expected
      ${"0000000000000000"} | ${"1111111111111111"}
      ${"1111111111111111"} | ${"0000000000000000"}
      ${"1010101010101010"} | ${"0101010101010101"}
      ${"0011110011000011"} | ${"1100001100111100"}
      ${"0001001000110100"} | ${"1110110111001011"}
    `("NOT16 $input = $expected", ({ input, expected }) => {
      const aBool = bin(input);

      const resultBool = op(aBool);
      const result = arr(resultBool);
      expect(result).toBe(expected);
    });
  });
});
