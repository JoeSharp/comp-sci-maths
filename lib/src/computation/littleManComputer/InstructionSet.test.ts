import { TEST_CASES } from "./lmcPrograms/testData";
import { isLMC } from "./InstructionSet";
import { loadLMCProgram } from "./lmcProgramLoader";

describe("Little Man Computer", () => {
    describe("Simulator", () => {
        test("Is LMC", () => {
            expect(isLMC('ADD')).toBeTruthy();
            expect(isLMC('STA')).toBeTruthy();
            expect(isLMC('LDA')).toBeTruthy();
            expect(isLMC('SUB')).toBeTruthy();
            expect(isLMC('FOO')).toBeFalsy();
            expect(isLMC('BAR')).toBeFalsy();
            expect(isLMC('sub')).toBeFalsy();
            expect(isLMC('MON')).toBeFalsy();
        });

        TEST_CASES.forEach(({ filename, expected }) => {
            test(`Parse LMC - ${filename}`, () => {
                const program = loadLMCProgram(filename);
                expect(program).toMatchObject(expected)
            });
        })

    })
})
