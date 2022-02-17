import {
  NamedRegExps,
  parseOutputFormat,
  parseOutputInstruction,
  parseRequiredFile,
} from "./parseTestScripts";
import { isOutputRam, TestOutputFragment } from "./types";

interface RequiredFileTestCase {
  input: string;
  name: keyof NamedRegExps;
  expected: string;
}

describe("Computation Test Scripts", () => {
  test("Output Format", () => {
    const results: TestOutputFragment[] = [];
    parseOutputFormat(
      "output-list RAM[0]%D2.6.2 RAM[1]%D2.6.2 RAM[2]%D2.6.2;",
      false,
      results
    );

    expect(results.length).toBe(3);
    if (isOutputRam(results[0])) {
      expect(results[0].address).toBe(0);
      expect(results[0].format).toBe("D");
      expect(results[0].spacing).toEqual([2, 6, 2]);
    }

    if (isOutputRam(results[1])) {
      expect(results[1].address).toBe(1);
      expect(results[1].format).toBe("D");
      expect(results[2].spacing).toEqual([2, 6, 2]);
    }

    if (isOutputRam(results[2])) {
      expect(results[2].address).toBe(2);
      expect(results[2].format).toBe("D");
      expect(results[2].spacing).toEqual([2, 6, 2]);
    }
  });

  test("Output Instruction", () => {
    expect(parseOutputInstruction("   output;")).toBeTruthy();
    expect(parseOutputInstruction("output;")).toBeTruthy();
    expect(parseOutputInstruction(" input")).toBeFalsy();
    expect(parseOutputInstruction("floutput   ")).toBeFalsy();
  });

  const requiredFileTestCases: RequiredFileTestCase[] = [
    {
      input: "load Mult.asm,",
      name: "load",
      expected: "Mult.asm",
    },
    {
      input: "output-file Mult.out,",
      name: "outputFile",
      expected: "Mult.out",
    },
    {
      input: "compare-to Mult.cmp,",
      name: "compareTo",
      expected: "Mult.cmp",
    },
  ];

  requiredFileTestCases.forEach(({ input, name, expected }) => {
    test(`Required File - ${input}`, () =>
      expect(parseRequiredFile(input, name)).toBe(expected));
  });
});
