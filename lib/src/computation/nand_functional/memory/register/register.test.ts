import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { ZERO_WORD } from "../../../nand/types";
import register from "./register";
import simpleRegister, { createRegister } from "./register";

describe("Register - Functional", () => {
  describe("Clocked", () => {
    let myRegister = createRegister();

    beforeEach(() => {
      myRegister = createRegister();
    });

    it("initialises correctly", () => {
      myRegister.register(ZERO_WORD, false);
      expect(myRegister.state.output).toStrictEqual(ZERO_WORD);
    });

    it("ignores value if load = false", () => {
      const VALUE = bin("0010110110101010");
      myRegister.register(VALUE, false);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(ZERO_WORD);
    });

    it("Takes on value correctly", () => {
      const VALUE = bin("0010110110101010");
      myRegister.register(VALUE, true);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(VALUE);
    });

    it("Lifecycle test", () => {
      const VALUE_A = bin("0010110110101010");
      const VALUE_B = bin("1110110110111010");
      const VALUE_C = bin("0010010000101010");

      myRegister.register(VALUE_A, false);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(ZERO_WORD);

      myRegister.register(VALUE_A, true);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(VALUE_A);

      myRegister.register(ZERO_WORD, false);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(VALUE_A);

      myRegister.register(VALUE_B, true);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(VALUE_B);

      myRegister.register(VALUE_C, false);
      expect(myRegister.state.output).toStrictEqual(VALUE_B);

      myRegister.register(VALUE_C, true);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(VALUE_C);

      myRegister.register(ZERO_WORD, false);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(VALUE_C);

      myRegister.register(ZERO_WORD, true);
      myRegister.clock();
      expect(myRegister.state.output).toStrictEqual(ZERO_WORD);
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

        const resultBool = simpleRegister(inputBool, load, prevOutBool);
        const result = arr(resultBool);
        expect(result).toBe(expected);
      }
    );
  });
});
