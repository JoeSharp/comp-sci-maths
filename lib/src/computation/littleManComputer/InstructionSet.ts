import { Optional } from "types";

export enum LmcInstructionType {
    load = 'LDA',
    store = 'STA',
    add = 'ADD',
    subtract = 'SUB',
    input = 'INP',
    output = 'OUT',
    halt = 'HLT',
    branchIfZero = 'BRZ',
    branchIfZeroOrPositive = 'BRP',
    branchAlways = 'BRA',
    dataLocation = 'DAT'
}

export const isLMC = (part: string) => Object.values(LmcInstructionType).map(s => s.toString()).includes(part);

export interface LmcInstruction {
    type: LmcInstructionType;
    label?: string;
    addressLabel?: string;
}

export const parseLMCInstruction = (line: string): Optional<LmcInstruction> => {
    const parts = line.trim().split(/\s/).map(l => l.trim()).filter(l => l.length > 0);

    if (parts.length === 1) {
        if (isLMC(parts[0])) {
            return {
                type: parts[0] as LmcInstructionType,
            }
        }
    } else if (parts.length === 3) {
        if (isLMC(parts[1])) {
            return {
                type: parts[1] as LmcInstructionType,
                label: parts[0],
                addressLabel: parts[2]
            }
        }
    } else if (parts.length === 2) {
        if (isLMC(parts[1])) {
            return {
                type: parts[1] as LmcInstructionType,
                label: parts[0]
            }
        } else if (isLMC(parts[0])) {
            return {
                type: parts[0] as LmcInstructionType,
                addressLabel: parts[1]
            }
        }
    }
}

export const parseLMCProgram = (lines: string[]) =>
    lines.map(parseLMCInstruction)
        .filter(l => l !== undefined);