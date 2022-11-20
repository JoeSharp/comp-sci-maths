import {
  HanoiStack,
  placeItem,
  createStack,
  removeItem,
  createStacks,
  moveItem,
  isComplete,
} from "./towerOfHanoi";

describe("Tower of Hanoi", () => {
  describe("createStack", () => {
    it("Creates valid stack with default height", () => {
      const stack = createStack();

      expect(stack).toStrictEqual([]);
    });

    it("Creates valid stack with provided height", () => {
      const stack = createStack(5);

      expect(stack).toStrictEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("placeItem", () => {
    it("allows smaller items to be placed on larger ones", () => {
      const initialStack = createStack();
      const [r1, stack1] = placeItem(3, initialStack);
      const [r2, stack2] = placeItem(2, stack1);
      const [r3, stack3] = placeItem(1, stack2);

      expect(r1).toBeTruthy();
      expect(r2).toBeTruthy();
      expect(r3).toBeTruthy();
      expect(stack1).toStrictEqual([3]);
      expect(stack2).toStrictEqual([2, 3]);
      expect(stack3).toStrictEqual([1, 2, 3]);
    });

    it("prevents larger items being placed on smaller ones", () => {
      const startingStack: HanoiStack = [1, 2, 3];

      const [rSuccess, rStack] = placeItem(4, startingStack);

      expect(rSuccess).toBeFalsy();
      expect(rStack).toStrictEqual([1, 2, 3]);
    });
  });

  describe("removeItem", () => {
    it("Allows removal of items from stack", () => {
      const stack = createStack(3);

      const [success, removedItem, resultStack] = removeItem(stack);

      expect(removedItem).toBe(1);
      expect(success).toBeTruthy();
      expect(resultStack).toStrictEqual([2, 3]);
    });

    it("Prevents removal of items from empty stack", () => {
      const stack = createStack();

      const [success, removedItem, resultStack] = removeItem(stack);

      expect(removedItem).toBeUndefined();
      expect(success).toBeFalsy();
      expect(resultStack).toStrictEqual([]);
    });
  });

  describe("createStacks", () => {
    it("Creates stack with default first stack height", () => {
      const stacks = createStacks();

      expect(stacks.length).toBe(3);
      expect(stacks[0]).toStrictEqual([1, 2, 3, 4, 5]);
      expect(stacks[1]).toStrictEqual([]);
      expect(stacks[2]).toStrictEqual([]);
    });
    it("Creates stack with provided first stack height", () => {
      const stacks = createStacks(7);

      expect(stacks.length).toBe(3);
      expect(stacks[0]).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
      expect(stacks[1]).toStrictEqual([]);
      expect(stacks[2]).toStrictEqual([]);
    });
    it("Allows move from one stack to an empty one", () => {
      const stacks = createStacks(3);

      const [success, result] = moveItem(0, 1, stacks);

      expect(success).toBeTruthy();
      expect(result.length).toBe(3);
      expect(result[0]).toStrictEqual([2, 3]);
      expect(result[1]).toStrictEqual([1]);
      expect(result[2]).toStrictEqual([]);
    });
  });

  describe("isComplete", () => {
    it("Correctly evaluates a new game as incomplete", () => {
      const stacks = createStacks();
      expect(isComplete(stacks)).toBeFalsy();
    });

    it("Correctly evaluates a complete stack", () => {
      const stacks = [[], [], [1, 2, 3, 4]];
      expect(isComplete(stacks)).toBeTruthy();
    });

    it("Correctly evaluates an incomplete stack", () => {
      const stacks = [[], [5], [1, 2, 3, 4]];
      expect(isComplete(stacks)).toBeFalsy();
    });

    it("Correctly validates number of stacks", () => {
      expect(() => isComplete([[1], [2]])).toThrowError();
    });

    it("Correctly validates last stack is in order", () => {
      expect(() => isComplete([[], [], [1, 4, 3]])).toThrowError();
    });
  });
});
