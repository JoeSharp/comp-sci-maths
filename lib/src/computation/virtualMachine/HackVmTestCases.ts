import { getNand2TetrisBaseDir } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";

export interface TestCase {
    testDirectory: string;
    asmFile: string;
    asmTestScript: string;
    vmTestScript: string;
}

const TEST_CASES: TestCase[] = [
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/07/MemoryAccess/SuperBasicTest`),
    //     asmFile: 'SuperBasicTest.asm',
    //     asmTestScript: 'SuperBasicTest.tst',
    //     vmTestScript: 'SuperBasicTestVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/07/MemoryAccess/BasicTest`),
    //     asmFile: 'BasicTest.asm',
    //     asmTestScript: 'BasicTest.tst',
    //     vmTestScript: 'BasicTestVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/07/MemoryAccess/PointerTest`),
    //     asmFile: 'PointerTest.asm',
    //     asmTestScript: 'PointerTest.tst',
    //     vmTestScript: 'PointerTestVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/07/MemoryAccess/StaticTest`),
    //     asmFile: 'StaticTest.asm',
    //     asmTestScript: 'StaticTest.tst',
    //     vmTestScript: 'StaticTestVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/07/StackArithmetic/SimpleAdd`),
    //     asmFile: 'SimpleAdd.asm',
    //     asmTestScript: 'SimpleAdd.tst',
    //     vmTestScript: 'SimpleAddVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/07/StackArithmetic/StackTest`),
    //     asmFile: 'StackTest.asm',
    //     asmTestScript: 'StackTest.tst',
    //     vmTestScript: 'StackTestVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/08/ProgramFlow/SuperBasicLoop`),
    //     asmFile: 'SuperBasicLoop.asm',
    //     asmTestScript: 'SuperBasicLoop.tst',
    //     vmTestScript: 'SuperBasicLoopVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/08/ProgramFlow/BasicLoop`),
    //     asmFile: 'BasicLoop.asm',
    //     asmTestScript: 'BasicLoop.tst',
    //     vmTestScript: 'BasicLoopVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/08/ProgramFlow/FibonacciSeries`),
    //     asmFile: 'FibonacciSeries.asm',
    //     asmTestScript: 'FibonacciSeries.tst',
    //     vmTestScript: 'FibonacciSeriesVME.tst',
    // },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/08/FunctionCalls/SimpleFunction`),
    //     asmFile: 'SimpleFunction.asm',
    //     asmTestScript: 'SimpleFunction.tst',
    //     vmTestScript: 'SimpleFunctionVME.tst',
    // },

    // STILL TO GET WORKING
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/08/FunctionCalls/FibonacciElement`),
    //     asmFile: 'FibonacciElement.asm',
    //     asmTestScript: 'FibonacciElement.tst',
    //     vmTestScript: 'FibonacciElementVME.tst',
    // },
    {
        testDirectory: getNand2TetrisBaseDir(`/08/FunctionCalls/StaticsTest`),
        asmFile: 'StaticsTest.asm',
        asmTestScript: 'StaticsTest.tst',
        vmTestScript: 'StaticsTestVME.tst',
    },
    // {
    //     testDirectory: getNand2TetrisBaseDir(`/08/FunctionCalls/NestedCall`),
    //     asmFile: 'NestedCall.asm',
    //     asmTestScript: 'NestedCall.tst',
    //     vmTestScript: 'NestedCallVME.tst',
    // },
]

export default TEST_CASES;