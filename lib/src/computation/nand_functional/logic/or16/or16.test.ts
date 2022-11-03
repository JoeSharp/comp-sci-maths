import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import or16, { createOr16 } from "./or16";

const built = createOr16();

describe("OR16 - Functional", () => {
  describe.each([
    ["simple", or16],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      a                     | b                     | expected
      ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"}
      ${"0000000000000000"} | ${"1111111111111111"} | ${"1111111111111111"}
      ${"1111111111111111"} | ${"1111111111111111"} | ${"1111111111111111"}
      ${"1010101010101010"} | ${"0101010101010101"} | ${"1111111111111111"}
      ${"0011110011000011"} | ${"0000111111110000"} | ${"0011111111110011"}
      ${"0001001000110100"} | ${"1001100001110110"} | ${"1001101001110110"}
    `("$a AND16 $b = $expected", ({ a, b, expected }) => {
      const aBool = bin(a);
      const bBool = bin(b);

      const resultBool = op(aBool, bBool);
      const result = arr(resultBool);
      expect(result).toBe(expected);
    });
  });
});
