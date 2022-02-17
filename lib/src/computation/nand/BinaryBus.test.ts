import { generateRandomWord } from "./types";
import BinaryBus from "./BinaryBus";

describe("Bus Fork", () => {
  test("One in, Three Out", () => {
    const receivers1 = new BinaryBus();
    const receivers2 = new BinaryBus();
    const receivers3 = new BinaryBus();
    const receiverList: BinaryBus[] = [receivers1, receivers2, receivers3];
    const word1 = generateRandomWord();
    const word2 = generateRandomWord();
    const word3 = generateRandomWord();
    const chip = new BinaryBus();
    receiverList.forEach((r) => chip.connect(r));

    chip.send(word1);
    receiverList.forEach((rs: BinaryBus) =>
      rs.pins.forEach((r, i) => expect(r.lastOutput).toBe(word1[i]))
    );
    chip.send(word2);
    receiverList.forEach((rs) =>
      rs.pins.forEach((r, i) => expect(r.lastOutput).toBe(word2[i]))
    );
    chip.send(word3);
    receiverList.forEach((rs) =>
      rs.pins.forEach((r, i) => expect(r.lastOutput).toBe(word3[i]))
    );
  });
});
