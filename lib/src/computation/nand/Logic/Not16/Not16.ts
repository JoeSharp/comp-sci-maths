import { PIN_INPUT, PIN_OUTPUT, WORD_LENGTH } from "../../types";
import Not from "../../Logic/Not";
import Chip from "../../Chip";
import BinaryBus from "../../BinaryBus";
/**
 * 16-bit Not:
 * for i=0..15: out[i] = not in[i]
 */
/**
 CHIP Not16 {
    IN in[16];
    OUT out[16];

    PARTS:
    Not(in=in[0], out=out[0]);
    Not(in=in[1], out=out[1]);
    Not(in=in[2], out=out[2]);
    Not(in=in[3], out=out[3]);
    Not(in=in[4], out=out[4]);
    Not(in=in[5], out=out[5]);
    Not(in=in[6], out=out[6]);
    Not(in=in[7], out=out[7]);
    Not(in=in[8], out=out[8]);
    Not(in=in[9], out=out[9]);
    Not(in=in[10], out=out[10]);
    Not(in=in[11], out=out[11]);
    Not(in=in[12], out=out[12]);
    Not(in=in[13], out=out[13]);
    Not(in=in[14], out=out[14]);
    Not(in=in[15], out=out[15]);
}
 */
class Not16 extends Chip {
  nots: Not[];

  constructor() {
    super("Not16", [PIN_INPUT], [PIN_OUTPUT]);
    this.nots = Array(WORD_LENGTH)
      .fill(null)
      .map((_, i) => new Not());

    // External Wiring
    this.createBus(
      PIN_INPUT,
      new BinaryBus(this.nots.map((n) => n.getPin(PIN_INPUT)))
    );
    this.createBus(
      PIN_OUTPUT,
      new BinaryBus(this.nots.map((n) => n.getPin(PIN_OUTPUT)))
    );
  }
}

export default Not16;
