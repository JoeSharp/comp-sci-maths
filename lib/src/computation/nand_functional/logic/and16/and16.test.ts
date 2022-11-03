import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import and16, { createAnd16 } from "./and16";

const built = createAnd16();

describe("AND16 - Functional", () => {
  describe.each([
    ["simple", and16],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      a                     | b                     | expected
      ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"}
      ${"0000000000000000"} | ${"1111111111111111"} | ${"0000000000000000"}
      ${"1111111111111111"} | ${"1111111111111111"} | ${"1111111111111111"}
      ${"1010101010101010"} | ${"0101010101010101"} | ${"0000000000000000"}
      ${"0011110011000011"} | ${"0000111111110000"} | ${"0000110011000000"}
      ${"0001001000110100"} | ${"1001100001110110"} | ${"0001000000110100"}
    `("$a AND16 $b = $expected", ({ a, b, expected }) => {
      const aBool = bin(a);
      const bBool = bin(b);

      const resultBool = op(aBool, bBool);
      const result = arr(resultBool);
      expect(result).toBe(expected);
    });
  });
});
