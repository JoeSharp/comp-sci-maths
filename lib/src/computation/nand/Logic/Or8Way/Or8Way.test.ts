// |     in     | out |
// |  00000000  |  0  |
// |  11111111  |  1  |
// |  00010000  |  1  |
// |  00000001  |  1  |

import {
  binaryToBoolArray,
  booleanToBinArray,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import BinaryPin from "../../BinaryPin";
import loadTestChip from "../../HDL/loadTestChip";
import { PIN_INPUT, PIN_OUTPUT } from "../../types";
import Or8Way from "./Or8Way";

// |  00100110  |  1  |
interface TestCase {
  input: boolean[];
  expected: boolean;
}

const TEST_CASES: TestCase[] = [
  {
    input: binaryToBoolArray("00000000"),
    expected: false,
  },
  {
    input: binaryToBoolArray("11111111"),
    expected: true,
  },
  {
    input: binaryToBoolArray("00010000"),
    expected: true,
  },
  {
    input: binaryToBoolArray("00000001"),
    expected: true,
  },
  {
    input: binaryToBoolArray("00100110"),
    expected: true,
  },
];

describe("Or 8 Way", () => {
  const or = new Or8Way();
  const nandReceiver = new BinaryPin();
  or.getPin(PIN_OUTPUT).connectRecipient(nandReceiver);

  const hdlChip = loadTestChip('01', 'Or8Way.hdl');
  const hdlChipReceiver = new BinaryPin();
  hdlChip.getPin(PIN_OUTPUT).connectRecipient(hdlChipReceiver);

  TEST_CASES.forEach(({ input, expected }) => {
    [
      { testName: 'nand', chip: or, receiver: nandReceiver },
      { testName: 'hdl', chip: hdlChip, receiver: hdlChipReceiver }
    ].forEach(({ testName, chip, receiver }) => {
      test(`${booleanToBinArray(input)} = ${expected} ${testName}`, () => {
        chip.getBus(PIN_INPUT).send(input);
        expect(receiver.lastOutput).toBe(expected);
      });
    })
  });
});
