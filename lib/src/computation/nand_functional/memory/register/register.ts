import { ZERO_WORD } from "../../../nand/types";
import bit from "../bit";

export default (input: boolean[], load: boolean, previousOutput?: boolean[]) =>
  input.map((value, i) =>
    bit(value, load, previousOutput && previousOutput[i])
  );

export const createRegister =
  (output: boolean[] = [...ZERO_WORD]) =>
  (input: boolean[], load: boolean) => {
    input.forEach((value, i) => (output[i] = bit(value, load, output[i])));
    return output;
  };
