import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import mux8way16, { createMux8Way16 } from "./mux8way16";

const built = createMux8Way16();

describe("MUX8WAY16 - Functional", () => {
  describe.each([
    ["simple", mux8way16],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      a                     | b                     | c                     | d                     | e                     | f                     | g                     | h                     | sel      | expected
      ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"0000000000000000"} | ${"000"} | ${"0000000000000000"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"000"} | ${"0001001000110100"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"001"} | ${"0010001101000101"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"010"} | ${"0011010001010110"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"011"} | ${"0100010101100111"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"100"} | ${"0101011001111000"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"101"} | ${"0110011110001001"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"110"} | ${"0111100010011010"}
      ${"0001001000110100"} | ${"0010001101000101"} | ${"0011010001010110"} | ${"0100010101100111"} | ${"0101011001111000"} | ${"0110011110001001"} | ${"0111100010011010"} | ${"1000100110101011"} | ${"111"} | ${"1000100110101011"}
    `(
      "A: $a, B: $b, C: $c, D: $d, Sel: $sel = $expected",
      ({ a, b, c, d, e, f, g, h, sel, expected }) => {
        const aBool = bin(a);
        const bBool = bin(b);
        const cBool = bin(c);
        const dBool = bin(d);
        const eBool = bin(e);
        const fBool = bin(f);
        const gBool = bin(g);
        const hBool = bin(h);
        const selBool = bin(sel);

        const resultBool = mux8way16(
          aBool,
          bBool,
          cBool,
          dBool,
          eBool,
          fBool,
          gBool,
          hBool,
          selBool
        );
        const result = arr(resultBool);
        expect(result).toBe(expected);
      }
    );
  });
});
