/**
 * A 16-bit counter with load and reset control bits.
 * if      (reset[t] == 1) out[t+1] = 0
 * else if (load[t] == 1)  out[t+1] = in[t]
 * else if (inc[t] == 1)   out[t+1] = out[t] + 1  (integer addition)
 * else                    out[t+1] = out[t]
 */

import Inc16 from "../../Arithmetic/Inc16";
import Chip from "../../Chip";
import Clock from "../../Clock";
import Register from "../../Memory/Register";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from "../../types";

class Counter extends Chip {
  incrementer: Inc16;
  register: Register;

  constructor(clock: Clock) {
    super("Counter", [], [PIN_OUTPUT]);

    this.incrementer = new Inc16();
    this.register = new Register(clock);

    // Internal Wiring
    this.register.getPin(PIN_LOAD).send(true);
    this.incrementer
      .getBus(PIN_OUTPUT)
      .connect(this.register.getBus(PIN_INPUT));
    this.register
      .getBus(PIN_OUTPUT)
      .connect(this.incrementer.getBus(PIN_INPUT));

    // External Wiring
    this.createBus(PIN_OUTPUT, this.register.getBus(PIN_OUTPUT));
  }
}

export default Counter;
