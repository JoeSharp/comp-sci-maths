import { nand2tetrisFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import assemble from "./assemble";
import HackCpu from "./HackCpu";

interface TestCase {
    directory: string,
    asmFile: string,
    hackFile: string
}

const TEST_CASES: TestCase[] = [
    {
        directory: '06/add',
        asmFile: 'Add.asm',
        hackFile: 'Add.hack',
    },
    {
        directory: '06/max',
        asmFile: 'Max.asm',
        hackFile: 'Max.hack',
    },
    {
        directory: '06/rect',
        asmFile: 'Rect.asm',
        hackFile: 'Rect.hack',
    }
]

describe('Assembler', () => {
    TEST_CASES.forEach(({ directory, asmFile, hackFile }) => {
        test(asmFile, () => {
            const asm = nand2tetrisFileLoader(directory, asmFile);
            const hackLines = nand2tetrisFileLoader(directory, hackFile).filter(s => s.length > 0);

            const cpu = new HackCpu();
            cpu.loadProgram(asm);

            expect(cpu.program.length).toBe(hackLines.length);

            hackLines.forEach((hackLine, i) => {
                const generatedHack = assemble(cpu.program[i]);
                expect(generatedHack).toBe(hackLine);
            })
        })
    })
})