/**
 * 1-bit register:
 * If load[t] == 1 then out[t+1] = in[t]
 *                 else out does not change (out[t+1] = out[t])
 */

import DataFlipFlop from "../DataFlipFlop";
import Mux from "computation/nand//Multiplexing/Mux";
import Clock from "computation/nand//Clock";
import Chip from "computation/nand//Chip";
import {
  PIN_A,
  PIN_B,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
  PIN_SELECTOR,
} from "computation/nand/types";

// CHIP Bit {
//     IN in, load;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     Mux(a=t1, b=in, sel=load, out=w1);
//     DFF(in=w1, out=t1, out=out);
// }
class Bit extends Chip {
  mux: Mux;
  dff: DataFlipFlop;

  constructor(clock: Clock) {
    super("Bit", [PIN_INPUT, PIN_LOAD], [PIN_OUTPUT]);
    this.mux = new Mux();
    this.dff = new DataFlipFlop(clock);

    // Internal Wiring
    this.dff.getPin(PIN_OUTPUT).connectRecipient(this.mux.getPin(PIN_A)); // t1
    this.mux.getPin(PIN_OUTPUT).connectRecipient(this.dff.getPin(PIN_INPUT)); // w1

    // External Wiring
    this.createPin(PIN_INPUT, this.mux.getPin(PIN_B));
    this.createPin(PIN_LOAD, this.mux.getPin(PIN_SELECTOR));
    this.createPin(PIN_OUTPUT, this.dff.getPin(PIN_OUTPUT));
  }
}

export default Bit;
