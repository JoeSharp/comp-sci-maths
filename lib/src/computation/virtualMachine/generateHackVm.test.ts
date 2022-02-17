import { generateLineRef } from "common";
import generateHackVm from "./generateHackVm"
import { VMArithmeticOperation, VMInstructionType, VMSegment } from "./types"

describe('Generate Hack VM', () => {
    test('pop segment i', () => {
        expect(generateHackVm({
            type: VMInstructionType.pop,
            segment: VMSegment.local,
            index: 12,
            ref: generateLineRef()
        })).toBe('pop local 12');
    })

    test('push segment i', () => {
        expect(generateHackVm({
            type: VMInstructionType.push,
            segment: VMSegment.argument,
            index: 4,
            ref: generateLineRef()
        })).toBe('push argument 4');
    });

    test('add/sub/neg', () => {
        expect(generateHackVm({
            type: VMInstructionType.arithmetic,
            operation: VMArithmeticOperation.add,
            ref: generateLineRef()
        })).toBe('add');

        expect(generateHackVm({
            type: VMInstructionType.arithmetic,
            operation: VMArithmeticOperation.sub,
            ref: generateLineRef()
        })).toBe('sub');

        expect(generateHackVm({
            type: VMInstructionType.arithmetic,
            operation: VMArithmeticOperation.neg,
            ref: generateLineRef()
        })).toBe('neg');
    })

    test('call function args', () => {
        expect(generateHackVm({
            type: VMInstructionType.call,
            functionName: 'foo',
            numberArgs: 3,
            ref: generateLineRef()
        })).toBe('call foo 3');
    });

    test('function name params', () => {
        expect(generateHackVm({
            type: VMInstructionType.function,
            functionName: 'foo',
            numberVars: 2,
            ref: generateLineRef()
        })).toBe('function foo 2');
    });

    test('goto label', () => {
        expect(generateHackVm({
            type: VMInstructionType.goto,
            label: 'foo',
            ref: generateLineRef()
        })).toBe('goto foo')
    });

    test('if-goto label', () => {
        expect(generateHackVm({
            type: VMInstructionType.ifgoto,
            label: 'foo',
            ref: generateLineRef()
        })).toBe('if-goto foo')
    });

    test('label', () => {
        expect(generateHackVm({
            type: VMInstructionType.label,
            label: 'foo',
            ref: generateLineRef()
        })).toBe('label foo');
    })
})