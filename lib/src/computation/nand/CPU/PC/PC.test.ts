import { binaryToNumber } from "dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "../../BinaryBus";
import Clock from "../../Clock";
import {
  generateRandomWord,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
} from "computation/nand/types";
import PC, { PIN_INCREMENT, PIN_RESET } from "./PC";

describe("Program Counter", () => {
  test("Simple", () => {
    const clock = new Clock();
    const pc = new PC(clock);
    const jumpAddress = generateRandomWord();
    const jumpAddressNum = binaryToNumber(jumpAddress);

    const sink = new BinaryBus();
    pc.getBus(PIN_OUTPUT).connect(sink);
    pc.getPin(PIN_INCREMENT).send(true);

    const pcValue = () => binaryToNumber(sink.getValue());
    expect(pcValue()).toBe(0);

    clock.ticktock();
    expect(pcValue()).toBe(1);

    clock.ticktock();
    expect(pcValue()).toBe(2);

    clock.ticktock();
    expect(pcValue()).toBe(3);

    // Jump and count up a bit
    pc.getBus(PIN_INPUT).send(jumpAddress);
    pc.getPin(PIN_LOAD).send(true);
    clock.ticktock();
    expect(pcValue()).toBe(jumpAddressNum);

    clock.ticktock();
    expect(pcValue()).toBe(jumpAddressNum);

    pc.getPin(PIN_LOAD).send(false);
    clock.ticktock();
    expect(pcValue()).toBe(jumpAddressNum + 1);
    clock.ticktock();
    expect(pcValue()).toBe(jumpAddressNum + 2);

    // Reset and count up a bit
    pc.getPin(PIN_RESET).send(true);
    clock.ticktock();
    expect(pcValue()).toBe(0);
    clock.ticktock();
    expect(pcValue()).toBe(0);
    pc.getPin(PIN_RESET).send(false);
    clock.ticktock();
    expect(pcValue()).toBe(1);
  });
});
