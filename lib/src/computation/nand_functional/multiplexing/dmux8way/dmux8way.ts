/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */
import and from "../../logic/and";
import not from "../../logic/not";
import dmux4way, { DmuxNWayInput, Dmux4WayOutput } from "../dmux4way/dmux4way";

interface Dmux8WayOutput extends Dmux4WayOutput {
  e: boolean;
  f: boolean;
  g: boolean;
  h: boolean;
}

export default ({ input, sel }: DmuxNWayInput): Dmux8WayOutput => {
  const notSel2 = not(sel[2]);

  const inAndNotSel2 = and(input, notSel2);
  const { a, b, c, d } = dmux4way({
    input: inAndNotSel2,
    sel: sel.slice(0, 2),
  });

  const inAndSel2 = and(input, sel[2]);
  const {
    a: e,
    b: f,
    c: g,
    d: h,
  } = dmux4way({ input: inAndSel2, sel: sel.slice(0, 2) });

  return { a, b, c, d, e, f, g, h };
};
