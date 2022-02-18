import BinaryPin from "../../BinaryPin";
import Clock from "../../Clock";
import { PIN_INPUT, PIN_OUTPUT } from "../../types";
import DataFlipFlop from "./DataFlipFlop";

describe("D-Type Flip Flop", () => {
  test("Simple", () => {
    let callCount = 0;
    const receiver = new BinaryPin().withNewValueObserver(() => callCount++);
    const clock = new Clock();
    const dff = new DataFlipFlop(clock);

    dff.getPin(PIN_OUTPUT).connectRecipient(receiver);
    expect(callCount).toBe(0);

    // Send some values, but no clock
    dff.getPin(PIN_INPUT).send(false);
    dff.getPin(PIN_INPUT).send(true);
    dff.getPin(PIN_INPUT).send(false);

    clock.ticktock();
    expect(receiver.lastOutput).toBe(false);

    dff.getPin(PIN_INPUT).send(true);
    dff.getPin(PIN_INPUT).send(false);
    dff.getPin(PIN_INPUT).send(true);
    dff.tick();
    dff.tock();
    expect(receiver.lastOutput).toBe(true);

    // Two clocks should have resulted in two outputs
    expect(callCount).toBe(2);
  });
});
