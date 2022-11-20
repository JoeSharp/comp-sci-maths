import {
  arrayIsInOrder,
  numberComparator,
  validateArrayIndices,
} from "../../common";

export type HanoiStack = number[];

export type HanoiStacks = HanoiStack[];

const NUMBER_OF_STACKS = 3;
const DEFAULT_HEIGHT = 5;

/**
 * Create a new Tower of Hanoi set of stacks
 * @param heightOfFirst The first stack should contain all the items
 * @returns The set of stacks ready to play
 */
export const createStacks = (
  heightOfFirst: number = DEFAULT_HEIGHT
): HanoiStacks =>
  Array(NUMBER_OF_STACKS)
    .fill(null)
    .map((_, i) => createStack(i === 0 ? heightOfFirst : 0));

/**
 * Create a new stack. For non zero height, populate with one-up numbers.
 *
 * @param height The height of the stack to build.
 * @returns The created stack.
 */
export const createStack = (height: number = 0): HanoiStack =>
  Array(height)
    .fill(null)
    .map((_, i) => i + 1);

/**
 * Attempt to place an item on a hanoi stack.
 * If the current stack is empty, it simply creates a new stack with the single item.
 * If there are items on the stack, then the new item has to be smaller than the highest one.
 * The highest one is the first item in array (index 0)
 *
 * @param item The item to place
 * @param param1 The current state of the stack
 * @returns An array containing a success indicator and the new state of the stack
 */
export const placeItem = (
  item: number,
  stack: HanoiStack
): [boolean, HanoiStack] => {
  if (stack.length === 0) {
    return [true, [item]];
  }

  if (stack[0] > item) {
    return [true, [item, ...stack]];
  } else {
    return [false, stack];
  }
};

/**
 * Remove an item from a stack.
 *
 * @param stack The stack from which to remove an item
 * @returns The state of the stack after the removal, with the item removed
 */
export const removeItem = (
  stack: HanoiStack
): [boolean, number | undefined, HanoiStack] => {
  if (stack.length === 0) {
    return [false, undefined, stack];
  }

  const [item, ...items] = stack;

  return [true, item, items];
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
  stacks: HanoiStacks
): [boolean, HanoiStacks] => {
  validateArrayIndices(stacks, from, to);

  const [removeSuccess, removedItem, fromStack] = removeItem(stacks[from]);
  if (!removeSuccess) {
    return [false, stacks];
  }

  const [placeSuccess, toStack] = placeItem(removedItem, stacks[to]);
  if (!placeSuccess) {
    return [false, stacks];
  }

  return [
    true,
    stacks.map((stack, i) => {
      switch (i) {
        case from:
          return fromStack;
        case to:
          return toStack;
        default:
          return stack;
      }
    }),
  ];
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
  if (stacks.length !== 3) {
    throw new Error("Invalid number of stacks");
  }

  if (stacks[0].length > 0) return false;
  if (stacks[1].length > 0) return false;
  if (stacks[2].length === 0) {
    throw new Error("There are not items on any stacks");
  }

  if (!arrayIsInOrder(stacks[2], numberComparator)) {
    throw new Error("The last stack is not in order");
  }

  return true;
};
