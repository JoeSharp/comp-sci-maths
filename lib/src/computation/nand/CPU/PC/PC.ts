/**
 * A 16-bit counter with load and reset control bits.
 * if      (reset[t] == 1) out[t+1] = 0
 * else if (load[t] == 1)  out[t+1] = in[t]
 * else if (inc[t] == 1)   out[t+1] = out[t] + 1  (integer addition)
 * else                    out[t+1] = out[t]
 */

import Inc16 from "../../Arithmetic/Inc16";
import BinaryBus from "../../BinaryBus";
import Chip from "../../Chip";
import Clock from "../../Clock";
import Register from "../../Memory/Register";
import Mux16 from "../../Multiplexing/Mux16";
import {
  PIN_A,
  PIN_B,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
  PIN_SELECTOR,
  ZERO_WORD,
} from "../../types";

export const PIN_INCREMENT = "inc";
export const PIN_RESET = "reset";

//  CHIP PC {
//     IN in[16],load,inc,reset;
//     OUT out[16];

//     PARTS:
//     // Increment the last value, select the incremented one if possible
//     Inc16(in=lastPC, out=lastPCplusOne);
//     Mux16(a=lastPC, b=lastPCplusOne, sel=inc, out=io);

//     // Loading input takes precendence over incremented value
//     Mux16(a=io, b=in, sel=load, out=lo);

//     // Reset has highest priority
//     Mux16(a=lo, b[0..15]=false, sel=reset, out=ro);

//     // Create that time spacing
//     Register(in=ro, out=lastPC, out=out, load=true);
// }

class PC extends Chip {
  incrementer: Inc16;
  incrementMux: Mux16;

  loadMux: Mux16;
  resetMux: Mux16;

  register: Register;
  lastPCFork: BinaryBus;

  constructor(clock: Clock) {
    super("PC", [PIN_INPUT, PIN_LOAD, PIN_RESET, PIN_INCREMENT], [PIN_OUTPUT]);

    this.incrementer = new Inc16();
    this.incrementMux = new Mux16();
    this.loadMux = new Mux16();
    this.resetMux = new Mux16();
    this.register = new Register(clock);
    this.lastPCFork = new BinaryBus();

    // Internal Wiring
    this.incrementer
      .getBus(PIN_OUTPUT)
      .connect(this.incrementMux.getBus(PIN_B));
    this.lastPCFork.connect(this.incrementer.getBus(PIN_INPUT));
    this.lastPCFork.connect(this.incrementMux.getBus(PIN_A));
    this.incrementMux.getBus(PIN_OUTPUT).connect(this.loadMux.getBus(PIN_A));
    this.loadMux.getBus(PIN_OUTPUT).connect(this.resetMux.getBus(PIN_A));
    this.resetMux.getBus(PIN_OUTPUT).connect(this.register.getBus(PIN_INPUT));
    this.register.getPin(PIN_LOAD).send(true);
    this.register.getBus(PIN_OUTPUT).connect(this.lastPCFork);
    this.resetMux.getBus(PIN_B).send(ZERO_WORD);

    // External Wiring
    this.createPin(PIN_LOAD, this.loadMux.getPin(PIN_SELECTOR));
    this.createPin(PIN_INCREMENT, this.incrementMux.getPin(PIN_SELECTOR));
    this.createPin(PIN_RESET, this.resetMux.getPin(PIN_SELECTOR));
    this.createBus(PIN_INPUT, this.loadMux.getBus(PIN_B));
    this.createBus(PIN_OUTPUT, this.register.getBus(PIN_OUTPUT));
  }
}

export default PC;
