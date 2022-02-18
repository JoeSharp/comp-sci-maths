import { readFileSync } from "fs";
import { IndexWindow } from "../../common";
import { vanillaFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import { IHackVm } from "./HackVm";
import HackVmAgainstAsm from "./HackVmAgainstAsm"
import TEST_CASES from "./HackVmTestCases";
import HackVmTestRunner from "./HackVmTestRunner";

describe('Hack VM Against ASM', () => {
    const createAndInit = () => {
        const computer = new HackVmAgainstAsm();
        computer.set(0, 256);  // stack pointer
        computer.set(1, 300);  // base address of the local segment
        computer.set(2, 400);  // base address of the argument segment
        computer.set(3, 3000); // base address of the this segment
        computer.set(4, 3010); // base address of the that segment
        return computer;
    }

    test('Simple Push', () => {
        const computer = createAndInit();

        computer.loadProgram({
            filename: 'foo', contents: [
                'push constant 78',
                'pop local 0',
            ]
        });

        for (let i = 0; i < 2; i++) {
            computer.step();
        }

        expect(computer.get(300)).toBe(78);
    });

    test('Basic Program', () => {
        const computer = createAndInit();

        computer.loadProgram({
            filename: 'foo',
            contents: [
                'push constant 10',
                'pop local 0',
                'push constant 21',
                'push constant 22',
                'pop argument 2',
                'pop argument 1',
                'push constant 36',
                'pop this 6',
                'push constant 42',
                'push constant 45',
                'pop that 5',
                'pop that 2',
                'push constant 510',
                'pop temp 6',
                'push local 0',
                'push that 5',
                'add',
                'push argument 1',
                'sub',
                'push this 6',
                'push this 6',
                'add',
                'sub',
                'push temp 6',
                'add'
            ]
        })

        const windows: IndexWindow[] = [
            { start: 0, end: 4 }, // CPU will use Temp0, which means those won't agree
            { start: 256, end: 270 },
            { start: 300, end: 308 }
        ];

        for (const p of computer.vm.program) {
            computer.step();
            computer.checkMemory(...windows);
        }
    })
})

describe("Hack VM - VM Emulator against CPU Emulator", () => {
    TEST_CASES.forEach(({ testDirectory, vmTestScript }) => {
        test.skip(vmTestScript, () => {
            const testScriptRaw = readFileSync(`${testDirectory}/${vmTestScript}`, 'utf-8').split('\n');
            const hackVm: IHackVm = new HackVmAgainstAsm();

            const runner = new HackVmTestRunner(hackVm, `${testDirectory}`, vanillaFileLoader);
            runner.loadScript(testScriptRaw);

            runner.runToEnd();
        });
    })
});