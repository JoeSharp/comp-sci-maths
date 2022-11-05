import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { ZERO_WORD } from "../../../nand/types";
import register, { createRegister } from "./register";

describe("Register - Functional", () => {
  describe("Factory with Persistent Storage", () => {
    let myRegister = createRegister();

    beforeEach(() => {
      myRegister = createRegister();
    });

    it("initialises correctly", () => {
      const output = myRegister(ZERO_WORD, false);
      expect(output).toStrictEqual(ZERO_WORD);
    });

    it("ignores value if load = false", () => {
      const VALUE = bin("0010110110101010");
      const output = myRegister(VALUE, false);
      expect(output).toStrictEqual(ZERO_WORD);
    });

    it("Takes on value correctly", () => {
      const VALUE = bin("0010110110101010");
      const output = myRegister(VALUE, true);
      expect(output).toStrictEqual(VALUE);
    });

    it("Lifecycle test", () => {
      const VALUE_A = bin("0010110110101010");
      const VALUE_B = bin("1110110110111010");
      const VALUE_C = bin("0010010000101010");

      const output1 = myRegister(VALUE_A, false);
      expect(output1).toStrictEqual(ZERO_WORD);

      // Assert that the new value is correct, but also that the immediate preceding value is correct
      const output2 = myRegister(VALUE_A, true);
      expect(output1).toStrictEqual(ZERO_WORD);
      expect(output2).toStrictEqual(VALUE_A);

      const output3 = myRegister(ZERO_WORD, false);
      expect(output2).toStrictEqual(VALUE_A);
      expect(output3).toStrictEqual(VALUE_A);

      const output4 = myRegister(VALUE_B, true);
      expect(output3).toStrictEqual(VALUE_A);
      expect(output4).toStrictEqual(VALUE_B);

      const output5 = myRegister(VALUE_C, false);
      expect(output4).toStrictEqual(VALUE_B);
      expect(output5).toStrictEqual(VALUE_B);

      const output6 = myRegister(VALUE_C, true);
      expect(output5).toStrictEqual(VALUE_B);
      expect(output6).toStrictEqual(VALUE_C);

      const output7 = myRegister(ZERO_WORD, false);
      expect(output6).toStrictEqual(VALUE_C);
      expect(output7).toStrictEqual(VALUE_C);

      const output8 = myRegister(ZERO_WORD, true);
      expect(output7).toStrictEqual(VALUE_C);
      expect(output8).toStrictEqual(ZERO_WORD);
    });
  });

  describe("Register - Simple", () => {
    it.each`
      input                 | load     | previousOutput        | expected
      ${"0110000000000000"} | ${false} | ${undefined}          | ${"0000000000000000"}
      ${"0110000000000000"} | ${true}  | ${undefined}          | ${"0110000000000000"}
      ${"0110000000000000"} | ${false} | ${"0000000000000101"} | ${"0000000000000101"}
      ${"0110000000000000"} | ${true}  | ${"0000000000000101"} | ${"0110000000000000"}
    `(
      "Input: $input, PrevOut: $previousOutput, Load: $load, Expected: $expected",
      ({ input, previousOutput, load, expected }) => {
        const inputBool = bin(input);
        const prevOutBool = previousOutput ? bin(previousOutput) : undefined;

        const resultBool = register(inputBool, load, prevOutBool);
        const result = arr(resultBool);
        expect(result).toBe(expected);
      }
    );
  });
});
