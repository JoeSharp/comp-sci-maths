import {
    BinaryNumber,
    FloatingPointNumber,
    FixedPointNumber
} from './types';

import {
    createFixedPointBinaryNumber,
    fixedPointToString,
    getDenaryFromFixedPoint,
} from "./fixedPoint";
import {
    binaryFromString,
    createBinaryNumber
} from './binaryIntegers';

interface FixedPointTestCase {
    binary: FixedPointNumber;
    denary: number;
}

const FIXED_POINT_TEST_CASES: FixedPointTestCase[] = [
    {
        binary: {
            bits: binaryFromString('00111001'),
            bitsBeforePoint: 4
        },
        denary: 3.5625
    }, {
        binary: {
            bits: binaryFromString('1010 11'),
            bitsBeforePoint: 4
        },
        denary: 10.75
    }
]

describe('Fixed Point Numbers', () => {
    test('createFixedPointBinaryNumber', () => {
        expect(createFixedPointBinaryNumber(4, 2)).toEqual({
            bits: [false, false, false, false],
            bitsBeforePoint: 2
        });

        expect(() => createFixedPointBinaryNumber(4, 8)).toThrowError();
    })

    describe('getDenaryFromFixedPoint', () => {
        FIXED_POINT_TEST_CASES.forEach(({ binary, denary }) => {
            test(`${fixedPointToString(binary)} -> ${denary}`, () => {
                expect(getDenaryFromFixedPoint(binary)).toBe(denary);
            })
        })
    })
})