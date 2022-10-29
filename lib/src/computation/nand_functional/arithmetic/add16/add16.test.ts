import {
  binaryToBoolArray,
  booleanToBinArray,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import add16 from "./add16";

describe("Add16 - Functional", () => {
  it.each`
    a                     | b                     | out
    ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"}
    ${"0000000000000000"} | ${"1111111111111111"} | ${"1111111111111111"}
    ${"1111111111111111"} | ${"1111111111111111"} | ${"1111111111111110"}
    ${"1010101010101010"} | ${"0101010101010101"} | ${"1111111111111111"}
    ${"0011110011000011"} | ${"0000111111110000"} | ${"0100110010110011"}
    ${"0001001000110100"} | ${"1001100001110110"} | ${"1010101010101010"}
  `("$a + $b = $out", ({ a, b, out }) => {
    const aBool = binaryToBoolArray(a);
    const bBool = binaryToBoolArray(b);
    const resultBool = add16(aBool, bBool);
    const result = booleanToBinArray(resultBool.sum);
    expect(result).toBe(out);
  });
});
