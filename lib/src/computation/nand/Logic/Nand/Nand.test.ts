import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "../../types";

import Nand from ".";
import BinaryPin from "../../BinaryPin";
import loadTestChip from "../../HDL/loadTestChip";
import NandNested from "./NandNested";

const NAND_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: true,
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

describe("NAND", () => {
  const nandReceiver: BinaryPin = new BinaryPin();
  const nand = new Nand();
  nand.getPin(PIN_OUTPUT).connectRecipient(nandReceiver);

  const nandNestedReceiver: BinaryPin = new BinaryPin();
  const nandNested = new NandNested();
  nandNested.getPin(PIN_OUTPUT).connectRecipient(nandNestedReceiver);

  const hdlChip = loadTestChip('01', 'Nand.hdl');
  const hdlChipReceiver = new BinaryPin();
  hdlChip.getPin(PIN_OUTPUT).connectRecipient(hdlChipReceiver);
  [
    { testName: 'nand - native', chip: nand, receiver: nandReceiver },
    { testName: 'nand - nested', chip: nandNested, receiver: nandNestedReceiver },
    { testName: 'hdl', chip: hdlChip, receiver: hdlChipReceiver }
  ].forEach(({ testName, chip, receiver }) => {
    NAND_TEST_CASES.forEach(({ a, b, expected }) => {
      test(`${a} NAND ${b} = ${expected} - ${testName}`, () => {
        chip.getPin(PIN_A).send(a);
        chip.getPin(PIN_B).send(b);
        expect(receiver.lastOutput).toBe(expected);
      });
    });
  })
});
