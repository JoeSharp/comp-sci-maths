import BinaryPin from "computation/nand/BinaryPin";
import Clock from "../../Clock";
import { PIN_OUTPUT } from "computation/nand/types";
import Toggler from "./Toggler";

describe("Toggler", () => {
  test("Simple", () => {
    const clock = new Clock();
    const toggler = new Toggler(clock);
    const sink = new BinaryPin();
    toggler.getPin(PIN_OUTPUT).connectRecipient(sink);

    for (let x = 0; x < 10; x++) {
      clock.ticktock();
      expect(sink.lastOutput).toBe(true);
      clock.ticktock();
      expect(sink.lastOutput).toBe(false);
    }
  });
});
