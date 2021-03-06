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
import RAM512 from "../../Memory/RAM512";

/**
 * Memory of 4K registers, each 16 bit-wide. Out holds the value
 * stored at the memory location specified by address. If load==1, then
 * the in value is loaded into the memory location specified by address
 * (the loaded value will be emitted to out from the next time step onward).
 */

//  CHIP RAM4K {
//     IN in[16], load, address[12];
//     OUT out[16];

//     PARTS:
//     // Which sub register are we loading?
//     DMux8Way(in=load, sel=address[0..2], a=la, b=lb, c=lc, d=ld, e=le, f=lf, g=lg, h=lh);

//     // Each sub register is fed input and the demuxed load indicator, and the sub address
//     RAM512(in=in, out=ra, address=address[3..11], load=la);
//     RAM512(in=in, out=rb, address=address[3..11], load=lb);
//     RAM512(in=in, out=rc, address=address[3..11], load=lc);
//     RAM512(in=in, out=rd, address=address[3..11], load=ld);
//     RAM512(in=in, out=re, address=address[3..11], load=le);
//     RAM512(in=in, out=rf, address=address[3..11], load=lf);
//     RAM512(in=in, out=rg, address=address[3..11], load=lg);
//     RAM512(in=in, out=rh, address=address[3..11], load=lh);

//     // Select which sub register we are outputting
//     Mux8Way16(a=ra, b=rb, c=rc, d=rd, e=re, f=rf, g=rg, h=rh, sel=address[0..2], out=out);
// }
class RAM4K extends Chip {
  demux: Dmux8Way;
  mux: Mux8Way16;
  ram: RAM512[];
  addressFork: BinaryBus;
  inputFork: BinaryBus;

  constructor(clock: Clock) {
    super("RAM4K", [PIN_INPUT, PIN_LOAD, PIN_ADDRESS], [PIN_OUTPUT]);
    this.demux = new Dmux8Way();
    this.mux = new Mux8Way16();
    this.ram = Array(WORD_LENGTH)
      .fill(null)
      .map(() => new RAM512(clock));

    this.addressFork = new BinaryBus(createPinArray(9));
    this.inputFork = new BinaryBus();

    this.ram.forEach((r) => {
      this.inputFork.connect(r.getBus(PIN_INPUT));
      this.addressFork.connect(r.getBus(PIN_ADDRESS), 3, 11);
    });

    this.addressFork
      .connect(this.demux.getBus(PIN_SELECTOR), 0, 2)
      .connect(this.mux.getBus(PIN_SELECTOR), 0, 2);

    [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F, PIN_G, PIN_H].forEach(
      (pin, i) => {
        this.demux.getPin(pin).connectRecipient(this.ram[i].getPin(PIN_LOAD));
        this.ram[i].getBus(PIN_OUTPUT).connect(this.mux.getBus(pin));
      }
    );

    this.createPin(PIN_LOAD, this.demux.getPin(PIN_INPUT));
    this.createBus(PIN_ADDRESS, this.addressFork);
    this.createBus(PIN_INPUT, this.inputFork);
    this.createBus(PIN_OUTPUT, this.mux.getBus(PIN_OUTPUT));
  }
}

export default RAM4K;
