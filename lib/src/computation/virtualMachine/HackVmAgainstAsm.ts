import { HackCpu } from "../assemblyLanguage";
import HackVm, { IHackVm } from "./HackVm";
import { VMInstruction, VMInstructionType, VMSourceFile } from "./types";
import compileVmStatement from './compileVmStatement';
import parseHackAsm from "../assemblyLanguage/parseHackAsm";
import { CpuInstruction, CpuInstructionType } from "../assemblyLanguage/types";
import { IMemory } from "../assemblyLanguage/RAMSimulator";
import generateHackAsm from "../assemblyLanguage/generateHackAsm";
import generateHackVm from "./generateHackVm";
import { IndexWindow } from "../../common";

const getStepDebugString = (vmLine: VMInstruction,
    asmLineCount: number,
    cpuInstructions: CpuInstruction[]): string => JSON.stringify({
        vmLine: generateHackVm(vmLine),
        asmLineCount,
        cpuInstructions: cpuInstructions.map(c => generateHackAsm(c))
    })

/**
 * This class constructs a CPU Simulator AND VM Simulator
 * Programs them with the same code, and then when you step through the VM
 * it will also step the equivalent lines in the CPU simulator.
 *
 * The intention is to check that they both behave the same, and also to show directly how the VM
 * abstraction is realised, on a line by line basis.
 */
class HackVmAgainstAsm implements IHackVm, IMemory {
    vm: HackVm;
    cpu: HackCpu;
    asmLinesPerVmLine: {
        [vmLineId: string]: number
    }

    constructor() {
        this.vm = new HackVm();
        this.cpu = new HackCpu();
        this.asmLinesPerVmLine = {};
    }

    // IMemory Methods
    set(index: number, value: number): void {
        // Send both ways...
        this.cpu.getMemory().set(index, value);
        this.vm.getMemory().set(index, value);
    }

    get(index: number): number {
        const cpuValue = this.cpu.getMemory().get(index);
        const vmValue = this.vm.getMemory().get(index);
        if (cpuValue !== vmValue) {
            throw new Error(`Disagreement Error for Index ${index}, CPU: ${cpuValue}, VM: ${vmValue}`)
        }

        // If they agree...all good
        return cpuValue;
    }

    setLabelled(name: string, value: number): void {
        // Send both ways...
        this.cpu.getMemory().setLabelled(name, value);
        this.vm.getMemory().setLabelled(name, value);
    }

    getLabelled(label: string): number {
        const cpuValue = this.cpu.getMemory().getLabelled(label);
        const vmValue = this.vm.getMemory().getLabelled(label);
        if (cpuValue !== vmValue) {
            throw new Error(`Disagreement Error for Label ${label}, CPU: ${cpuValue}, VM: ${vmValue}`)
        }

        // If they agree...all good
        return cpuValue;
    }

    checkMemory(...windows: IndexWindow[]) {
        windows.forEach(({ start, end }) => {
            for (let i = start; i <= end; i++) {
                this.get(i);
            }
        })
    }

    toString(...windows: IndexWindow[]): string {
        return `
        VM Memory
        ${this.vm.getMemory().toString(...windows)}
        CPU Memory
        ${this.cpu.getMemory().toString(...windows)}
        Program
        \n${this.vm.program.map(v =>
            `${v.ref.originalLineNumber}: ${generateHackVm(v)}
            ${this.cpu.program
                .filter(c => c.ref.sourceId === v.ref.id)
                .map(c => generateHackAsm(c)).join('\n\t\t')}`
        ).join('\n\t')}`

        // return `
        // CPU:
        // ${this.cpu.toString(windows)}
        // ++++++++++
        // VM:
        // ${this.vm.toString(windows)}
        // `
    }

    // IHackVm Methods
    step(): boolean {
        const vmLine: VMInstruction = this.vm.getNextCodeLine();
        if (vmLine === undefined) return false;

        const asmLineCount = this.asmLinesPerVmLine[vmLine.ref.id];

        if (asmLineCount > 0) {
            const cpuLine: CpuInstruction = this.cpu.getNextCodeLine();
            if (vmLine === undefined) return false;
            if (cpuLine === undefined) {
                throw new Error(`CPU instruction is undefined, when VM has more to do... ${generateHackVm(vmLine)}`)
            }
            if (vmLine.ref.id !== cpuLine.ref.sourceId && vmLine.type !== VMInstructionType.label) {
                throw new Error(`CPU out of step with VM (CPU ${generateHackAsm(cpuLine)}) (VM ${generateHackVm(vmLine)})`)
            }
        }

        // Step the VM once
        const vmStepped = this.vm.step();

        // Kick the CPU along
        const cpuInstructions: CpuInstruction[] = [];

        for (let i = 0; i < asmLineCount; i++) {
            const cpuInstruction: CpuInstruction = this.cpu.getNextCodeLine();
            cpuInstructions.push(cpuInstruction);

            if (cpuInstruction === undefined) {
                throw new Error(`CPU instruction is undefined, when VM has more to do... ${getStepDebugString(vmLine, asmLineCount, cpuInstructions)}`)
            }
            if (vmLine.ref.id !== cpuInstruction.ref.sourceId) {
                // Some instructions will jump internally, like equality
                // Therefore we break early if the CPU has moved onto another VM instruction
                break;
            }

            // Still on same ID, kick it again
            this.cpu.tick();
        }

        return vmStepped;
    }
    setMemorySegment(name: string, index: number, value: number): boolean {
        return this.vm.setMemorySegment(name, index, value);
    }
    getMemory(): IMemory {
        return this;
    }
    getMemorySegmentLocation(name: string, index: number): number {
        return this.vm.getMemorySegmentLocation(name, index);
    }

    loadProgram(...sourceFiles: VMSourceFile[]) {
        this.vm.loadProgram(...sourceFiles);

        const asmLines: CpuInstruction[] = [];
        this.vm.program.forEach((v, i) => {
            let asmLineCount = 0;
            const newLines = compileVmStatement(v);
            if (!newLines) throw new Error(`Line generated no output ${i}: ${v.ref.originalLine}`);
            newLines
                .map(a => parseHackAsm({
                    sourceId: v.ref.id,
                    originalLine: a,
                    originalLineNumber: asmLines.length
                }))
                .filter(a => a !== undefined)
                .forEach(a => {
                    if (a.type !== CpuInstructionType.label) {
                        asmLineCount++;
                    }

                    asmLines.push(a);
                });

            this.asmLinesPerVmLine[v.ref.id] = asmLineCount;
        });
        this.cpu.loadParsedProgram(asmLines);
    }

}

export default HackVmAgainstAsm;