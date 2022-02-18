import simpleLogger from 'simpleLogger';
import { writeFileSync } from 'fs';
import yargs from 'yargs';
import compileVmDirectory from '@comp-sci-maths/lib/dist/computation/virtualMachine/compileVmDirectory';
import { MainFunction } from 'types';

interface CompileVm {
    vm: string;
    asm: string;
    cpuLoadLines: boolean;
}

const main: MainFunction = () => {
    const a = yargs
        .command<CompileVm>({
            command: 'hack-vm-compiler',
            describe: 'Compile the VM file',
            builder: {
                vm: {
                    description: 'The VM file to process',
                    alias: 'v',
                    type: 'string',
                    demandOption: true
                },
                asm: {
                    description: 'The ASM file to generate',
                    alias: 'a',
                    type: 'string',
                    demandOption: true
                },
                cpuLoadLines: {
                    description: 'Include lines numbers as loaded into a CPU',
                    alias: 'cpu',
                    type: 'boolean'
                }
            },
            handler: (args) => {
                simpleLogger.info(`Compiling VM files from directory: ${args.vm}`);
                const asmLines: string[] = compileVmDirectory(args.vm, args.cpuLoadLines);
                writeFileSync(args.asm, asmLines.join('\n'));
            }
        })
        .help()
        .alias('help', 'h')
        .argv;
}

export default main;