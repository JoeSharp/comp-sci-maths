import {
  binaryToBoolArray,
  booleanToBinArray,
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
    input: binaryToBoolArray("0000000000000000"),
    expected: binaryToBoolArray("0000000000000001"),
  },
  {
    input: binaryToBoolArray("1111111111111111"),
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    input: binaryToBoolArray("0000000000000101"),
    expected: binaryToBoolArray("0000000000000110"),
  },
  {
    input: binaryToBoolArray("1111111111111011"),
    expected: binaryToBoolArray("1111111111111100"),
  },
];

describe("Inc 16", () => {
  const inc16 = new Inc16();
  const receivers = new BinaryBus();
  inc16.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ input, expected }) => {
    const testName = getTestName({
      input: booleanToBinArray(input),
      expected: booleanToBinArray(expected),
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
