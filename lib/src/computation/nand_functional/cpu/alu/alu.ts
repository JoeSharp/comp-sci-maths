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

import { ZERO_WORD } from "../../../nand/types";
import add16 from "../../arithmetic/add16";
import and16 from "../../logic/and16";
import not from "../../logic/not";
import not16 from "../../logic/not16";
import or from "../../logic/or";
import or8way from "../../logic/or8way";
import mux16 from "../../multiplexing/mux16";

interface AluInput {
  x: boolean[];
  y: boolean[];
  zx: boolean;
  nx: boolean;
  zy: boolean;
  ny: boolean;
  f: boolean;
  no: boolean;
}

interface AluOutput {
  output: boolean[];
  zr: boolean;
  ng: boolean;
}

export default ({ x, y, zx, nx, zy, ny, f, no }: AluInput): AluOutput => {
  // Use the flags for the x input to generate xProcessed
  const xZero = mux16(x, ZERO_WORD, zx);
  const notXZero = not16(xZero);
  const xProcessed = mux16(xZero, notXZero, nx);

  // Use the flags for the y input to generate yProcessed
  const yZero = mux16(y, ZERO_WORD, zy);
  const notYZero = not16(yZero);
  const yProcessed = mux16(yZero, notYZero, ny);

  // Calculate both results of combining x and y, select the correct one into fOut
  const { sum: xPlusY } = add16(xProcessed, yProcessed);
  const xAndY = and16(xProcessed, yProcessed);
  const fOut = mux16(xAndY, xPlusY, f);

  // Calculate negation of output and select negative flag, output, and split version of output for evaluation of zero
  const notFOut = not16(fOut);
  const output = mux16(fOut, notFOut, no);

  // Set the is zero flag
  const zrLsb = or8way(output.slice(0, 8));
  const zrMsb = or8way(output.slice(8, 16));
  const ng = output[15];
  const nzr = or(zrLsb, zrMsb);
  const zr = not(nzr);

  return {
    output,
    ng,
    zr,
  };
};
