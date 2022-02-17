/**
 * The ALU (Arithmetic Logic Unit).
 * Computes one of the following functions:
 * x+y, x-y, y-x, 0, 1, -1, x, y, -x, -y, !x, !y,
 * x+1, y+1, x-1, y-1, x&y, x|y on two 16-bit inputs,
 * according to 6 input bits denoted zx,nx,zy,ny,f,no.
 * In addition, the ALU computes two 1-bit outputs:
 * if the ALU output == 0, zr is set to 1; otherwise zr is set to 0;
 * if the ALU output < 0, ng is set to 1; otherwise ng is set to 0.
 */
import Add16 from "computation/nand/Arithmetic/Add16";
import Chip from "computation/nand/Chip";
import Mux16 from "computation/nand/Multiplexing/Mux16";
import Not from "computation/nand/Logic/Not";
import Not16 from "computation/nand/Logic/Not16";
import Or from "computation/nand/Logic/Or";
import Or8Way from "computation/nand/Logic/Or8Way";
import {
  PIN_A,
  PIN_B,
  PIN_INPUT,
  PIN_OUTPUT,
  PIN_SELECTOR,
  WORD_LENGTH,
} from "computation/nand/types";
import And16 from "computation/nand/Logic/And16";

// Implementation: the ALU logic manipulates the x and y inputs
// and operates on the resulting values, as follows:
// if (zx == 1) set x = 0        // 16-bit constant
// if (nx == 1) set x = !x       // bitwise not
// if (zy == 1) set y = 0        // 16-bit constant
// if (ny == 1) set y = !y       // bitwise not
// if (f == 1)  set out = x + y  // integer 2's complement addition
// if (f == 0)  set out = x & y  // bitwise and
// if (no == 1) set out = !out   // bitwise not
// if (out == 0) set zr = 1
// if (out < 0) set ng = 1
/*
CHIP ALU {
    IN
        x[16], y[16],  // 16-bit inputs
        zx, // zero the x input?
        nx, // negate the x input?
        zy, // zero the y input?
        ny, // negate the y input?
        f,  // compute out = x + y (if 1) or x & y (if 0)
        no; // negate the out output?

    OUT
        out[16], // 16-bit output
        zr, // 1 if (out == 0), 0 otherwise
        ng; // 1 if (out < 0),  0 otherwise

    PARTS:

    // Use the flags for the x input to generate xProcessed
    Mux16(a=x, b[0..15]=false, sel=zx, out=xZero);
    Not16(in=xZero, out=notXZero);
    Mux16(a=xZero, b=notXZero, sel=nx, out=xProcessed);

    // Use the flags for the y input to generate yProcessed
    Mux16(a=y, b[0..15]=false, sel=zy, out=yZero);
    Not16(in=yZero, out=notYZero);
    Mux16(a=yZero, b=notYZero, sel=ny, out=yProcessed);

    // Calculate both results of combining x and y, select the correct one into fOut
    Add16(a=xProcessed, b=yProcessed, out=xPlusy);
    And16(a=xProcessed, b=yProcessed, out=xAndy);
    Mux16(a=xAndy, b=xPlusy, sel=f, out=fOut);

    // Calculate negation of output and select negative flag, output, and split version of output for evaluation of zero
    Not16(in=fOut, out=notFOut);
    Mux16(a=fOut, b=notFOut, sel=no, out[15]=ng, out[0..7]=preOut1, out[8..15]=preOut2, out=out);

    // Set the is zero flag
    Or8Way(in=preOut1, out=zrLsb);
    Or8Way(in=preOut2, out=zrMsb);
    Or(a=zrLsb, b=zrMsb, out=nzr);
    Not(in=nzr, out=zr);
}
*/

export const PIN_X = "x";
export const PIN_Y = "y";
export const PIN_ZX = "zx";
export const PIN_NX = "nx";
export const PIN_ZY = "zy";
export const PIN_NY = "ny";
export const PIN_F = "f";
export const PIN_NO = "no";
export const PIN_ZR = "zr";
export const PIN_NG = "ng";

class ALU extends Chip {
  // Use the flags for the x input to generate xProcessed
  xZero: Mux16;
  notXZero: Not16;
  xProcessed: Mux16;

  yZero: Mux16;
  notYZero: Not16;
  yProcessed: Mux16;

  xPlusy: Add16;
  xAndy: And16;
  fOut: Mux16;

  notFOut: Not16;
  out: Mux16;

  zrLsb: Or8Way;
  zrMsb: Or8Way;
  nzr: Or;
  zr: Not;

  constructor() {
    super(
      "ALU",
      [PIN_X, PIN_Y, PIN_ZX, PIN_NX, PIN_ZY, PIN_NY, PIN_F, PIN_NO],
      [PIN_OUTPUT, PIN_ZR, PIN_NG]
    );

    this.xZero = new Mux16();
    this.notXZero = new Not16();
    this.xProcessed = new Mux16();

    this.yZero = new Mux16();
    this.notYZero = new Not16();
    this.yProcessed = new Mux16();

    this.xPlusy = new Add16();
    this.xAndy = new And16();
    this.fOut = new Mux16();
    this.notFOut = new Not16();
    this.out = new Mux16();

    this.zrLsb = new Or8Way();
    this.zrMsb = new Or8Way();
    this.nzr = new Or();
    this.zr = new Not();

    this.xZero.getBus(PIN_B).send(Array(WORD_LENGTH).fill(false));
    this.xZero.getBus(PIN_OUTPUT).connect(this.notXZero.getBus(PIN_INPUT));
    this.xZero.getBus(PIN_OUTPUT).connect(this.xProcessed.getBus(PIN_A));
    this.notXZero.getBus(PIN_OUTPUT).connect(this.xProcessed.getBus(PIN_B));

    this.yZero.getBus(PIN_B).send(Array(WORD_LENGTH).fill(false));
    this.yZero.getBus(PIN_OUTPUT).connect(this.notYZero.getBus(PIN_INPUT));
    this.yZero.getBus(PIN_OUTPUT).connect(this.yProcessed.getBus(PIN_A));
    this.notYZero.getBus(PIN_OUTPUT).connect(this.yProcessed.getBus(PIN_B));

    this.xProcessed.getBus(PIN_OUTPUT).connect(this.xPlusy.getBus(PIN_A));
    this.yProcessed.getBus(PIN_OUTPUT).connect(this.xPlusy.getBus(PIN_B));

    this.xProcessed.getBus(PIN_OUTPUT).connect(this.xAndy.getBus(PIN_A));
    this.yProcessed.getBus(PIN_OUTPUT).connect(this.xAndy.getBus(PIN_B));

    this.xAndy.getBus(PIN_OUTPUT).connect(this.fOut.getBus(PIN_A));
    this.xPlusy.getBus(PIN_OUTPUT).connect(this.fOut.getBus(PIN_B));

    this.fOut.getBus(PIN_OUTPUT).connect(this.notFOut.getBus(PIN_INPUT));
    this.fOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_A));
    this.notFOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_B));

    this.fOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_A));
    this.notFOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_B));

    this.out.getBus(PIN_OUTPUT).connect(this.zrLsb.getBus(PIN_INPUT), 0, 7); // preOut1
    this.out.getBus(PIN_OUTPUT).connect(this.zrMsb.getBus(PIN_INPUT), 8, 15); // preOut2

    this.zrLsb.getPin(PIN_OUTPUT).connectRecipient(this.nzr.getPin(PIN_A));
    this.zrMsb.getPin(PIN_OUTPUT).connectRecipient(this.nzr.getPin(PIN_B));
    this.nzr.getPin(PIN_OUTPUT).connectRecipient(this.zr.getPin(PIN_INPUT));

    // External Wiring
    this.createBus(PIN_X, this.xZero.getBus(PIN_A));
    this.createBus(PIN_Y, this.yZero.getBus(PIN_A));
    this.createPin(PIN_ZX, this.xZero.getPin(PIN_SELECTOR));
    this.createPin(PIN_ZY, this.yZero.getPin(PIN_SELECTOR));
    this.createPin(PIN_NX, this.xProcessed.getPin(PIN_SELECTOR));
    this.createPin(PIN_NY, this.yProcessed.getPin(PIN_SELECTOR));
    this.createPin(PIN_F, this.fOut.getPin(PIN_SELECTOR));
    this.createPin(PIN_NO, this.out.getPin(PIN_SELECTOR));

    this.createBus(PIN_OUTPUT, this.out.getBus(PIN_OUTPUT));
    this.createPin(PIN_NG, this.out.getBus(PIN_OUTPUT).getPin(15)); // FIX!!!
    this.createPin(PIN_ZR, this.zr.getPin(PIN_OUTPUT));
  }
}

export default ALU;
