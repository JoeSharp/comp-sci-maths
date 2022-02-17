// |   a   |   b   |  sum  | carry |
// |   0   |   0   |   0   |   0   |
// |   0   |   1   |   1   |   0   |
// |   1   |   0   |   1   |   0   |
// |   1   |   1   |   0   |   1   |
import BinaryPin from "computation/nand/BinaryPin";
import { getTestName, PIN_A, PIN_B } from "computation/nand/types";
import HalfAdder, { PIN_CARRY, PIN_SUM } from "computation/nand/Arithmetic/HalfAdder/HalfAdder";

interface TestCase {
  a: boolean;
  b: boolean;
  sum: boolean;
  carry: boolean;
}

const TEST_CASES: TestCase[] = [
  { a: false, b: false, sum: false, carry: false },
  { a: false, b: true, sum: true, carry: false },
  { a: true, b: false, sum: true, carry: false },
  { a: true, b: true, sum: false, carry: true },
];

describe("Half Adder", () => {
  const halfAdder = new HalfAdder();
  const sumReceiver = new BinaryPin();
  const carryReceiver = new BinaryPin();
  halfAdder.getPin(PIN_SUM).connectRecipient(sumReceiver);
  halfAdder.getPin(PIN_CARRY).connectRecipient(carryReceiver);

  TEST_CASES.forEach(({ a, b, sum, carry }) => {
    test(getTestName({ a, b, sum, carry }), () => {
      halfAdder.getPin(PIN_A).send(a);
      halfAdder.getPin(PIN_B).send(b);

      expect(sumReceiver.lastOutput).toBe(sum);
      expect(carryReceiver.lastOutput).toBe(carry);
    });
  });
});
