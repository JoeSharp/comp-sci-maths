import Mux from ".";
import BinaryPin from "computation/nand/BinaryPin";
import { PIN_A, PIN_B, PIN_OUTPUT, PIN_SELECTOR } from "computation/nand/types";

interface MuxTestCase {
  a: boolean;
  b: boolean;
  sel: boolean;
  expected: boolean;
}

const MUX_TEST_CASES: MuxTestCase[] = [
  {
    a: true,
    b: false,
    sel: false,
    expected: true,
  },
  {
    a: true,
    b: false,
    sel: true,
    expected: false,
  },
  {
    a: false,
    b: true,
    sel: false,
    expected: false,
  },
  {
    a: false,
    b: true,
    sel: true,
    expected: true,
  },
  {
    a: false,
    b: false,
    sel: true,
    expected: false,
  },
  {
    a: true,
    b: true,
    sel: true,
    expected: true,
  },
];

describe("Mux", () => {
  const receiver = new BinaryPin();
  const mux = new Mux();
  mux.getPin(PIN_OUTPUT).connectRecipient(receiver);

  MUX_TEST_CASES.forEach(({ a, b, sel, expected }) => {
    test(`${a} Mux ${b} Sel ${sel} = ${expected}`, () => {
      mux.getPin(PIN_A).send(a);
      mux.getPin(PIN_B).send(b);
      mux.getPin(PIN_SELECTOR).send(sel);
      expect(receiver.lastOutput).toBe(expected);
    });
  });
});
