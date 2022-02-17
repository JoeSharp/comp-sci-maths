import { generateRandomNumber } from "common";
import Queue from "dataStructures/queue/Queue";
import LittleManComputer, { StdIO } from "./LittleManComputer";
import { loadLMCProgram } from "./lmcProgramLoader";

interface TestCase {
    filename: string,
    cases: {
        inputs: number[],
        expectedOutputs: number[]
    }[]
}

const NUMBER_TEST_CASES_PER_FILE = 10;

const TEST_CASES: TestCase[] = [
    {
        filename: 'add2Inputs.txt',
        cases: Array(NUMBER_TEST_CASES_PER_FILE).fill(null).map(() => {
            const a = generateRandomNumber(10, 1000);
            const b = generateRandomNumber(10, 1000);
            return {
                inputs: [a, b],
                expectedOutputs: [a + b]
            }
        })
    }, {
        filename: 'maxOf2Inputs.txt',
        cases: Array(NUMBER_TEST_CASES_PER_FILE).fill(null).map(() => {
            const a = generateRandomNumber(10, 1000);
            const b = generateRandomNumber(10, 1000);
            return {
                inputs: [a, b],
                expectedOutputs: [Math.max(a, b)]
            }
        })
    }, {
        filename: 'multiplyingTwoNumbers.txt',
        cases: Array(NUMBER_TEST_CASES_PER_FILE).fill(null).map(() => {
            const a = generateRandomNumber(10, 1000);
            const b = generateRandomNumber(10, 1000);
            return {
                inputs: [a, b],
                expectedOutputs: [a * b]
            }
        })
    }
]

describe("Little Man Computer", () => {
    TEST_CASES.forEach(({ filename, cases }) => {
        describe(`LMC ${filename}`, () => {
            cases.forEach(({ inputs, expectedOutputs }, index) => {
                test(`Case ${index}`, () => {
                    const inputQueue: Queue<number> = new Queue<number>();
                    inputs.forEach(i => inputQueue.push(i));

                    const stdIO: StdIO = {
                        input: () => inputQueue.pop(),
                        output: jest.fn()
                    }

                    const program = loadLMCProgram(filename);
                    const lmc = new LittleManComputer(stdIO).loadProgram(program);

                    while (!lmc.isHalted()) {
                        lmc.step();
                    }

                    expect(stdIO.output).toHaveBeenCalledWith(...expectedOutputs);
                })
            })
        })
    })
});