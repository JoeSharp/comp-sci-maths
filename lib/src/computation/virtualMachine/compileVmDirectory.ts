import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { parseVmInstruction } from './parseVmInstruction';
import compileVmStatement, { generateFunctionLabel } from './compileVmStatement';
import { SYSTEM_INIT_FUNCTION_NAME, VMInstructionType, VM_FILE_EXTENSION } from './types';
import parseHackAsm from '../assemblyLanguage/parseHackAsm';
import { CpuInstructionType } from '../assemblyLanguage/types';
import { generateLineRef } from '../../common';

const isLoadedLine = (a: string) => {
    const asm = parseHackAsm(a);
    if (asm === undefined) return false;

    if (asm.type === CpuInstructionType.label) return false;

    return true;
}

const compileVmDirectory = (vmSourceDirectory: string,
    includeDebug: boolean = false): string[] => {
    const vmFiles: string[] = readdirSync(vmSourceDirectory).filter(d => d.endsWith(VM_FILE_EXTENSION));

    let asmLines: string[] = [];
    let sysInitFound: string;

    vmFiles.forEach(vmSourceFilename => {
        const fullVmSourcePath = join(vmSourceDirectory, vmSourceFilename);

        asmLines.push(`// SOURCE FILE ${vmSourceFilename}`);
        readFileSync(fullVmSourcePath, "utf-8")
            .split("\n")
            .map((s, i) => parseVmInstruction(generateLineRef({
                sourceFilename: vmSourceFilename,
                originalLine: s,
                originalLineNumber: i
            })))
            .filter(s => s !== undefined)
            .forEach((v, i) => {
                if (v.type === VMInstructionType.function) {
                    if (v.functionName === SYSTEM_INIT_FUNCTION_NAME) {
                        sysInitFound = vmSourceFilename;
                    }
                }
                asmLines.push(`// ${v.ref.originalLine}`);
                const newLines = compileVmStatement(v);
                if (!newLines) throw new Error(`Line generated no output ${i}: ${v.ref.originalLine}`);
                newLines.forEach(a => asmLines.push(a));
            });
    });

    // Check for Sys.init if there are multiple VM files.
    if (vmFiles.length > 1 && sysInitFound === undefined) throw new Error('Multi file VM program with no Sys.init found.');

    // If there is a Sys.init. Add instructions at the start to call that function
    // Otherwise we are assuming the program starts at the start of the VM instructions
    if (sysInitFound !== undefined) {
        asmLines.unshift(
            `@${generateFunctionLabel(sysInitFound, SYSTEM_INIT_FUNCTION_NAME)}`,
            '0;JMP'
        );
    }

    // generateInfiniteLoop().forEach(a => asmLines.push(a));

    if (includeDebug) {
        let loadedLineCount = 0;
        asmLines = asmLines.map((a) => isLoadedLine(a) ?
            `${a}\t\t\t// CPU line (${loadedLineCount++})` : a);
    }

    return asmLines;
}

export default compileVmDirectory;