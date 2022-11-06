import { ZERO_WORD } from "../../../nand/types";
import simpleBit, { createBit } from "../bit";

export default (input: boolean[], load: boolean, previousOutput?: boolean[]) =>
  input.map((value, i) =>
    simpleBit(value, load, previousOutput && previousOutput[i])
  );

interface RegisterState {
  input: boolean[];
  load: boolean;
  output: boolean[];
}

const createState = (): RegisterState => ({
  input: [...ZERO_WORD],
  load: false,
  output: [...ZERO_WORD],
});

export const createRegister = (state: RegisterState = createState()) => {
  const bits = ZERO_WORD.map(() => createBit());

  return {
    state,
    clock: () => {
      bits.forEach((b) => b.clock());
      bits.forEach((b, i) => (state.output[i] = b.state.output));
    },
    register: (input: boolean[], load: boolean) => {
      input.forEach((value, i) => bits[i].bit(value, load));
    },
  };
};
