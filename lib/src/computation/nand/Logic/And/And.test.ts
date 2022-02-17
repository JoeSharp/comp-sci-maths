import And from "./And";

import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "computation/nand/types";
import BinaryPin from "computation/nand/BinaryPin";
import loadTestChip from "computation/nand//HDL/loadTestChip";

const AND_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: false,
  },
  {
    a: false,
    b: true,
    expected: false,
  },
  {
    a: true,
    b: false,
    expected: false,
  },
  {
    a: true,
    b: true,
    expected: true,
  },
];

describe("AND", () => {
  const nandReceiver = new BinaryPin();
  const myAnd = new And();
  myAnd.getPin(PIN_OUTPUT).connectRecipient(nandReceiver);

  const hdlChip = loadTestChip('01', 'And.hdl');
  const hdlChipReceiver = new BinaryPin();
  hdlChip.getPin(PIN_OUTPUT).connectRecipient(hdlChipReceiver);

  AND_TEST_CASES.forEach(({ a, b, expected }) => {
    [
      { testName: 'nand', chip: myAnd, receiver: nandReceiver },
      { testName: 'hdl', chip: hdlChip, receiver: hdlChipReceiver }
    ].forEach(({ testName, chip, receiver }) => {
      test(`${a} AND ${b} = ${expected} ${testName}`, () => {
        chip.getPin(PIN_A).send(a);
        chip.getPin(PIN_B).send(b);
        expect(receiver.lastOutput).toBe(expected);
      });
    })
  });
});
