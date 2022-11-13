import { binaryToBoolArray as bin } from "../../../../dataRepresentation/numberBases/simpleBinary";
import dmux4way, { createDmux4Way } from "./dmux4way";

const { op: built } = createDmux4Way();

describe("Demux4Way - Functional", () => {
  describe.each([
    ["simple", dmux4way],
    ["built", built],
  ])("%s", (_name, op) => {
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
        const result = op(input, selBool);
        expect(result.a).toBe(a);
        expect(result.b).toBe(b);
        expect(result.c).toBe(c);
        expect(result.d).toBe(d);
      }
    );
  });
});
