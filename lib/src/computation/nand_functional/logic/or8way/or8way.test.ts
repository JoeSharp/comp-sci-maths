import { binaryToBoolArray as bin } from "../../../../dataRepresentation/numberBases/simpleBinary";
import or8way from "./or8way";

describe("OR8Way - Functional", () => {
  it.each`
    input         | expected
    ${"00000000"} | ${false}
    ${"11111111"} | ${true}
    ${"00010000"} | ${true}
    ${"00000001"} | ${true}
    ${"00100110"} | ${true}
  `("8wayOr $input = $expected", ({ input, expected }) => {
    const inputBool = bin(input);
    const result = or8way(inputBool);
    expect(result).toBe(expected);
  });
});
