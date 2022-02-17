/**
 * Exclusive-or gate:
 * out = not (a == b)
 */

import And from "computation/nand/Logic/And";
import Chip from "computation/nand/Chip";
import Not from "computation/nand/Logic/Not";
import Or from "computation/nand/Logic/Or";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "computation/nand/types";

//  CHIP Xor {
//     IN a, b;
//     OUT out;

//     PARTS:
//     Not (in=a, out=nota);
//     Not (in=b, out=notb);
//     And (a=a, b=notb, out=aAndNotb);
//     And (a=nota, b=b, out=notaAndb);
//     Or (a=aAndNotb, b=notaAndb, out=out);
// }

class Xor extends Chip {
  notA: Not;
  notB: Not;
  aAndNotB: And;
  notaAndB: And;
  outOr: Or;

  constructor() {
    super("Xor", [PIN_A, PIN_B], [PIN_OUTPUT]);

    this.notA = new Not();
    this.notB = new Not();
    this.aAndNotB = new And();
    this.notaAndB = new And();
    this.outOr = new Or();

    // Internal Wiring
    this.notA.getPin(PIN_OUTPUT).connectRecipient(this.notaAndB.getPin(PIN_A));
    this.notB.getPin(PIN_OUTPUT).connectRecipient(this.aAndNotB.getPin(PIN_B));
    this.aAndNotB.getPin(PIN_OUTPUT).connectRecipient(this.outOr.getPin(PIN_A));
    this.notaAndB.getPin(PIN_OUTPUT).connectRecipient(this.outOr.getPin(PIN_B));

    // External Wiring
    this.createPin(
      PIN_A,
      this.notA.getPin(PIN_INPUT),
      this.aAndNotB.getPin(PIN_A)
    );
    this.createPin(
      PIN_B,
      this.notB.getPin(PIN_INPUT),
      this.notaAndB.getPin(PIN_B)
    );
    this.createPin(PIN_OUTPUT, this.outOr.getPin(PIN_OUTPUT));
  }
}

export default Xor;
