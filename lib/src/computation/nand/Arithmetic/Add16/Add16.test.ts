import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "../../BinaryBus";
import { getTestName, PIN_A, PIN_B, PIN_OUTPUT } from "../../types";
import Add16 from "./Add16";

interface TestCase {
  a: boolean[];
  b: boolean[];
  expected: boolean[];
}

const TEST_CASES: TestCase[] = [
  {
    a: bin("0000000000000000"),
    b: bin("0000000000000000"),
    expected: bin("0000000000000000"),
  },
  {
    a: bin("0000000000000000"),
    b: bin("1111111111111111"),
    expected: bin("1111111111111111"),
  },
  {
    a: bin("1111111111111111"),
    b: bin("1111111111111111"),
    expected: bin("1111111111111110"),
  },
  {
    a: bin("1010101010101010"),
    b: bin("0101010101010101"),
    expected: bin("1111111111111111"),
  },
  {
    a: bin("0011110011000011"),
    b: bin("0000111111110000"),
    expected: bin("0100110010110011"),
  },
  {
    a: bin("0001001000110100"),
    b: bin("1001100001110110"),
    expected: bin("1010101010101010"),
  },
  {
    a: bin("0000000000000001"),
    b: bin("0000000000000001"),
    expected: bin("0000000000000010"),
  },
];

describe("Add 16", () => {
  const add16 = new Add16();
  const receivers: BinaryBus = new BinaryBus();
  add16.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ a, b, expected }) => {
    const testName = getTestName({
      a: arr(a),
      b: arr(b),
      expected: arr(expected),
    });
    test(testName, () => {
      add16.getBus(PIN_A).send(a);
      add16.getBus(PIN_B).send(b);
      receivers.pins.forEach((r, i) => expect(r.lastOutput).toBe(expected[i]));
    });
  });
});
