import { ZERO_WORD } from "../../../nand/types";
import simpleBit, { BitState, bit, SequentialChipApi } from "../bit";

export default (input: boolean[], load: boolean, previousOutput?: boolean[]) =>
  input.map((value, i) =>
    simpleBit(value, load, previousOutput && previousOutput[i])
  );

export type RegisterState = BitState[];

export type RegisterChip = (input: boolean[], load: boolean) => RegisterState;
export type RegisterApi = SequentialChipApi<
  RegisterState,
  boolean[],
  RegisterChip
>;

export const createState = (): RegisterState =>
  ZERO_WORD.map(() => ({ current: false, next: false }));

export const register: RegisterApi = {
  clock: (input) => input.forEach((i) => bit.clock(i)),
  read: (input) => input.map((i) => bit.read(i)),
  createState,
  create: (outputState: BitState[] = createState()) => {
    const bits = outputState.map((o) => bit.create(o));

    return (input: boolean[], load: boolean) => {
      input.forEach((value, i) => bits[i](value, load));
      return outputState;
    };
  },
};
