import Nand from "../../Logic/Nand";
import Chip from "../../Chip";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "../../types";

/**
 * Not gate:
 * out = not in
 */

//  CHIP Not {
//     IN in;
//     OUT out;

//     PARTS:
//     Nand(a=in, b=in, out=out);
// }
class Not extends Chip {
  nand: Nand;

  constructor() {
    super("Not", [PIN_INPUT], [PIN_OUTPUT]);

    this.nand = new Nand();

    // External Wiring
    this.createPin(PIN_INPUT, this.nand.getPin(PIN_A), this.nand.getPin(PIN_B));
    this.createPin(PIN_OUTPUT, this.nand.getPin(PIN_OUTPUT));
  }
}

export default Not;
