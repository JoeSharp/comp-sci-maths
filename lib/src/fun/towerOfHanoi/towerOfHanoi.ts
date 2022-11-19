export type HanoiStack = {
  state: number[];
  lastMoveValid: boolean;
};

export type HanoiStacks = {
  stacks: HanoiStack[];
  lastMoveValid: boolean;
};

export const createStacks = (): HanoiStacks => ({
  stacks: Array(3)
    .fill(null)
    .map(() => createStack()),
  lastMoveValid: true,
});

export const createStack = (): HanoiStack => ({
  state: [],
  lastMoveValid: true,
});

/**
 * Attempt to place an item on a hanoi stack.
 * If the current stack is empty, it simply creates a new stack with the single item.
 * If there are items on the stack, then the new item has to be smaller than the highest one.
 * The highest one is the first item in array (index 0)
 *
 * @param item The item to place
 * @param param1 The current state of the stack
 * @returns The new state of the stack
 */
export const placeItem = (item: number, { state }: HanoiStack): HanoiStack => {
  if (state.length === 0) {
    return {
      state: [item],
      lastMoveValid: true,
    };
  }

  if (state[0] > item) {
    return {
      state: [item, ...state],
      lastMoveValid: true,
    };
  } else {
    return {
      state,
      lastMoveValid: false,
    };
  }
};

export const removeItem = (item: number, { state }: HanoiStack): HanoiStack => {
  if (state.length === 0)
    return {
      state,
      lastMoveValid: false,
    };
};

export const moveItem = (
  from: number,
  to: number,
  { stacks }: HanoiStacks
): HanoiStacks => {
  return { stacks, lastMoveValid: true };
};
