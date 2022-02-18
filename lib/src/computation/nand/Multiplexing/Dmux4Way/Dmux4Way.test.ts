// | in  | sel  |  a  |  b  |  c  |  d  |
// |  0  |  00  |  0  |  0  |  0  |  0  |
// |  0  |  01  |  0  |  0  |  0  |  0  |
// |  0  |  10  |  0  |  0  |  0  |  0  |
// |  0  |  11  |  0  |  0  |  0  |  0  |
// |  1  |  00  |  1  |  0  |  0  |  0  |
// |  1  |  01  |  0  |  1  |  0  |  0  |
// |  1  |  10  |  0  |  0  |  1  |  0  |
// |  1  |  11  |  0  |  0  |  0  |  1  |

import Dmux4Way from ".";
import {
  booleanToBinArray,
  boolToBin,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import BinaryPin from "../../BinaryPin";
import { PIN_A, PIN_B, PIN_INPUT, PIN_SELECTOR } from "../../types";
import { PIN_C, PIN_D } from "./Dmux4Way";

interface TestCase {
  input: boolean;
  sel: boolean[];
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
}

const TEST_CASES: TestCase[] = [
  {
    input: false,
    sel: [false, false],
    a: false,
    b: false,
    c: false,
    d: false,
  },
  {
    input: false,
    sel: [true, false],
    a: false,
    b: false,
    c: false,
    d: false,
  },
  {
    input: false,
    sel: [false, true],
    a: false,
    b: false,
    c: false,
    d: false,
  },
  {
    input: false,
    sel: [true, true],
    a: false,
    b: false,
    c: false,
    d: false,
  },
  {
    input: true,
    sel: [false, false],
    a: true,
    b: false,
    c: false,
    d: false,
  },
  {
    input: true,
    sel: [true, false],
    a: false,
    b: true,
    c: false,
    d: false,
  },
  {
    input: true,
    sel: [false, true],
    a: false,
    b: false,
    c: true,
    d: false,
  },
  {
    input: true,
    sel: [true, true],
    a: false,
    b: false,
    c: false,
    d: true,
  },
];

describe("Dmux 4 Way", () => {
  const aReceiver = new BinaryPin();
  const bReceiver = new BinaryPin();
  const cReceiver = new BinaryPin();
  const dReceiver = new BinaryPin();
  const demux = new Dmux4Way();
  demux.getPin(PIN_A).connectRecipient(aReceiver);
  demux.getPin(PIN_B).connectRecipient(bReceiver);
  demux.getPin(PIN_C).connectRecipient(cReceiver);
  demux.getPin(PIN_D).connectRecipient(dReceiver);

  TEST_CASES.forEach(({ input, sel, a, b, c, d }) => {
    test(`In: ${boolToBin(input)}, Sel: ${booleanToBinArray(
      sel
    )}, a: ${boolToBin(a)}, b: ${boolToBin(b)}, c: ${boolToBin(
      c
    )}, d: ${boolToBin(d)}`, () => {
      demux.getPin(PIN_INPUT).send(input);
      demux.getBus(PIN_SELECTOR).send(sel);
      expect(aReceiver.lastOutput).toBe(a);
      expect(bReceiver.lastOutput).toBe(b);
      expect(cReceiver.lastOutput).toBe(c);
      expect(dReceiver.lastOutput).toBe(d);
    });
  });
});
