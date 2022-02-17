import { parseVmInstruction } from './parseVmInstruction';
import { VMArithmeticOperation, VMInstructionArithmetic, VMInstructionFunction, VMInstructionLabel, VMInstructionStack, VMInstructionType } from './types';

const TEST_SOURCE_FILE = 'source.vm';

describe('Hack VM Parse', () => {
    test('Arithmetic Operation', () => {
        const rawCommand = 'add';

        const command = parseVmInstruction({
            sourceFilename: TEST_SOURCE_FILE,
            originalLine: rawCommand
        });
        expect(command.type).toBe(VMInstructionType.arithmetic);

        const addCommand = command as VMInstructionArithmetic;
        expect(addCommand.operation).toBe(VMArithmeticOperation.add);
    })

    test('Stack Command - Pop', () => {
        const rawCommand = 'pop constant 5';

        const command = parseVmInstruction({
            sourceFilename: TEST_SOURCE_FILE,
            originalLine: rawCommand
        });
        expect(command.type).toBe(VMInstructionType.pop);

        const pushCommand = command as VMInstructionStack;
        expect(pushCommand.segment).toBe('constant');
        expect(pushCommand.index).toBe(5);
    })

    test('Stack Command - Push', () => {
        const rawCommand = 'push local 5';

        const command = parseVmInstruction({
            sourceFilename: TEST_SOURCE_FILE,
            originalLine: rawCommand
        });
        expect(command.type).toBe(VMInstructionType.push);

        const pushCommand = command as VMInstructionStack;
        expect(pushCommand.segment).toBe('local');
        expect(pushCommand.index).toBe(5);
    })

    test('Label', () => {
        const rawCommand = 'label monkey';

        const command = parseVmInstruction({
            sourceFilename: TEST_SOURCE_FILE,
            originalLine: rawCommand
        });
        expect(command.type).toBe(VMInstructionType.label);

        const labelCommand = command as VMInstructionLabel;
        expect(labelCommand.label).toBe('monkey');
    })

    test('Function', () => {
        const rawCommand = 'function chimp';

        const command = parseVmInstruction({
            sourceFilename: TEST_SOURCE_FILE,
            originalLine: rawCommand
        });
        expect(command.type).toBe(VMInstructionType.function);

        const fnCommand = command as VMInstructionFunction;
        expect(fnCommand.functionName).toBe('chimp');
    })

    test('Return Command', () => {
        const command = parseVmInstruction({
            sourceFilename: TEST_SOURCE_FILE,
            originalLine: 'return'
        });
        expect(command.type).toBe(VMInstructionType.return);
    })

    test('Arithmetic Operation With Comment', () => {
        const rawCommand = 'add // Add top two numbers on stack';

        const command = parseVmInstruction({
            sourceFilename: TEST_SOURCE_FILE,
            originalLine: rawCommand
        });
        expect(command.type).toBe(VMInstructionType.arithmetic);

        const addCommand = command as VMInstructionArithmetic;
        expect(addCommand.operation).toBe(VMArithmeticOperation.add);
    })

})