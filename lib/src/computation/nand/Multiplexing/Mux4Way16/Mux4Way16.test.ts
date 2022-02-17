import { PIN_C, PIN_D } from "computation/nand/Multiplexing/Dmux4Way/Dmux4Way";
import { binaryToBoolArray } from "dataRepresentation/numberBases/simpleBinary";
import {
  PIN_A,
  PIN_B,
  PIN_OUTPUT,
  PIN_SELECTOR,
} from "computation/nand/types";
import Mux4Way16 from "computation/nand/Multiplexing/Mux4Way16";
import BinaryBus from "computation/nand/BinaryBus";

interface TestCase {
  a: string;
  b: string;
  c: string;
  d: string;
  sel: string;
  expected: string;
}

const TEST_CASES: TestCase[] = [
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "00",
    expected: "0000000000000000",
  },
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "01",
    expected: "0000000000000000",
  },
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "10",
    expected: "0000000000000000",
  },
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "11",
    expected: "0000000000000000",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "00",
    expected: "0001001000110100",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "01",
    expected: "1001100001110110",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "10",
    expected: "1010101010101010",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "11",
    expected: "0101010101010101",
  },
];

describe("Mux 4 way 16", () => {
  const mux = new Mux4Way16();
  const output: boolean[] = [];
  const receivers = new BinaryBus();
  mux.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ a, b, c, d, sel, expected }) => {
    const inputStr = Object.entries({ a, b, c, d })
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    const testName = `${inputStr}, sel: ${sel}, expected: ${expected}`;
    test(testName, () => {
      mux.getBus(PIN_A).send(binaryToBoolArray(a));
      mux.getBus(PIN_B).send(binaryToBoolArray(b));
      mux.getBus(PIN_C).send(binaryToBoolArray(c));
      mux.getBus(PIN_D).send(binaryToBoolArray(d));
      mux.getBus(PIN_SELECTOR).send(binaryToBoolArray(sel));
      const expectedArr = binaryToBoolArray(expected);
      receivers.pins.forEach((r, i) =>
        expect(r.lastOutput).toBe(expectedArr[i])
      );
    });
  });
});
