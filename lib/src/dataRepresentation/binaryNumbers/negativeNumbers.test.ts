import { binaryFromString, binaryToString } from './binaryIntegers';
import {
    getDenaryFromTwosComplement,
    getOnesComplement,
    getTwosComplementFromDenary,
    getTwosComplement
} from './negativeNumbers';
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


describe("Negative Numbers", () => {

    test('getTwosComplement (over limit)', () => {
        // Can't turn -8 around to  +8 in 4 bits
        expect(getTwosComplement(binaryFromString('1000')).flag).toBeTruthy();

        // Can't turn -128 around to +128 in 8 bits
        expect(getTwosComplement(binaryFromString('10000000')).flag).toBeTruthy();
    })

    test('getDenaryFromTwosComplement (at limit)', () => {
        expect(getDenaryFromTwosComplement(binaryFromString('1000'))).toBe(-8);
        expect(getDenaryFromTwosComplement(binaryFromString('1000 0000'))).toBe(-128);
    })

    test('getTwosComplementFromDenary (at limit)', () => {
        expect(getTwosComplementFromDenary(-8, 4)).toEqual({ result: binaryFromString('1000'), flag: false });
        expect(getTwosComplementFromDenary(-128, 8)).toEqual({ result: binaryFromString('1000 0000'), flag: false });

    })

    BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
        test(`getTwosComplement (forward): ${binaryToString(binary)} -> ${binaryToString(twosComplement)}`,
            () => {
                expect(getTwosComplement(binary)).toEqual({ result: twosComplement, flag: false });
            }
        );
        test(`getTwosComplement (reverse): ${binaryToString(twosComplement)} -> ${binaryToString(binary)}`,
            () => {
                expect(getTwosComplement(twosComplement)).toEqual({ result: binary, flag: false });
            }
        );
        test(`getDenaryFromTwosComplement (+ve): ${binaryToString(binary)} -> ${denary}`,
            () => {
                expect(getDenaryFromTwosComplement(binary)).toBe(denary);
            }
        )
        test(`getDenaryFromTwosComplement (-ve): ${binaryToString(twosComplement)} -> ${-denary}`,
            () => {
                expect(getDenaryFromTwosComplement(twosComplement) === -denary).toBeTruthy();
            }
        )
        test(`getTwosComplementFromDenary (+ve): ${binaryToString(binary)} -> ${denary}`,
            () => {
                expect(getTwosComplementFromDenary(denary, binary.length)).toEqual({ result: binary, flag: false });
            }
        );
        test(`getTwosComplementFromDenary (-ve): ${binaryToString(twosComplement)} -> ${-denary}`,
            () => {
                expect(getTwosComplementFromDenary(-denary, twosComplement.length)).toEqual({ result: twosComplement, flag: false });
            }
        );
    });

    ONES_COMPLEMENT_TEST_CASES.forEach(({ input, output }) =>
        test(`getOnesComplement ${binaryToString(input)} -> ${binaryToString(output)}`, () => {
            expect(getOnesComplement(input)).toEqual(output);
        }));
})