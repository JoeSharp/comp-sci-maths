import Add16 from "./Arithmetic/Add16";
import FullAdder from "./Arithmetic/FullAdder";
import HalfAdder from "./Arithmetic/HalfAdder";
import Inc16 from "./Arithmetic/Inc16";
import Clock from "./Clock";
import ALU from "./CPU/ALU";
import PC from "./CPU/PC";
import And from "./Logic/And";
import And16 from "./Logic/And16";
import Nand from "./Logic/Nand";
import Not from "./Logic/Not";
import Not16 from "./Logic/Not16";
import Or from "./Logic/Or";
import Or16 from "./Logic/Or16";
import Or8Way from "./Logic/Or8Way";
import Xor from "./Logic/Xor";
import Bit from "./Memory/Bit";
import DataFlipFlop from "./Memory/DataFlipFlop";
import RAM4K from "./Memory/RAM4K";
import RAM512 from "./Memory/RAM512";
import RAM64 from "./Memory/RAM64";
import RAM8 from "./Memory/RAM8";
import Register from "./Memory/Register";
import Dmux from "./Multiplexing/Dmux";
import Dmux4Way from "./Multiplexing/Dmux4Way";
import Dmux8Way from "./Multiplexing/Dmux8Way";
import Mux from "./Multiplexing/Mux";
import Mux4Way16 from "./Multiplexing/Mux4Way16";
import Mux8Way16 from "./Multiplexing/Mux8Way16";
import { ChipFactory } from "./types";

const chipFactory: ChipFactory = {
  // Arithmetic
  Add16: () => new Add16(),
  FullAdder: () => new FullAdder(),
  HalfAdder: () => new HalfAdder(),
  Inc16: () => new Inc16(),
  // CPU
  ALU: () => new ALU(),
  PC: (c: Clock) => new PC(c),
  // Logic
  And: () => new And(),
  And16: () => new And16(),
  Nand: () => new Nand(),
  Not: () => new Not(),
  Not16: () => new Not16(),
  Or: () => new Or(),
  Or8Way: () => new Or8Way(),
  Or16: () => new Or16(),
  Xor: () => new Xor(),
  // Memory
  Bit: (c: Clock) => new Bit(c),
  DFF: (c: Clock) => new DataFlipFlop(c),
  RAM4K: (c: Clock) => new RAM4K(c),
  RAM8: (c: Clock) => new RAM8(c),
  RAM64: (c: Clock) => new RAM64(c),
  RAM512: (c: Clock) => new RAM512(c),
  Register: (c: Clock) => new Register(c),
  // Multiplexing
  Dmux: () => new Dmux(),
  Dmux4Way: () => new Dmux4Way(),
  Dmux8Way: () => new Dmux8Way(),
  Mux: () => new Mux(),
  Mux4Way16: () => new Mux4Way16(),
  Mux8Way16: () => new Mux8Way16(),
  Mux16: () => new Mux(),
};

export default chipFactory;
