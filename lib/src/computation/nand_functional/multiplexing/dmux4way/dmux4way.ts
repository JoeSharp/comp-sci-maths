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
import { createDmux } from "../dmux/dmux";

export interface Dmux4WayOutput {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
}

export default (input: boolean, sel: boolean[]): Dmux4WayOutput => {
  const notSel1 = not(sel[1]);
  const inAndNotSel1 = and(input, notSel1);
  const { a, b } = dmux(inAndNotSel1, sel[0]);

  const inAndSel1 = and(input, sel[1]);
  const { a: c, b: d } = dmux(inAndSel1, sel[0]);

  return { a, b, c, d };
};

/**
 * Create a 4 way demux that re-uses the output object.
 * @returns A demux function with a consistent output object.
 */
export const createDmux4Way = (
  output: Dmux4WayOutput = {
    a: false,
    b: false,
    c: false,
    d: false,
  }
) => {
  const dmux_ab = createDmux();
  const dmux_bc = createDmux();

  return (input: boolean, sel: boolean[]) => {
    const notSel1 = not(sel[1]);
    const inAndNotSel1 = and(input, notSel1);
    ({ a: output.a, b: output.b } = dmux_ab(inAndNotSel1, sel[0]));

    const inAndSel1 = and(input, sel[1]);
    ({ a: output.c, b: output.d } = dmux_bc(inAndSel1, sel[0]));

    return output;
  };
};
