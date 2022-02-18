import Mux16 from ".";
import {
  binaryToBoolArray,
  booleanToBinArray,
  boolToBin,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "../..//BinaryBus";
import { PIN_OUTPUT, PIN_A, PIN_B, PIN_SELECTOR } from "../../types";

interface TestCase {
  a: boolean[];
  b: boolean[];
  sel: boolean;
  expected: boolean[];
}

const TEST_CASES: TestCase[] = [
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("0000000000000000"),
    sel: false,
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("0000000000000000"),
    sel: true,
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("0001001000110100"),
    sel: false,
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("0001001000110100"),
    sel: true,
    expected: binaryToBoolArray("0001001000110100"),
  },

  {
    a: binaryToBoolArray("1001100001110110"),
    b: binaryToBoolArray("0000000000000000"),
    sel: false,
    expected: binaryToBoolArray("1001100001110110"),
  },
  {
    a: binaryToBoolArray("1001100001110110"),
    b: binaryToBoolArray("0000000000000000"),
    sel: true,
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("1010101010101010"),
    b: binaryToBoolArray("0101010101010101"),
    sel: false,
    expected: binaryToBoolArray("1010101010101010"),
  },
  {
    a: binaryToBoolArray("1010101010101010"),
    b: binaryToBoolArray("0101010101010101"),
    sel: true,
    expected: binaryToBoolArray("0101010101010101"),
  },
];

describe("MUX 16", () => {
  const mux16 = new Mux16();
  const receivers: BinaryBus = new BinaryBus();
  mux16.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ a, b, sel, expected }) => {
    test(`${booleanToBinArray(a)} MUX16 ${booleanToBinArray(b)} SEL ${boolToBin(
      sel
    )} = ${booleanToBinArray(expected)}`, () => {
      mux16.getBus(PIN_A).send(a);
      mux16.getBus(PIN_B).send(b);
      mux16.getPin(PIN_SELECTOR).send(sel);

      expected.forEach((e, i) =>
        expect(receivers.pins[i].lastOutput).toBe(e)
      );
    });
  });
});
