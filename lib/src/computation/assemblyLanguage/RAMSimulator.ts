import { IndexWindow } from "../../common";
import { Registers } from "./types";
import { generateTempRegisterName } from "../virtualMachine/MemorySegments/MemorySegmentTemp";
import {
    ASM_MEM_SEG_SYMBOL_ARGUMENTS,
    ASM_MEM_SEG_SYMBOL_ARGUMENTS_EXP,
    ASM_MEM_SEG_SYMBOL_LOCAL,
    ASM_MEM_SEG_SYMBOL_LOCAL_EXP,
    ASM_MEM_SEG_SYMBOL_STACK_PTR,
    ASM_MEM_SEG_SYMBOL_THAT,
    ASM_MEM_SEG_SYMBOL_THIS,
    MEM_ADDRESS_STACK_PTR,
    MEM_SEG_ADDRESS_ARGUMENTS,
    MEM_SEG_ADDRESS_LOCAL,
    MEM_SEG_ADDRESS_THAT,
    MEM_SEG_ADDRESS_THIS,
    MEM_SEG_TEMP_LENGTH,
    MEM_SEG_TEMP_START
} from "../virtualMachine/types";


const DEFAULT_VALUE = 0;
const MEMORY_SIZE = Math.pow(2, 15);

export const VARIABLE_START = 0x10;
export const SCREEN = 0x4000;
export const KBD = 0x6000;

export interface IMemory {
    set(index: number, ...value: number[]): void;
    get(index: number): number;
    setLabelled(name: string, value: number): void;
    getLabelled(label: string): number;
    toString(...windows: IndexWindow[]): string;
}

class RAMSimulator implements IMemory {
    size: number;
    contents: number[];
    labels: Registers;
    nextNamedRegisterAddress: number;

    constructor(size: number = MEMORY_SIZE) {
        this.size = size;
        this.labels = {};
        this.reset();
    }

    setLabel(name: string, value: number) {
        this.labels[name.toUpperCase()] = value;
    }

    reset() {
        this.contents = [];

        this.labels = {
            ...Array(16)
                .fill(null)
                .map((_, i) => `R${i}`)
                .reduce((acc, curr, i) => ({ ...acc, [curr]: i }), {}),
            SCREEN,
            KBD,
        };

        this.nextNamedRegisterAddress = VARIABLE_START;

        // These are the named registers required by the Virtual Machine
        this.labels[ASM_MEM_SEG_SYMBOL_STACK_PTR] = MEM_ADDRESS_STACK_PTR;
        this.labels[ASM_MEM_SEG_SYMBOL_LOCAL] = MEM_SEG_ADDRESS_LOCAL;
        this.labels[ASM_MEM_SEG_SYMBOL_LOCAL_EXP] = MEM_SEG_ADDRESS_LOCAL;
        this.labels[ASM_MEM_SEG_SYMBOL_ARGUMENTS] = MEM_SEG_ADDRESS_ARGUMENTS;
        this.labels[ASM_MEM_SEG_SYMBOL_ARGUMENTS_EXP] = MEM_SEG_ADDRESS_ARGUMENTS;
        this.labels[ASM_MEM_SEG_SYMBOL_THIS] = MEM_SEG_ADDRESS_THIS;
        this.labels[ASM_MEM_SEG_SYMBOL_THAT] = MEM_SEG_ADDRESS_THAT;
        for (let i = 0; i < MEM_SEG_TEMP_LENGTH; i++) {
            this.setLabel(generateTempRegisterName(i), i + MEM_SEG_TEMP_START);
        }
    }

    checkIndex(index: number) {
        if (index < 0 || index >= this.size) throw new Error(`Invalid memory address ${index}`)
    }

    setLabelled(label: string, ...values: number[]) {
        const index = this.getOrCreateLabel(label);
        this.set(index, ...values);
    }

    set(index: number, ...values: number[]) {
        this.checkIndex(index);

        values.forEach((value, i) => (this.contents[index + i] = value));
    }

    getLabelled(label: string): number {
        const index = this.getOrCreateLabel(label);
        return this.get(index);
    }

    get(index: number): number {
        this.checkIndex(index);

        return this.contents[index] || DEFAULT_VALUE
    }

    getOrCreateLabel(rawLabel: string) {
        const label = rawLabel.toUpperCase();

        if (!(label in this.labels)) {
            // Create new variable from 16 onwards
            this.labels[label] = this.nextNamedRegisterAddress;
            this.nextNamedRegisterAddress++;
        }

        return this.labels[label];
    }

    toString(...windows: IndexWindow[]) {
        return `RAM:
    ${windows.map(w => `${w.start}-${w.end}: ` + Array(w.end - w.start + 1).fill(null).map((_, i) => this.get(i + w.start)).join(', ')).join('\n\t')}
        \nNamed Registers:
${Object.entries(this.labels)
                .map(([key, value]) => `\t${key}=${value.toString(10)}`)
                .join(",")}`;
    }
}

export default RAMSimulator;