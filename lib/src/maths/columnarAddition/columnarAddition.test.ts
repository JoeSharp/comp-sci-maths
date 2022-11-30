import {
  createDenaryWorkedAddition,
  createBinaryWorkedAddition,
  expandDenaryDigits,
} from "./columnarAddition";

describe("Columnar Addition", () => {
  describe("expandDigits", () => {
    it("creates single digit number correctly", () => {
      const result = expandDenaryDigits(5);

      expect(result).toStrictEqual([5]);
    });
    it("creates multiple digit number correctly", () => {
      const result = expandDenaryDigits(5178);

      expect(result).toStrictEqual([8, 7, 1, 5]);
    });
    it("handles negative numbers", () => {
      const result = expandDenaryDigits(-9);

      expect(result).toStrictEqual([]);
    });
  });

  describe("createBinaryWorkedAddition", () => {
    it("correctly adds two 8 bit numbers", () => {
      // 125 - 111 1101
      // 78 - 100 1110
      const state = createBinaryWorkedAddition(125, 78);

      expect(state.inputs).toHaveLength(2);
      expect(state.inputs[0]).toStrictEqual([1, 0, 1, 1, 1, 1, 1]);
      expect(state.inputs[1]).toStrictEqual([0, 1, 1, 1, 0, 0, 1]);
      expect(state.result).toStrictEqual([1, 1, 0, 1, 0, 0, 1, 1]);
      expect(state.carries).toStrictEqual([0, 0, 1, 1, 1, 1, 1, 0]);
    });
  });

  describe("createDenaryWorkedAddition", () => {
    it("correctly creates single digit add", () => {
      const state = createDenaryWorkedAddition(4, 5);

      expect(state.inputs).toHaveLength(2);
      expect(state.inputs[0]).toStrictEqual([4]);
      expect(state.inputs[1]).toStrictEqual([5]);
      expect(state.result).toStrictEqual([9]);
      expect(state.carries).toStrictEqual([0]);
    });
    it("correctly carries with single digit add", () => {
      const state = createDenaryWorkedAddition(8, 7);

      expect(state.inputs).toHaveLength(2);
      expect(state.inputs[0]).toStrictEqual([8]);
      expect(state.inputs[1]).toStrictEqual([7]);
      expect(state.result).toStrictEqual([5, 1]);
      expect(state.carries).toStrictEqual([1, 0]);
    });
    it("correctly creates double digit add", () => {
      const state = createDenaryWorkedAddition(23, 35);

      expect(state.inputs).toHaveLength(2);
      expect(state.inputs[0]).toStrictEqual([3, 2]);
      expect(state.inputs[1]).toStrictEqual([5, 3]);
      expect(state.result).toStrictEqual([8, 5]);
      expect(state.carries).toStrictEqual([0, 0]);
    });
    it("correctly carries with double digit add", () => {
      const state = createDenaryWorkedAddition(56, 87);

      expect(state.inputs).toHaveLength(2);
      expect(state.inputs[0]).toStrictEqual([6, 5]);
      expect(state.inputs[1]).toStrictEqual([7, 8]);
      expect(state.result).toStrictEqual([3, 4, 1]);
      expect(state.carries).toStrictEqual([1, 1, 0]);
    });

    it("correctly adds with mixed number of digits", () => {
      const state = createDenaryWorkedAddition(1111, 222, 33);

      expect(state.inputs).toHaveLength(3);
      expect(state.inputs[0]).toStrictEqual([1, 1, 1, 1]);
      expect(state.inputs[1]).toStrictEqual([2, 2, 2]);
      expect(state.inputs[2]).toStrictEqual([3, 3]);
      expect(state.result).toStrictEqual([6, 6, 3, 1]);
      expect(state.carries).toStrictEqual([0, 0, 0, 0]);
    });
    it("correctly carries with several digit add", () => {
      const state = createDenaryWorkedAddition(456, 987, 123);

      expect(state.inputs).toHaveLength(3);
      expect(state.inputs[0]).toStrictEqual([6, 5, 4]);
      expect(state.inputs[1]).toStrictEqual([7, 8, 9]);
      expect(state.inputs[2]).toStrictEqual([3, 2, 1]);
      expect(state.result).toStrictEqual([6, 6, 5, 1]);
      expect(state.carries).toStrictEqual([1, 1, 1, 0]);
    });
  });
});
