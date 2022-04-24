import {
    FloatingPointNumber
} from './types';

import {
    createFloatingPoint,
    getDenaryFromFloatingPoint,
    floatingPointToString,
    getFloatingPointFromDenary,
} from "./floatingPoint";
import {
    binaryFromString,
    createBinaryNumber
} from './binaryIntegers';


interface FloatingPointTestCase {
    floatingPoint: FloatingPointNumber,
    denary: number
}

const FLOATING_POINT_TEST_CASES: FloatingPointTestCase[] = [
    {
        floatingPoint: {
            mantissa: binaryFromString('01011010'),
            exponent: binaryFromString('0011'),
        },
        denary: 5.625
    }, {
        floatingPoint: {
            mantissa: binaryFromString('01000000'),
            exponent: binaryFromString('1110'),
        },
        denary: 0.125
    }, {
        floatingPoint: {
            mantissa: binaryFromString('10101101'),
            exponent: binaryFromString('0101'),
        },
        denary: -20.75
    }
]

describe("Floating Point Numbers", () => {
    test("createBinaryNumber", () => {
        expect(createBinaryNumber(4)).toEqual([false, false, false, false]);
        expect(createBinaryNumber(4, true)).toEqual([true, true, true, true])
        expect(createBinaryNumber(6, false)).toEqual([false, false, false, false, false, false])

    });
    test('createFloatingPoint', () => {
        expect(createFloatingPoint()).toEqual({
            mantissa: [false, false, false, false, false, false, false, false],
            exponent: [false, false, false, false]
        })
        expect(createFloatingPoint(4, 2)).toEqual({
            mantissa: [false, false, false, false],
            exponent: [false, false]
        })
    });
    test('binaryFromString', () => {
        expect(binaryFromString('1111')).toEqual([true, true, true, true]);
        expect(binaryFromString('11 11')).toEqual([true, true, true, true]);
        expect(binaryFromString('0101')).toEqual([false, true, false, true]);
        expect(binaryFromString('01 01')).toEqual([false, true, false, true]);
        expect(binaryFromString('1 1 1 1')).toEqual([true, true, true, true]);
    })

    FLOATING_POINT_TEST_CASES.forEach(({ floatingPoint, denary }) => {
        test(`getDenaryFromFloatingPoint ${denary} -> ${floatingPointToString(floatingPoint)}`, () => {
            expect(getDenaryFromFloatingPoint(floatingPoint)).toBe(denary)
        });
        test(`getFloatingPointFromDenary ${floatingPointToString(floatingPoint)} -> ${denary}`, () => {
            // expect(getFloatingPointFromDenary(denary)).toEqual(floatingPoint)
        })
    });
})