import { HanoiStack, placeItem, createStack } from "./towerOfHanoi";

describe("Tower of Hanoi", () => {
  describe("Stack", () => {
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
  });

  describe("Multiple Stacks", () => {});
});
