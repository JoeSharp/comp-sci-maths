import Dmux8Way from ".";
import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import {
  binaryToBoolArray,
  booleanToBinArray,
  boolToBin,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { PIN_A, PIN_B, PIN_INPUT, PIN_SELECTOR } from "../../types";
import { PIN_E, PIN_F, PIN_G, PIN_H } from "./Dmux8Way";
import BinaryPin from "../../BinaryPin";

interface TestCase {
  input: boolean;
  sel: boolean[];
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
  h: boolean;
}
const TEST_CASES: TestCase[] = [
  {
    input: false,
    sel: binaryToBoolArray("000"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: false,
    sel: binaryToBoolArray("001"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: false,
    sel: binaryToBoolArray("010"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: false,
    sel: binaryToBoolArray("011"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: false,
    sel: binaryToBoolArray("100"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: false,
    sel: binaryToBoolArray("101"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: false,
    sel: binaryToBoolArray("110"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: false,
    sel: binaryToBoolArray("111"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("000"),
    a: true,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("001"),
    a: false,
    b: true,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("010"),
    a: false,
    b: false,
    c: true,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("011"),
    a: false,
    b: false,
    c: false,
    d: true,
    e: false,
    f: false,
    g: false,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("100"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: true,
    f: false,
    g: false,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("101"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: true,
    g: false,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("110"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: true,
    h: false,
  },
  {
    input: true,
    sel: binaryToBoolArray("111"),
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: true,
  },
];

describe("DMux 8 Way", () => {
  const dmux = new Dmux8Way();
  const receiverA = new BinaryPin();
  const receiverB = new BinaryPin();
  const receiverC = new BinaryPin();
  const receiverD = new BinaryPin();
  const receiverE = new BinaryPin();
  const receiverF = new BinaryPin();
  const receiverG = new BinaryPin();
  const receiverH = new BinaryPin();
  dmux.getPin(PIN_A).connectRecipient(receiverA);
  dmux.getPin(PIN_B).connectRecipient(receiverB);
  dmux.getPin(PIN_C).connectRecipient(receiverC);
  dmux.getPin(PIN_D).connectRecipient(receiverD);
  dmux.getPin(PIN_E).connectRecipient(receiverE);
  dmux.getPin(PIN_F).connectRecipient(receiverF);
  dmux.getPin(PIN_G).connectRecipient(receiverG);
  dmux.getPin(PIN_H).connectRecipient(receiverH);

  TEST_CASES.forEach(({ input, sel, a, b, c, d, e, f, g, h }) => {
    test(`in: ${boolToBin(input)}, sel: ${booleanToBinArray(sel)}, abcdefgh: ${[
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
    ].map(boolToBin)}`, () => {
      dmux.getPin(PIN_INPUT).send(input);
      dmux.getBus(PIN_SELECTOR).send(sel);

      expect(receiverA.lastOutput).toBe(a);
      expect(receiverB.lastOutput).toBe(b);
      expect(receiverC.lastOutput).toBe(c);
      expect(receiverD.lastOutput).toBe(d);
      expect(receiverE.lastOutput).toBe(e);
      expect(receiverF.lastOutput).toBe(f);
      expect(receiverG.lastOutput).toBe(g);
      expect(receiverH.lastOutput).toBe(h);
    });
  });
});
