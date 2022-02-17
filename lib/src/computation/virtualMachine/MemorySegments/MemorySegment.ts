import RAMSimulator from "../../assemblyLanguage/RAMSimulator";
import MemoryStack from "./MemoryStack";

abstract class MemorySegment {
    stack: MemoryStack;
    memory: RAMSimulator;

    constructor(memory: RAMSimulator, stack: MemoryStack) {
        this.memory = memory;
        this.stack = stack;
    }

    push(index: number): void {
        const value = this.get(index);
        this.stack.push(value);
    }
    pop(index: number): void {
        const value = this.stack.pop();
        this.set(index, value);
    }

    abstract getAddress(index: number): number;

    set(index: number, value: number): void {
        this.memory.set(this.getAddress(index), value);
    }
    get(index: number): number {
        return this.memory.get(this.getAddress(index));
    }

    abstract toString(): string;
}

export default MemorySegment;