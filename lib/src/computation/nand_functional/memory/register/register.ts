import { ZERO_WORD } from "../../../nand/types";
import simpleBit, { BitState, createBit, createBitState } from "../bit";

export default (
  input: boolean[],
  load: boolean,
  previousOutput: boolean[] = ZERO_WORD
) => input.map((value, i) => simpleBit(value, load, previousOutput[i]));

export type RegisterState = BitState[];

export const createRegisterState = (): RegisterState =>
  [...ZERO_WORD].map(() => createBitState());

export const createRegister = (
  state: RegisterState = createRegisterState()
) => {
  const bits = state.map(createBit);

  return {
    state,
    clock: () => {
      bits.forEach((b) => b.clock());
    },
    register: (input: boolean[], load: boolean) => {
      input.forEach((value, i) => bits[i].bit(value, load));
    },
    readOutput: () => state.map(({ output }) => output),
  };
};
