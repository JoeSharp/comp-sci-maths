import { createMemory, Memory } from "../../common";
import dmux8way from "../../multiplexing/dmux8way";
import mux8way16 from "../../multiplexing/mux8way16";
import register from "../register";

const DEFAULT_CONTENTS = createMemory(8);

export default (
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

  const ra = register(input, la, contents[0]);
  const rb = register(input, lb, contents[1]);
  const rc = register(input, lc, contents[2]);
  const rd = register(input, ld, contents[3]);
  const re = register(input, le, contents[4]);
  const rf = register(input, lf, contents[5]);
  const rg = register(input, lg, contents[6]);
  const rh = register(input, lh, contents[7]);

  const out = mux8way16(ra, rb, rc, rd, re, rf, rg, rh, address);

  return {
    out,
    contents: [ra, rb, rc, rd, re, rf, rg, rh],
  };
};
