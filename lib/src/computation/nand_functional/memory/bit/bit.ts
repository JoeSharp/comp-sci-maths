/**
 * The most primitive sequential logic chip we have is the single bit register.
 * Calling this function is the equivalent of a 'clock'.
 */
const simpleBit = (
  input: boolean,
  load: boolean,
  previousOutput: boolean = false
) => (load ? input : previousOutput);
export default simpleBit;

export interface BitState {
  input: boolean;
  load: boolean;
  output: boolean;
}

const createBitState = () => ({
  input: false,
  load: false,
  output: false,
});

export const createBit = (state: BitState = createBitState()) => {
  return {
    state,
    clock: () => {
      state.output = simpleBit(state.input, state.load, state.output);
    },
    bit: (input: boolean, load: boolean) => {
      state.input = input;
      state.load = load;
    },
  };
};
