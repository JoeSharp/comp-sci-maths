import BinaryPin from "./BinaryPin";
import { WORD_LENGTH } from "./types";

export const createPinArray = (width: number = WORD_LENGTH): BinaryPin[] =>
  Array(width)
    .fill(null)
    .map(() => new BinaryPin());

class BinaryBus {
  pins: BinaryPin[];

  constructor(pins: BinaryPin[] = createPinArray()) {
    this.pins = pins;
  }

  getWidth() {
    return this.pins.length;
  }

  send(values: boolean[], startIndex: number = 0) {
    values.forEach((v, i) => {
      const index = i + startIndex;
      if (index >= this.pins.length)
        throw new Error(
          `Writing too much data ${values.length} starting at ${startIndex} to bus ${name} which is ${this.pins.length} bits wide`
        );
      this.pins[index].send(v);
    });
  }

  getPin(index: number = 0) {
    // Is this a pin we have seen before?
    if (index > this.pins.length || !this.pins[index]) {
      this.pins[index] = new BinaryPin();
    }

    return this.pins[index];
  }

  connectPin(pin: BinaryPin, index: number = 0): this {
    if (index > this.pins.length) {
      throw new Error(
        `Attempting to connect bus pin ${index} with only ${this.pins.length} available`
      );
    }

    this.pins[index].connectRecipient(pin);
    return this;
  }

  connect(
    bus: BinaryBus,
    startIndex: number = 0,
    endIndex: number = WORD_LENGTH
  ): this {
    bus.pins.forEach((pin, i) => {
      const index = startIndex + i;

      if (index > this.pins.length) {
        throw new Error(
          `Attempting to connect bus pin ${index} with only ${this.pins.length} available`
        );
      }
      if (index <= endIndex) {
        this.pins[index].connectRecipient(pin);
      }
    });
    return this;
  }

  getValue(): boolean[] {
    return this.pins.map((r) => r.lastOutput);
  }
}

export default BinaryBus;
