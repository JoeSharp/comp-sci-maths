import { generateLineRef } from "../../common";
import { Optional, RawLineRef } from "../../types";
import stripComment from "../stripComment";
import { VMArithmeticOperation, VMInstruction, VMInstructionType, VMSegment } from "./types";

const parseVMSegment = (segmentName: string): VMSegment => {
    if (segmentName in VMSegment) {
        return segmentName as VMSegment;
    }

    throw new Error(`Invalid segment name ${segmentName}`)
}

export const parseVmInstruction = (
    rawLineRef: RawLineRef
): Optional<VMInstruction> => {
    const ref = generateLineRef(rawLineRef);
    const input = stripComment(ref.originalLine);
    if (input.length === 0) return;

    const parts = input.split(' ');

    // Is this a single word command?
    switch (parts.length) {
        case 1: {
            // Is this an arithmetic command?
            if (input in VMArithmeticOperation) {
                return {
                    type: VMInstructionType.arithmetic,
                    operation: input as VMArithmeticOperation,
                    ref
                }
            }

            if (input === 'return') {
                return {
                    type: VMInstructionType.return,
                    ref
                }
            }

            throw new Error(`Could not parse VM Command on line ${ref.originalLineNumber}: ${input}`)
        }
        case 2: {
            switch (parts[0]) {
                case 'label':
                    return {
                        type: VMInstructionType.label,
                        label: parts[1],
                        ref
                    }
                case 'goto':
                    return {
                        type: VMInstructionType.goto,
                        label: parts[1],
                        ref
                    }
                case 'if-goto':
                    return {
                        type: VMInstructionType.ifgoto,
                        label: parts[1],
                        ref
                    }
            }
        }
        case 3: {
            const part2 = parseInt(parts[2], 10);
            switch (parts[0]) {
                case 'push':
                    return {
                        type: VMInstructionType.push,
                        segment: parseVMSegment(parts[1]),
                        index: part2,
                        ref
                    }
                case 'pop':
                    return {
                        type: VMInstructionType.pop,
                        segment: parseVMSegment(parts[1]),
                        index: part2,
                        ref
                    }
                case 'call':
                    return {
                        type: VMInstructionType.call,
                        functionName: parts[1],
                        numberArgs: part2,
                        ref
                    }
                case 'function':
                    return {
                        type: VMInstructionType.function,
                        functionName: parts[1],
                        numberVars: part2,
                        ref
                    }
                default:
                    throw new Error(`Invalid VM Command line, 3 parts, but doesn't conform to stack command`)
            }
        }
    }
}