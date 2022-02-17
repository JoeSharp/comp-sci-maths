import { LmcInstruction, LmcInstructionType } from "../InstructionSet"

export interface TestCase {
    filename: string,
    expected: LmcInstruction[]
}

export const TEST_CASES: TestCase[] = [
    {
        filename: 'add2Inputs.txt',
        expected: [
            {
                type: LmcInstructionType.input,
            }, {
                type: LmcInstructionType.store,
                addressLabel: 'num1'
            }, {
                type: LmcInstructionType.input,
            }, {
                type: LmcInstructionType.add,
                addressLabel: 'num1'
            }, {
                type: LmcInstructionType.output,
            }, {
                type: LmcInstructionType.halt,
            }, {
                type: LmcInstructionType.dataLocation,
                label: 'num1'
            }
        ]
    }, {
        filename: 'maxOf2Inputs.txt',
        expected: [
            {
                type: LmcInstructionType.input,
            }, {
                type: LmcInstructionType.store,
                addressLabel: 'num1'
            }, {
                type: LmcInstructionType.input,
            }, {
                type: LmcInstructionType.store,
                addressLabel: 'num2'
            }, {
                type: LmcInstructionType.subtract,
                addressLabel: 'num1'
            }, {
                type: LmcInstructionType.branchIfZeroOrPositive,
                addressLabel: 'pos'
            }, {
                type: LmcInstructionType.load,
                addressLabel: 'num1'
            }, {
                type: LmcInstructionType.output,
            }, {
                type: LmcInstructionType.branchAlways,
                addressLabel: 'exit'
            }, {
                label: 'pos',
                type: LmcInstructionType.load,
                addressLabel: 'num2'
            }, {
                type: LmcInstructionType.output,
            }, {
                label: 'exit',
                type: LmcInstructionType.halt,
            }, {
                label: 'num1',
                type: LmcInstructionType.dataLocation,
            }, {
                label: 'num2',
                type: LmcInstructionType.dataLocation,
            },
        ]
    }, {
        filename: 'countDownTimer.txt',
        expected: [{
            type: LmcInstructionType.input,
        }, {
            label: 'loop',
            type: LmcInstructionType.output,
        }, {
            type: LmcInstructionType.store,
            addressLabel: 'count'
        }, {
            type: LmcInstructionType.subtract,
            addressLabel: 'one',
        }, {
            type: LmcInstructionType.store,
            addressLabel: 'count'
        }, {
            type: LmcInstructionType.branchIfZeroOrPositive,
            addressLabel: 'loop'
        }, {
            type: LmcInstructionType.halt
        }, {
            label: 'one',
            type: LmcInstructionType.dataLocation,
            addressLabel: '1'
        }, {
            label: 'count',
            type: LmcInstructionType.dataLocation
        }]
    }, {
        filename: 'multiplyingTwoNumbers.txt',
        expected: [{
            type: LmcInstructionType.input,
        }, {
            type: LmcInstructionType.store,
            addressLabel: 'NUM1'
        }, {
            type: LmcInstructionType.input,
        }, {
            type: LmcInstructionType.store,
            addressLabel: 'NUM2'
        }, {
            label: 'LOOP',
            type: LmcInstructionType.load,
            addressLabel: 'TOTAL'
        }, {
            type: LmcInstructionType.add,
            addressLabel: 'NUM1'
        }, {
            type: LmcInstructionType.store,
            addressLabel: 'TOTAL'
        }, {
            type: LmcInstructionType.load,
            addressLabel: 'NUM2'
        }, {
            type: LmcInstructionType.subtract,
            addressLabel: 'ONE'
        }, {
            type: LmcInstructionType.store,
            addressLabel: 'NUM2'
        }, {
            type: LmcInstructionType.branchIfZeroOrPositive,
            addressLabel: 'LOOP'
        }, {
            type: LmcInstructionType.load,
            addressLabel: 'TOTAL'
        }, {
            type: LmcInstructionType.subtract,
            addressLabel: 'NUM1'
        }, {
            type: LmcInstructionType.store,
            addressLabel: 'TOTAL'
        }, {
            type: LmcInstructionType.output
        }, {
            type: LmcInstructionType.halt
        }, {
            label: 'NUM1',
            type: LmcInstructionType.dataLocation,
        }, {
            label: 'NUM2',
            type: LmcInstructionType.dataLocation,
        }, {
            label: 'ONE',
            type: LmcInstructionType.dataLocation,
            addressLabel: '1'
        }, {
            label: 'TOTAL',
            type: LmcInstructionType.dataLocation,
            addressLabel: '0'
        }
        ]
    }
]
