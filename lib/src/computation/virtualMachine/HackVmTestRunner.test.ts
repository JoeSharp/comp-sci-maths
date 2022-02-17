import { readFileSync } from "fs";
import { vanillaFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import HackVm, { IHackVm } from "./HackVm";
import TEST_CASES from "./HackVmTestCases";
import HackVmTestRunner from "./HackVmTestRunner";

describe("Hack VM - VM Emulator", () => {
    TEST_CASES.forEach(({ testDirectory, vmTestScript }) => {
        test.skip(vmTestScript, () => {
            const testScriptRaw = readFileSync(`${testDirectory}/${vmTestScript}`, 'utf-8').split('\n');
            const hackVm: IHackVm = new HackVm();

            const runner = new HackVmTestRunner(hackVm, `${testDirectory}`, vanillaFileLoader);
            runner.loadScript(testScriptRaw);

            runner.runToEnd();
        });
    })
});

