/**
 * 8-way Or:
 * out = (in[0] or in[1] or ... or in[7])
 */
import Chip from "../../Chip";
import Or from "../Or";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "computation/nand/types";
import BinaryBus from "../../BinaryBus";

//  CHIP Or8Way {
//     IN in[8];
//     OUT out;

//     PARTS:
//     Or(a=in[0], b=in[1], out=or1);
//     Or(a=or1, b=in[2], out=or2);
//     Or(a=or2, b=in[3], out=or3);
//     Or(a=or3, b=in[4], out=or4);
//     Or(a=or4, b=in[5], out=or5);
//     Or(a=or5, b=in[6], out=or6);
//     Or(a=or6, b=in[7], out=out);
// }
class Or8Way extends Chip {
  or1: Or;
  or2: Or;
  or3: Or;
  or4: Or;
  or5: Or;
  or6: Or;
  orOut: Or;

  constructor() {
    super("Or8Way", [PIN_A, PIN_B], [PIN_OUTPUT]);

    this.or1 = new Or();
    this.or2 = new Or();
    this.or3 = new Or();
    this.or4 = new Or();
    this.or5 = new Or();
    this.or6 = new Or();
    this.orOut = new Or();

    // Internal Wiring
    this.or1.getPin(PIN_OUTPUT).connectRecipient(this.or2.getPin(PIN_A));
    this.or2.getPin(PIN_OUTPUT).connectRecipient(this.or3.getPin(PIN_A));
    this.or3.getPin(PIN_OUTPUT).connectRecipient(this.or4.getPin(PIN_A));
    this.or4.getPin(PIN_OUTPUT).connectRecipient(this.or5.getPin(PIN_A));
    this.or5.getPin(PIN_OUTPUT).connectRecipient(this.or6.getPin(PIN_A));
    this.or6.getPin(PIN_OUTPUT).connectRecipient(this.orOut.getPin(PIN_A));

    // External Wiring
    this.createBus(
      PIN_INPUT,
      new BinaryBus([
        this.or1.getPin(PIN_A),
        ...[
          this.or1,
          this.or2,
          this.or3,
          this.or4,
          this.or5,
          this.or6,
          this.orOut,
        ].map((o) => o.getPin(PIN_B)),
      ])
    );
    this.createPin(PIN_OUTPUT, this.orOut.getPin(PIN_OUTPUT));
  }
}

export default Or8Way;
