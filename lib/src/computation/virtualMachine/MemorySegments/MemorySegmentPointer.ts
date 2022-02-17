import { RAMSimulator } from "../../assemblyLanguage";
import MemorySegment from "./MemorySegment";
import MemorySegmentArray from "./MemorySegmentArray";
import MemoryStack from "./MemoryStack";

/**
 * 0 = this
 * 1 = that
 *
 * push pointer 0/1
 *
 * *SP = THIS/THAT; SP++
 *
 * pop pointer 0/1
 * SP--; THIS/THAT = *SP
 */
class MemorySegmentPointer extends MemorySegment {
    thisSegment: MemorySegmentArray;
    thatSegment: MemorySegmentArray;

    constructor(memory: RAMSimulator,
        stack: MemoryStack,
        thisSegment: MemorySegmentArray,
        thatSegment: MemorySegmentArray) {
        super(memory, stack);
        this.thisSegment = thisSegment;
        this.thatSegment = thatSegment;
    }

    getAddress(index: number): number {
        let segment: MemorySegmentArray;
        switch (index) {
            case 0: segment = this.thisSegment; break;
            case 1: segment = this.thatSegment; break;
            default: throw new Error(`Invalid index for pointer segment, only allow 0/1, received ${index}`)
        }
        return segment.baseAddressLocation;
    }

    toString() {
        return [0, 1].map(i => this.get(i)).join(',')
    }
}

export default MemorySegmentPointer;