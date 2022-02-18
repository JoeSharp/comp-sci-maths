/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */
import And from "../../Logic/And";
import Chip from "../../Chip";
import Dmux4Way from "../Dmux4Way";
import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import Not from "../../Logic/Not";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "../../types";
import BinaryBus, { createPinArray } from "../../BinaryBus";

//  CHIP DMux8Way {
//     IN in, sel[3];
//     OUT a, b, c, d, e, f, g, h;

//     PARTS:
//     Not(in=sel[2], out=notSel2);

//     And(a=in, b=notSel2, out=inAndNotSel2);
//     DMux4Way(in=inAndNotSel2, sel=sel[0..1], a=a, b=b, c=c, d=d);

//     And(a=in, b=sel[2], out=inAndSel2);
//     DMux4Way(in=inAndSel2, sel=sel[0..1], a=e, b=f, c=g, d=h);
// }

export const PIN_E = "e";
export const PIN_F = "f";
export const PIN_G = "g";
export const PIN_H = "h";

class Dmux8Way extends Chip {
  notSel2: Not;
  inAndNotSel2: And;
  dmuxABCD: Dmux4Way;
  inAndSel2: And;
  dmuxEFGH: Dmux4Way;

  constructor() {
    super(
      "Dmux8Way",
      [PIN_INPUT, PIN_SELECTOR],
      [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F, PIN_G, PIN_H]
    );
    this.notSel2 = new Not();
    this.inAndNotSel2 = new And();
    this.dmuxABCD = new Dmux4Way();
    this.inAndSel2 = new And();
    this.dmuxEFGH = new Dmux4Way();

    // Internal Wiring
    this.notSel2.getPin(PIN_OUTPUT).connectRecipient(this.inAndNotSel2.getPin(PIN_B));
    this.inAndNotSel2
      .getPin(PIN_OUTPUT)
      .connectRecipient(this.dmuxABCD.getPin(PIN_INPUT));
    this.inAndSel2.getPin(PIN_OUTPUT).connectRecipient(this.dmuxEFGH.getPin(PIN_INPUT));

    // External Wiring
    this.createPin(
      PIN_INPUT,
      this.inAndNotSel2.getPin(PIN_A),
      this.inAndSel2.getPin(PIN_A)
    );
    this.createBus(
      PIN_SELECTOR,
      new BinaryBus(createPinArray(3))
        .connect(this.dmuxABCD.getBus(PIN_SELECTOR), 0, 1)
        .connect(this.dmuxEFGH.getBus(PIN_SELECTOR), 0, 1)
        .connectPin(this.notSel2.getPin(PIN_INPUT), 2)
        .connectPin(this.inAndSel2.getPin(PIN_B), 2)
    );

    this.createPin(PIN_A, this.dmuxABCD.getPin(PIN_A));
    this.createPin(PIN_B, this.dmuxABCD.getPin(PIN_B));
    this.createPin(PIN_C, this.dmuxABCD.getPin(PIN_C));
    this.createPin(PIN_D, this.dmuxABCD.getPin(PIN_D));

    this.createPin(PIN_E, this.dmuxEFGH.getPin(PIN_A));
    this.createPin(PIN_F, this.dmuxEFGH.getPin(PIN_B));
    this.createPin(PIN_G, this.dmuxEFGH.getPin(PIN_C));
    this.createPin(PIN_H, this.dmuxEFGH.getPin(PIN_D));
  }
}

export default Dmux8Way;
