import and from "../../logic/and";
import not from "../../logic/not";

interface DmuxInput {
  input: boolean;
  sel: boolean;
}

interface DmuxOutput {
  a: boolean;
  b: boolean;
}

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */
export default ({ input, sel }: DmuxInput): DmuxOutput => {
  const notSel = not(sel);
  const a = and(input, notSel);
  const b = and(input, sel);

  return { a, b };
};
