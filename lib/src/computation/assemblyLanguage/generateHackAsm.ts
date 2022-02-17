import {
    CpuInstruction,
    CpuInstructionType,
    Registers,
} from "./types";

const generateHackAsm = (
    input: CpuInstruction,
    registers: Registers = {}
): string => {
    switch (input.type) {
        case CpuInstructionType.directAddress:
            return `@${input.address}`;
        case CpuInstructionType.namedAddress:
            return `@${input.label in registers
                ? registers[input.label]
                : input.label
                }`;
        case CpuInstructionType.label:
            return `(${input.label})`;
        case CpuInstructionType.compute:
            return `${input.destination ? `${input.destination}=` : ``}${input.computation
                }${input.jump ? `;${input.jump}` : ""}`;
    }
};

export default generateHackAsm;