import { RAMSimulator } from "../../assemblyLanguage";
import AbstractMemorySegment from "./MemorySegment";
import MemoryStack from "./MemoryStack";


/**
 * Implements memory segments which are simply arrays located within the CPU memory.
 *
 * POP
 * addr = segmentPtr + i, SP--, *addr=*SP
 *
 * PUSH
 * addr = segmentPtr + i, *SP = *addr, SP++
 */
class MemorySegmentArray extends AbstractMemorySegment {
    baseAddressLocation: number;
    symbol: string;

    constructor(memory: RAMSimulator,
        stack: MemoryStack,
        symbol: string,
        baseAddressLocation: number,
        baseAddress: number) {
        super(memory, stack);

        this.symbol = symbol;
        this.baseAddressLocation = baseAddressLocation;
        this.memory.setLabel(this.symbol, this.baseAddressLocation);
        this.memory.setLabelled(this.symbol, baseAddress);
    }

    getAddress(index: number = 0): number {
        const ptrLocation = this.memory.getLabelled(this.symbol);
        const address = ptrLocation + index;
        return address;
    }

    setAddress(index: number) {
        this.memory.setLabelled(this.symbol, index);
    }

    toString(): string {
        return Array(16).fill(null).map((_, i) => this.get(i)).join(', ');
    }
}

export default MemorySegmentArray;