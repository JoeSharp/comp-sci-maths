import { IndexWindow, } from "../../common";
import parseHackAsm from "./parseHackAsm";
import generateHackAsm from "./generateHackAsm";
import RAMSimulator, { IMemory } from "./RAMSimulator";
import {
  CpuInstruction,
  CpuInstructionType,
  CpuDirectAddressInstruction,
  ComputeInstruction,
  ComputeComputation,
  ComputeDestination,
  ComputeJump,
  ALUState,
} from "./types";

const EMPTY_ALU: ALUState = {
  lastComputation: ComputeComputation.ZERO,
  lastResult: 0,
  aRegister: 0,
  dRegister: 0,
  mContents: 0,
};


class HackCpu {
  // Program
  program: CpuInstruction[];
  programCounter: number;

  // Memory and Registers
  memory: RAMSimulator;
  dataRegister: number;
  addressRegister: number;

  // ALU
  alu: ALUState;

  constructor() {
    this.dataRegister = 0;
    this.addressRegister = 0;
    this.programCounter = 0;
    this.memory = new RAMSimulator();
    this.program = [];
    this.alu = { ...EMPTY_ALU };
    this.reset();
  }

  getMemory(): IMemory {
    return this.memory;
  }

  toString(...windows: IndexWindow[]) {
    return `D: ${this.dataRegister}
A: ${this.addressRegister},
PC: ${this.programCounter} - Next Instruction: ${this.programCounter < this.program.length ? generateHackAsm(this.program[this.programCounter]) : 'OFF THE END'},
\nProgram:
${this.program.map((s, i) => `\t${i} (${s.ref.originalLineNumber}) - ${generateHackAsm(s)}`).join("\n")}
Memory:
${this.memory.toString(...windows)}
`;
  }

  setPC(value: number) {
    this.programCounter = value;
  }

  setA(value: number) {
    this.addressRegister = value;
  }

  setD(value: number) {
    this.dataRegister = value;
  }

  reset() {
    this.programCounter = 0;
    this.dataRegister = 0;
    this.addressRegister = 0;
    this.alu = { ...EMPTY_ALU };
    this.memory.reset();
  }

  loadParsedProgram(rawInstructions: CpuInstruction[]) {
    this.program = [];
    while (rawInstructions.length > 0) {
      const instruction = rawInstructions.shift();

      if (instruction.type === CpuInstructionType.label) {
        this.memory.setLabel(instruction.label, this.program.length);
      } else {
        this.program.push(instruction);
      }
    }

    // Replace any named register jumps with specific jumps
    this.program = this.program.map((p) => {
      if (p.type === CpuInstructionType.namedAddress) {
        const address = this.memory.getOrCreateLabel(p.label);
        return {
          ref: p.ref,
          type: CpuInstructionType.directAddress,
          address,
        };
      }

      return p;
    });
  }

  loadProgram(input: string[]) {
    const rawInstructions: CpuInstruction[] = input
      .map((s, i) => parseHackAsm({ originalLine: s, originalLineNumber: i }))
      .filter((l) => l !== undefined);

    this.loadParsedProgram(rawInstructions);
  }

  getNextCodeLine(): CpuInstruction {
    // Just return if we have run off end of the memory
    if (this.programCounter >= this.program.length) return undefined;
    if (this.programCounter < 0) throw new Error(`CPU Program Counter Became Negative ${this.programCounter}`);
    return this.program[this.programCounter];
  }

  tick(): boolean {
    const instruction = this.getNextCodeLine();
    if (instruction === undefined) return false;

    // console.log(`CPU Running ${generateHackAsm(instruction)}`)

    this.executeInstruction(instruction);
    return true;
  }

  executeInstruction(instruction: CpuInstruction): boolean {
    switch (instruction.type) {
      case CpuInstructionType.directAddress:
        return this.goToDirectAddress(instruction);
      case CpuInstructionType.compute:
        return this.compute(instruction);
      case CpuInstructionType.namedAddress:
        throw new Error('GoTo Named Address should have been replaced on program load')
    }
  }

  goToDirectAddress({ address }: CpuDirectAddressInstruction): boolean {
    this.addressRegister = address;
    this.programCounter++;
    return true;
  }

  /* tslint:disable:no-bitwise */
  compute({ computation, destination, jump }: ComputeInstruction): boolean {
    let result = 0;

    this.alu.lastComputation = computation;
    this.alu.aRegister = this.addressRegister;
    this.alu.dRegister = this.dataRegister;
    this.alu.mContents = this.memory.get(this.addressRegister);

    switch (computation) {
      case ComputeComputation.ZERO:
        result = 0;
        break;
      case ComputeComputation.ONE:
        result = 1;
        break;
      case ComputeComputation.NEGATIVE_ONE:
        result = -1;
        break;
      case ComputeComputation.D:
        result = this.dataRegister;
        break;
      case ComputeComputation.A:
        result = this.addressRegister;
        break;
      case ComputeComputation.NOT_D:
        result = ~this.dataRegister;
        break;
      case ComputeComputation.NOT_A:
        result = ~this.addressRegister;
        break;
      case ComputeComputation.NEGATIVE_D:
        result = -this.dataRegister;
        break;
      case ComputeComputation.NEGATIVE_A:
        result = -this.addressRegister;
        break;
      case ComputeComputation.D_PLUS_ONE:
        result = this.dataRegister + 1;
        break;
      case ComputeComputation.D_MINUS_ONE:
        result = this.dataRegister - 1;
        break;
      case ComputeComputation.A_PLUS_ONE:
        result = this.addressRegister + 1;
        break;
      case ComputeComputation.A_MINUS_ONE:
        result = this.addressRegister - 1;
        break;
      case ComputeComputation.D_PLUS_A:
        result = this.dataRegister + this.addressRegister;
        break;
      case ComputeComputation.D_MINUS_A:
        result = this.dataRegister - this.addressRegister;
        break;
      case ComputeComputation.A_MINUS_D:
        result = this.addressRegister - this.dataRegister;
        break;
      case ComputeComputation.D_AND_A:
        result = this.dataRegister & this.addressRegister;
        break;
      case ComputeComputation.D_OR_A:
        result = this.dataRegister | this.addressRegister;
        break;
      case ComputeComputation.M:
        result = this.memory.get(this.addressRegister);
        break;
      case ComputeComputation.NOT_M:
        result = ~this.memory.get(this.addressRegister);
        break;
      case ComputeComputation.M_PLUS_ONE:
        result = this.memory.get(this.addressRegister) + 1;
        break;
      case ComputeComputation.M_MINUS_ONE:
        result = this.memory.get(this.addressRegister) - 1;
        break;
      case ComputeComputation.D_PLUS_M:
        result = this.dataRegister + this.memory.get(this.addressRegister);
        break;
      case ComputeComputation.D_MINUS_M:
        result = this.dataRegister - this.memory.get(this.addressRegister);
        break;
      case ComputeComputation.M_MINUS_D:
        result = this.memory.get(this.addressRegister) - this.dataRegister;
        break;
      case ComputeComputation.D_AND_M:
        result = this.dataRegister & this.memory.get(this.addressRegister);
        break;
      case ComputeComputation.D_OR_M:
        result = this.dataRegister | this.memory.get(this.addressRegister);
        break;
    }

    this.alu.lastResult = result;

    switch (destination) {
      case ComputeDestination.M:
        this.memory.set(this.addressRegister, result);
        break;
      case ComputeDestination.D:
        this.dataRegister = result;
        break;
      case ComputeDestination.MD:
        this.memory.set(this.addressRegister, result);
        this.dataRegister = result;
        break;
      case ComputeDestination.A:
        this.addressRegister = result;
        break;
      case ComputeDestination.AM:
        this.addressRegister = result;
        this.memory.set(this.addressRegister, result);
        break;
      case ComputeDestination.AD:
        this.addressRegister = result;
        this.dataRegister = result;
        break;
      case ComputeDestination.AMD:
        this.addressRegister = result;
        this.memory.set(this.addressRegister, result);
        this.dataRegister = result;
        break;
    }

    let shouldJump = false;

    switch (jump) {
      case ComputeJump.JGT:
        shouldJump = result > 0;
        break;
      case ComputeJump.JEQ:
        shouldJump = result === 0;
        break;
      case ComputeJump.JGE:
        shouldJump = result >= 0;
        break;
      case ComputeJump.JLT:
        shouldJump = result < 0;
        break;
      case ComputeJump.JNE:
        shouldJump = result !== 0;
        break;
      case ComputeJump.JLE:
        shouldJump = result <= 0;
        break;
      case ComputeJump.JMP:
        shouldJump = true;
        break;
    }

    if (shouldJump) {
      this.programCounter = this.addressRegister;
    } else {
      this.programCounter++;
    }

    return true;
  }
  /* tslint:enable:no-bitwise */
}

export default HackCpu;
