import { FileLoader, isOutputRam, TestSourceFile } from "../../TestScripts/types";
import TestRunner from "../../TestScripts/TestRunner";
import Chip from "../Chip";
import parseNandTestScript from "./nandChipTestScript";
import {
  HDL_FILE_EXTENSION,
  NandTestInstruction,
  NandTestInstructionType,
  NandTestScript,
  NandTestSetBus,
  NandTestSetOutput,
  NandTestSetPin,
} from "./types";
import { formatBoolean, formatString } from "../../TestScripts/parseTestScripts";

class NandTestRunner extends TestRunner<
  Chip,
  NandTestInstruction,
  NandTestScript
> {
  chip: Chip;

  constructor(chip: Chip, directory: string, fileLoader: FileLoader,) {
    super(chip, directory, fileLoader, parseNandTestScript, HDL_FILE_EXTENSION);
    this.fileLoader = fileLoader;
    this.chip = chip;
  }

  loadPrograms(...programs: TestSourceFile[]): void {
    // LOAD HDL INTO GENERIC CHIP
    // throw new Error("Method not implemented.");
  }

  runInstruction(instruction: NandTestInstruction): void {
    switch (instruction.type) {
      case NandTestInstructionType.eval:
        break;
      case NandTestInstructionType.output:
        this.handleOutputInstruction();
        break;
      case NandTestInstructionType.setOutput:
        this.handleSetOutputInstruction(instruction);
        break;
      case NandTestInstructionType.setPin:
        this.handleSetPin(instruction);
        break;
      case NandTestInstructionType.setBus:
        this.handleSetBus(instruction);
        break;
    }
  }

  handleSetOutputInstruction({ outputList }: NandTestSetOutput) {
    this.currentOutputList = outputList;
    const log = this.currentOutputList
      .map(({ heading, spacing }) => formatString(heading, spacing))
      .join("|");
    this.addToLog(`|${log}|`, false);
  }

  handleSetPin({ pin, value }: NandTestSetPin) {
    this.objectUnderTest.getPin(pin).send(value);
  }

  handleSetBus({ bus, values }: NandTestSetBus) {
    this.objectUnderTest.getBus(bus).send(values);
  }

  handleOutputInstruction() {
    const log = this.currentOutputList
      .map((output) => {
        if (isOutputRam(output)) {
          throw new Error("Unsupported method, outputting RAM from Chip");
        } else {
          const { format, spacing, variable } = output;
          return formatBoolean(
            this.objectUnderTest.getPin(variable).lastOutput,
            format,
            spacing
          );
        }
      })
      .join("|");
    this.addToLog(`|${log}|`);
  }
}

export default NandTestRunner;
