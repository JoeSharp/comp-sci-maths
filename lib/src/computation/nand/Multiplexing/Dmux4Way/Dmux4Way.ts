import And from "../../Logic/And";
import Chip from "../../Chip";
import Dmux from "../../Multiplexing/Dmux";
import Not from "../../Logic/Not";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "../../types";
import BinaryBus from "../../BinaryBus";
import BinaryPin from "../../BinaryPin";

/**
 * 4-way demultiplexor:
 * {a, b, c, d} = {in, 0, 0, 0} if sel == 00
 *                {0, in, 0, 0} if sel == 01
 *                {0, 0, in, 0} if sel == 10
 *                {0, 0, 0, in} if sel == 11
 */
//  CHIP DMux4Way {
//     IN in, sel[2];
//     OUT a, b, c, d;

//     PARTS:
//     Not(in=sel[1], out=notSel1);
//     And(a=in, b=notSel1, out=inAndNotSel1);
//     DMux(in=inAndNotSel1, sel=sel[0], a=a, b=b);

//     And(a=in, b=sel[1], out=inAndSel1);
//     DMux(in=inAndSel1, sel=sel[0], a=c, b=d);
// }

export const PIN_C = "c";
export const PIN_D = "d";

class Dmux4Way extends Chip {
  notSel1: Not;
  inAndNotSel1: And;
  dmuxAB: Dmux;

  inAndSel1: And;
  dmuxCD: Dmux;

  constructor() {
    super("Dmux4Way", [PIN_INPUT, PIN_SELECTOR], [PIN_A, PIN_B, PIN_C, PIN_D]);
    // in=1, sel=01
    // Demux AB, CD, sel = sel[0]
    this.notSel1 = new Not(); // false
    this.inAndNotSel1 = new And(); // false
    this.dmuxAB = new Dmux(); // in=false
    this.inAndSel1 = new And(); // true
    this.dmuxCD = new Dmux(); // in=true

    // Internal Wiring
    this.notSel1.getPin(PIN_OUTPUT).connectRecipient(this.inAndNotSel1.getPin(PIN_B));
    this.inAndNotSel1.getPin(PIN_OUTPUT).connectRecipient(this.dmuxAB.getPin(PIN_INPUT));
    this.inAndSel1.getPin(PIN_OUTPUT).connectRecipient(this.dmuxCD.getPin(PIN_INPUT));

    // External Wiring
    this.createPin(
      PIN_INPUT,
      this.inAndNotSel1.getPin(PIN_A),
      this.inAndSel1.getPin(PIN_A)
    );
    this.createBus(
      PIN_SELECTOR,
      new BinaryBus([
        new BinaryPin([
          this.dmuxAB.getPin(PIN_SELECTOR),
          this.dmuxCD.getPin(PIN_SELECTOR),
        ]),
        new BinaryPin([
          this.notSel1.getPin(PIN_INPUT),
          this.inAndSel1.getPin(PIN_B),
        ]),
      ])
    );

    this.createPin(PIN_A, this.dmuxAB.getPin(PIN_A));
    this.createPin(PIN_B, this.dmuxAB.getPin(PIN_B));
    this.createPin(PIN_C, this.dmuxCD.getPin(PIN_A));
    this.createPin(PIN_D, this.dmuxCD.getPin(PIN_B));
  }
}

export default Dmux4Way;
