/**
 * Takes a Virtual Machine program and compiles the assembly instructions
 */
import { generateTempRegisterName } from "./MemorySegments/MemorySegmentTemp";
import { getStaticAsmVariable } from './MemorySegments/MemorySegmentStatic'
import {
    ASM_MEM_SEG_SYMBOL_ARGUMENTS,
    ASM_MEM_SEG_SYMBOL_LOCAL,
    ASM_MEM_SEG_SYMBOL_STACK_PTR,
    ASM_MEM_SEG_SYMBOL_THAT,
    ASM_MEM_SEG_SYMBOL_THIS,
    MEM_SEG_ADDRESS_ARGUMENTS,
    MEM_SEG_ADDRESS_LOCAL,
    MEM_SEG_ADDRESS_THAT,
    MEM_SEG_ADDRESS_THIS,
    VMArithmeticOperation,
    VMInstruction,
    VMInstructionType,
    VMSegment
} from "./types";
import { ComputeJump } from "../assemblyLanguage/types";

export type Pointer = number | string;

let baseId = 1;
const generateRetAddrLabel = (prefix: string) => `${prefix}_${baseId++}`;

const TEMP_ZERO = generateTempRegisterName(0);
const TEMP_ONE = generateTempRegisterName(1);

/**
 * D = *address
 *
 * @param address The address containing the pointer
 * @returns Hack Assembly Commands
 */
export const readPointerToD = (address: Pointer) => [
    `// - read pointer ${address} to D-register`,
    `@${address}`,
    'A=M',
    'D=M'
];

/**
 * *address = D
 *
 * @param address The address of the pointer to write to
 * @returns Hack Assembly Commands
 */
export const writeDToPointer = (address: Pointer) => [
    `// - write D-register to pointer ${address}`,
    `@${address}`,
    'A=M',
    'M=D'
]

/**
 * address++
 *
 * @param address The address to decrement
 * @returns Hack Assembly Commands
 */
export const incrementPointer = (address: Pointer) => [
    `// - increment pointer ${address}`,
    `@${address}`,
    'M=M+1'
];

/**
 * address--
 *
 * @param address The address to decrement
 * @returns Hack Assembly Commands
 */
export const decrementPointer = (address: Pointer) => [
    `// - decrement pointer ${address}`,
    `@${address}`,
    'M=M-1',
]

/**
 * *address = value
 *
 * @param address Address of the pointer
 * @param value Constant value to set
 * @param consumer Recipient for CPU instructions
 * @returns Hack Assembly Commands
 */
export const writeConstantToPointer = (address: Pointer, value: number) => [
    `// - write constant ${value} to pointer ${address}`,
    `@${value}`,
    'D=A',
    `@${address}`,
    'M=D'
]

/**
 * addr=LCL+i, SP--, *addr=*SP
 *
 * @param registerName The name of the register
 * @param registerLocation The location that register is expected to live ine
 * @param index The index of the segment to pop into
 * @returns Hack Assembly Commands
 */
export const popAddressedArrayAsm = (registerName: string,
    registerLocation: number,
    index: number) => [
        // Fetch address of segment
        `@${registerName}`,
        'D=M',

        // Add the index
        `@${index}`,
        'D=D+A',

        // Save address to Temp0
        `@${TEMP_ZERO}`,
        'M=D',

        // SP--
        ...decrementPointer(ASM_MEM_SEG_SYMBOL_STACK_PTR),
        ...readPointerToD(ASM_MEM_SEG_SYMBOL_STACK_PTR),

        // Retrieve the address from temp
        ...writeDToPointer(TEMP_ZERO)
    ]

/**
 * addr = LCL+ i, *SP = *addr, SP++
 *
 * @param registerName The name of the register
 * @param registerLocation The location that register is expected to live ine
 * @param index The index of the segment to pop into
 * @returns Hack Assembly Commands
 */
export const pushAddressedArrayAsm = (registerName: string,
    registerAddress: number,
    index: number) => [
        // Fetch address of segment
        `@${registerName}`,
        'D=M',

        // Add the index
        `@${index}`,
        'A=D+A',

        // Read from that location into the D register
        'D=M',

        // *SP = D; SP++
        ...pushFromD()
    ]

/**
 * push constant i
 * @param value The value to push
 * @returns Hack Asm commands
 */
export const pushConstant = (value: number) => [
    `@${value}`,
    'D=A',
    ...pushFromD()
]

/**
 *
 * @param sourceFilename The filename being processed
 * @param index The index of the static variable
 * @returns Hack ASM commands
 */
export const pushStatic = (sourceFilename: string,
    index: number) => [
        `@${getStaticAsmVariable(sourceFilename, index)}`,
        'D=M',
        ...pushFromD(),
    ]

export const popStatic = (sourceFilename: string,
    index: number) => [
        ...popToD(),
        `@${getStaticAsmVariable(sourceFilename, index)}`,
        'M=D'
    ]

export const getPointerRegisterName = (index: number): string => {
    let registerName: string;
    switch (index) {
        case 0: registerName = ASM_MEM_SEG_SYMBOL_THIS; break;
        case 1: registerName = ASM_MEM_SEG_SYMBOL_THAT; break;
        default: throw new Error(`Invalid pointer index ${index}`)
    }
    return registerName;
}

/**
 * push pointer 0/1
 *
 * @param index The index 0/1
 * @returns Hack ASM Commands
 */
export const pushPointer = (index: number) => [
    `@${getPointerRegisterName(index)}`,
    'D=M',
    ...pushFromD()
]

/**
 * pop pointer 0/1
 *
 * @param index The index 0/1
 * @returns Hack ASM Commands
 */
export const popPointer = (index: number) => [
    ...popToD(),
    `@${getPointerRegisterName(index)}`,
    'M=D'
]

/**
 * push temp i
 *
 * @param index The index of the temp register
 * @returns Hack ASM Commands
 */
export const pushTemp = (index: number) => [
    // Locate the temp register
    `@${generateTempRegisterName(index)}`,

    // Read the value into D register
    'D=M',

    ...pushFromD()
]

/**
 * pop temp i
 *
 * @param index The index of the temp register
 * @returns Hack ASM Commands
 */
export const popTemp = (index: number) => [
    // Pop the value
    ...popToD(),

    // Locate the temp register
    `@${generateTempRegisterName(index)}`,

    // Write the value from D register
    'M=D'
]

/**
 * Executes pseudocode of D = *(SP - 1); SP--
 *
 * @returns Hack Assembly Instructions
 */
export const popToM = () => [
    '// - pop to M',
    // SP--
    ...decrementPointer(ASM_MEM_SEG_SYMBOL_STACK_PTR),
    // A = *SP
    'A=M'
];

/**
 * Executes pseudocode of RAM[A] = *(SP - 1); SP--
 *
 * @returns Hack Assembly Instructions
 */
export const popToD = () => [
    '// - pop to D',
    // SP--
    ...decrementPointer(ASM_MEM_SEG_SYMBOL_STACK_PTR),
    // D = *SP
    ...readPointerToD(ASM_MEM_SEG_SYMBOL_STACK_PTR)
]

export const pushFromD = () => [
    '// - push from D',
    // *SP = D
    ...writeDToPointer(ASM_MEM_SEG_SYMBOL_STACK_PTR),
    // SP++
    ...incrementPointer(ASM_MEM_SEG_SYMBOL_STACK_PTR)
];

export const pushNamedAddress = (addressName: string) => [
    `@${addressName}`,
    `D=A`,
    ...pushFromD(),
]

export const compileUnaryArithmeticAsm = (...operateOnD: string[]) => [
    '// - Unary Arithmetic Operation',
    ...popToD(),
    '// -- the operation itself',
    ...operateOnD,
    ...pushFromD()
]


export const compileBinaryArithmeticAsm = (...operateDandMtoD: string[]) => [
    '// - Binary Arithmetic Operation',
    ...popToD(),        // Pop the stack to the D register
    ...popToM(),        // Pop the next stack item to currently observed memory location
    '// -- the operation itself',
    ...operateDandMtoD,    // Use our current operation
    ...pushFromD()      // Write the result back
]

export const compileComparisonAsm = (comparisonOperator: ComputeJump): string[] => {
    const isTrue = generateRetAddrLabel('IsTrue');
    const done = generateRetAddrLabel('IsDone');

    return compileBinaryArithmeticAsm(
        '// - comparison operation',
        `D=M-D`,
        `@${isTrue}`,
        '// -- the comparison operation itself',
        `D;${comparisonOperator}`,
        `D=0`,
        ...compileGoTo(done),
        `(${isTrue})`,
        `D=-1`,
        `(${done})`,
    );
}
export const compileArithmeticAsm = (operation: VMArithmeticOperation): string[] => {
    switch (operation) {
        case VMArithmeticOperation.add:
            return compileBinaryArithmeticAsm('D=D+M');
        case VMArithmeticOperation.sub:
            return compileBinaryArithmeticAsm('D=M-D');
        case VMArithmeticOperation.neg:
            return compileUnaryArithmeticAsm('D=-D');
        case VMArithmeticOperation.eq:
            return compileComparisonAsm(ComputeJump.JEQ);
        case VMArithmeticOperation.gt:
            return compileComparisonAsm(ComputeJump.JGT);
        case VMArithmeticOperation.lt:
            return compileComparisonAsm(ComputeJump.JLT);
        case VMArithmeticOperation.and:
            return compileBinaryArithmeticAsm('D=D&M');
        case VMArithmeticOperation.or:
            return compileBinaryArithmeticAsm('D=D|M');
        case VMArithmeticOperation.not:
            return compileUnaryArithmeticAsm('D=!D');
    }
}

export const popLocal = (index: number) => popAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_LOCAL,
    MEM_SEG_ADDRESS_LOCAL,
    index);
export const popArgument = (index: number) => popAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_ARGUMENTS,
    MEM_SEG_ADDRESS_ARGUMENTS,
    index);
export const popThis = (index: number) => popAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_THIS,
    MEM_SEG_ADDRESS_THIS,
    index);
export const popThat = (index: number) => popAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_THAT,
    MEM_SEG_ADDRESS_THAT,
    index);

export const popAsm = (sourceFilename: string,
    segment: VMSegment,
    index: number) => {
    switch (segment) {
        case VMSegment.local:
            return popLocal(index);
        case VMSegment.argument:
            return popArgument(index);
        case VMSegment.this:
            return popThis(index);
        case VMSegment.that:
            return popThat(index);
        case VMSegment.constant:
            // Not a thing....
            throw new Error('Cannot pop to constant memory segment');
        case VMSegment.static:
            return popStatic(sourceFilename, index);
        case VMSegment.pointer:
            return popPointer(index);
        case VMSegment.temp:
            return popTemp(index);

    }
}

export const pushLocal = (index: number) => pushAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_LOCAL,
    MEM_SEG_ADDRESS_LOCAL,
    index);
export const pushArgument = (index: number) => pushAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_ARGUMENTS,
    MEM_SEG_ADDRESS_ARGUMENTS,
    index);
export const pushThis = (index: number) => pushAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_THIS,
    MEM_SEG_ADDRESS_THIS,
    index);
export const pushThat = (index: number) => pushAddressedArrayAsm(ASM_MEM_SEG_SYMBOL_THAT,
    MEM_SEG_ADDRESS_THAT,
    index);

export const pushAsm = (sourceFilename: string, segment: VMSegment, index: number) => {
    switch (segment) {
        case VMSegment.local:
            return pushLocal(index);
        case VMSegment.argument:
            return pushArgument(index);
        case VMSegment.this:
            return pushThis(index);
        case VMSegment.that:
            return pushThat(index);
        case VMSegment.constant:
            return pushConstant(index);
        case VMSegment.static:
            return pushStatic(sourceFilename, index);
        case VMSegment.pointer:
            return pushPointer(index);
        case VMSegment.temp:
            return pushTemp(index);
    }
}

export const compileLabel = (label: string): string[] => [
    `(${label})`
]

export const compileGoTo = (label: string): string[] => [
    `@${label}`,
    `0;JMP`
]

export const compileIfGoTo = (label: string): string[] => [
    ...popToD(),
    `@${label}`,
    `D;JNE`
]

export const generateFunctionLabel = (sourceFilename: string, functionName: string) => `${sourceFilename}.${functionName}`

export const compileFunction = (sourceFilename: string,
    functionName: string,
    numberVars: number): string[] => {
    const functionLabel = generateFunctionLabel(sourceFilename, functionName);
    const commands: string[] = [
        ...compileLabel(functionLabel),
    ];

    for (let i = 0; i < numberVars; i++) {
        commands.push('D=0');
        pushFromD().forEach(c => commands.push(c))
    }

    return commands;
}

export const compileCall = (sourceFilename: string,
    functionName: string,
    numberArgs: number): string[] => {
    const functionLabel = generateFunctionLabel(sourceFilename, functionName);
    const retAddrLabel = generateRetAddrLabel(`${sourceFilename}.${functionName}.retAddr`);
    return [
        `// -- jump to function ${sourceFilename}, ${functionName}`,
        ...pushNamedAddress(retAddrLabel),
        ...pushNamedAddress(ASM_MEM_SEG_SYMBOL_LOCAL),
        ...pushNamedAddress(ASM_MEM_SEG_SYMBOL_ARGUMENTS),
        ...pushNamedAddress(ASM_MEM_SEG_SYMBOL_THIS),
        ...pushNamedAddress(ASM_MEM_SEG_SYMBOL_THAT),

        `// --- reposition ARG to SP - 5 - nArgs ${numberArgs}`,
        ...readPointerToD(ASM_MEM_SEG_SYMBOL_STACK_PTR),
        `@5`,
        'D=D-A',
        `@${numberArgs}`,
        'D=D-A',
        `@${ASM_MEM_SEG_SYMBOL_ARGUMENTS}`,
        `M=D`,

        `// --- set LCL to SP`,
        ...readPointerToD(ASM_MEM_SEG_SYMBOL_STACK_PTR),
        `@${ASM_MEM_SEG_SYMBOL_LOCAL}`,
        'M=D',

        '// --- Jump to the function',
        ...compileGoTo(functionLabel),

        '// --- Make a place for the return to come back to',
        ...compileLabel(retAddrLabel)
    ];
}

export const compileReturn = (): string[] => {
    return [
        '// --- Temp 0 = endFrame = LCL',
        `@${ASM_MEM_SEG_SYMBOL_LOCAL}`,
        `D=M`,
        `@${TEMP_ZERO}`,
        'M=D',

        '// --- Temp 1 = returnAddress = LCL - 5',
        '@5',
        'A=D-A',
        'D=M',
        `@${TEMP_ONE}`,
        'M=D',

        '// --- ARG = pop()',
        ...popToD(),
        `@${ASM_MEM_SEG_SYMBOL_ARGUMENTS}`,
        'A=M',
        `M=D`,

        '// --- SP = ARG + 1',
        `@${ASM_MEM_SEG_SYMBOL_ARGUMENTS}`,
        'D=M',
        `@${ASM_MEM_SEG_SYMBOL_STACK_PTR}`,
        'M=D+1',

        '// Locate endFrame = temp0',

        '// --- THAT  *(endFrame - 1)',
        `@${TEMP_ZERO}`,
        'M=M-1',
        'A=M',
        'D=M',
        `@${ASM_MEM_SEG_SYMBOL_THAT}`,
        'M=D',

        '// --- THIS  *(endFrame - 2)',
        `@${TEMP_ZERO}`,
        'M=M-1',
        'A=M',
        'D=M',
        `@${ASM_MEM_SEG_SYMBOL_THIS}`,
        'M=D',

        '// --- ARG  *(endFrame - 3)',
        `@${TEMP_ZERO}`,
        'M=M-1',
        'A=M',
        'D=M',
        `@${ASM_MEM_SEG_SYMBOL_ARGUMENTS}`,
        'M=D',

        '// --- LOCAL  *(endFrame - 4)',
        `@${TEMP_ZERO}`,
        'M=M-1',
        'A=M',
        'D=M',
        `@${ASM_MEM_SEG_SYMBOL_LOCAL}`,
        'M=D',

        `// --- Retrieve return address and jump`,
        `@${TEMP_ONE}`,
        'A=M',
        '0;JMP'
    ]
}

export const compileAsm = (input: VMInstruction): string[] => {
    switch (input.type) {
        case VMInstructionType.arithmetic:
            return compileArithmeticAsm(input.operation);
        case VMInstructionType.pop:
            return popAsm(input.ref.sourceFilename, input.segment, input.index);
        case VMInstructionType.push:
            return pushAsm(input.ref.sourceFilename, input.segment, input.index);
        case VMInstructionType.label:
            return compileLabel(input.label);
        case VMInstructionType.goto:
            return compileGoTo(input.label);
        case VMInstructionType.ifgoto:
            return compileIfGoTo(input.label);
        case VMInstructionType.function:
            return compileFunction(input.ref.sourceFilename, input.functionName, input.numberVars);
        case VMInstructionType.call:
            return compileCall(input.ref.sourceFilename, input.functionName, input.numberArgs);
        case VMInstructionType.return:
            return compileReturn();
    }
}

export const END_LOOP_NAME = 'END_INFINITE_LOOP';

export const compileInfiniteLoop = (): string[] => [
    `(${END_LOOP_NAME})`,
    `@${END_LOOP_NAME}`,
    `A;JMP`
]

export default compileAsm;