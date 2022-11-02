/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */
import and from "../../logic/and";
import not from "../../logic/not";
import dmux4way, { Dmux4WayOutput, createDmux4Way } from "../dmux4way/dmux4way";

interface Dmux8WayOutput extends Dmux4WayOutput {
  e: boolean;
  f: boolean;
  g: boolean;
  h: boolean;
}

export default (input: boolean, sel: boolean[]): Dmux8WayOutput => {
  const notSel2 = not(sel[2]);

  const inAndNotSel2 = and(input, notSel2);
  const { a, b, c, d } = dmux4way(inAndNotSel2, sel.slice(0, 2));

  const inAndSel2 = and(input, sel[2]);
  const { a: e, b: f, c: g, d: h } = dmux4way(inAndSel2, sel.slice(0, 2));

  return { a, b, c, d, e, f, g, h };
};

export const createDemux8Way = (
  output: Dmux8WayOutput = {
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  }
) => {
  const { op: dmux4way_inAndNotSel2 } = createDmux4Way();
  const { op: dmux4way_inAndSel2 } = createDmux4Way();

  return {
    output,
    op: (input: boolean, sel: boolean[]) => {
      const notSel2 = not(sel[2]);

      const inAndNotSel2 = and(input, notSel2);
      ({
        a: output.a,
        b: output.b,
        c: output.c,
        d: output.d,
      } = dmux4way_inAndNotSel2(inAndNotSel2, sel.slice(0, 2)));

      const inAndSel2 = and(input, sel[2]);
      ({
        a: output.e,
        b: output.f,
        c: output.g,
        d: output.h,
      } = dmux4way_inAndSel2(inAndSel2, sel.slice(0, 2)));

      return output;
    },
  };
};
