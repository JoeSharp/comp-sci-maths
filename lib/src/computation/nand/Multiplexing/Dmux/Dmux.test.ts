import BinaryPin from "../../BinaryPin";
import { PIN_A, PIN_B, PIN_INPUT, PIN_SELECTOR } from "../../types";
import Dmux from "./Dmux";

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */

interface DmuxTestCase {
  input: boolean;
  sel: boolean;
  expectedA: boolean;
  expectedB: boolean;
}

const DMUX_TEST_CASES: DmuxTestCase[] = [
  {
    input: false,
    sel: false,
    expectedA: false,
    expectedB: false,
  },
  {
    input: false,
    sel: true,
    expectedA: false,
    expectedB: false,
  },
  {
    input: true,
    sel: false,
    expectedA: true,
    expectedB: false,
  },
  {
    input: true,
    sel: true,
    expectedA: false,
    expectedB: true,
  },
];

describe("Dmux", () => {
  DMUX_TEST_CASES.forEach(({ input, sel, expectedA, expectedB }) => {
    const dmux = new Dmux();
    const receiverA = new BinaryPin();
    const receiverB = new BinaryPin();
    dmux.getPin(PIN_A).connectRecipient(receiverA);
    dmux.getPin(PIN_B).connectRecipient(receiverB);

    test(`Input: ${input}, Sel: ${sel}, A: ${expectedA}, B: ${expectedB}`, () => {
      dmux.getPin(PIN_INPUT).send(input);
      dmux.getPin(PIN_SELECTOR).send(sel);
      expect(receiverA.lastOutput).toBe(expectedA);
      expect(receiverB.lastOutput).toBe(expectedB);
    });
  });
});
