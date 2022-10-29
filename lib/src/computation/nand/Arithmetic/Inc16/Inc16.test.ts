import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "../../BinaryBus";
import { getTestName, PIN_INPUT, PIN_OUTPUT } from "../../types";
import Inc16 from "./Inc16";

interface TestCase {
  input: boolean[];
  expected: boolean[];
}

const TEST_CASES: TestCase[] = [
  {
    input: bin("0000000000000000"),
    expected: bin("0000000000000001"),
  },
  {
    input: bin("1111111111111111"),
    expected: bin("0000000000000000"),
  },
  {
    input: bin("0000000000000101"),
    expected: bin("0000000000000110"),
  },
  {
    input: bin("1111111111111011"),
    expected: bin("1111111111111100"),
  },
];

describe("Inc 16", () => {
  const inc16 = new Inc16();
  const receivers = new BinaryBus();
  inc16.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ input, expected }) => {
    const testName = getTestName({
      input: arr(input),
      expected: arr(expected),
    });
    test(testName, () => {
      // inc16.getBus(PIN_INPUT).send(input);
      input.forEach((v, i) => inc16.getBus(PIN_INPUT).getPin(i).send(v));
      receivers.pins.forEach(({ lastOutput }, i) =>
        expect(lastOutput).toBe(expected[i])
      );
    });
  });
});
