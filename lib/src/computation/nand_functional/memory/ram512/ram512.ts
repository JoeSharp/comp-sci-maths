import { createMemory, Memory, MemoryFn } from "../../common";
import dmux8way from "../../multiplexing/dmux8way";
import mux8way16 from "../../multiplexing/mux8way16";
import ram64 from "../ram64";

const DEFAULT_CONTENTS = createMemory(64);

const ram512: MemoryFn = (
  input: boolean[],
  address: boolean[],
  load: boolean,
  contents: Memory = DEFAULT_CONTENTS
) => {
  const address0_2 = address.slice(0, 3);
  const address3_8 = address.slice(3, 9);

  const loadBits = dmux8way(load, address0_2);

  const [
    { out: ra, contents: ca },
    { out: rb, contents: cb },
    { out: rc, contents: cc },
    { out: rd, contents: cd },
    { out: re, contents: ce },
    { out: rf, contents: cf },
    { out: rg, contents: cg },
    { out: rh, contents: ch },
  ] = loadBits.map((l, i) =>
    ram64(input, address3_8, l, contents.slice(i * 64, (i + 1) * 64))
  );

  const out = mux8way16(ra, rb, rc, rd, re, rf, rg, rh, address0_2);

  return {
    out,
    contents: [...ca, ...cb, ...cc, ...cd, ...ce, ...cf, ...cg, ...ch],
  };
};

export default ram512;
