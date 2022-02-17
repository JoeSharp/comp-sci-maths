import { booleanToBinArray } from "dataRepresentation/numberBases/simpleBinary";
import BinaryBus from "computation/nand/BinaryBus";
import Clock from "computation/nand/Clock";
import { PIN_OUTPUT } from "computation/nand/types";
import Counter from "./Counter";

describe("Counter", () => {
  test("Simple", () => {
    const clock = new Clock();
    const counter = new Counter(clock);

    const outputMonitor = new BinaryBus();
    counter.getBus(PIN_OUTPUT).connect(outputMonitor);

    const getOutputValue = () => booleanToBinArray(outputMonitor.getValue());

    clock.ticktock();
    expect(getOutputValue()).toBe("0000000000000001");
    clock.ticktock();
    expect(getOutputValue()).toBe("0000000000000010");
    clock.ticktock();
    expect(getOutputValue()).toBe("0000000000000011");
    clock.ticktock();
    expect(getOutputValue()).toBe("0000000000000100");
    clock.ticktock();
    expect(getOutputValue()).toBe("0000000000000101");
  });
});
