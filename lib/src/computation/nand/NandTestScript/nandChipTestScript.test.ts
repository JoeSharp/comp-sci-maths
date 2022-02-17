import parseNandTestScript from "./nandChipTestScript";
import {
  NandTestInstruction,
  NandTestInstructionType,
  NandTestScript,
  NandTestSetBus,
  NandTestSetPin,
} from "./types";
import { nand2tetrisFileLoader } from "../../TestScripts/nand2tetris/nand2tetrisFileLoader";

describe("NAND Chip Test Script", () => {
  test("AND.tst", () => {
    const data = nand2tetrisFileLoader("01", "And.tst");
    const testScript: NandTestScript = parseNandTestScript(data);

    expect(testScript.compareTo).toBe("And.cmp");
    expect(testScript.load).toBe("And.hdl");
    expect(testScript.outputFile).toBe("And.out");

    const instructions = testScript.testInstructions;
    expect(instructions.length).toBe(17);
    const expectedInstructions: NandTestInstruction[] = [
      {
        type: NandTestInstructionType.setOutput,
        outputList: [],
        lineContent: "",
        lineNumber: 0,
      },
      {
        type: NandTestInstructionType.setPin,
        pin: "a",
        value: false,
        lineContent: "",
        lineNumber: 0,
      },
      {
        type: NandTestInstructionType.setPin,
        pin: "b",
        value: false,
        lineContent: "",
        lineNumber: 0,
      },
      {
        type: NandTestInstructionType.eval,
        lineContent: "",
        lineNumber: 0,
      },
      {
        type: NandTestInstructionType.output,
        lineContent: "",
        lineNumber: 0,
      },
    ];
    expectedInstructions.forEach((instruction, i) => {
      expect(instructions[i].type).toBe(instruction.type);
      switch (instruction.type) {
        case NandTestInstructionType.setPin:
          expect((instructions[i] as NandTestSetPin).pin).toBe(instruction.pin);
          expect((instructions[i] as NandTestSetPin).value).toBe(
            instruction.value
          );
          break;
        case NandTestInstructionType.setBus:
          expect((instructions[i] as NandTestSetBus).bus).toBe(instruction.bus);
          expect((instructions[i] as NandTestSetBus).values).toEqual(
            instruction.values
          );
          break;
      }
    });
  });
});
