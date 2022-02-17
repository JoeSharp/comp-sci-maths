import { Optional } from "types";
import { NO_OP } from "computation/TestScripts/types";

export class BinaryPin {
  lastOutput: Optional<boolean>;
  receivers: BinaryPin[] = [];
  newOutputObserver: () => void;
  newValueObserver: () => void;

  constructor(receivers: BinaryPin[] = []) {
    receivers.forEach((r) => this.receivers.push(r));
    this.newOutputObserver = NO_OP;
    this.newValueObserver = NO_OP;
  }

  withNewOutputObserver(o: () => void): this {
    this.newOutputObserver = o;
    return this;
  }

  withNewValueObserver(o: () => void): this {
    this.newValueObserver = o;
    return this;
  }

  connectRecipient(...receivers: BinaryPin[]): this {
    receivers.forEach((r) => this.receivers.push(r));
    this.newOutputObserver();
    return this;
  }

  send(newValue: boolean, force: boolean = false): this {
    if (force || !this.lastOutput || newValue !== this.lastOutput) {
      this.lastOutput = newValue;
      this.receivers.forEach((r) => r.send(newValue));
      this.newValueObserver();
    }
    return this;
  }
}

export default BinaryPin;
