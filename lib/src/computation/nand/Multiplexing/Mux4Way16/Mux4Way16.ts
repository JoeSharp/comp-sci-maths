/**
 * 4-way 16-bit multiplexor:
 * out = a if sel == 00
 *       b if sel == 01
 *       c if sel == 10
 *       d if sel == 11
 */

import Chip from "../../Chip";
import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import Mux16 from "../Mux16";
import { PIN_A, PIN_B, PIN_OUTPUT, PIN_SELECTOR } from "../../types";
import BinaryBus from "../../BinaryBus";
import BinaryPin from "../../BinaryPin";

//  CHIP Mux4Way16 {
//     IN a[16], b[16], c[16], d[16], sel[2];
//     OUT out[16];

//     PARTS:
//     Mux16(a=a, b=b, sel=sel[0], out=aOrB);
//     Mux16(a=c, b=d, sel=sel[0], out=cOrD);
//     Mux16(a=aOrB, b=cOrD, sel=sel[1], out=out);
// }
class Mux4Way16 extends Chip {
  aOrB: Mux16;
  cOrD: Mux16;
  outMux: Mux16;

  constructor() {
    super(
      "Mux4Way16",
      [PIN_A, PIN_B, PIN_C, PIN_D, PIN_SELECTOR],
      [PIN_OUTPUT]
    );
    this.aOrB = new Mux16();
    this.cOrD = new Mux16();
    this.outMux = new Mux16();

    // Internal Wiring
    this.aOrB.getBus(PIN_OUTPUT).connect(this.outMux.getBus(PIN_A));
    this.cOrD.getBus(PIN_OUTPUT).connect(this.outMux.getBus(PIN_B));

    // External Wiring
    this.createBus(PIN_A, this.aOrB.getBus(PIN_A));
    this.createBus(PIN_B, this.aOrB.getBus(PIN_B));
    this.createBus(PIN_C, this.cOrD.getBus(PIN_A));
    this.createBus(PIN_D, this.cOrD.getBus(PIN_B));
    this.createBus(
      PIN_SELECTOR,
      new BinaryBus([
        new BinaryPin([
          this.aOrB.getPin(PIN_SELECTOR),
          this.cOrD.getPin(PIN_SELECTOR),
        ]),
        this.outMux.getPin(PIN_SELECTOR),
      ])
    );

    this.createBus(PIN_OUTPUT, this.outMux.getBus(PIN_OUTPUT));
  }
}

export default Mux4Way16;
