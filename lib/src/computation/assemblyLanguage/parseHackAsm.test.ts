import { generateLineRef } from "../../common";
import parseHackAsm from "./parseHackAsm";
import {
  ComputeComputation,
  ComputeDestination,
  ComputeInstruction,
  ComputeJump,
  CpuInstructionType,
  CpuDirectAddressInstruction,
  CpuNamedAddressInstruction,
} from "./types";

interface TestCase {
  symbolic: string;
  expected: ComputeInstruction;
}

const TEST_CASES: TestCase[] = [
  {
    symbolic: "A=D",
    expected: {
      ref: generateLineRef(),
      type: CpuInstructionType.compute,
      destination: ComputeDestination.A,
      computation: ComputeComputation.D,
    },
  },
  {
    symbolic: "A=D-1",
    expected: {
      ref: generateLineRef(),
      type: CpuInstructionType.compute,
      destination: ComputeDestination.A,
      computation: ComputeComputation.D_MINUS_ONE,

    },
  },
  {
    symbolic: "=D;JMP",
    expected: {
      ref: generateLineRef(),
      type: CpuInstructionType.compute,
      computation: ComputeComputation.D,
      jump: ComputeJump.JMP,
    },
  },
  {
    symbolic: "M=D+A;JLT",
    expected: {
      ref: generateLineRef(),
      type: CpuInstructionType.compute,
      destination: ComputeDestination.M,
      computation: ComputeComputation.D_PLUS_A,
      jump: ComputeJump.JLT,
    },
  },
  {
    symbolic: "D=M              // D = first number",
    expected: {
      ref: generateLineRef(),
      type: CpuInstructionType.compute,
      destination: ComputeDestination.D,
      computation: ComputeComputation.M,
    },
  },
];

describe("Hack CPU", () => {
  test("Address Instruction - Direct (Single)", () => {
    const res = parseHackAsm(`@78`);
    expect(res.type).toBe(CpuInstructionType.directAddress);
    const { address } = res as CpuDirectAddressInstruction;
    expect(address).toBe(78);
  });
  test("Address Instruction - Direct (Single Large)", () => {
    const res = parseHackAsm(`@65535`);
    expect(res.type).toBe(CpuInstructionType.directAddress);
    const { address } = res as CpuDirectAddressInstruction;
    expect(address).toBe(65535);
  });

  test("Address Instruction - Direct (Array)", () => {
    [56, 128, 9000].forEach((testAddress) => {
      const res1 = parseHackAsm(`@${testAddress}`);
      expect(res1.type).toBe(CpuInstructionType.directAddress);
      const { address } = res1 as CpuDirectAddressInstruction;
      expect(address).toBe(testAddress);
    });
  });

  test("Address Instruction - Named Register (Single)", () => {
    const res = parseHackAsm(`@KBD`);
    expect(res.type).toBe(CpuInstructionType.namedAddress);
    const { label } = res as CpuNamedAddressInstruction;
    expect(label).toBe("KBD");
  });

  test("Address Instruction - Named Static Variable", () => {
    const res = parseHackAsm(`@MyTest.5`);
    expect(res.type).toBe(CpuInstructionType.namedAddress);
    const { label } = res as CpuNamedAddressInstruction;
    expect(label).toBe("MyTest.5");
  })

  test("Address Instruction - Named Register (Array)", () => {
    ["R1", "SCREEN", "myVariable"].forEach((testRegisterName) => {
      const res = parseHackAsm(`@${testRegisterName}`);
      expect(res.type).toBe(CpuInstructionType.namedAddress);
      const { label } = res as CpuNamedAddressInstruction;
      expect(label).toBe(testRegisterName);
    });
  });

  TEST_CASES.forEach(({ symbolic, expected }) => {
    test(`Compute Instruction ${symbolic}`, () => {
      const instruction = parseHackAsm(symbolic);
      expect(instruction.type).toBe(CpuInstructionType.compute);
      const {
        computation,
        jump,
        destination,
      } = instruction as ComputeInstruction;
      expect(destination).toBe(expected.destination);
      expect(computation).toBe(expected.computation);
      expect(jump).toBe(expected.jump);
    });
  });
});
