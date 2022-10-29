import { integerTestCases } from "./NumberBase.test";
import {
  binaryToBoolArray,
  binaryToNumber,
  numberToBinary,
} from "./simpleBinary";

describe("Simple Binary Conversion", () => {
  integerTestCases.forEach(({ asBinary, value }) => {
    const asBool = binaryToBoolArray(asBinary);
    test(`${asBinary} <=> ${value}`, () => {
      expect(binaryToNumber(asBool)).toBe(value);
      expect(numberToBinary(value, 8)).toEqual(asBool);
    });
  });

  it("Converts in the right direction", () => {
    const result = binaryToBoolArray("001011");
    expect(result).toStrictEqual([true, true, false, true, false, false]);
  });
});
