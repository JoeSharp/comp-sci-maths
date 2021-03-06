import BinaryBus from "../../BinaryBus";
import Chip from "../../Chip";
import Clock from "../../Clock";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT, WORD_LENGTH } from "../../types";
import Bit from "../Bit";

/**
 * 16-bit register:
 * If load[t] == 1 then out[t+1] = in[t]
 * else out does not change
 */

//  CHIP Register {
//     IN in[16], load;
//     OUT out[16];

//     PARTS:
//     // Put your code here:
//     Bit(in=in[0], out=out[0], load=load);
//     Bit(in=in[1], out=out[1], load=load);
//     Bit(in=in[2], out=out[2], load=load);
//     Bit(in=in[3], out=out[3], load=load);
//     Bit(in=in[4], out=out[4], load=load);
//     Bit(in=in[5], out=out[5], load=load);
//     Bit(in=in[6], out=out[6], load=load);
//     Bit(in=in[7], out=out[7], load=load);
//     Bit(in=in[8], out=out[8], load=load);
//     Bit(in=in[9], out=out[9], load=load);
//     Bit(in=in[10], out=out[10], load=load);
//     Bit(in=in[11], out=out[11], load=load);
//     Bit(in=in[12], out=out[12], load=load);
//     Bit(in=in[13], out=out[13], load=load);
//     Bit(in=in[14], out=out[14], load=load);
//     Bit(in=in[15], out=out[15], load=load);
// }

class Register extends Chip {
  inputBus: BinaryBus;
  bits: Bit[];
  outputBus: BinaryBus;

  constructor(clock: Clock) {
    super("Register", [PIN_INPUT, PIN_LOAD], [PIN_OUTPUT]);

    this.bits = Array(WORD_LENGTH)
      .fill(null)
      .map(() => new Bit(clock));

    // this.pins = new BinaryBus();
    this.outputBus = new BinaryBus();

    // External Wiring
    this.createBus(
      PIN_INPUT,
      new BinaryBus(this.bits.map((b) => b.getPin(PIN_INPUT)))
    );
    this.createPin(PIN_LOAD, ...this.bits.map((b) => b.getPin(PIN_LOAD)));
    this.createBus(
      PIN_OUTPUT,
      new BinaryBus(this.bits.map((b) => b.getPin(PIN_OUTPUT)))
    );
  }
}

export default Register;
