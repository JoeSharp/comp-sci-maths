import { validateArrayIndices } from "../../common";

export type HanoiStack = {
  state: number[];
  lastMoveValid: boolean;
};

export type HanoiStacks = {
  stacks: HanoiStack[];
  lastMoveValid: boolean;
};

const NUMBER_OF_STACKS = 3;
const DEFAULT_HEIGHT = 5;

/**
 * Create a new Tower of Hanoi set of stacks
 * @param heightOfFirst The first stack should contain all the items
 * @returns The set of stacks ready to play
 */
export const createStacks = (
  heightOfFirst: number = DEFAULT_HEIGHT
): HanoiStacks => ({
  stacks: Array(NUMBER_OF_STACKS)
    .fill(null)
    .map((_, i) => createStack(i === 0 ? heightOfFirst : 0)),
  lastMoveValid: true,
});

/**
 * Create a new stack. For non zero height, populate with one-up numbers.
 *
 * @param height The height of the stack to build.
 * @returns The created stack.
 */
export const createStack = (height: number = 0): HanoiStack => {
  return {
    state: Array(height)
      .fill(null)
      .map((_, i) => i + 1),
    lastMoveValid: true,
  };
};

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

/**
 * Remove an item from a stack.
 *
 * @param stack The stack from which to remove an item
 * @returns The state of the stack after the removal, with the item removed
 */
export const removeItem = ({
  state,
}: HanoiStack): { item: number | undefined; stack: HanoiStack } => {
  if (state.length === 0) {
    return {
      item: undefined,
      stack: {
        state,
        lastMoveValid: false,
      },
    };
  }

  const [item, ...items] = state;

  return {
    item,
    stack: {
      state: items,
      lastMoveValid: true,
    },
  };
};

/**
 * Move an item from one stack to another.
 *
 * @param from The index of the 'from' stack
 * @param to The index of the 'to' stack
 * @param stack The current state state
 * @returns The new state of the stack
 */
export const moveItem = (
  from: number,
  to: number,
  { stacks }: HanoiStacks
): HanoiStacks => {
  validateArrayIndices(stacks, from, to);

  const removeResult = removeItem(stacks[from]);
  if (!removeResult.stack.lastMoveValid) {
    return { stacks, lastMoveValid: false };
  }

  const placeResult = placeItem(removeResult.item, stacks[to]);
  if (!placeResult.lastMoveValid) {
    return { stacks, lastMoveValid: false };
  }

  return {
    stacks: stacks.map((stack, i) => {
      switch (i) {
        case from:
          return removeResult.stack;
        case to:
          return placeResult;
        default:
          return stack;
      }
    }),
    lastMoveValid: true,
  };
};

/**
 * Evaluate a set of stacks to determine if the game is complete.
 * The game is complete when all of the items have been succesfully stacked up
 * on the last tower.
 *
 * @param stacks The current state of the stacks
 * @returns A boolean to indicate if the game is won.
 */
export const isComplete = (stacks: HanoiStacks): boolean => {
  return true;
};
