import { LineReference } from "../../types";

export const ASM_FILE_EXTENSION = '.asm';

export interface Registers {
  [name: string]: number;
}

export enum CpuInstructionType {
  label = 'Label', // special value that isn't an instruction per se, but labels the one below it
  directAddress = 'Direct_Address',
  namedAddress = 'Named_Address',
  compute = 'Comute',
}

export interface ALUState {
  lastComputation: ComputeComputation;
  lastResult: number;
  aRegister: number;
  dRegister: number;
  mContents: number;
}

export interface AbstractCpuInstruction {
  ref: LineReference;
  type: CpuInstructionType;
}

export interface CpuInstructionLabel extends AbstractCpuInstruction {
  type: CpuInstructionType.label;
  label: string;
}

export interface CpuDirectAddressInstruction extends AbstractCpuInstruction {
  type: CpuInstructionType.directAddress;
  address: number;
}

export interface CpuNamedAddressInstruction extends AbstractCpuInstruction {
  type: CpuInstructionType.namedAddress;
  label: string;
}

export enum ComputeDestination {
  M = "M",
  D = "D",
  MD = "MD",
  A = "A",
  AM = "AM",
  AD = "AD",
  AMD = "AMD",
}

export enum ComputeComputation {
  ZERO = "0",
  ONE = "1",
  NEGATIVE_ONE = "-1",
  D = "D",
  A = "A",
  NOT_D = "!D",
  NOT_A = "!A",
  NEGATIVE_D = "-D",
  NEGATIVE_A = "-A",
  D_PLUS_ONE = "D+1",
  D_MINUS_ONE = "D-1",
  A_PLUS_ONE = "A+1",
  A_MINUS_ONE = "A-1",
  D_PLUS_A = "D+A",
  D_MINUS_A = "D-A",
  A_MINUS_D = "A-D",
  D_AND_A = "D&A",
  D_OR_A = "D|A",
  M = "M",
  NOT_M = "!M",
  M_PLUS_ONE = "M+1",
  M_MINUS_ONE = "M-1",
  D_PLUS_M = "D+M",
  D_MINUS_M = "D-M",
  M_MINUS_D = "M-D",
  D_AND_M = "D&M",
  D_OR_M = "D|M",
}

export enum ComputeJump {
  JGT = "JGT",
  JEQ = "JEQ",
  JGE = "JGE",
  JLT = "JLT",
  JNE = "JNE",
  JLE = "JLE",
  JMP = "JMP",
}

export interface ComputeInstruction extends AbstractCpuInstruction {
  type: CpuInstructionType.compute;
  destination?: ComputeDestination;
  computation: ComputeComputation;
  jump?: ComputeJump;
}

export type CpuInstruction =
  | CpuInstructionLabel
  | CpuDirectAddressInstruction
  | CpuNamedAddressInstruction
  | ComputeInstruction;


