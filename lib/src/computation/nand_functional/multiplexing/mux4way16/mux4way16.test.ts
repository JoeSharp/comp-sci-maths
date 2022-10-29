import {
  binaryToBoolArray,
  booleanToBinArray,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import mux4way16 from "./mux4way16";

describe("MUX4WAY16 - Functional", () => {
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
      const aBool = binaryToBoolArray(a);
      const bBool = binaryToBoolArray(b);
      const cBool = binaryToBoolArray(c);
      const dBool = binaryToBoolArray(d);
      const selBool = binaryToBoolArray(sel);

      const resultBool = mux4way16(aBool, bBool, cBool, dBool, selBool);
      const result = booleanToBinArray(resultBool);
      expect(result).toBe(expected);
    }
  );
});
