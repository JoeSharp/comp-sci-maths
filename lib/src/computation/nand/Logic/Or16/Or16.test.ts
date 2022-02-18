import Or16 from "./Or16";
import {
  binaryToBoolArray,
  booleanToBinArray,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { PIN_OUTPUT, PIN_A, PIN_B } from "../../types";
import BinaryBus from "../..//BinaryBus";
import loadTestChip from "../../HDL/loadTestChip";

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
    expected: binaryToBoolArray("1111111111111111"),
  },
  {
    a: binaryToBoolArray("1010101010101010"),
    b: binaryToBoolArray("0101010101010101"),
    expected: binaryToBoolArray("1111111111111111"),
  },
  {
    a: binaryToBoolArray("0011110011000011"),
    b: binaryToBoolArray("0000111111110000"),
    expected: binaryToBoolArray("0011111111110011"),
  },
  {
    a: binaryToBoolArray("0001001000110100"),
    b: binaryToBoolArray("1001100001110110"),
    expected: binaryToBoolArray("1001101001110110"),
  },
];

describe("OR 16", () => {
  const or16 = new Or16();
  const nandReceivers = new BinaryBus();
  or16.getBus(PIN_OUTPUT).connect(nandReceivers);

  const hdlChip = loadTestChip('01', 'Or16.hdl');
  const hdlChipReceiver = new BinaryBus();
  hdlChip.getBus(PIN_OUTPUT).connect(hdlChipReceiver);

  TEST_CASES.forEach(({ a, b, expected }) => {
    [
      { testName: 'nand', chip: or16, receivers: nandReceivers },
      { testName: 'hdl', chip: hdlChip, receivers: hdlChipReceiver }
    ].forEach(({ testName, chip, receivers }) => {
      test(`${booleanToBinArray(a)} AND ${booleanToBinArray(
        b
      )} = ${booleanToBinArray(expected)} ${testName}`, () => {
        chip.getBus(PIN_A).send(a);
        chip.getBus(PIN_B).send(b);

        expected.forEach((e, i) =>
          expect(receivers.pins[i].lastOutput).toBe(e)
        );
      });
    })
  });
});
