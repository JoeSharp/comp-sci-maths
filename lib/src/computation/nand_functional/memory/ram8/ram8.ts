import {
  createMemory,
  createPersistentMemory,
  Memory,
  MemoryFn,
} from "../../common";
import dmux8way, {
  createDemux8Way,
  createDmux8WayOutput,
} from "../../multiplexing/dmux8way";
import mux8way16, {
  createMux8Way16,
  createMux8Way16Output,
} from "../../multiplexing/mux8way16";
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

  const out = mux8way16([ra, rb, rc, rd, re, rf, rg, rh], address);

  return {
    out,
    contents: [ra, rb, rc, rd, re, rf, rg, rh],
  };
};

export default ram8;

export type Ram8State = RegisterState[];

export const createRam8 = (state = createPersistentMemory(8)) => {
  const registers = state.contents.map(createRegister);
  const loadBits = createDmux8WayOutput();

  const { op: loadDemux8Way } = createDemux8Way(loadBits);
  const { op: outMux8Way } = createMux8Way16(state.output);

  return {
    state,
    clock: () => registers.forEach((r) => r.clock()),
    ram8: (input: boolean[], address: boolean[], load: boolean) => {
      // console.log("RAM8 Step 1", { input, address, load });

      loadDemux8Way(load, address);

      // console.log("RAM8 Step 2", { loadBits });

      const registerOutput = loadBits.map((l, i) =>
        simpleRegister(input, l, registers[i].readOutput())
      );
      // const registerOutput = loadBits.map((l, i) => {
      //   registers[i].register(input, l);
      //   return registers[i].readOutput();
      // });

      // console.log("RAM8 Step 3", { registerOutput });

      outMux8Way(registerOutput, address);

      // console.log("RAM8 Step 4", { output: state.output });
    },
  };
};
