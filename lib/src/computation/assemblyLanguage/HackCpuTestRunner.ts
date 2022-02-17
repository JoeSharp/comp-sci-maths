import { parseTestScript } from "./hackAsmTestScript";
import HackCpu from "./HackCpu";
import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestRepeat,
  CpuTestScript,
  CpuTestSetNamedRegister,
  CpuTestSetOutput,
  CpuTestSetNamedRegisterAtIndex,
  TestSourceFile,
} from "../TestScripts/types";
import { formatNumber, formatString } from "../TestScripts/parseTestScripts";
import TestRunner from "../TestScripts/TestRunner";
import { FileLoader, isOutputRam } from "../TestScripts/types";
import { ASM_FILE_EXTENSION } from "./types";

export default class HackCpuTestRunner extends TestRunner<
  HackCpu,
  CpuTestInstruction,
  CpuTestScript
> {
  constructor(directory: string, fileLoader: FileLoader) {
    super(new HackCpu(), directory, fileLoader, parseTestScript, ASM_FILE_EXTENSION);
  }

  loadPrograms(...programs: TestSourceFile[]): void {
    if (programs.length !== 1) throw new Error('CPU Test Runner can only support a single program file');

    this.objectUnderTest.loadProgram(programs[0].contents);
  }

  runInstruction(instruction: CpuTestInstruction) {
    this.lastInstruction = instruction;

    switch (instruction.type) {
      case CpuTestInstructionType.output:
        return this.handleOutputInstruction();
      case CpuTestInstructionType.ticktock:
        return this.handleTickTockInstruction();
      case CpuTestInstructionType.repeat:
        return this.handleRepeatInstruction(instruction);
      case CpuTestInstructionType.setNamedRegisterIndex:
        return this.handleSetNamedRegisterAtIndexInstruction(instruction);
      case CpuTestInstructionType.setNamedRegister:
        return this.handleSetNamedRegisterInstruction(instruction);
      case CpuTestInstructionType.setOutput:
        return this.handleSetOutputInstruction(instruction);
    }
  }

  handleSetOutputInstruction(instruction: CpuTestSetOutput) {
    this.currentOutputList = instruction.outputList;
    const log = this.currentOutputList
      .map(({ heading, spacing }) => formatString(heading, spacing))
      .join("|");
    this.addToLog(`|${log}|`, false);
  }

  handleTickTockInstruction() {
    this.objectUnderTest.tick();
  }

  handleRepeatInstruction({ count, instructions }: CpuTestRepeat) {
    const newNestedInstructions: CpuTestInstruction[] = [];
    for (let x = 0; x < count; x++) {
      instructions.forEach((i) => newNestedInstructions.push(i));
    }
    this.commandStack.push(newNestedInstructions);
  }

  handleSetNamedRegisterAtIndexInstruction({ registerName, index, value }: CpuTestSetNamedRegisterAtIndex) {
    if (registerName === 'RAM') {
      this.objectUnderTest.memory.set(index, value);
    }
  }

  handleSetNamedRegisterInstruction({ value, registerName }: CpuTestSetNamedRegister) {
    switch (registerName) {
      case 'PC':
        this.objectUnderTest.setPC(value);
        break;
    }
  }

  handleOutputInstruction() {
    const log = this.currentOutputList
      .map((output) => {
        if (isOutputRam(output)) {
          const { address, format, spacing } = output;
          return formatNumber(
            this.objectUnderTest.memory.get(address),
            format,
            spacing
          );
        } else {
          throw new Error(
            "Unsupported method, outputting variables from Hack CPU"
          );
        }
      })
      .join("|");
    this.addToLog(`|${log}|`);
  }
}
