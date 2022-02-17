import And from "computation/nand/Logic/And";
import Chip from "computation/nand/Chip";
import Not from "computation/nand/Logic/Not";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "computation/nand/types";

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */
//  CHIP DMux {
//     IN in, sel;
//     OUT a, b;

//     PARTS:
//     // Put your code here:
//     Not(in=sel, out=notSel);
//     And(a=in, b=notSel, out=a);
//     And(a=in, b=sel, out=b);
// }
class Dmux extends Chip {
  notSel: Not;
  inAndNotSel: And;
  inAndSel: And;

  constructor() {
    super("Dmux", [PIN_INPUT, PIN_SELECTOR], [PIN_A, PIN_B]);

    this.notSel = new Not();
    this.inAndNotSel = new And();
    this.inAndSel = new And();

    // Internal Wiring
    this.notSel.getPin(PIN_OUTPUT).connectRecipient(this.inAndNotSel.getPin(PIN_B));

    // External Wiring
    this.createPin(
      PIN_INPUT,
      this.inAndNotSel.getPin(PIN_A),
      this.inAndSel.getPin(PIN_A)
    );
    this.createPin(
      PIN_SELECTOR,
      this.notSel.getPin(PIN_INPUT),
      this.inAndSel.getPin(PIN_B)
    );
    this.createPin(PIN_A, this.inAndNotSel.getPin(PIN_OUTPUT));
    this.createPin(PIN_B, this.inAndSel.getPin(PIN_OUTPUT));
  }
}

export default Dmux;
