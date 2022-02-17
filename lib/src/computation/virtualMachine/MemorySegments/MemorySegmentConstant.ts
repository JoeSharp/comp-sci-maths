import MemorySegment from "./MemorySegment";

/**
 * Allows us to push constant values onto the stack.
 *
 * push
 * *SP = i, SP++
 */
class MemorySegmentConstant extends MemorySegment {
    getAddress(index: number): number {
        throw new Error("Method not implemented.");
    }
    set(index: number, value: number): void {
        throw new Error("Method not implemented.");
    }
    get(index: number): number {
        return index;
    }
    toString() {
        return 'Constant';
    }
}

export default MemorySegmentConstant;