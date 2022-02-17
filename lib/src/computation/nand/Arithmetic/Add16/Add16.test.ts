// |        a         |        b         |       out        |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 |
// | 0000000000000000 | 1111111111111111 | 1111111111111111 |
// | 1111111111111111 | 1111111111111111 | 1111111111111110 |
// | 1010101010101010 | 0101010101010101 | 1111111111111111 |
// | 0011110011000011 | 0000111111110000 | 0100110010110011 |
// | 0001001000110100 | 1001100001110110 | 1010101010101010 |
import {
  binaryToBoolArray,
  booleanToBinArray,
} from "dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "../../BinaryBus";
import { getTestName, PIN_A, PIN_B, PIN_OUTPUT } from "computation/nand/types";
import Add16 from "./Add16";

interface TestCase {
  a: boolean[];
  b: boolean[];
  expected: boolean[];
}

const TEST_CASES: TestCase[] = [
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("0000000000000000"),
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("1111111111111111"),
    expected: binaryToBoolArray("1111111111111111"),
  },
  {
    a: binaryToBoolArray("1111111111111111"),
    b: binaryToBoolArray("1111111111111111"),
    expected: binaryToBoolArray("1111111111111110"),
  },
  {
    a: binaryToBoolArray("1010101010101010"),
    b: binaryToBoolArray("0101010101010101"),
    expected: binaryToBoolArray("1111111111111111"),
  },
  {
    a: binaryToBoolArray("0011110011000011"),
    b: binaryToBoolArray("0000111111110000"),
    expected: binaryToBoolArray("0100110010110011"),
  },
  {
    a: binaryToBoolArray("0001001000110100"),
    b: binaryToBoolArray("1001100001110110"),
    expected: binaryToBoolArray("1010101010101010"),
  },
  {
    a: binaryToBoolArray("0000000000000001"),
    b: binaryToBoolArray("0000000000000001"),
    expected: binaryToBoolArray("0000000000000010"),
  },
];

describe("Add 16", () => {
  const add16 = new Add16();
  const receivers: BinaryBus = new BinaryBus();
  add16.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ a, b, expected }) => {
    const testName = getTestName({
      a: booleanToBinArray(a),
      b: booleanToBinArray(b),
      expected: booleanToBinArray(expected),
    });
    test(testName, () => {
      add16.getBus(PIN_A).send(a);
      add16.getBus(PIN_B).send(b);
      receivers.pins.forEach((r, i) =>
        expect(r.lastOutput).toBe(expected[i])
      );
    });
  });
});
