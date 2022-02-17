import { RAMSimulator } from "../../assemblyLanguage";
import MemorySegment from "./MemorySegment";
import MemoryStack from "./MemoryStack";

export const getStaticAsmVariable = (sourceFilename: string, index: number) => `${sourceFilename}.${index}`;

/**
 * The static segment is implemented using variables in global space.
 * RAM 16 to RAM 255
 * Foo.vm contains pop static 5
 *
 * // D=stack pop
 * @Foo.5
 * M=D
 *
 * Create one of these memory segments for each file being parsed...I think
 */
class MemorySegmentStatic extends MemorySegment {
    sourceFilename: string;
    createdVariables: string[];

    constructor(memory: RAMSimulator, stack: MemoryStack) {
        super(memory, stack);
        this.reset();
    }

    reset() {
        this.createdVariables = [];
    }

    setSourceFilename(sourceFilename: string) {
        this.sourceFilename = sourceFilename;
    }

    getAddress(index: number): number {
        const variableName = this.getVariableName(index);
        return this.memory.getOrCreateLabel(variableName);
    }

    getVariableName(index: number) {
        return getStaticAsmVariable(this.sourceFilename, index);
    }

    toString() {
        return '\t' + this.createdVariables.map(c => `${c}: ${this.memory.getLabelled(c)}`).join('\n\t')
    }
}

export default MemorySegmentStatic;