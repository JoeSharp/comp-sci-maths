import { PIN_F } from "../../CPU/ALU/ALU";
import BinaryBus, { createPinArray } from "../../BinaryBus";
import Chip from "../../Chip";
import Clock from "../../Clock";
import { PIN_C, PIN_D } from "../../Multiplexing/Dmux4Way/Dmux4Way";
import Dmux8Way from "../../Multiplexing/Dmux8Way";
import { PIN_E, PIN_G, PIN_H } from "../../Multiplexing/Dmux8Way/Dmux8Way";
import Mux8Way16 from "../../Multiplexing/Mux8Way16";
import {
  PIN_A,
  PIN_ADDRESS,
  PIN_B,
  PIN_INPUT,
  PIN_LOAD,
  PIN_OUTPUT,
  PIN_SELECTOR,
  WORD_LENGTH,
} from "../../types";
import Register from "../../Memory/Register";

/**
 * Memory of 8 registers, each 16 bit-wide. Out holds the value
 * stored at the memory location specified by address. If load==1, then
 * the in value is loaded into the memory location specified by address
 * (the loaded value will be emitted to out from the next time step onward).
 */

//  CHIP RAM8 {
//     IN in[16], load, address[3];
//     OUT out[16];

//     PARTS:
//     DMux8Way(in=load, sel=address, a=la, b=lb, c=lc, d=ld, e=le, f=lf, g=lg, h=lh);
//     Register(in=in, out=ra, load=la);
//     Register(in=in, out=rb, load=lb);
//     Register(in=in, out=rc, load=lc);
//     Register(in=in, out=rd, load=ld);
//     Register(in=in, out=re, load=le);
//     Register(in=in, out=rf, load=lf);
//     Register(in=in, out=rg, load=lg);
//     Register(in=in, out=rh, load=lh);

//     Mux8Way16(a=ra, b=rb, c=rc, d=rd, e=re, f=rf, g=rg, h=rh, sel=address, out=out);
// }

class RAM8 extends Chip {
  demux: Dmux8Way;
  mux: Mux8Way16;
  registers: Register[];
  addressFork: BinaryBus;
  inputFork: BinaryBus;

  constructor(clock: Clock) {
    super("RAM8", [PIN_INPUT, PIN_LOAD, PIN_ADDRESS], [PIN_OUTPUT]);

    this.demux = new Dmux8Way();
    this.mux = new Mux8Way16();
    this.registers = Array(WORD_LENGTH)
      .fill(null)
      .map(() => new Register(clock));

    this.addressFork = new BinaryBus(createPinArray(3));
    this.inputFork = new BinaryBus();

    this.registers.forEach((r) => this.inputFork.connect(r.getBus(PIN_INPUT)));

    this.addressFork
      .connect(this.demux.getBus(PIN_SELECTOR))
      .connect(this.mux.getBus(PIN_SELECTOR));

    [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F, PIN_G, PIN_H].forEach(
      (pin, i) => {
        this.demux.getPin(pin).connectRecipient(this.registers[i].getPin(PIN_LOAD));
        this.registers[i].getBus(PIN_OUTPUT).connect(this.mux.getBus(pin));
      }
    );

    this.createPin(PIN_LOAD, this.demux.getPin(PIN_INPUT));
    this.createBus(PIN_ADDRESS, this.addressFork);
    this.createBus(PIN_INPUT, this.inputFork);
    this.createBus(PIN_OUTPUT, this.mux.getBus(PIN_OUTPUT));
  }
}

export default RAM8;
