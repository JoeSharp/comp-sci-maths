import { BINARY_ONE, ZERO_WORD } from "../../../nand/types";
import add16, { Add16Output, createAdd16 } from "../add16";

export default (input: boolean[]) => add16(input, BINARY_ONE);

export const createInc16 = (
  output: Add16Output = {
    sum: [...ZERO_WORD],
    carry: false,
  }
) => {
  const { op: theAdd16 } = createAdd16(output);

  return {
    op: (input: boolean[]): Add16Output => {
      return theAdd16(input, BINARY_ONE);
    },
  };
};
