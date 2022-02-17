import { LineReference } from "types";

export enum VMInstructionType {
    arithmetic,
    push,
    pop,
    label,
    goto,
    ifgoto, // if-goto
    function,
    return,
    call
}

export interface AbstractVMInstruction {
    ref: LineReference; // This will allow us to cross reference with other layers of abstraction
    type: VMInstructionType;
}

export const SYSTEM_INIT_FUNCTION_NAME = 'Sys.init';
export const VM_FILE_EXTENSION = '.vm';

export const ASM_MEM_SEG_SYMBOL_STACK_PTR = 'SP';
export const ASM_MEM_SEG_SYMBOL_LOCAL = 'LCL';
export const ASM_MEM_SEG_SYMBOL_LOCAL_EXP = 'LOCAL';
export const ASM_MEM_SEG_SYMBOL_ARGUMENTS = 'ARG';
export const ASM_MEM_SEG_SYMBOL_ARGUMENTS_EXP = 'ARGUMENT';
export const ASM_MEM_SEG_SYMBOL_THIS = 'THIS';
export const ASM_MEM_SEG_SYMBOL_THAT = 'THAT';
export const ASM_MEM_SEG_SYMBOL_TEMP = 'Temp';

export const MEM_ADDRESS_STACK_PTR = 0;
export const MEM_SEG_ADDRESS_ARGUMENTS = 2;
export const MEM_SEG_ADDRESS_LOCAL = 1;
export const MEM_SEG_ADDRESS_THIS = 3;
export const MEM_SEG_ADDRESS_THAT = 4;
export const MEM_SEG_TEMP_START = 5;
export const MEM_SEG_TEMP_LENGTH = 8;

export enum VMArithmeticOperation {
    add = 'add',
    sub = 'sub',
    neg = 'neg',
    eq = 'eq',
    gt = 'gt',
    lt = 'lt',
    and = 'and',
    or = 'or',
    not = 'not'
}

export interface VMInstructionArithmetic extends AbstractVMInstruction {
    type: VMInstructionType.arithmetic;
    operation: VMArithmeticOperation
}

export enum VMSegment {
    local = 'local',
    argument = 'argument',
    this = 'this',
    that = 'that',
    constant = 'constant',
    static = 'static',
    pointer = 'pointer',
    temp = 'temp'
}

export interface VMInstructionStack extends AbstractVMInstruction {
    type: VMInstructionType.pop | VMInstructionType.push;
    segment: VMSegment;
    index: number;
}

export interface VMInstructionGoto extends AbstractVMInstruction {
    type: VMInstructionType.goto | VMInstructionType.ifgoto;
    label: string;
}
export interface VMInstructionLabel extends AbstractVMInstruction {
    type: VMInstructionType.label;
    label: string;
}
export interface VMInstructionFunction extends AbstractVMInstruction {
    type: VMInstructionType.function;
    functionName: string;
    numberVars: number;
}
export interface VMInstructionReturn extends AbstractVMInstruction {
    type: VMInstructionType.return;
}
export interface VMInstructionCall extends AbstractVMInstruction {
    type: VMInstructionType.call;
    functionName: string;
    numberArgs: number;
}

export type VMInstruction = VMInstructionArithmetic
    | VMInstructionStack
    | VMInstructionGoto
    | VMInstructionLabel
    | VMInstructionFunction
    | VMInstructionReturn
    | VMInstructionCall;

export interface VMSourceFile {
    filename: string;
    contents: string[];
}