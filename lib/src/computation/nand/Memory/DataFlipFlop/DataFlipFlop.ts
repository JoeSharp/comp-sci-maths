import BinaryPin from "../../BinaryPin";
import Chip from "../../Chip";
import Clock, { IClocked } from "../../Clock";

import { PIN_INPUT, PIN_OUTPUT } from "../../types";

class DataFlipFlop extends Chip implements IClocked {
  value: boolean;
  tickValue: boolean;
  input: BinaryPin;
  output: BinaryPin;

  constructor(clock: Clock) {
    super("DFF", [PIN_INPUT], [PIN_OUTPUT]);
    this.value = false;
    this.input = new BinaryPin();
    this.output = new BinaryPin();
    clock.registerClocked(this);

    this.createPin(PIN_INPUT, this.input);
    this.createPin(PIN_OUTPUT, this.output);
  }

  tick() {
    this.tickValue = this.input.lastOutput;
  }

  tock() {
    this.output.send(this.tickValue);
  }
}

export default DataFlipFlop;
