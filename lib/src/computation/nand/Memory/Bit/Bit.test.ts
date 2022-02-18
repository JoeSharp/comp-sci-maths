import BinaryPin from "../../BinaryPin";
import Clock from "../../Clock";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from "../../types";
import Bit from "./Bit";
import SimpleCounter from '../../SimpleCounter';
import loadTestChip from "../../HDL/loadTestChip";

describe("D-Type Flip Flop", () => {
  const nandCounter = new SimpleCounter();
  const nandReceiver = new BinaryPin().withNewValueObserver(() => nandCounter.increment());
  const nandClock = new Clock();
  const nandChip = new Bit(nandClock);
  nandChip.getPin(PIN_OUTPUT).connectRecipient(nandReceiver);

  const hdlCounter = new SimpleCounter();
  const hdlReceiver = new BinaryPin().withNewValueObserver(() => hdlCounter.increment());
  const hdlClock = new Clock();
  const hdlChip = loadTestChip('03/a/', 'Bit.hdl');
  hdlChip.getPin(PIN_OUTPUT).connectRecipient(hdlReceiver);

  [{
    testName: 'NAND',
    chip: nandChip,
    receiver: nandReceiver,
    clock: nandClock,
    counter: nandCounter,
  },
    // {
    //   testName: 'HDL',
    //   chip: hdlChip,
    //   receiver: hdlReceiver,
    //   clock: hdlClock,
    //   counter: hdlCounter
    // }
  ].forEach(({ testName, chip, receiver, clock, counter }) => {
    test(`1-bit Register ${testName}`, () => {
      // expect(receiver.lastOutput).toBeUndefined(); // first call
      chip.getPin(PIN_INPUT).send(false);
      chip.getPin(PIN_INPUT).send(true);
      chip.getPin(PIN_INPUT).send(false);
      chip.getPin(PIN_LOAD).send(true);
      expect(counter.getCount()).toBe(0);
      clock.ticktock();
      expect(counter.getCount()).toBe(1);
      expect(receiver.lastOutput).toBe(false); // first call
      chip.getPin(PIN_INPUT).send(true);
      clock.ticktock();
      expect(receiver.lastOutput).toBe(true); // second time
      chip.getPin(PIN_LOAD).send(false);
      chip.getPin(PIN_INPUT).send(false);
      expect(counter.getCount()).toBe(2); // from before
      clock.ticktock();
      expect(receiver.lastOutput).toBe(true); // third call
      chip.getPin(PIN_LOAD).send(true);
      clock.ticktock();
      expect(receiver.lastOutput).toBe(false); // fourth call

    })
  });
});
