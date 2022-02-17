import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "computation/nand/types";

import Xor from ".";
import BinaryPin from "computation/nand/BinaryPin";
import loadTestChip from "computation/nand/HDL/loadTestChip";

const XOR_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: false,
  },
  {
    a: false,
    b: true,
    expected: true,
  },
  {
    a: true,
    b: false,
    expected: true,
  },
  {
    a: true,
    b: true,
    expected: false,
  },
];
describe("XOR", () => {
  const nandReceiver = new BinaryPin();
  const xor = new Xor();
  xor.getPin(PIN_OUTPUT).connectRecipient(nandReceiver);

  const hdlChip = loadTestChip('01', 'Xor.hdl');
  const hdlChipReceiver = new BinaryPin();
  hdlChip.getPin(PIN_OUTPUT).connectRecipient(hdlChipReceiver);

  XOR_TEST_CASES.forEach(({ a, b, expected }) => {
    [
      { testName: 'nand', chip: xor, receiver: nandReceiver },
      { testName: 'hdl', chip: hdlChip, receiver: hdlChipReceiver }
    ].forEach(({ testName, chip, receiver }) => {
      test(`${a} XOR ${b} = ${expected} ${testName}`, () => {
        chip.getPin(PIN_A).send(a);
        chip.getPin(PIN_B).send(b);
        expect(receiver.lastOutput).toBe(expected);
      });
    })
  });
});
