import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";

import alu from "./alu";

describe("ALU - Functional", () => {
  it.each`
    x                     | y                     | zx       | nx       | zy       | ny       | f        | no       | output                | zr       | ng
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${false} | ${true}  | ${false} | ${true}  | ${false} | ${"0000000000000000"} | ${true}  | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${true}  | ${true}  | ${true}  | ${true}  | ${true}  | ${"0000000000000001"} | ${false} | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${true}  | ${true}  | ${false} | ${true}  | ${false} | ${"1111111111111111"} | ${false} | ${true}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${false} | ${true}  | ${true}  | ${false} | ${false} | ${"0000000000000000"} | ${true}  | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${true}  | ${false} | ${false} | ${false} | ${false} | ${"1111111111111111"} | ${false} | ${true}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${false} | ${true}  | ${true}  | ${false} | ${true}  | ${"1111111111111111"} | ${false} | ${true}
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${true}  | ${false} | ${false} | ${false} | ${true}  | ${"0000000000000000"} | ${true}  | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${false} | ${true}  | ${true}  | ${true}  | ${true}  | ${"0000000000000000"} | ${true}  | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${true}  | ${false} | ${false} | ${true}  | ${true}  | ${"0000000000000001"} | ${false} | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${true}  | ${true}  | ${true}  | ${true}  | ${true}  | ${"0000000000000001"} | ${false} | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${true}  | ${false} | ${true}  | ${true}  | ${true}  | ${"0000000000000000"} | ${true}  | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${false} | ${true}  | ${true}  | ${true}  | ${false} | ${"1111111111111111"} | ${false} | ${true}
    ${"0000000000000000"} | ${"1111111111111111"} | ${true}  | ${true}  | ${false} | ${false} | ${true}  | ${false} | ${"1111111111111110"} | ${false} | ${true}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${false} | ${false} | ${false} | ${true}  | ${false} | ${"1111111111111111"} | ${false} | ${true}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${true}  | ${false} | ${false} | ${true}  | ${true}  | ${"0000000000000001"} | ${false} | ${false}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${false} | ${false} | ${true}  | ${true}  | ${true}  | ${"1111111111111111"} | ${false} | ${true}
    ${"0000000000000000"} | ${"1111111111111111"} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${"0000000000000000"} | ${true}  | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${false} | ${true}  | ${false} | ${true}  | ${false} | ${"0000000000000000"} | ${true}  | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${true}  | ${true}  | ${true}  | ${true}  | ${true}  | ${"0000000000000001"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${true}  | ${true}  | ${false} | ${true}  | ${false} | ${"1111111111111111"} | ${false} | ${true}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${false} | ${true}  | ${true}  | ${false} | ${false} | ${"0000000000010001"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${true}  | ${false} | ${false} | ${false} | ${false} | ${"0000000000000011"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${false} | ${true}  | ${true}  | ${false} | ${true}  | ${"1111111111101110"} | ${false} | ${true}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${true}  | ${false} | ${false} | ${false} | ${true}  | ${"1111111111111100"} | ${false} | ${true}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${false} | ${true}  | ${true}  | ${true}  | ${true}  | ${"1111111111101111"} | ${false} | ${true}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${true}  | ${false} | ${false} | ${true}  | ${true}  | ${"1111111111111101"} | ${false} | ${true}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${true}  | ${true}  | ${true}  | ${true}  | ${true}  | ${"0000000000010010"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${true}  | ${false} | ${true}  | ${true}  | ${true}  | ${"0000000000000100"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${false} | ${true}  | ${true}  | ${true}  | ${false} | ${"0000000000010000"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${true}  | ${true}  | ${false} | ${false} | ${true}  | ${false} | ${"0000000000000010"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${false} | ${false} | ${false} | ${true}  | ${false} | ${"0000000000010100"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${true}  | ${false} | ${false} | ${true}  | ${true}  | ${"0000000000001110"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${false} | ${false} | ${true}  | ${true}  | ${true}  | ${"1111111111110010"} | ${false} | ${true}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${"0000000000000001"} | ${false} | ${false}
    ${"0000000000010001"} | ${"0000000000000011"} | ${false} | ${true}  | ${false} | ${true}  | ${false} | ${true}  | ${"0000000000010011"} | ${false} | ${false}
  `(
    "ALU x: $x, y: $y, zx: $zx, nx: $nx, zy: $zy, ny: $ny, f: $f, no: $no",
    ({ x, y, zx, nx, zy, ny, f, no, output, zr, ng }) => {
      const xStr = bin(x);
      const yStr = bin(y);

      const result = alu(xStr, yStr, zx, nx, zy, ny, f, no);
      const outStr = arr(result.output);

      expect(outStr).toBe(output);
      expect(zr).toBe(result.zr);
      expect(ng).toBe(result.ng);
    }
  );
});
