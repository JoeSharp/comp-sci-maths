import { binaryToBoolArray as bin } from "../../../../dataRepresentation/numberBases/simpleBinary";
import dmux8way, { createDemux8Way } from "./dmux8way";

const { op: built } = createDemux8Way();

describe("Dmux8Way - Functional", () => {
  describe.each([
    ["simple", dmux8way],
    ["built", built],
  ])("%s", (_name, op) => {
    it.each`
      input    | sel      | a        | b        | c        | d        | e        | f        | g        | h
      ${false} | ${"000"} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false}
      ${true}  | ${"000"} | ${true}  | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false}
      ${true}  | ${"001"} | ${false} | ${true}  | ${false} | ${false} | ${false} | ${false} | ${false} | ${false}
      ${true}  | ${"010"} | ${false} | ${false} | ${true}  | ${false} | ${false} | ${false} | ${false} | ${false}
      ${true}  | ${"011"} | ${false} | ${false} | ${false} | ${true}  | ${false} | ${false} | ${false} | ${false}
      ${true}  | ${"100"} | ${false} | ${false} | ${false} | ${false} | ${true}  | ${false} | ${false} | ${false}
      ${true}  | ${"101"} | ${false} | ${false} | ${false} | ${false} | ${false} | ${true}  | ${false} | ${false}
      ${true}  | ${"110"} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${true}  | ${false}
      ${true}  | ${"111"} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${false} | ${true}
    `(
      "input $input, sel: $sel, a=$a, b=$b, c=$c, d=$d",
      ({ input, sel, a, b, c, d, e, f, g, h }) => {
        const selBool = bin(sel);
        const result = op(input, selBool);
        expect(result[0]).toBe(a);
        expect(result[1]).toBe(b);
        expect(result[2]).toBe(c);
        expect(result[3]).toBe(d);
        expect(result[4]).toBe(e);
        expect(result[5]).toBe(f);
        expect(result[6]).toBe(g);
        expect(result[7]).toBe(h);
      }
    );
  });
});
