import { getNand2TetrisBaseDir, vanillaFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import HackVm, { IHackVm } from "./HackVm";
import HackVmTestRunner from "./HackVmTestRunner";

describe('Hack VM - Initialisation Test', () => {
    test('Basic Test', () => {
        const TEST_DIRECTORY = getNand2TetrisBaseDir('07/MemoryAccess/BasicTest');
        const TEST_FILE = 'BasicTestVME.tst';
        const testScriptRaw = vanillaFileLoader(TEST_DIRECTORY, TEST_FILE);
        const hackVm: IHackVm = new HackVm();
        const runner = new HackVmTestRunner(hackVm, TEST_DIRECTORY, vanillaFileLoader);
        runner.loadScript(testScriptRaw);

        for (let i = 0; i < 3; i++) {
            runner.step();
        }

        expect(hackVm.getMemory().get(1)).toBe(300);
    })
})

