import MemorySegmentArray from "./MemorySegments/MemorySegmentArray";
import MemorySegmentConstant from './MemorySegments/MemorySegmentConstant'
import MemorySegmentPointer from './MemorySegments/MemorySegmentPointer'
import MemorySegment from "./MemorySegments/MemorySegment";
import MemoryStack from "./MemorySegments/MemoryStack";
import { parseVmInstruction } from "./parseVmInstruction";

import {
    ASM_MEM_SEG_SYMBOL_ARGUMENTS,
    ASM_MEM_SEG_SYMBOL_LOCAL,
    ASM_MEM_SEG_SYMBOL_THAT,
    ASM_MEM_SEG_SYMBOL_THIS,
    MEM_SEG_ADDRESS_ARGUMENTS,
    MEM_SEG_ADDRESS_LOCAL,
    MEM_SEG_ADDRESS_THIS,
    MEM_SEG_ADDRESS_THAT,
    VMSegment,
    MEM_SEG_TEMP_START,
    MEM_SEG_TEMP_LENGTH,
    VMInstruction,
    VMSourceFile,
    VMInstructionType,
    SYSTEM_INIT_FUNCTION_NAME,
    VMArithmeticOperation,
    VMInstructionCall
} from './types';
import MemorySegmentStatic from "./MemorySegments/MemorySegmentStatic";
import MemorySegmentTemp from "./MemorySegments/MemorySegmentTemp";
import { generateLineRef, IndexWindow } from "../../common";
import generateHackVm from "./generateHackVm";
import RAMSimulator, { IMemory } from "../assemblyLanguage/RAMSimulator";
import Stack from "../../dataStructures/stack/Stack";

export interface IHackVm {
    loadProgram(...sourceFiles: VMSourceFile[]): void;
    step(): boolean;
    getMemorySegmentLocation(name: string, index: number): number;
    getMemory(): IMemory;
    toString(...windows: IndexWindow[]): string;
}

/* tslint:disable:no-empty */
class HackVm implements IHackVm {
    // Underlying CPU
    memory: RAMSimulator;

    // Program
    program: VMInstruction[];
    programCounter: number;
    steps: number;
    programLabels: {
        [label: string]: number
    }
    callStack: Stack<string>;

    // The Stack...as stored in memory
    stack: MemoryStack;

    // Named Memory Segments
    memorySegments: {
        [s: string]: MemorySegment;
    }

    // Initalise new VM
    constructor() {
        this.memory = new RAMSimulator();
        this.callStack = new Stack();

        this.program = [];
        this.programCounter = 0;
        this.stack = new MemoryStack(this.memory, 0, 128);

        const localSegment = new MemorySegmentArray(this.memory,
            this.stack,
            ASM_MEM_SEG_SYMBOL_LOCAL,
            MEM_SEG_ADDRESS_LOCAL,
            700);
        const argumentSegment = new MemorySegmentArray(this.memory,
            this.stack,
            ASM_MEM_SEG_SYMBOL_ARGUMENTS,
            MEM_SEG_ADDRESS_ARGUMENTS,
            800);
        const thisSegment = new MemorySegmentArray(this.memory,
            this.stack,
            ASM_MEM_SEG_SYMBOL_THIS,
            MEM_SEG_ADDRESS_THIS,
            900);
        const thatSegment = new MemorySegmentArray(this.memory,
            this.stack,
            ASM_MEM_SEG_SYMBOL_THAT,
            MEM_SEG_ADDRESS_THAT,
            1000);
        const constantSegment = new MemorySegmentConstant(this.memory, this.stack);
        const staticSegment = new MemorySegmentStatic(this.memory, this.stack); // will need fixing later....;
        const tempSegment = new MemorySegmentTemp(this.memory,
            this.stack,
            MEM_SEG_TEMP_START,
            MEM_SEG_TEMP_LENGTH);
        const pointerSegment = new MemorySegmentPointer(this.memory,
            this.stack,
            thisSegment,
            thatSegment);

        this.memorySegments = {
            [VMSegment.local]: localSegment,
            [VMSegment.argument]: argumentSegment,
            [VMSegment.this]: thisSegment,
            [VMSegment.that]: thatSegment,
            [VMSegment.constant]: constantSegment,
            [VMSegment.static]: staticSegment,
            [VMSegment.temp]: tempSegment,
            [VMSegment.pointer]: pointerSegment
        }

        this.reset();
    }

    getMemorySegmentLocation(name: string, index: number): number {
        if (!(name in this.memorySegments)) {
            throw new Error(`Invalid memory segment ${name}`)
        }

        const segment = this.memorySegments[name];
        return segment.getAddress(index);
    }

    getMemory(): IMemory {
        return this.memory
    }

    setMemorySegment(name: string, index: number, value: number) {
        if (name in this.memorySegments) {
            this.memorySegments[name].set(index, value);
            return true;
        }

        return false;
    }

    reset() {
        this.programCounter = 0;
        this.getMemorySegmentStatic().reset();
    }
    getMemorySegmentArgument(): MemorySegmentArray {
        return (this.memorySegments[VMSegment.argument] as MemorySegmentArray);
    }
    getMemorySegmentLocal(): MemorySegmentArray {
        return (this.memorySegments[VMSegment.local] as MemorySegmentArray);
    }
    getMemorySegmentThis(): MemorySegmentArray {
        return (this.memorySegments[VMSegment.this] as MemorySegmentArray);
    }
    getMemorySegmentThat(): MemorySegmentArray {
        return (this.memorySegments[VMSegment.that] as MemorySegmentArray);
    }
    getMemorySegmentStatic(): MemorySegmentStatic {
        return this.memorySegments[VMSegment.static] as MemorySegmentStatic;
    }
    getMemorySegmentConstant(): MemorySegmentConstant {
        return this.memorySegments[VMSegment.constant] as MemorySegmentConstant;
    }
    getMemorySegmentTemp(): MemorySegmentTemp {
        return this.memorySegments[VMSegment.temp] as MemorySegmentTemp;
    }
    getMemorySegmentPointer(): MemorySegmentPointer {
        return this.memorySegments[VMSegment.pointer] as MemorySegmentPointer;
    }

    loadProgram(...sourceFiles: VMSourceFile[]) {
        if (sourceFiles.length === 0)
            throw new Error('No source files given to VM');

        let sysInitFound: string;
        this.programCounter = 0;
        this.program = [];
        this.programLabels = {};

        // Assume the program starts at line zero
        const staticMemorySegment: MemorySegmentStatic = this.getMemorySegmentStatic();
        staticMemorySegment.setSourceFilename(sourceFiles[0].filename);

        sourceFiles.forEach(({ filename, contents }) => {
            contents
                .map((s, i) => parseVmInstruction({
                    sourceFilename: filename,
                    originalLine: s,
                    originalLineNumber: i
                }))
                .filter(s => s !== undefined)
                .forEach(v => {
                    if (v.type === VMInstructionType.function) {
                        if (v.functionName === SYSTEM_INIT_FUNCTION_NAME) {
                            sysInitFound = v.ref.sourceFilename;
                        }
                    }
                    this.program.push(v);
                });
        });

        // Check for Sys.init if there are multiple VM files.
        if (sourceFiles.length > 1 && sysInitFound === undefined) throw new Error('Multi file VM program with no Sys.init found.');

        // If there is a Sys.init. Add instructions at the start to call that function
        // Otherwise we are assuming the program starts at the start of the VM instructions
        if (sysInitFound !== undefined) {
            const goToSysInit: VMInstructionCall = {
                type: VMInstructionType.call,
                functionName: SYSTEM_INIT_FUNCTION_NAME,
                numberArgs: 0,
                ref: generateLineRef({
                    sourceFilename: 'ROOT',
                })
            };
            this.program.unshift(goToSysInit);
        }

        this.program.forEach((v, i) => {
            switch (v.type) {
                case VMInstructionType.function:
                    this.programLabels[v.functionName] = i;
                    break;
                case VMInstructionType.label:
                    this.programLabels[v.label] = i + 1;
                    break;
            }
        })

        this.programCounter = 0;
        this.steps = 0;
    }

    getNextCodeLine(): VMInstruction {
        if (this.programCounter >= this.program.length) return undefined;
        if (this.programCounter < 0) throw new Error(`VM Program Counter Became Negative ${this.programCounter}`);

        return this.program[this.programCounter];
    }

    step(): boolean {
        // Just return if we have run off end of the memory
        const nextCodeLine = this.getNextCodeLine();
        if (nextCodeLine === undefined) return false;
        this.executeInstruction(nextCodeLine);
        this.steps++;
        return true;
    }

    executeInstruction(instruction: VMInstruction) {
        switch (instruction.type) {
            case VMInstructionType.arithmetic:
                return this.executeArithemtic(instruction.operation);
            case VMInstructionType.push:
                return this.executeStackPushInstruction(instruction.segment, instruction.index);
            case VMInstructionType.pop:
                return this.executeStackPopInstruction(instruction.segment, instruction.index);
            case VMInstructionType.call:
                return this.executeCall(instruction.functionName, instruction.numberArgs);
            case VMInstructionType.function:
                return this.executeFunction(instruction.ref.sourceFilename, instruction.functionName, instruction.numberVars);
            case VMInstructionType.goto:
                return this.executeGoTo(instruction.label);
            case VMInstructionType.ifgoto:
                return this.executeIfGoTo(instruction.label);
            case VMInstructionType.label:
                return this.executeLabel(instruction.label);
            case VMInstructionType.return:
                return this.executeReturn();
        }
    }

    /* tslint:disable:no-bitwise */
    executeArithemtic(operation: VMArithmeticOperation) {
        switch (operation) {
            case VMArithmeticOperation.add:
                this.executeBinaryOperationNumber((a, b) => a + b);
                break;
            case VMArithmeticOperation.sub:
                this.executeBinaryOperationNumber((a, b) => b - a);
                break;
            case VMArithmeticOperation.gt:
                this.executeBinaryOperationBool((a, b) => a < b);
                break;
            case VMArithmeticOperation.lt:
                this.executeBinaryOperationBool((a, b) => a > b);
                break;
            case VMArithmeticOperation.eq:
                this.executeBinaryOperationBool((a, b) => a === b);
                break;
            case VMArithmeticOperation.neg: {
                const t = this.stack.pop();
                this.stack.push(-t);
                break;
            }
            case VMArithmeticOperation.and:
                this.executeBinaryOperationNumber((a, b) => a & b);
                break;
            case VMArithmeticOperation.or:
                this.executeBinaryOperationNumber((a, b) => a | b);
                break;
            case VMArithmeticOperation.not: {
                const value = this.stack.pop();
                this.stack.push(~value);
                break;
            }
        }
        this.programCounter++;
    }

    executeBinaryOperationBool(op: (a: number, b: number) => boolean) {
        const a = this.stack.pop();
        const b = this.stack.pop();
        const res = op(a, b);
        this.stack.push(res ? -1 : 0);
    }

    executeBinaryOperationNumber(op: (a: number, b: number) => number) {
        const a = this.stack.pop();
        const b = this.stack.pop();
        const res = op(a, b);
        this.stack.push(res);
    }

    executeStackPushInstruction(segmentName: VMSegment, index: number) {
        const segment = this.memorySegments[segmentName];
        segment.push(index);
        this.programCounter++;
    }

    executeStackPopInstruction(segmentName: VMSegment, index: number) {
        const segment = this.memorySegments[segmentName];
        segment.pop(index);
        this.programCounter++;
    }

    executeFunction(sourceFilename: string, functionName: string, numberVars: number) {
        const staticMemorySegment: MemorySegmentStatic = this.getMemorySegmentStatic();
        staticMemorySegment.setSourceFilename(sourceFilename);

        for (let i = 0; i < numberVars; i++) {
            this.stack.push(0);
        }
        this.programCounter++;

        this.callStack.push(functionName);
    }

    executeLabel(label: string) {
        this.programCounter++;
    }

    executeGoTo(label: string) {
        if (!(label in this.programLabels))
            throw new Error(`Could not jump to label ${label}, not recognised`)

        this.programCounter = this.programLabels[label];
    }

    executeIfGoTo(label: string) {
        const d = this.stack.pop();
        if (d !== 0) {
            this.executeGoTo(label);
        } else {
            this.programCounter++;
        }
    }

    executeReturn() {
        const endFrame = this.getMemorySegmentLocal().getAddress();
        const returnAddress = this.memory.get(endFrame - 5);
        const returnValue = this.stack.pop();
        this.getMemorySegmentArgument().set(0, returnValue);
        this.stack.setSP(this.getMemorySegmentArgument().getAddress() + 1);

        this.getMemorySegmentThat().setAddress(this.memory.get(endFrame - 1));
        this.getMemorySegmentThis().setAddress(this.memory.get(endFrame - 2));
        this.getMemorySegmentArgument().setAddress(this.memory.get(endFrame - 3));
        this.getMemorySegmentLocal().setAddress(this.memory.get(endFrame - 4));

        // AWOOGA AWOOGA, we should pop the call stack, this is going to get scary
        this.programCounter = returnAddress;

        // Some tests will not actually make a call
        this.callStack.pop();

        // If we have reached end of call stack, just push program counter off the end
        if (this.callStack.isEmpty()) {
            this.programCounter = this.program.length;
        }
    }

    executeCall(functionName: string, numberArgs: number) {
        this.stack.push(this.programCounter + 1);
        this.stack.push(this.getMemorySegmentLocal().getAddress());
        this.stack.push(this.getMemorySegmentArgument().getAddress());
        this.stack.push(this.getMemorySegmentThis().getAddress());
        this.stack.push(this.getMemorySegmentThat().getAddress());

        this.getMemorySegmentArgument().setAddress(this.stack.getSP() - 5 - numberArgs);
        this.getMemorySegmentLocal().setAddress(this.stack.getSP());

        this.executeGoTo(functionName);
    }

    toString(...windows: IndexWindow[]): string {
        return `Hack Virtual Machine
        PC: ${this.programCounter}
        Stack
        ${this.stack.toString()}
        Segments
        ${Object.entries(this.memorySegments).map(([type, segment]) => `${type}: ${segment.toString()}`).join('\n\t')}
        ${this.memory.toString(...windows)}
        Program:
${this.program.map((vmInstruction, i) =>
            `${i}: ${generateHackVm(vmInstruction)}`).join('\n\t')}
    Program Labels:
        ${Object.entries(this.programLabels)
                .map(([key, value]) => `\t${key}=${value.toString(10)}`)
                .join(",")}
            `
    }
}


export default HackVm;