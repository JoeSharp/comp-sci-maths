import { readFileSync } from "fs";
import { HackCpuTestRunner } from "../assemblyLanguage";
import { vanillaFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import { FileLoader } from "../TestScripts/types";
import compileVmDirectory from "./compileVmDirectory";
import TEST_CASES from "./HackVmTestCases";

describe("Hack VM - CPU Emulator", () => {
    TEST_CASES.forEach(({ testDirectory, asmFile, asmTestScript }) => {
        test.skip(asmTestScript, () => {
            const asmLines: string[] = compileVmDirectory(testDirectory);
            const testScriptRaw = readFileSync(`${testDirectory}/${asmTestScript}`, 'utf-8').split('\n');

            const fileLoaderWrapper: FileLoader = (directory: string, filename: string) => {
                if (filename === asmFile) {
                    return asmLines;
                } else {
                    return vanillaFileLoader(directory, filename);
                }
            }

            const runner = new HackCpuTestRunner(testDirectory, fileLoaderWrapper);
            runner.loadScript(testScriptRaw);

            runner.runToEnd();
        });
    })
});