/**
 * Based on the instructions as described here...
 *
 * https://www.101computing.net/little-man-computer-mini-challenges/
 */

import { LmcInstructionType, LmcInstruction } from "./InstructionSet";
import LmcMemory from "./LmcMemory";

export interface StdIO {
    input: () => number;
    output: (value: number) => any;
}

interface LmcInstructionWithAddressValue extends LmcInstruction {
    addressValue?: number
}

class LittleManComputer {

    io: StdIO;
    accumulator: number;
    memory: LmcMemory;
    programCounter: number;
    program: LmcInstructionWithAddressValue[];
    labelledLines: {
        [label: string]: number
    }
    halted: boolean;

    constructor(io: StdIO, memorySize: number = 32) {
        this.io = io;
        this.memory = new LmcMemory(memorySize);
        this.accumulator = 0;
        this.program = [];
        this.labelledLines = {};
        this.programCounter = 0;
    }

    isHalted() {
        return this.halted;
    }

    loadProgram(program: LmcInstruction[]): this {
        this.halted = false;
        this.program = program;
        this.labelledLines = this.program.reduce((acc, { label }, index) => ({
            ...acc,
            [label]: index
        }), {})

        this.program.forEach((p, i) => {
            if (p.type === LmcInstructionType.dataLocation) {
                const initialValue = parseInt(p.addressLabel, 10);
                if (!isNaN(initialValue)) {
                    this.memory.set(i, initialValue);
                }
            }
        });

        // Set the address value on any code lines that used address labels
        this.program
            .filter(p => p.addressLabel !== undefined && p.type !== LmcInstructionType.dataLocation)
            .forEach(p => p.addressValue = this.labelledLines[p.addressLabel]);

        return this;
    }

    step(): this {
        if (this.halted) return this;

        const instruction = this.program[this.programCounter];

        switch (instruction.type) {
            case LmcInstructionType.input:
                this.input();
                break;
            case LmcInstructionType.output:
                this.output();
                break;
            case LmcInstructionType.store:
                this.store(instruction.addressValue);
                break;
            case LmcInstructionType.load:
                this.load(instruction.addressValue);
                break;
            case LmcInstructionType.add:
                this.add(instruction.addressValue);
                break;
            case LmcInstructionType.subtract:
                this.subtract(instruction.addressValue);
                break;
            case LmcInstructionType.halt:
                this.halt()
                break;
            case LmcInstructionType.branchAlways:
                this.branchAlways(instruction.addressValue);
                break;
            case LmcInstructionType.branchIfZero:
                this.branchIfZero(instruction.addressValue);
                break;
            case LmcInstructionType.branchIfZeroOrPositive:
                this.branchIfZeroOrPositive(instruction.addressValue);
                break;
        }

        this.programCounter++;

        return this;
    }

    input() {
        this.accumulator = this.io.input();
    }

    output() {
        return this.io.output(this.accumulator);
    }

    load(address: number) {
        this.accumulator = this.memory.get(address);
    }

    store(address: number) {
        this.memory.set(address, this.accumulator);
    }

    add(address: number) {
        this.accumulator += this.memory.get(address);
    }

    subtract(address: number) {
        this.accumulator -= this.memory.get(address);
    }

    branchIfZeroOrPositive(address: number) {
        if (this.accumulator >= 0) {
            this.programCounter = address - 1; // We will iterate PC
        }
    }

    branchIfZero(address: number) {
        if (this.accumulator === 0) {
            this.programCounter = address - 1; // We will iterate PC
        }
    }

    branchAlways(address: number) {
        this.programCounter = address - 1; // We will iterate PC
    }

    halt() {
        this.halted = true;
    }

    /**
     *
     * @param label The label to fetch
     * @returns The index of that labelled line in the program.
     */
    getLabelledProgramLocation(label: string) {
        if (!this.labelledLines[label]) {
            throw new Error(`Unknown memory label - ${label}`)
        }

        return this.labelledLines[label];
    }
}

export default LittleManComputer;