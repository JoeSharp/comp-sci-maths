import {
  createMemory,
  createPersistentMemory,
  Memory,
  MemoryFn,
} from "../../common";
import dmux8way, { createDemux8Way } from "../../multiplexing/dmux8way";
import mux8way16, { createMux8Way16 } from "../../multiplexing/mux8way16";
import simpleRegister, { createRegister, RegisterState } from "../register";

const DEFAULT_CONTENTS = createMemory(8);

const ram8: MemoryFn = (
  input: boolean[],
  address: boolean[],
  load: boolean,
  contents: Memory = DEFAULT_CONTENTS
) => {
  const loadBits = dmux8way(load, address);

  const [ra, rb, rc, rd, re, rf, rg, rh] = loadBits.map((l, i) =>
    simpleRegister(input, l, contents[i])
  );

  const out = mux8way16(ra, rb, rc, rd, re, rf, rg, rh, address);

  return {
    out,
    contents: [ra, rb, rc, rd, re, rf, rg, rh],
  };
};

export default ram8;

export type Ram8State = RegisterState[];

export const createRam8 = (state = createPersistentMemory(8)) => {
  const registers = state.map(createRegister);

  const { output: loadDemux8WayOutput, op: loadDemux8Way } = createDemux8Way();
  const { output: outMux8WayOutput, op: outMux8Way } = createMux8Way16();

  return {
    state,
    clock: () => registers.forEach((r) => r.clock()),
    ram8: (input: boolean[], address: boolean[], load: boolean) => {
      loadDemux8Way(load, address);
    },
  };
};
