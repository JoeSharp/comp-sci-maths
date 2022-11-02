/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */
import and from "../../logic/and";
import not from "../../logic/not";
import dmux4way, { Dmux4WayOutput } from "../dmux4way/dmux4way";

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
