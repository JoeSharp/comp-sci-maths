import { HackCpu } from "../assemblyLanguage"
import compileVmStatement, {
    decrementPointer,
    incrementPointer,
    readPointerToD,
    writeConstantToPointer
} from "./compileVmStatement"
import HackVm from "./HackVm"
import { getStaticAsmVariable } from "./MemorySegments/MemorySegmentStatic"
import { parseVmInstruction } from "./parseVmInstruction"
import {
    MEM_SEG_ADDRESS_ARGUMENTS,
    MEM_SEG_ADDRESS_LOCAL,
    MEM_SEG_ADDRESS_THAT,
    MEM_SEG_ADDRESS_THIS,
    MEM_SEG_TEMP_START
} from "./types"

const TEST_FILENAME = 'MyTest';

const runCpuProgram = (cpu: HackCpu, ...cpuProgram: string[]) => {
    cpu.loadProgram(cpuProgram);
    while (cpu.tick()) {
        // Keep going
        // console.log(`PC: ${cpu.programCounter}`);
    }
}

const runVmProgram = (vm: HackVm, ...vmProgram: string[]) => {
    vm.loadProgram({
        filename: TEST_FILENAME,
        contents: vmProgram
    });

    while (vm.step()) {
        // Keep going
        // console.log(`PC: ${vm.programCounter}`);
    }
}

describe('VM PseudoCode', () => {
    test('D = *p', () => {
        const cpu: HackCpu = new HackCpu();

        cpu.memory.set(0, 256);
        cpu.memory.set(256, 23);

        runCpuProgram(cpu, ...readPointerToD(0));

        expect(cpu.dataRegister).toBe(23);
    });

    test('p++', () => {
        const cpu: HackCpu = new HackCpu();

        cpu.memory.set(0, 257);

        runCpuProgram(cpu, ...incrementPointer(0));

        expect(cpu.memory.get(0)).toBe(258);
    })

    test('p--', () => {
        const cpu: HackCpu = new HackCpu();

        cpu.memory.set(0, 257);

        runCpuProgram(cpu, ...decrementPointer(0));

        expect(cpu.memory.get(0)).toBe(256);
    })

    test('*p = constant', () => {
        const cpu: HackCpu = new HackCpu();

        runCpuProgram(cpu,
            ...writeConstantToPointer(1024, 9),
            ...writeConstantToPointer(245, 31),
            ...writeConstantToPointer(39, 97)
        );

        expect(cpu.memory.get(1024)).toBe(9);
        expect(cpu.memory.get(245)).toBe(31);
        expect(cpu.memory.get(39)).toBe(97);
    });

    test('pop local/argument/this/that i', () => {
        const vm = new HackVm();

        // Get addresses of segments
        const argsPtr = vm.memory.get(MEM_SEG_ADDRESS_ARGUMENTS);
        const localPtr = vm.memory.get(MEM_SEG_ADDRESS_LOCAL);
        const thatPtr = vm.memory.get(MEM_SEG_ADDRESS_THAT);
        const thisPtr = vm.memory.get(MEM_SEG_ADDRESS_THIS);

        // Push two numbers on stack
        vm.stack.push(7);
        vm.stack.push(9);
        vm.stack.push(13);
        vm.stack.push(21);

        // Pop a couple of numbers
        runVmProgram(vm,
            'pop argument 3',
            'pop local 5',
            'pop that 9',
            'pop this 4'
        );

        expect(vm.memory.get(argsPtr + 3)).toBe(21);
        expect(vm.memory.get(localPtr + 5)).toBe(13);
        expect(vm.memory.get(thatPtr + 9)).toBe(9);
        expect(vm.memory.get(thisPtr + 4)).toBe(7);
    });

    test('push local/argument/this/that i', () => {
        const vm = new HackVm();

        // Get addresses of segments
        const argsPtr = vm.memory.get(MEM_SEG_ADDRESS_ARGUMENTS);
        const localPtr = vm.memory.get(MEM_SEG_ADDRESS_LOCAL);
        const thatPtr = vm.memory.get(MEM_SEG_ADDRESS_THAT);
        const thisPtr = vm.memory.get(MEM_SEG_ADDRESS_THIS);

        // Set a couple of segment values
        vm.memory.set(argsPtr + 3, 89);
        vm.memory.set(localPtr + 5, 54);
        vm.memory.set(thatPtr + 9, 67);
        vm.memory.set(thisPtr + 4, 199);

        // Push these numbers
        runVmProgram(vm,
            'push argument 3',
            'push local 5',
            'push that 9',
            'push this 4'
        );

        expect(vm.stack.pop()).toBe(199);
        expect(vm.stack.pop()).toBe(67);
        expect(vm.stack.pop()).toBe(54);
        expect(vm.stack.pop()).toBe(89);
    })

    test('push constant i', () => {
        const vm = new HackVm();

        runVmProgram(vm,
            'push constant 5',
            'push constant 89',
            'push constant 13',
            'push constant 2',
        );

        expect(vm.stack.pop()).toBe(2);
        expect(vm.stack.pop()).toBe(13);
        expect(vm.stack.pop()).toBe(89);
        expect(vm.stack.pop()).toBe(5);
    })


    test('pop static i', () => {
        const vm = new HackVm();

        vm.stack.push(56);
        vm.stack.push(75);
        vm.stack.push(32);
        vm.stack.push(16);

        runVmProgram(vm,
            'pop static 5',
            'pop static 7',
            'pop static 13',
            'pop static 26',
        );

        const s5 = vm.memory.getLabelled(getStaticAsmVariable(TEST_FILENAME, 5));
        const s7 = vm.memory.getLabelled(getStaticAsmVariable(TEST_FILENAME, 7));
        const s13 = vm.memory.getLabelled(getStaticAsmVariable(TEST_FILENAME, 13));
        const s26 = vm.memory.getLabelled(getStaticAsmVariable(TEST_FILENAME, 26));

        expect(s5).toBe(16);
        expect(s7).toBe(32);
        expect(s13).toBe(75);
        expect(s26).toBe(56);

        expect(vm.memory.labels[getStaticAsmVariable(TEST_FILENAME, 4)]).toBeUndefined();
    });

    test('push static i', () => {
        const vm = new HackVm();

        runVmProgram(vm,
            'push static 5',
            'push static 89',
            'push static 13',
            'push static 2',
        );
    });

    test('pop temp i', () => {
        const vm = new HackVm();

        vm.stack.push(77);
        vm.stack.push(32);
        vm.stack.push(48);
        vm.stack.push(96);

        runVmProgram(vm,
            'pop temp 0',
            'pop temp 3',
            'pop temp 6',
            'pop temp 7',
        );

        expect(vm.memory.get(MEM_SEG_TEMP_START + 0)).toBe(96);
        expect(vm.memory.get(MEM_SEG_TEMP_START + 3)).toBe(48);
        expect(vm.memory.get(MEM_SEG_TEMP_START + 6)).toBe(32);
        expect(vm.memory.get(MEM_SEG_TEMP_START + 7)).toBe(77);

        // I feel like some error should be thrown here...
        // expect(() => {
        //     runVmProgram(vm, ['pop temp 9']);
        // }).toThrowError();
    });

    test('push temp i', () => {
        const vm = new HackVm();

        vm.memory.set(MEM_SEG_TEMP_START, 56, 13, 14, 87, 43, 32, 18, 99);

        runVmProgram(vm,
            'push temp 0',
            'push temp 1',
            'push temp 2',
            'push temp 3',
            'push temp 4',
            'push temp 5',
            'push temp 6',
            'push temp 7'
        );

        expect(vm.stack.pop()).toBe(99);
        expect(vm.stack.pop()).toBe(18);
        expect(vm.stack.pop()).toBe(32);
        expect(vm.stack.pop()).toBe(43);
        expect(vm.stack.pop()).toBe(87);
        expect(vm.stack.pop()).toBe(14);
        expect(vm.stack.pop()).toBe(13);
        expect(vm.stack.pop()).toBe(56);

        // I feel like some error should be thrown here...
        // expect(() => {
        //     runVmProgram(vm, ['push temp 9']);
        // }).toThrowError();
    });

    test('pop pointer 0/1', () => {
        const vm = new HackVm();

        vm.stack.push(5600);
        vm.stack.push(7800);

        runVmProgram(vm,
            'pop pointer 0',
            'pop pointer 1',
        );

        expect(vm.memory.get(MEM_SEG_ADDRESS_THIS)).toBe(7800);
        expect(vm.memory.get(MEM_SEG_ADDRESS_THAT)).toBe(5600);
    })

    test('push pointer 0/1', () => {
        const vm = new HackVm();

        vm.memory.set(MEM_SEG_ADDRESS_THIS, 1024);
        vm.memory.set(MEM_SEG_ADDRESS_THAT, 2048);

        runVmProgram(vm,
            'push pointer 0',
            'push pointer 1',
        );

        expect(vm.stack.pop()).toBe(2048);
        expect(vm.stack.pop()).toBe(1024);

        // I feel like some error should be thrown here...
        // expect(() => {
        //     runVmProgram(vm, ['push pointer 2']);
        // }).toThrowError();
    });

    test('add', () => {
        const vm: HackVm = new HackVm();

        // Push two numbers on stack
        vm.stack.push(5);
        vm.stack.push(9);

        runVmProgram(vm, 'add');

        expect(vm.memory.get(vm.stack.initialStackPointerValue)).toBe(14);

        expect(vm.stack.pop()).toBe(14);

        // We should have run out...
        expect(() => vm.stack.pop()).toThrowError();
    });

    test('sub', () => {
        const vm: HackVm = new HackVm();

        // Push two numbers on stack
        vm.stack.push(67);
        vm.stack.push(13);

        runVmProgram(vm, 'sub');

        expect(vm.stack.pop()).toBe(54);

        // We should have run out...
        expect(() => vm.stack.pop()).toThrowError();
    });

    test('and', () => {
        const vm: HackVm = new HackVm();

        // Push two numbers on stack
        vm.stack.push(0b10101010);
        vm.stack.push(0b11001100);

        runVmProgram(vm, 'and');

        expect(vm.stack.pop()).toBe(0b10001000);

        // We should have run out...
        expect(() => vm.stack.pop()).toThrowError();
    });

    test('or', () => {
        const vm: HackVm = new HackVm();

        // Push two numbers on stack
        vm.stack.push(0b10101010);
        vm.stack.push(0b11001100);

        runVmProgram(vm, 'or');

        expect(vm.stack.pop()).toBe(0b11101110);

        // We should have run out...
        expect(() => vm.stack.pop()).toThrowError();
    });

    test('eq', () => {
        const vm: HackVm = new HackVm();

        runVmProgram(vm,
            'push constant 17',
            'push constant 17',
            'eq',
            'push constant 17',
            'push constant 16',
            'eq'
        );

        expect(vm.stack.pop()).toBe(0);
        expect(vm.stack.pop()).toBe(-1);

        // We should have run out...
        expect(() => vm.stack.pop()).toThrowError();
    });

    test('lt', () => {
        const vm: HackVm = new HackVm();

        runVmProgram(vm,
            'push constant 892',
            'push constant 891',
            'lt',
            'push constant 891',
            'push constant 892',
            'lt'
        );

        // Remember they pop off in reverse order
        expect(vm.stack.pop()).toBe(-1);
        expect(vm.stack.pop()).toBe(0);

        // We should have run out...
        expect(() => vm.stack.pop()).toThrowError();
    });

    test('gt', () => {
        const vm: HackVm = new HackVm();

        runVmProgram(vm,
            'push constant 892',
            'push constant 891',
            'gt',
            'push constant 891',
            'push constant 892',
            'gt'
        );

        // Remember they pop off in reverse order
        expect(vm.stack.pop()).toBe(0);
        expect(vm.stack.pop()).toBe(-1);

        // We should have run out...
        expect(() => vm.stack.pop()).toThrowError();
    });
})