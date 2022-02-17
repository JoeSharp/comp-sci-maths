import { PIN_CARRY, PIN_SUM } from "computation/nand/Arithmetic/HalfAdder/HalfAdder";
import { getTestName, PIN_A, PIN_B } from "computation/nand/types";
import FullAdder from "computation/nand/Arithmetic/FullAdder";
import { PIN_C } from "computation/nand//Multiplexing/Dmux4Way/Dmux4Way";
import BinaryPin from "computation/nand/BinaryPin";

// |   a   |   b   |   c   |  sum  | carry |
// |   0   |   0   |   0   |   0   |   0   |
// |   0   |   0   |   1   |   1   |   0   |
// |   0   |   1   |   0   |   1   |   0   |
// |   0   |   1   |   1   |   0   |   1   |
// |   1   |   0   |   0   |   1   |   0   |
// |   1   |   0   |   1   |   0   |   1   |
// |   1   |   1   |   0   |   0   |   1   |
// |   1   |   1   |   1   |   1   |   1   |

interface TestCase {
  a: boolean;
  b: boolean;
  c: boolean;
  sum: boolean;
  carry: boolean;
}

const TEST_CASES: TestCase[] = [
  { a: false, b: false, c: false, sum: false, carry: false },
  { a: false, b: false, c: true, sum: true, carry: false },
  { a: false, b: true, c: false, sum: true, carry: false },
  { a: false, b: true, c: true, sum: false, carry: true },
  { a: true, b: false, c: false, sum: true, carry: false },
  { a: true, b: false, c: true, sum: false, carry: true },
  { a: true, b: true, c: false, sum: false, carry: true },
  { a: true, b: true, c: true, sum: true, carry: true },
];

describe("Full Adder", () => {
  const adder = new FullAdder();
  const sumReceiver = new BinaryPin();
  const carryReceiver = new BinaryPin();
  adder.getPin(PIN_SUM).connectRecipient(sumReceiver);
  adder.getPin(PIN_CARRY).connectRecipient(carryReceiver);

  TEST_CASES.forEach(({ a, b, c, sum, carry }) => {
    test(getTestName({ a, b, c, sum, carry }), () => {
      adder.getPin(PIN_A).send(a);
      adder.getPin(PIN_B).send(b);
      adder.getPin(PIN_C).send(c);

      expect(sumReceiver.lastOutput).toBe(sum);
      expect(carryReceiver.lastOutput).toBe(carry);
    });
  });
});
