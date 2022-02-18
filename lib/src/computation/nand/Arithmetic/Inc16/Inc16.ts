/**
 * 16-bit incrementer:
 * out = in + 1 (arithmetic addition)
 */
import Add16 from "../Add16";
import Chip from "../../Chip";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "../../types";

//  CHIP Inc16 {
//     IN in[16];
//     OUT out[16];

//     PARTS:
//    // Put you code here:
//    Add16(a=in, b[0]=true, b[1..7]=false, out=out);
// }

class Inc16 extends Chip {
  adder: Add16;

  constructor() {
    super("Inc16", [PIN_INPUT], [PIN_OUTPUT]);
    this.adder = new Add16();
    this.adder
      .getBus(PIN_B)
      .send([true, false, false, false, false, false, false, false]);

    // External wiring
    this.createBus(PIN_INPUT, this.adder.getBus(PIN_A));
    this.createBus(PIN_OUTPUT, this.adder.getBus(PIN_OUTPUT));
  }
}

export default Inc16;
