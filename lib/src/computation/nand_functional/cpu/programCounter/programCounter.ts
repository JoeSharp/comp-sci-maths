import { ZERO_WORD } from "../../../nand/types";
import inc16 from "../../arithmetic/inc16";
import register from "../../memory/register";
import mux16 from "../../multiplexing/mux16";

/**
 * A 16-bit counter with load and reset control bits.
 * if      (reset[t] == 1) out[t+1] = 0
 * else if (load[t] == 1)  out[t+1] = in[t]
 * else if (inc[t] == 1)   out[t+1] = out[t] + 1  (integer addition)
 * else                    out[t+1] = out[t]
 */
export default (
  input: boolean[] = ZERO_WORD,
  load: boolean = false,
  increment: boolean = false,
  reset: boolean = false,
  lastPC: boolean[] = ZERO_WORD
): boolean[] => {
  // Increment the last value, select the incremented one if possible
  const { sum: lastPCPlusOne } = inc16(lastPC);
  const io = mux16(lastPC, lastPCPlusOne, increment);

  // Loading input takes precendence over incremented value
  const lo = mux16(io, input, load);

  // Reset has highest priority
  const ro = mux16(lo, ZERO_WORD, reset);

  // Create the time spacing
  return register(ro, true);
};
