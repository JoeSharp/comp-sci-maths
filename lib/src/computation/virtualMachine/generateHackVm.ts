import { VMInstruction, VMInstructionType } from "./types";

/**
 * Converts from our internal representation of VM commands to their string equivalent
 *
 * @param vmInstruction The instruction as previously parsed, or created programmatically
 * @returns The string representation of this command to write to file
 */
const generateHackVm = (vmInstruction: VMInstruction): string => {
    switch (vmInstruction.type) {
        case VMInstructionType.pop:
            return `pop ${vmInstruction.segment} ${vmInstruction.index}`;
        case VMInstructionType.push:
            return `push ${vmInstruction.segment} ${vmInstruction.index}`;
        case VMInstructionType.arithmetic:
            return vmInstruction.operation;
        case VMInstructionType.call:
            return `call ${vmInstruction.functionName} ${vmInstruction.numberArgs}`;
        case VMInstructionType.function:
            return `function ${vmInstruction.functionName} ${vmInstruction.numberVars}`;
        case VMInstructionType.ifgoto:
            return `if-goto ${vmInstruction.label}`;
        case VMInstructionType.goto:
            return `goto ${vmInstruction.label}`;
        case VMInstructionType.label:
            return `label ${vmInstruction.label}`;
        case VMInstructionType.return:
            return 'return';
    }
}

export default generateHackVm;