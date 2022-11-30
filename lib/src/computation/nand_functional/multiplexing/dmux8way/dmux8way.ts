/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */
import and from "../../logic/and";
import not from "../../logic/not";
import dmux4way, { createDmux4Way } from "../dmux4way/dmux4way";

// 8 output booleans
export type Dmux8WayOutput = boolean[];

export const createDmux8WayOutput = () => Array(8).fill(false);

export default (input: boolean, sel: boolean[]): Dmux8WayOutput => {
  const notSel2 = not(sel[2]);

  const inAndNotSel2 = and(input, notSel2);
  const out1 = dmux4way(inAndNotSel2, sel.slice(0, 2));

  const inAndSel2 = and(input, sel[2]);
  const out2 = dmux4way(inAndSel2, sel.slice(0, 2));

  return [...out1, ...out2];
};

export const createDemux8Way = (
  output: Dmux8WayOutput = createDmux8WayOutput()
) => {
  const { op: dmux4wayInAndNotSel2 } = createDmux4Way();
  const { op: dmux4wayInAndSel2 } = createDmux4Way();

  return {
    output,
    op: (input: boolean, sel: boolean[]) => {
      const notSel2 = not(sel[2]);

      const inAndNotSel2 = and(input, notSel2);
      ({
        [0]: output[0],
        [1]: output[1],
        [2]: output[2],
        [3]: output[3],
      } = dmux4wayInAndNotSel2(inAndNotSel2, sel.slice(0, 2)));

      const inAndSel2 = and(input, sel[2]);
      ({
        [0]: output[4],
        [1]: output[5],
        [2]: output[6],
        [3]: output[7],
      } = dmux4wayInAndSel2(inAndSel2, sel.slice(0, 2)));

      return output;
    },
  };
};
