import { RAMSimulator } from "../../assemblyLanguage";
import AbstractMemorySegment from "./MemorySegment";
import MemoryStack from "./MemoryStack";

export const generateTempRegisterName = (index: number) => `R${index + 5}`;

/**
 * Implements memory segments which are simply arrays located within the CPU memory.
 * POP
 * addr = firstAddress + i, SP--, *addr=*SP
 *
 * PUSH
 * addr = firstAddress + i, *SP = *addr, SP++
 */
class MemorySegmentTemp extends AbstractMemorySegment {
    firstAddress: number;
    lastAddress: number

    constructor(memory: RAMSimulator,
        stack: MemoryStack,
        firstAddress: number,
        length: number) {
        super(memory, stack);

        this.firstAddress = firstAddress;
        this.lastAddress = this.firstAddress + length;

        for (let i = 0; i < length; i++) {
            memory.labels[generateTempRegisterName(i)] = i + this.firstAddress;
        }
    }

    getAddress(index: number) {
        const address = this.firstAddress + index;
        if (address > this.lastAddress) {
            throw new Error(`This segment does not contain enough registers to access ${index}`)
        }
        return address;
    }

    toString() {
        return Array(this.lastAddress - this.firstAddress).fill(null).map((_, i) => this.get(i)).join(', ');
    }
}

export default MemorySegmentTemp;