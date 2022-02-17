import { parseTestScript } from "../assemblyLanguage/hackAsmTestScript";
import {
    CpuTestInstruction,
    CpuTestInstructionType,
    CpuTestRepeat,
    CpuTestScript,
    CpuTestSetNamedRegister,
    CpuTestSetNamedRegisterAtIndex,
    CpuTestSetOutput,
    TestSourceFile
} from "../TestScripts/types";
import TestRunner from "../TestScripts/TestRunner";
import { FileLoader, isOutputRam } from "../TestScripts/types";
import { IHackVm } from "./HackVm";
import { formatNumber, formatString } from "../TestScripts/parseTestScripts";
import { VM_FILE_EXTENSION } from "./types";

class HackVmTestRunner extends TestRunner<IHackVm, CpuTestInstruction, CpuTestScript> {
    constructor(hackVm: IHackVm, directory: string, fileLoader: FileLoader) {
        super(hackVm, directory, fileLoader, parseTestScript, VM_FILE_EXTENSION);
    }

    loadPrograms(...programs: TestSourceFile[]): void {
        this.objectUnderTest.loadProgram(...programs);
    }

    runInstruction(instruction: CpuTestInstruction) {
        this.lastInstruction = instruction;

        switch (instruction.type) {
            case CpuTestInstructionType.output:
                this.handleOutputInstruction();
                break;
            case CpuTestInstructionType.vmstep:
                this.handleVmStepInstruction();
                break;
            case CpuTestInstructionType.repeat:
                this.handleRepeatInstruction(instruction);
                break;
            case CpuTestInstructionType.setNamedRegisterIndex:
                this.handleSetNamedRegisterAtIndexInstruction(instruction);
                break;
            case CpuTestInstructionType.setNamedRegister:
                this.handleSetNamedRegister(instruction);
                break;
            case CpuTestInstructionType.setOutput:
                this.handleSetOutputInstruction(instruction);
                break;
            default:
                throw new Error(`Unsupported instruction ${instruction.type}`)
        }

        // console.log(JSON.stringify(instruction));
        // console.log(this.objectUnderTest.toString(
        //     { start: 0, end: 4 }, // CPU will use Temp0, which means those won't agree
        //     { start: 16, end: 20 }, // static variables
        //     { start: 310, end: 330 },
        // ));
    }

    handleSetOutputInstruction(instruction: CpuTestSetOutput) {
        this.currentOutputList = instruction.outputList;
        const log = this.currentOutputList
            .map(({ heading, spacing }) => formatString(heading, spacing))
            .join("|");
        this.addToLog(`|${log}|`, false);
    }

    handleVmStepInstruction() {
        this.objectUnderTest.step();
    }

    handleRepeatInstruction({ count, instructions }: CpuTestRepeat) {
        const newNestedInstructions: CpuTestInstruction[] = [];
        for (let x = 0; x <= count; x++) {
            instructions.forEach((i) => newNestedInstructions.push(i));
        }
        this.commandStack.push(newNestedInstructions);
    }

    handleSetNamedRegisterAtIndexInstruction({ registerName, index, value }: CpuTestSetNamedRegisterAtIndex) {
        if (registerName === 'RAM') {
            return this.objectUnderTest.getMemory().set(index, value);
        }

        const address = this.objectUnderTest.getMemorySegmentLocation(registerName, index);
        if (address >= 0) {
            return this.objectUnderTest.getMemory().set(address, value);
        }
    }

    handleSetNamedRegister({ value, registerName }: CpuTestSetNamedRegister) {
        this.objectUnderTest.getMemory().setLabelled(registerName, value);
    }

    getCurrentOutput() {
        return this.currentOutputList
            .map((output) => {
                if (isOutputRam(output)) {
                    const { address, format, spacing } = output;
                    return formatNumber(
                        this.objectUnderTest.getMemory().get(address),
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
    }

    handleOutputInstruction() {
        this.addToLog(`|${this.getCurrentOutput()}|`);
    }
}

export default HackVmTestRunner;