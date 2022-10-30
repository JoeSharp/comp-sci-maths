import { binaryToBoolArray as bin } from "../../../../dataRepresentation/numberBases/simpleBinary";
import dmux4way from "./dmux4way";

describe("Dmux4Way - Functional", () => {
  it.each`
    input    | sel     | a        | b        | c        | d
    ${false} | ${"00"} | ${false} | ${false} | ${false} | ${false}
    ${true}  | ${"00"} | ${true}  | ${false} | ${false} | ${false}
    ${true}  | ${"01"} | ${false} | ${true}  | ${false} | ${false}
    ${true}  | ${"10"} | ${false} | ${false} | ${true}  | ${false}
    ${true}  | ${"11"} | ${false} | ${false} | ${false} | ${true}
  `(
    "input $input, sel: $sel, a=$a, b=$b, c=$c, d=$d",
    ({ input, sel, a, b, c, d }) => {
      const selBool = bin(sel);
      const result = dmux4way({ input, sel: selBool });
      expect(result.a).toBe(a);
      expect(result.b).toBe(b);
      expect(result.c).toBe(c);
      expect(result.d).toBe(d);
    }
  );
});
