import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import mux16, { createMux16 } from "./mux16";

const built = createMux16();

describe("MUX16 - Functional", () => {
  describe.each([
    ["simple", mux16],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      a                     | b                     | sel      | expected
      ${"0000000000000000"} | ${"0000000000000000"} | ${false} | ${"0000000000000000"}
      ${"0000000000000000"} | ${"0000000000000000"} | ${true}  | ${"0000000000000000"}
      ${"0000000000000000"} | ${"0001001000110100"} | ${false} | ${"0000000000000000"}
      ${"0000000000000000"} | ${"0001001000110100"} | ${true}  | ${"0001001000110100"}
      ${"1001100001110110"} | ${"0000000000000000"} | ${false} | ${"1001100001110110"}
      ${"1001100001110110"} | ${"0000000000000000"} | ${true}  | ${"0000000000000000"}
      ${"1010101010101010"} | ${"0101010101010101"} | ${false} | ${"1010101010101010"}
      ${"1010101010101010"} | ${"0101010101010101"} | ${true}  | ${"0101010101010101"}
    `("$a AND16 $b = $expected", ({ a, b, sel, expected }) => {
      const aBool = bin(a);
      const bBool = bin(b);

      const resultBool = op(aBool, bBool, sel);
      const result = arr(resultBool);
      expect(result).toBe(expected);
    });
  });
});
