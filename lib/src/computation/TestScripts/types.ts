export enum CpuTestInstructionType {
  setNamedRegisterIndex = 'Set Named Register (index)',
  setNamedRegister = 'Set Named Register',
  ticktock = 'ticktock',
  vmstep = 'VM Step',
  repeat = 'Repeat',
  repeatEnd = 'Repeat END',
  output = 'Output',
  setOutput = 'Set Output',
}

export interface TestSourceFile {
  filename: string;
  contents: string[];
}

export interface TestOutputGeneric {
  heading: string;
  format: string;
  spacing: number[];
}

export interface TestOutputRam extends TestOutputGeneric {
  address: number;
}

export interface TestOutputVariable extends TestOutputGeneric {
  variable: string;
}

export type TestOutputFragment = TestOutputRam | TestOutputVariable;

export const isOutputRam = (
  testOutput: TestOutputFragment
): testOutput is TestOutputRam => {
  return (testOutput as TestOutputRam).address !== undefined;
};

export interface TestScript<INSTRUCTION> {
  load: string;
  loadAll: boolean;
  outputFile: string;
  compareTo: string;
  testInstructions: INSTRUCTION[];
}

export interface CodeLine {
  lineContent: string;
  lineNumber: number;
}

export type FileLoader = (directory: string, filename: string) => string[];
export type ScriptParser<T> = (lines: string[]) => T;

/* tslint:disable:no-empty */
export const NO_OP = () => { };


export interface AbstractCpuTestInstruction extends CodeLine {
  type: CpuTestInstructionType;
}

export interface CpuTestSetOutput extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.setOutput,
  outputList: TestOutputFragment[];
}

export interface CpuTestSetNamedRegisterAtIndex extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.setNamedRegisterIndex;
  registerName: string;
  index: number;
  value: number;
}

export interface CpuTestSetNamedRegister extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.setNamedRegister;
  registerName: string;
  value: number;
}

export interface CpuTestTickTockInstruction extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.ticktock;
}

export interface CpuTestVmStepInstruction extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.vmstep;
}

export interface CpuTestOutputInstruction extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.output;
}

export interface CpuTestRepeat extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.repeat;
  count: number;
  instructions: CpuTestInstruction[];
}

export interface CpuTestRepeatEnd extends AbstractCpuTestInstruction {
  type: CpuTestInstructionType.repeatEnd;
}

export type CpuTestInstruction =
  | CpuTestSetOutput
  | CpuTestSetNamedRegisterAtIndex
  | CpuTestSetNamedRegister
  | CpuTestRepeat
  | CpuTestRepeatEnd
  | CpuTestTickTockInstruction
  | CpuTestVmStepInstruction
  | CpuTestOutputInstruction;

export interface CpuTestScript extends TestScript<CpuTestInstruction> { }