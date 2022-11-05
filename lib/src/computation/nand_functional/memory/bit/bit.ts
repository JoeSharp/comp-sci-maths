/**
 * The most primitive sequential logic chip we have is the single bit register.
 * Calling this function is the equivalent of a 'clock'.
 */
export default (
  input: boolean,
  load: boolean,
  previousOutput: boolean = false
) => (load ? input : previousOutput);

export interface BitState {
  current: boolean;
  next: boolean;
}

export type Clock<T> = (input: T) => void;
export type BitChip = (input: boolean, load: boolean) => BitState;

export interface SequentialChipApi<STATE, VALUE, CHIP> {
  clock: Clock<STATE>;
  read: (state: STATE) => VALUE;
  createState: () => STATE;
  create: (state?: STATE) => CHIP;
}

export type BitChipApi = SequentialChipApi<BitState, boolean, BitChip>;

export const createState = (): BitState => ({ current: false, next: false });

export const bit: BitChipApi = {
  clock: (bit) => (bit.current = bit.next),
  read: ({ current }: BitState) => current,
  createState,
  create:
    (bitState = createState()) =>
    (input, load) => {
      bitState.next = load ? input : bitState.current;
      return bitState;
    },
};
