import BinaryPin from "../../BinaryPin";
import Chip from "../../Chip";

import { PIN_A, PIN_B, PIN_OUTPUT } from "../../types";

class Nand extends Chip {
  a: BinaryPin;
  b: BinaryPin;
  output: BinaryPin;

  constructor() {
    super("Nand", [PIN_A, PIN_B], [PIN_OUTPUT]);

    this.a = new BinaryPin().withNewValueObserver(() => this.updateValue());
    this.b = new BinaryPin().withNewValueObserver(() => this.updateValue());
    this.output = new BinaryPin().withNewOutputObserver(() =>
      this.updateValue(true)
    );
    this.updateValue();

    this.createPin(PIN_A, this.a);
    this.createPin(PIN_B, this.b);
    this.createPin(PIN_OUTPUT, this.output);
  }

  updateValue(force: boolean = false) {
    // This is the only logical expression we calculate natively, everything else is combinations of this!!!
    const newValue = !(this.a.lastOutput && this.b.lastOutput);
    this.output.send(newValue, force);
  }
}

export default Nand;
