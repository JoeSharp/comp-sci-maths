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

interface AluOutput {
  output: boolean[];
  zr: boolean;
  ng: boolean;
}

/**
 * Use the flags for the input to generate a processed version
 * @param input The input bus
 * @param zero Should we zero the input?
 * @param negate Should we then negate it?
 * @returns Output based on those decision.
 */
const alu_input_proc = (
  input: boolean[],
  zero: boolean,
  negate: boolean
): boolean[] => {
  const zeroed = mux16(input, ZERO_WORD, zero);
  const notZeroed = not16(zeroed);
  return mux16(zeroed, notZeroed, negate);
};

/**
 * Generate the output value based on processed inputs and flags.
 *
 * @param x The processed version of x input
 * @param y The processed version of y input
 * @param f Which function? False = x AND y, True = x ADD16 y
 * @param no Negate the output?
 * @returns The output
 */
const alu_function_calc = (
  x: boolean[],
  y: boolean[],
  f: boolean,
  no: boolean
): boolean[] => {
  // Calculate both results of combining x and y, select the correct one into fOut
  const { sum: xPlusY } = add16(x, y);
  const xAndY = and16(x, y);
  const fOut = mux16(xAndY, xPlusY, f);

  // Calculate negation of output and select negative flag, output, and split version of output for evaluation of zero
  const notFOut = not16(fOut);
  return mux16(fOut, notFOut, no);
};

export default (
  x: boolean[],
  y: boolean[],
  zx: boolean,
  nx: boolean,
  zy: boolean,
  ny: boolean,
  f: boolean,
  no: boolean
): AluOutput => {
  // Generate processed versions of the inputs based on the flags
  const xProcessed = alu_input_proc(x, zx, nx);
  const yProcessed = alu_input_proc(y, zy, ny);

  // Calculate output value
  const output = alu_function_calc(xProcessed, yProcessed, f, no);

  // Assess output
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
