import RAMSimulator, { VARIABLE_START } from "../../assemblyLanguage/RAMSimulator";
import MemoryArraySegment from "./MemorySegmentArray";
import MemorySegmentConstant from "./MemorySegmentConstant";
import MemorySegmentStatic from "./MemorySegmentStatic";
import MemorySegmentTemp from "./MemorySegmentTemp";
import MemoryStack from "./MemoryStack";
import MemorySegmentPointer from "./MemorySegmentPointer";
import { ASM_MEM_SEG_SYMBOL_STACK_PTR, ASM_MEM_SEG_SYMBOL_THAT, ASM_MEM_SEG_SYMBOL_THIS } from "../types";

const createTestRam = () => {

    const stackPointerAddress: number = 2;
    const stackPointerLocation: number = 256;
    const memory: RAMSimulator = new RAMSimulator();
    const stack: MemoryStack = new MemoryStack(memory, stackPointerAddress, stackPointerLocation);

    return {
        stackPointerAddress,
        stackPointerLocation,
        memory,
        stack
    }
}

describe("Hack VM Memory Segment", () => {
    test('Array', () => {
        const { stack, memory } = createTestRam();

        const segmentAddressLocation: number = 3;
        const segmentAddress: number = 1024;
        const segment = new MemoryArraySegment(memory, stack, 'TEST', segmentAddressLocation, segmentAddress);

        stack.push(11);
        stack.push(13);
        stack.push(18);
        stack.push(27);

        segment.pop(2);
        segment.pop(3);
        segment.pop(4);
        segment.pop(5);

        const m1 = memory.get(segmentAddressLocation);
        expect(m1).toBe(1024);
        const s2 = memory.get(segmentAddress + 2);
        expect(s2).toBe(27);
        const s3 = memory.get(segmentAddress + 3);
        expect(s3).toBe(18);
        const s4 = memory.get(segmentAddress + 4);
        expect(s4).toBe(13);
        const s5 = memory.get(segmentAddress + 5);
        expect(s5).toBe(11);

    });

    test('Constant', () => {
        const { memory, stack, stackPointerLocation } = createTestRam();
        const segment = new MemorySegmentConstant(memory, stack);

        segment.push(56);
        segment.push(34);
        segment.push(91);

        expect(memory.getLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR)).toBe(stackPointerLocation + 3);
        expect(memory.get(stackPointerLocation)).toBe(56);
        expect(memory.get(stackPointerLocation + 1)).toBe(34);
        expect(memory.get(stackPointerLocation + 2)).toBe(91);
    });

    test('Static', () => {
        const { memory, stack } = createTestRam();
        const segment = new MemorySegmentStatic(memory, stack);

        segment.setSourceFilename('foo');

        stack.push(11);
        stack.push(13);
        stack.push(18);
        stack.push(27);

        segment.pop(2);
        segment.pop(3);
        segment.pop(4);
        segment.pop(5);

        expect(memory.labels).toHaveProperty(['FOO.2'], 16);
        expect(memory.labels).toHaveProperty(['FOO.3'], 17);
        expect(memory.labels).toHaveProperty(['FOO.4'], 18);
        expect(memory.labels).toHaveProperty(['FOO.5'], 19);

        expect(memory.get(VARIABLE_START)).toBe(27);
        expect(memory.get(VARIABLE_START + 1)).toBe(18);
        expect(memory.get(VARIABLE_START + 2)).toBe(13);
        expect(memory.get(VARIABLE_START + 3)).toBe(11);
    });

    test('Temp', () => {
        const { memory, stack } = createTestRam();
        const firstAddress = 5;
        const length = 8;

        const segment = new MemorySegmentTemp(memory, stack, firstAddress, length);

        stack.push(46);
        stack.push(11);
        stack.push(13);
        stack.push(18);
        stack.push(27);

        segment.pop(2);
        segment.pop(3);
        segment.pop(4);
        segment.pop(5);
        segment.pop(7);

        const s2 = memory.get(firstAddress + 2);
        expect(s2).toBe(27);
        const s3 = memory.get(firstAddress + 3);
        expect(s3).toBe(18);
        const s4 = memory.get(firstAddress + 4);
        expect(s4).toBe(13);
        const s5 = memory.get(firstAddress + 5);
        expect(s5).toBe(11);
        const s7 = memory.get(firstAddress + 7);
        expect(s7).toBe(46);

        expect(() => {
            segment.pop(firstAddress + 8);
        }).toThrowError();

        expect(() => {
            segment.push(firstAddress + 9);
        }).toThrowError();
    })

    test('Pointer', () => {
        const { memory, stack } = createTestRam();

        const thisSegmentLocation: number = 3;
        const thisSegmentInitialAddress: number = 1024;
        const thisSegment = new MemoryArraySegment(memory,
            stack,
            ASM_MEM_SEG_SYMBOL_THIS,
            thisSegmentLocation,
            thisSegmentInitialAddress);

        const thatSegmentLocation: number = 4;
        const thatSegmentInitialAddress: number = 2048;
        const thatSegment = new MemoryArraySegment(memory,
            stack,
            ASM_MEM_SEG_SYMBOL_THAT,
            thatSegmentLocation,
            thatSegmentInitialAddress);

        const pointerSegment = new MemorySegmentPointer(memory, stack, thisSegment, thatSegment);

        pointerSegment.push(0);
        pointerSegment.push(1);

        expect(stack.pop()).toBe(2048);
        expect(stack.pop()).toBe(1024);

        stack.push(4096);
        stack.push(8192);

        pointerSegment.pop(0);
        pointerSegment.pop(1);
        expect(thisSegment.getAddress(0)).toBe(8192);
        expect(thatSegment.getAddress(0)).toBe(4096);

        expect(() => {
            pointerSegment.push(2)
        }).toThrowError();

        expect(() => {
            pointerSegment.pop(2)
        }).toThrowError();
    })
});