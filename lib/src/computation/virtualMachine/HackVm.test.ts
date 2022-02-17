import generateHackVm from "./generateHackVm";
import HackVm from "./HackVm";
import {
    ASM_MEM_SEG_SYMBOL_ARGUMENTS_EXP,
    ASM_MEM_SEG_SYMBOL_LOCAL_EXP,
    ASM_MEM_SEG_SYMBOL_STACK_PTR,
    ASM_MEM_SEG_SYMBOL_THAT,
    ASM_MEM_SEG_SYMBOL_THIS
} from "./types";

describe('Hack VM', () => {
    test('Stack Memory Segment Operations', () => {
        const vm = new HackVm();

        vm.getMemory().setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, 256);
        vm.getMemory().setLabelled(ASM_MEM_SEG_SYMBOL_LOCAL_EXP, 300);
        vm.getMemory().setLabelled(ASM_MEM_SEG_SYMBOL_ARGUMENTS_EXP, 400);
        vm.getMemory().setLabelled(ASM_MEM_SEG_SYMBOL_THIS, 500);
        vm.getMemory().setLabelled(ASM_MEM_SEG_SYMBOL_THAT, 600);

        vm.loadProgram({
            filename: 'foo',
            contents: [
                'push constant 56',
                'pop local 2'
            ]
        });

        for (const p of vm.program) {
            vm.step();
        }

        expect(vm.getMemory().get(0)).toBe(256);
        expect(vm.getMemory().get(256)).toBe(56);
        expect(vm.getMemory().get(302)).toBe(56);
    })

    // test('Nested Calls - Line 1', () => {
    //     const vm = new HackVm();

    //     vm.memory.set(0, 261);
    //     vm.memory.set(1, 261);
    //     vm.memory.set(2, 256);
    //     vm.memory.set(3, -3);
    //     vm.memory.set(4, -4);

    //     for (let i = 5; i < 1000; i++) {
    //         vm.memory.set(i, -1);
    //     }

    //     vm.memory.set(256, 1234);
    //     // fake stack frame from call Sys.init

    //     vm.loadProgram({
    //         filename: 'foo',
    //         contents: [
    //             "function Sys.init 0",
    //             "push constant 4000	// test THIS and THAT context save",
    //             "pop pointer 0",
    //             "push constant 5000",
    //             "pop pointer 1",
    //             "call Sys.main 0",
    //             "pop temp 1",
    //             "label LOOP",
    //             "goto LOOP",
    //             "function Sys.main 5",
    //             "return"
    //         ]
    //     });

    //     expect(generateHackVm(vm.getNextCodeLine())).toBe('call Sys.init 0');

    //     // Jump over the Sys.init call
    //     expect(vm.step()).toBeTruthy();

    //     expect(generateHackVm(vm.getNextCodeLine())).toBe('function Sys.init 0');

    //     // Go up to the calling of Sys.main.0 and its function declaration line
    //     for (let i = 0; i < 6; i++) {
    //         expect(vm.step()).toBeTruthy();
    //     }

    //     // expect(vm.getNextCodeLine().originalLine).toBe('return');
    // })
});