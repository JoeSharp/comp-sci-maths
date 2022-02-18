/**
 * Computes the sum of three bits.
 */
import Chip from "../../Chip";
import HalfAdder from "../HalfAdder";
import { PIN_CARRY, PIN_SUM } from "../HalfAdder/HalfAdder";
import Or from "../../Logic/Or";
import { PIN_A, PIN_B, PIN_OUTPUT } from "../../types";
import { PIN_C } from "../../Multiplexing/Dmux4Way/Dmux4Way";

//  CHIP FullAdder {
//     IN a, b, c;  // 1-bit inputs
//     OUT sum,     // Right bit of a + b + c
//         carry;   // Left bit of a + b + c

//     PARTS:
//     HalfAdder(a=a, b=b, sum=sumAB, carry=carryAB);
//     HalfAdder(a=sumAB, b=c, sum=sum, carry=carryABC);
//     Or(a=carryAB, b=carryABC, out=carry);
// }

class FullAdder extends Chip {
  addAB: HalfAdder;
  addABC: HalfAdder;
  carryOr: Or;

  constructor() {
    super("FullAdder", [PIN_A, PIN_B, PIN_C], [PIN_SUM, PIN_CARRY]);

    this.addAB = new HalfAdder();
    this.addABC = new HalfAdder();
    this.carryOr = new Or();

    // Internal Wiring
    this.addAB.getPin(PIN_SUM).connectRecipient(this.addABC.getPin(PIN_A));
    this.addAB.getPin(PIN_CARRY).connectRecipient(this.carryOr.getPin(PIN_A));
    this.addABC.getPin(PIN_CARRY).connectRecipient(this.carryOr.getPin(PIN_B));

    // External Wiring
    this.createPin(PIN_A, this.addAB.getPin(PIN_A));
    this.createPin(PIN_B, this.addAB.getPin(PIN_B));
    this.createPin(PIN_C, this.addABC.getPin(PIN_B));

    this.createPin(PIN_SUM, this.addABC.getPin(PIN_SUM));
    this.createPin(PIN_CARRY, this.carryOr.getPin(PIN_OUTPUT));
  }
}

export default FullAdder;
