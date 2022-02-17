import BinaryBus from "computation/nand/BinaryBus";
import Clock from "computation/nand/Clock";
import {
  generateRandomWord,
  PIN_ADDRESS,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
} from "computation/nand/types";
import RAM64 from "computation/nand/Memory/RAM64";

interface TestData {
  address: boolean[];
  content: boolean[];
}

describe("RAM64", () => {
  test("Simple", () => {
    const receivers = new BinaryBus();
    const clock = new Clock();
    const ram = new RAM64(clock);
    ram.getBus(PIN_OUTPUT).connect(receivers);
    const testData = [
      {
        address: [false, false, true, false, true, false],
        content: generateRandomWord(),
      },
      {
        address: [false, true, true, false, true, false],
        content: generateRandomWord(),
      },
      {
        address: [true, false, true, true, true, false],
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
