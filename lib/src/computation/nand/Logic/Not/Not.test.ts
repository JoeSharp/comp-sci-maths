import Not from ".";
import BinaryPin from "computation/nand/BinaryPin";
import loadTestChip from "computation/nand/HDL/loadTestChip";
import { PIN_INPUT, PIN_OUTPUT } from "computation/nand/types";

describe("NOT", () => {
  const nandReceiver = new BinaryPin();
  const not = new Not();
  not.getPin(PIN_OUTPUT).connectRecipient(nandReceiver);

  const hdlChip = loadTestChip('01', 'Not.hdl');
  const hdlChipReceiver = new BinaryPin();
  hdlChip.getPin(PIN_OUTPUT).connectRecipient(hdlChipReceiver);

  [
    { testName: 'nand', chip: not, receiver: nandReceiver },
    { testName: 'hdl', chip: hdlChip, receiver: hdlChipReceiver }
  ].forEach(({ testName, chip, receiver }) => {
    test(`NOT ${testName}`, () => {

      chip.getPin(PIN_INPUT).send(false);
      expect(receiver.lastOutput).toBe(true);

      chip.getPin(PIN_INPUT).send(true);
      expect(receiver.lastOutput).toBe(false);

      chip.getPin(PIN_INPUT).send(false);
      expect(receiver.lastOutput).toBe(true);
    });
  });
});
