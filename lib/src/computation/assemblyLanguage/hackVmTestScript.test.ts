import { nand2tetrisFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";

import {
    parseTestScript,
} from "./hackAsmTestScript";

describe("Hack ASM Test Scripts", () => {
    test('VM Test Script BasicVME', () => {
        const data = nand2tetrisFileLoader('07/MemoryAccess/SuperBasicTest', 'SuperBasicTestVME.tst');

        const testScript = parseTestScript(data);
        expect(testScript).toBeDefined();
    })

    test('VM Test Script StackTest', () => {
        const data = nand2tetrisFileLoader('07/StackArithmetic/StackTest', 'StackTestVME.tst');

        const testScript = parseTestScript(data);
        expect(testScript).toBeDefined();
    })
});
