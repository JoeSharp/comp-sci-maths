import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import mux4way16, { createMux4Way16 } from "./mux4way16";

const built = createMux4Way16();

describe("MUX4WAY16 - Functional", () => {
  describe.each([
    ["simple", mux4way16],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      a                     | b                     | c                     | d                     | sel     | expected
      ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"00"} | ${"0000000000000000"}
      ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"01"} | ${"0000000000000000"}
      ${"0001001000110100"} | ${"1001100001110110"} | ${"1010101010101010"} | ${"0101010101010101"} | ${"00"} | ${"0001001000110100"}
      ${"0001001000110100"} | ${"1001100001110110"} | ${"1010101010101010"} | ${"0101010101010101"} | ${"01"} | ${"1001100001110110"}
      ${"0001001000110100"} | ${"1001100001110110"} | ${"1010101010101010"} | ${"0101010101010101"} | ${"10"} | ${"1010101010101010"}
      ${"0001001000110100"} | ${"1001100001110110"} | ${"1010101010101010"} | ${"0101010101010101"} | ${"11"} | ${"0101010101010101"}
    `(
      "A: $a, B: $b, C: $c, D: $d, Sel: $sel = $expected",
      ({ a, b, c, d, sel, expected }) => {
        const aBool = bin(a);
        const bBool = bin(b);
        const cBool = bin(c);
        const dBool = bin(d);
        const selBool = bin(sel);

        const resultBool = op(aBool, bBool, cBool, dBool, selBool);
        const result = arr(resultBool);
        expect(result).toBe(expected);
      }
    );
  });
});
