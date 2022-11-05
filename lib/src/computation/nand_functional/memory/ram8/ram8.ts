import { createMemory, Memory, MemoryFn } from "../../common";
import dmux8way, { createDemux8Way } from "../../multiplexing/dmux8way";
import mux8way16, { createMux8Way16 } from "../../multiplexing/mux8way16";
import register from "../register";
import createToggledStorage from "../toggledStorage";

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

export const createRam8 = () => {
  const toggleContents = createToggledStorage(() => createMemory(8));
  const loadDmux = createDemux8Way();
  const selMux = createMux8Way16();

  return (input: boolean[], address: boolean[], load: boolean) => {
    const { now, prev } = toggleContents();

    const {
      a: la,
      b: lb,
      c: lc,
      d: ld,
      e: le,
      f: lf,
      g: lg,
      h: lh,
    } = loadDmux(load, address);
  };
};
