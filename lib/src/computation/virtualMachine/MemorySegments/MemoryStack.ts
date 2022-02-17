import RAMSimulator from "../../assemblyLanguage/RAMSimulator";
import { ASM_MEM_SEG_SYMBOL_STACK_PTR, MEM_ADDRESS_STACK_PTR } from "../types";

const DEFAULT_STACK_POINTER_VALUE = 256;

class MemoryStack {
    initialStackPointerValue: number;
    memory: RAMSimulator;

    constructor(memory: RAMSimulator,
        stackPointerAddress: number = MEM_ADDRESS_STACK_PTR,
        stackPointerValue: number = DEFAULT_STACK_POINTER_VALUE) {
        this.memory = memory;
        this.memory.setLabel(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointerAddress);

        this.initialStackPointerValue = stackPointerValue;
        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointerValue);
    }

    setSP(index: number) {
        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, index);
    }

    getSP() {
        return this.memory.getLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR);
    }

    push(value: number) {
        const stackPointer = this.getSP();
        this.memory.set(stackPointer, value);
        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointer + 1);
    }

    pop(): number {
        const stackPointer = this.getSP();

        if (stackPointer === this.initialStackPointerValue) {
            throw new Error("Stack Underflow, popping from empty stack");
        }

        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointer - 1);
        return this.memory.get(stackPointer - 1);
    }

    peek(): number {
        const stackPointer = this.getSP();

        if (stackPointer === this.initialStackPointerValue) {
            throw new Error("Stack Underflow, popping from empty stack");
        }

        return this.memory.get(stackPointer - 1);
    }

    toString() {
        return Array(16).fill(null).map((_, i) => this.memory.get(i + this.initialStackPointerValue)).join(', ');
    }
}

export default MemoryStack;