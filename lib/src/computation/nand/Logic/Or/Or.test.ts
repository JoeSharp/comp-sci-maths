import BinaryPin from 'computation/nand/BinaryPin';

import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "computation/nand/types";

import Or from "./Or";
import loadTestChip from 'computation/nand/HDL/loadTestChip';

const OR_TEST_CASES: TwoInOneOutTestCase[] = [
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
    expected: true,
  },
];
describe("OR", () => {
  const nandReceiver = new BinaryPin();
  const or = new Or();
  or.getPin(PIN_OUTPUT).connectRecipient(nandReceiver);

  const hdlChip = loadTestChip('01', 'Or.hdl');
  const hdlChipReceiver = new BinaryPin();
  hdlChip.getPin(PIN_OUTPUT).connectRecipient(hdlChipReceiver);

  OR_TEST_CASES.forEach(({ a, b, expected }) => {
    [
      { testName: 'nand', chip: or, receiver: nandReceiver },
      { testName: 'hdl', chip: hdlChip, receiver: hdlChipReceiver }
    ].forEach(({ testName, chip, receiver }) => {
      test(`${a} OR ${b} = ${expected} ${testName}`, () => {
        chip.getPin(PIN_A).send(a);
        chip.getPin(PIN_B).send(b);
        expect(receiver.lastOutput).toBe(expected);
      });
    })
  });
});

