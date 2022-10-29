import { createMemory, Memory, MemoryFn } from "../../common";
import dmux8way from "../../multiplexing/dmux8way";
import mux8way16 from "../../multiplexing/mux8way16";
import register from "../register";

const DEFAULT_CONTENTS = createMemory(8);

const ram8: MemoryFn = (
  input: boolean[],
  address: boolean[],
  load: boolean,
  contents: Memory = DEFAULT_CONTENTS
) => {
  const {
    a: la,
    b: lb,
    c: lc,
    d: ld,
    e: le,
    f: lf,
    g: lg,
    h: lh,
  } = dmux8way(load, address);

  const [ra, rb, rc, rd, re, rf, rg, rh] = [la, lb, lc, ld, le, lf, lg, lh].map(
    (l, i) => register(input, l, contents[i])
  );

  const out = mux8way16(ra, rb, rc, rd, re, rf, rg, rh, address);

  return {
    out,
    contents: [ra, rb, rc, rd, re, rf, rg, rh],
  };
};

export default ram8;
