import {
  HanoiStack,
  placeItem,
  createStack,
  removeItem,
  createStacks,
  moveItem,
} from "./towerOfHanoi";

describe("Tower of Hanoi", () => {
  describe("Stack", () => {
    it("Creates valid stack with default height", () => {
      const stack = createStack();

      expect(stack.lastMoveValid).toBeTruthy();
      expect(stack.state).toStrictEqual([]);
    });

    it("Creates valid stack with provided height", () => {
      const stack = createStack(5);

      expect(stack.lastMoveValid).toBeTruthy();
      expect(stack.state).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it("allows smaller items to be placed on larger ones", () => {
      const initialStack = createStack();
      const stack1 = placeItem(3, initialStack);
      const stack2 = placeItem(2, stack1);
      const stack3 = placeItem(1, stack2);

      expect(stack1).toStrictEqual({ state: [3], lastMoveValid: true });
      expect(stack2).toStrictEqual({ state: [2, 3], lastMoveValid: true });
      expect(stack3).toStrictEqual({ state: [1, 2, 3], lastMoveValid: true });
    });

    it("prevents larger items being placed on smaller ones", () => {
      const startingStack: HanoiStack = {
        state: [1, 2, 3],
        lastMoveValid: true,
      };

      const result = placeItem(4, startingStack);

      expect(result).toStrictEqual({ state: [1, 2, 3], lastMoveValid: false });
    });

    it("Allows removal of items from stack", () => {
      const stack = createStack(3);

      const result = removeItem(stack);

      expect(result.item).toBe(1);
      expect(result.stack.lastMoveValid).toBeTruthy();
      expect(result.stack.state).toStrictEqual([2, 3]);
    });

    it("Prevents removal of items from empty stack", () => {
      const stack = createStack();

      const result = removeItem(stack);

      expect(result.item).toBeUndefined();
      expect(result.stack.lastMoveValid).toBeFalsy();
      expect(result.stack.state).toStrictEqual([]);
    });
  });

  describe("Multiple Stacks", () => {
    it("Creates stack with default first stack height", () => {
      const stacks = createStacks();

      expect(stacks.lastMoveValid).toBeTruthy();
      expect(stacks.stacks.length).toBe(3);
      expect(stacks.stacks[0]).toStrictEqual({
        lastMoveValid: true,
        state: [1, 2, 3, 4, 5],
      });
      expect(stacks.stacks[1]).toStrictEqual({
        lastMoveValid: true,
        state: [],
      });
      expect(stacks.stacks[2]).toStrictEqual({
        lastMoveValid: true,
        state: [],
      });
    });
    it("Creates stack with provided first stack height", () => {
      const stacks = createStacks(7);

      expect(stacks.lastMoveValid).toBeTruthy();
      expect(stacks.stacks.length).toBe(3);
      expect(stacks.stacks[0]).toStrictEqual({
        lastMoveValid: true,
        state: [1, 2, 3, 4, 5, 6, 7],
      });
      expect(stacks.stacks[1]).toStrictEqual({
        lastMoveValid: true,
        state: [],
      });
      expect(stacks.stacks[2]).toStrictEqual({
        lastMoveValid: true,
        state: [],
      });
    });
    it("Allows move from one stack to an empty one", () => {
      const stacks = createStacks(3);

      const result = moveItem(0, 1, stacks);

      expect(result.lastMoveValid).toBeTruthy();
      expect(result.stacks.length).toBe(3);
      expect(result.stacks[0]).toStrictEqual({
        lastMoveValid: true,
        state: [2, 3],
      });
      expect(result.stacks[1]).toStrictEqual({
        lastMoveValid: true,
        state: [1],
      });
      expect(result.stacks[2]).toStrictEqual({
        lastMoveValid: true,
        state: [],
      });
    });

    it("Correctly evaluates a new game as incomplete", () => {});

    it("Correctly evaluates a complete stack", () => {});

    it("Correctly evaluates an incomplete stack", () => {});
  });
});
