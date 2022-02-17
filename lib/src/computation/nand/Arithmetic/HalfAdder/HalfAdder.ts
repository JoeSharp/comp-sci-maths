/**
 * Computes the sum of two bits.
 */
import And from "computation/nand/Logic/And";
import Chip from "computation/nand/Chip";
import { PIN_A, PIN_B, PIN_OUTPUT } from "computation/nand/types";
import Xor from "computation/nand/Logic/Xor";

//  CHIP HalfAdder {
//     IN a, b;    // 1-bit inputs
//     OUT sum,    // Right bit of a + b
//         carry;  // Left bit of a + b

//     PARTS:
//     // Put you code here:
//     Xor(a=a, b=b, out=sum);
//     And(a=a, b=b, out=carry);
// }
export const PIN_SUM = "sum";
export const PIN_CARRY = "carry";

class HalfAdder extends Chip {
  sum: Xor;
  carry: And;

  constructor() {
    super("HalfAdder", [PIN_A, PIN_B], [PIN_SUM, PIN_CARRY]);

    this.sum = new Xor();
    this.carry = new And();

    // External Wiring
    this.createPin(PIN_A, this.sum.getPin(PIN_A), this.carry.getPin(PIN_A));
    this.createPin(PIN_B, this.sum.getPin(PIN_B), this.carry.getPin(PIN_B));
    this.createPin(PIN_SUM, this.sum.getPin(PIN_OUTPUT));
    this.createPin(PIN_CARRY, this.carry.getPin(PIN_OUTPUT));
  }
}

export default HalfAdder;
