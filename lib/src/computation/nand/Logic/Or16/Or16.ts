import { PIN_A, PIN_B, PIN_OUTPUT, WORD_LENGTH } from "../../types";;
import Or from "../Or";
import Chip from "../../Chip";
import BinaryBus from "../../BinaryBus";
/**
 * 16-bit bitwise Or:
 * for i = 0..15 out[i] = (a[i] or b[i])
 */

//  CHIP Or16 {
//     IN a[16], b[16];
//     OUT out[16];

//     PARTS:
//     Or(a=a[0], b=b[0], out=out[0]);
//     Or(a=a[1], b=b[1], out=out[1]);
//     Or(a=a[2], b=b[2], out=out[2]);
//     Or(a=a[3], b=b[3], out=out[3]);
//     Or(a=a[4], b=b[4], out=out[4]);
//     Or(a=a[5], b=b[5], out=out[5]);
//     Or(a=a[6], b=b[6], out=out[6]);
//     Or(a=a[7], b=b[7], out=out[7]);
//     Or(a=a[8], b=b[8], out=out[8]);
//     Or(a=a[9], b=b[9], out=out[9]);
//     Or(a=a[10], b=b[10], out=out[10]);
//     Or(a=a[11], b=b[11], out=out[11]);
//     Or(a=a[12], b=b[12], out=out[12]);
//     Or(a=a[13], b=b[13], out=out[13]);
//     Or(a=a[14], b=b[14], out=out[14]);
//     Or(a=a[15], b=b[15], out=out[15]);
// }
class Or16 extends Chip {
  ors: Or[];

  constructor() {
    super("Or16", [PIN_A, PIN_B], [PIN_OUTPUT]);
    this.ors = Array(WORD_LENGTH)
      .fill(null)
      .map((_, i) => new Or());

    // External Wiring
    this.createBus(PIN_A, new BinaryBus(this.ors.map((o) => o.getPin(PIN_A))));
    this.createBus(PIN_B, new BinaryBus(this.ors.map((o) => o.getPin(PIN_B))));
    this.createBus(
      PIN_OUTPUT,
      new BinaryBus(this.ors.map((o) => o.getPin(PIN_OUTPUT)))
    );
  }
}

export default Or16;
