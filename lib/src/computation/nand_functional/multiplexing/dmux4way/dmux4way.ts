/**
 * 4-way demultiplexor:
 * {a, b, c, d} = {in, 0, 0, 0} if sel == 00
 *                {0, in, 0, 0} if sel == 01
 *                {0, 0, in, 0} if sel == 10
 *                {0, 0, 0, in} if sel == 11
 */
import and from "../../logic/and";
import not from "../../logic/not";
import dmux from "../dmux";

export default (input: boolean, sel: boolean[]) => {
  const notSel1 = not(sel[1]);
  const inAndNotSel1 = and(input, notSel1);
  const { a, b } = dmux(inAndNotSel1, sel[0]);

  const inAndSel1 = and(input, sel[1]);
  const { a: c, b: d } = dmux(inAndSel1, sel[0]);

  return { a, b, c, d };
};
