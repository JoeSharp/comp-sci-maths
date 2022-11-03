import and from "../../logic/and";
import not from "../../logic/not";

interface DmuxOutput {
  a: boolean;
  b: boolean;
}

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */
export default (input: boolean, sel: boolean): DmuxOutput => {
  const notSel = not(sel);
  const a = and(input, notSel);
  const b = and(input, sel);

  return { a, b };
};

/**
 * Create a demux that re-uses the output object.
 * @returns A demux function with a consistent output object.
 */
export const createDmux =
  (output: DmuxOutput = { a: false, b: false }) =>
  (input: boolean, sel: boolean) => {
    const notSel = not(sel);
    output.a = and(input, notSel);
    output.b = and(input, sel);
    return output;
  };
