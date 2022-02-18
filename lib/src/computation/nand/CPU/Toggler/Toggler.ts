import Chip from "../../Chip";
import Clock from "../../Clock";
import Not from "../../Logic/Not";
import Bit from "../../Memory/Bit";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from "../../types";

class Toggler extends Chip {
  not: Not;
  bit: Bit;

  constructor(clock: Clock) {
    super("Toggler", [], [PIN_OUTPUT]);

    this.not = new Not();
    this.bit = new Bit(clock);

    // Internal Wiring
    this.not.getPin(PIN_OUTPUT).connectRecipient(this.bit.getPin(PIN_INPUT));
    this.bit.getPin(PIN_OUTPUT).connectRecipient(this.not.getPin(PIN_INPUT));

    // External Wiring
    this.createPin(PIN_OUTPUT, this.bit.getPin(PIN_OUTPUT));

    this.bit.getPin(PIN_LOAD).send(true);
  }
}

export default Toggler;
