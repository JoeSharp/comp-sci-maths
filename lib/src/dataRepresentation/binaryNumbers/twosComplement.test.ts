import { BinaryAdditionTestCase } from './binaryInteger.test';
import { binaryAddition, binaryFromString, binaryToString } from './binaryIntegers';
import {
    getDenaryFromTwosComplementInteger,
    getOnesComplement,
    getTwosComplementIntegerFromDenary,
    getTwosComplement
} from './twosComplement';
import { BinaryNumber } from './types';

interface OnesComplementTestCase {
    input: BinaryNumber;
    output: BinaryNumber;
}

const ONES_COMPLEMENT_TEST_CASES: OnesComplementTestCase[] = [
    {
        input: binaryFromString('0000'),
        output: binaryFromString('1111')
    }, {
        input: binaryFromString('0001'),
        output: binaryFromString('1110')
    }, {
        input: binaryFromString('1000'),
        output: binaryFromString('0111')
    }, {
        input: binaryFromString('0110'),
        output: binaryFromString('1001')
    }, {
        input: binaryFromString('0101'),
        output: binaryFromString('1010')
    }
]


interface TwosComplementTestCase {
    binary: BinaryNumber,
    twosComplement: BinaryNumber,
    denary: number
}

const BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES: TwosComplementTestCase[] = [
    {
        binary: binaryFromString('0000'),
        twosComplement: binaryFromString('0000'),
        denary: 0
    }, {
        binary: binaryFromString('0001'),
        twosComplement: binaryFromString('1111'),
        denary: 1
    }, {
        binary: binaryFromString('0010'),
        twosComplement: binaryFromString('1110'),
        denary: 2
    }, {
        binary: binaryFromString('1100'),
        twosComplement: binaryFromString('0100'),
        denary: -4
    }, {
        binary: binaryFromString('1111'),
        twosComplement: binaryFromString('0001'),
        denary: -1
    }
]


const BINARY_ADDITION_TEST_CASES: BinaryAdditionTestCase[] = [
    {
        a: binaryFromString("1111"),
        b: binaryFromString("0001"),
        result: binaryFromString("0000"),
        overflow: false // TODO figure this out, it's not working yet.
    },
]

describe("Negative Numbers", () => {

    test('getTwosComplement (over limit)', () => {
        // Can't turn -8 around to  +8 in 4 bits
        expect(getTwosComplement(binaryFromString('1000')).flag).toBeTruthy();

        // Can't turn -128 around to +128 in 8 bits
        expect(getTwosComplement(binaryFromString('10000000')).flag).toBeTruthy();
    })

    describe('binaryAddition', () => {
        BINARY_ADDITION_TEST_CASES.forEach(({ a, b, result, overflow }) => {
            test.skip(`${binaryToString(a)} + ${binaryToString(b)} = ${binaryToString(result)}`, () => {
                expect(binaryAddition(a, b)).toEqual({ result, flag: overflow });
            })
        })
    })

    test('getDenaryFromTwosComplementInteger (at limit)', () => {
        expect(getDenaryFromTwosComplementInteger(binaryFromString('1000'))).toBe(-8);
        expect(getDenaryFromTwosComplementInteger(binaryFromString('1000 0000'))).toBe(-128);
    })

    test('getTwosComplementIntegerFromDenary (at limit)', () => {
        expect(getTwosComplementIntegerFromDenary(-8, 4)).toEqual({ result: binaryFromString('1000'), flag: false });
        expect(getTwosComplementIntegerFromDenary(-128, 8)).toEqual({ result: binaryFromString('1000 0000'), flag: false });

    })

    describe('getTwosComplement (forward)', () => {
        BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
            test(`${binaryToString(binary)} -> ${binaryToString(twosComplement)}`,
                () => {
                    expect(getTwosComplement(binary)).toEqual({ result: twosComplement, flag: false });
                }
            );
        })
    });

    describe('getTwosComplement (reverse)', () => {
        BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
            test(`${binaryToString(twosComplement)} -> ${binaryToString(binary)}`,
                () => {
                    expect(getTwosComplement(twosComplement)).toEqual({ result: binary, flag: false });
                }
            );
        });
    })

    describe('getDenaryFromTwosComplementInteger (+ve)', () => {
        BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
            test(`${binaryToString(binary)} -> ${denary}`,
                () => {
                    expect(getDenaryFromTwosComplementInteger(binary)).toBe(denary);
                }
            )
        })
    });

    describe('getDenaryFromTwosComplementInteger (-ve)', () => {
        BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
            test(`${binaryToString(twosComplement)} -> ${-denary}`,
                () => {
                    expect(getDenaryFromTwosComplementInteger(twosComplement) === -denary).toBeTruthy();
                }
            )
        })
    });

    describe('getTwosComplementIntegerFromDenary (+ve)', () => {

        BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
            test(`${binaryToString(binary)} -> ${denary}`,
                () => {
                    expect(getTwosComplementIntegerFromDenary(denary, binary.length)).toEqual({ result: binary, flag: false });
                }
            );
        });
    })

    describe('getTwosComplementIntegerFromDenary (-ve)', () => {
        BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
            test(`${binaryToString(twosComplement)} -> ${-denary}`,
                () => {
                    expect(getTwosComplementIntegerFromDenary(-denary, twosComplement.length)).toEqual({ result: twosComplement, flag: false });
                }
            );
        });
    })

    describe('getOnesComplement', () => {
        ONES_COMPLEMENT_TEST_CASES.forEach(({ input, output }) =>
            test(`${binaryToString(input)} -> ${binaryToString(output)}`, () => {
                expect(getOnesComplement(input)).toEqual(output);
            }));
    })
})