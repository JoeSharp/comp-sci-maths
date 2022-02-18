import { Optional } from "../../types";
import { nand2tetrisFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import { CpuTestSetOutput, isOutputRam } from "../TestScripts/types";

import {
  parseSetNamedRegisterAtIndex,
  parseTestScript,
  parseTickTockInstruction,
  parseRepeatStart,
  parseRepeatEnd,
  parseLoadAllInstruction,
} from "./hackAsmTestScript";
import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestRepeat,
  CpuTestSetNamedRegisterAtIndex,
} from "../TestScripts/types";
import { parseRequiredFile } from "../TestScripts/parseTestScripts";

interface SetRamTestCase {
  input: string;
  expected: CpuTestSetNamedRegisterAtIndex;
}

interface RepeatTestCase {
  input: string;
  expectedCount: Optional<number>;
}

describe("Hack ASM Test Scripts", () => {
  test('Load All', () => {
    expect(parseLoadAllInstruction('load,')).toBeTruthy();
    expect(parseLoadAllInstruction('load;')).toBeTruthy();
    expect(parseLoadAllInstruction('  load,')).toBeTruthy();
    expect(parseLoadAllInstruction('  load;  ')).toBeTruthy();
  })

  test("Tick Tock", () => {
    expect(parseTickTockInstruction("   ticktock;")).toBeTruthy();
    expect(parseTickTockInstruction("ticktock;")).toBeTruthy();
    expect(parseTickTockInstruction(" flicktock")).toBeFalsy();
    expect(parseTickTockInstruction("sticktock   ")).toBeFalsy();
  });

  const repeatTestCases: RepeatTestCase[] = [
    {
      input: "repeat 70 {",
      expectedCount: 70,
    },
    {
      input: "repeat 35 { // This likes to work a lot",
      expectedCount: 35,
    },
    {
      input: "loop 70 {",
      expectedCount: undefined,
    },
  ];

  repeatTestCases.forEach(({ input, expectedCount }) => {
    test(`Repeat Start - ${input}`, () => {
      const result = parseRepeatStart(input, 0);
      if (!!expectedCount) {
        expect(result).toBeDefined();
        expect(result.count).toBe(expectedCount);
      } else {
        expect(result).toBeUndefined();
      }
    });
  });

  test("Repeat End", () => {
    expect(parseRepeatEnd("   }  ")).toBeTruthy();
    expect(parseRepeatEnd("}")).toBeTruthy();
    expect(parseRepeatEnd("{")).toBeFalsy();
    expect(parseRepeatEnd(" {} ")).toBeFalsy();
  });

  const setRamTestCases: SetRamTestCase[] = [
    {
      input: "set RAM[0] 4,   // Set test arguments",
      expected: {
        type: CpuTestInstructionType.setNamedRegisterIndex,
        lineContent: "set RAM[0] 4,   // Set test arguments",
        lineNumber: 0,
        registerName: 'RAM',
        index: 0,
        value: 4,
      },
    },
    {
      input: "set RAM[1] 78,",
      expected: {
        type: CpuTestInstructionType.setNamedRegisterIndex,
        lineContent: "set RAM[1] 78,",
        lineNumber: 0,
        registerName: 'RAM',
        index: 1,
        value: 78,
      },
    },
    {
      input: "set RAM[2] -1;  // Test that program initialized product to 0",
      expected: {
        type: CpuTestInstructionType.setNamedRegisterIndex,
        lineContent:
          "set RAM[2] -1;  // Test that program initialized product to 0",
        lineNumber: 0,
        registerName: 'RAM',
        index: 2,
        value: -1,
      },
    },
  ];
  setRamTestCases.forEach(({ input, expected }) => {
    test(`Set RAM - ${input}`, () => {
      const result = parseSetNamedRegisterAtIndex(input, 0);
      expect(result).toBeDefined();
      expect(result.registerName).toBe(expected.registerName);
      expect(result.index).toBe(expected.index);
      expect(result.value).toBe(expected.value);
      expect(result.lineContent).toBe(expected.lineContent);
      expect(result.lineNumber).toBe(expected.lineNumber);
    });
  });

  test('Load Mult File', () => {
    const f = parseRequiredFile('load Mult.asm,', 'load');
    expect(f).toBe('Mult.asm');
  })

  test("ASM Test Script (Mult)", () => {
    const data = nand2tetrisFileLoader('04/mult', 'Mult.tst');

    const testScript = parseTestScript(data);

    // Check required files
    expect(testScript.load).toBe("Mult.asm");
    expect(testScript.outputFile).toBe("Mult.out");
    expect(testScript.compareTo).toBe("Mult.cmp");

    // Check output format
    const setOutput = testScript.testInstructions[0] as CpuTestSetOutput;
    if (isOutputRam(setOutput.outputList[0])) {
      expect(setOutput.outputList.length).toBe(3);
      expect(setOutput.outputList[0].address).toBe(0);
      expect(setOutput.outputList[0].format).toBe("D");
      expect(setOutput.outputList[0].spacing).toEqual([2, 6, 2]);
    }

    if (isOutputRam(setOutput.outputList[1])) {
      expect(setOutput.outputList[1].address).toBe(1);
      expect(setOutput.outputList[1].format).toBe("D");
      expect(setOutput.outputList[2].spacing).toEqual([2, 6, 2]);
    }

    if (isOutputRam(setOutput.outputList[2])) {
      expect(setOutput.outputList[2].address).toBe(16);
      expect(setOutput.outputList[2].format).toBe("D");
      expect(setOutput.outputList[2].spacing).toEqual([2, 6, 2]);
    }

    expect(testScript.testInstructions.length).toBeGreaterThan(8);

    const expectSetRam = (
      instruction: CpuTestInstruction,
      expectedRegisterName: string,
      expectedAddress: number,
      expectedValue: number
    ) => {
      expect(instruction.type).toBe(CpuTestInstructionType.setNamedRegisterIndex);
      const { registerName, index, value } = instruction as CpuTestSetNamedRegisterAtIndex;
      expect(registerName).toBe(expectedRegisterName);
      expect(index).toBe(expectedAddress);
      expect(value).toBe(expectedValue);
    };
    const expectRepeat = (
      instruction: CpuTestInstruction,
      expectedCount: number,
      furtherAssertions: (repeatInstruction: CpuTestRepeat) => void
    ) => {
      expect(instruction.type).toBe(CpuTestInstructionType.repeat);
      const repeatInstruction = instruction as CpuTestRepeat;
      expect(repeatInstruction.count).toBe(expectedCount);

      furtherAssertions(repeatInstruction);
    };
    const expectTickTockInstruction = (instruction: CpuTestInstruction) => {
      expect(instruction.type).toBe(CpuTestInstructionType.ticktock);
    };
    const expectOutputInstruction = (instruction: CpuTestInstruction) => {
      expect(instruction.type).toBe(CpuTestInstructionType.output);
    };

    expectSetRam(testScript.testInstructions[1], 'RAM', 0, 0);
    expectSetRam(testScript.testInstructions[2], 'RAM', 1, 0);
    expectSetRam(testScript.testInstructions[3], 'RAM', 16, -1);
    expectRepeat(testScript.testInstructions[4], 20, (r) => {
      expect(r.instructions.length).toBe(1);
      expectTickTockInstruction(r.instructions[0]);
    });

    expectSetRam(testScript.testInstructions[5], 'RAM', 0, 0);
    expectSetRam(testScript.testInstructions[6], 'RAM', 1, 0);
    expectOutputInstruction(testScript.testInstructions[7]);
  });

  test('VM Test Script BasicVME', () => {
    const data = nand2tetrisFileLoader('07/MemoryAccess/BasicTest', 'BasicTestVME.tst');

    const testScript = parseTestScript(data);

    expect(testScript.testInstructions)
  })

  test('VM Test Script StaticVME', () => {
    const data = nand2tetrisFileLoader('08/FunctionCalls/StaticsTest', 'StaticsTestVME.tst');

    const testScript = parseTestScript(data);

    expect(testScript.testInstructions)
  })
});
