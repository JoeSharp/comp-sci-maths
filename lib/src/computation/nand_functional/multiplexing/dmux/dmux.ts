import and from "../../logic/and";
import not from "../../logic/not";

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */
export default (input: boolean, sel: boolean) => {
  const notSel = not(sel);
  const a = and(input, notSel);
  const b = and(input, sel);

  return { a, b };
};
