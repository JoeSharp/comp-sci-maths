import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import add16, { createAdd16 } from "./add16";

const { op: built } = createAdd16();

describe("Add16 - Functional", () => {
  describe.each([
    ["simple", add16],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      a                     | b                     | sum                   | carry
      ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${false}
      ${"0000000000000000"} | ${"1111111111111111"} | ${"1111111111111111"} | ${false}
      ${"1111111111111111"} | ${"1111111111111111"} | ${"1111111111111110"} | ${true}
      ${"1010101010101010"} | ${"0101010101010101"} | ${"1111111111111111"} | ${false}
      ${"0011110011000011"} | ${"0000111111110000"} | ${"0100110010110011"} | ${false}
      ${"0001001000110100"} | ${"1001100001110110"} | ${"1010101010101010"} | ${false}
    `("$a + $b = $sum carry: $carry", ({ a, b, sum, carry }) => {
      const aBool = bin(a);
      const bBool = bin(b);
      const resultBool = op(aBool, bBool);
      const result = arr(resultBool.sum);
      expect(result).toBe(sum);
      expect(resultBool.carry).toBe(carry);
    });
  });
});
