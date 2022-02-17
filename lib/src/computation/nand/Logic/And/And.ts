import Chip from "../../Chip";

import Nand from "../Nand";
import Not from "../Not";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "computation/nand/types";

/**
 * And gate:
 * out = 1 if (a == 1 and b == 1)
 *       0 otherwise
 */
//  CHIP And {
//   IN a, b;
//   OUT out;

//   PARTS:
//   Nand(a=a, b=b, out=notAandB);
//   Not(in=notAandB, out=out);
// }

class And extends Chip {
  nand: Nand;
  not: Not;

  constructor() {
    super("And", [PIN_A, PIN_B], [PIN_OUTPUT]);

    this.nand = new Nand();
    this.not = new Not();

    // Internal Wiring
    this.nand.getPin(PIN_OUTPUT).connectRecipient(this.not.getPin(PIN_INPUT));

    // External wiring
    this.createPin(PIN_A, this.nand.getPin(PIN_A));
    this.createPin(PIN_B, this.nand.getPin(PIN_B));
    this.createPin(PIN_OUTPUT, this.not.getPin(PIN_OUTPUT));
  }
}

export default And;
