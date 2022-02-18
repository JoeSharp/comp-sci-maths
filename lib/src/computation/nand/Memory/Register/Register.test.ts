import BinaryBus from "../..//BinaryBus";
import Clock from "../..//Clock";
import {
  generateRandomWord,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
} from "../../types";
import Register from "./Register";

describe("Register", () => {
  test("Simple", () => {
    const clock = new Clock();
    const register = new Register(clock);
    const receivers = new BinaryBus();
    register.getBus(PIN_OUTPUT).connect(receivers);

    let lastWord: boolean[] = [];
    for (let x = 0; x < 10; x++) {
      const word = generateRandomWord();
      register.getBus(PIN_INPUT).send(word);

      if (lastWord.length === word.length) {
        register.getPin(PIN_LOAD).send(false);
        clock.ticktock();
        receivers.pins.forEach((r, i) =>
          expect(r.lastOutput).toBe(lastWord[i])
        );
      }

      register.getPin(PIN_LOAD).send(true);
      clock.ticktock();
      receivers.pins.forEach((r, i) => expect(r.lastOutput).toBe(word[i]));
      lastWord = word;
    }
  });
});
