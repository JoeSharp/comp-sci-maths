import BinaryBus from "../../BinaryBus";
import Clock from "../../Clock";
import {
  generateRandomBinary,
  generateRandomWord,
  PIN_ADDRESS,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
} from "../../types";
import RAM512 from "./RAM512";

describe("RAM4K", () => {
  test("Simple", () => {
    const clock = new Clock();
    const ram = new RAM512(clock);

    const receivers = new BinaryBus();
    ram.getBus(PIN_OUTPUT).connect(receivers);
    const testData = [
      {
        address: generateRandomBinary(9),
        content: generateRandomWord(),
      },
      {
        address: generateRandomBinary(9),
        content: generateRandomWord(),
      },
      {
        address: generateRandomBinary(9),
        content: generateRandomWord(),
      },
    ];

    ram.getPin(PIN_LOAD).send(true);
    ram.getBus(PIN_INPUT).send(testData[0].content);
    ram.getBus(PIN_ADDRESS).send(testData[0].address);
    clock.ticktock();
    receivers.pins.forEach((r, i) =>
      expect(r.lastOutput).toBe(testData[0].content[i])
    );

    ram.getBus(PIN_INPUT).send(testData[1].content);
    ram.getBus(PIN_ADDRESS).send(testData[1].address);
    clock.ticktock();
    receivers.pins.forEach((r, i) =>
      expect(r.lastOutput).toBe(testData[1].content[i])
    );

    ram.getBus(PIN_INPUT).send(testData[2].content);
    ram.getBus(PIN_ADDRESS).send(testData[2].address);
    clock.ticktock();
    receivers.pins.forEach((r, i) =>
      expect(r.lastOutput).toBe(testData[2].content[i])
    );

    // Back to word1
    ram.getPin(PIN_LOAD).send(false);
    ram.getBus(PIN_ADDRESS).send(testData[0].address);
    clock.ticktock();
    receivers.pins.forEach((r, i) =>
      expect(r.lastOutput).toBe(testData[0].content[i])
    );
  });
});
