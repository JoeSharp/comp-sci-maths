import And from "computation/nand/Logic/And";
import Chip from "computation/nand/Chip";
import Not from "computation/nand/Logic/Not";
import Or from "computation/nand/Logic/Or";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "computation/nand/types";

/**
 * Multiplexor:
 * out = a if sel == 0
 *       b otherwise
 */
//  CHIP Mux {
//     IN a, b, sel;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     And(a=b, b=sel, out=bAndSel);
//     Not(in=sel, out=notSel);
//     And(a=a, b=notSel, out=aAndNotSel);
//     Or(a=aAndNotSel, b=bAndSel, out=out);
// }
class Mux extends Chip {
  bAndSel: And;
  notSel: Not;
  aAndNotSel: And;
  aAndNotSelOrBAndSel: Or;

  constructor() {
    super("Mux", [PIN_A, PIN_B, PIN_SELECTOR], [PIN_OUTPUT]);
    this.bAndSel = new And();
    this.notSel = new Not();
    this.aAndNotSel = new And();
    this.aAndNotSelOrBAndSel = new Or();

    // Internal Wiring
    this.notSel.getPin(PIN_OUTPUT).connectRecipient(this.aAndNotSel.getPin(PIN_B));
    this.bAndSel
      .getPin(PIN_OUTPUT)
      .connectRecipient(this.aAndNotSelOrBAndSel.getPin(PIN_B));
    this.aAndNotSel
      .getPin(PIN_OUTPUT)
      .connectRecipient(this.aAndNotSelOrBAndSel.getPin(PIN_A));

    // External Wiring
    this.createPin(PIN_A, this.aAndNotSel.getPin(PIN_A));
    this.createPin(PIN_B, this.bAndSel.getPin(PIN_A));
    this.createPin(
      PIN_SELECTOR,
      this.notSel.getPin(PIN_INPUT),
      this.bAndSel.getPin(PIN_B)
    );
    this.createPin(PIN_OUTPUT, this.aAndNotSelOrBAndSel.getPin(PIN_OUTPUT));
  }
}

export default Mux;
