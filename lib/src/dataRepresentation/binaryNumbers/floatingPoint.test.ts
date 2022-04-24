import {
    FloatingPointNumber
} from './types';

import {
    createFloatingPoint,
    getDenaryFromFloatingPoint,
    floatingPointToString,
    getFloatingPointFromDenary,
    isNormalised,
    normalise
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

interface AbstractNormalisationTestCase {
    raw: FloatingPointNumber,
    normalised: FloatingPointNumber | null,
    isAlreadyNormalised: boolean
}

interface AlreadyNormalisedTestCase extends AbstractNormalisationTestCase {
    isAlreadyNormalised: true,
    normalised: null
}

interface RequiresNormalisingTestCase extends AbstractNormalisationTestCase {
    isAlreadyNormalised: false,
    normalised: FloatingPointNumber,
}

type NormalisationTestCase = AlreadyNormalisedTestCase | RequiresNormalisingTestCase;

const NORMALISATION_TEST_CASES: NormalisationTestCase[] = [
    {
        raw: {
            mantissa: binaryFromString('1000 1010'),
            exponent: binaryFromString('0110')
        },
        normalised: null,
        isAlreadyNormalised: true
    }, {
        raw: {
            mantissa: binaryFromString('1111 0111'),
            exponent: binaryFromString('0001')
        },
        normalised: {
            mantissa: binaryFromString('1011 1000'),
            exponent: binaryFromString('1110')
        },
        isAlreadyNormalised: false
    }, {
        raw: {
            mantissa: binaryFromString('0000 1011'),
            exponent: binaryFromString('0101')
        },
        normalised: {
            mantissa: binaryFromString('0101 1000'),
            exponent: binaryFromString('0010')
        },
        isAlreadyNormalised: false
    }, {
        raw: {
            mantissa: binaryFromString('0000 0110'), // Q7 (a)
            exponent: binaryFromString('0001')
        },
        normalised: {
            mantissa: binaryFromString('0110 0000'), // 4 bits to right
            exponent: binaryFromString('1101')
        },
        isAlreadyNormalised: false
    }, {
        raw: {
            mantissa: binaryFromString('1111 0110'), // Q7 (b)
            exponent: binaryFromString('0011')
        },
        normalised: {
            mantissa: binaryFromString('1011 0000'), // 3 bits shifted to left
            exponent: binaryFromString('0000')
        },
        isAlreadyNormalised: false
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

    describe('getDenaryFromFloatingPoint', () => {
        FLOATING_POINT_TEST_CASES.forEach(({ floatingPoint, denary }) => {
            test(`${floatingPointToString(floatingPoint)} -> ${denary}`, () => {
                expect(getDenaryFromFloatingPoint(floatingPoint)).toBe(denary)
            });
        })
    });

    describe('getFloatingPointFromDenary', () => {
        FLOATING_POINT_TEST_CASES.forEach(({ floatingPoint, denary }) => {
            test(`${denary} -> ${floatingPointToString(floatingPoint)}`, () => {
                expect(getFloatingPointFromDenary(denary)).toEqual(floatingPoint)
            })
        });
    });

    describe('isNormalised', () => {
        NORMALISATION_TEST_CASES.forEach(({ raw, isAlreadyNormalised }) => {
            test(`${floatingPointToString(raw)} -> ${isAlreadyNormalised}`, () => {
                expect(isNormalised(raw)).toBe(isAlreadyNormalised);
            })
        })
    })

    describe('normalise', () => {
        NORMALISATION_TEST_CASES.forEach(({ raw, normalised, isAlreadyNormalised }) => {
            test(`${floatingPointToString(raw)} -> ${floatingPointToString(normalised !== null ? normalised : raw)}`, () =>
                expect(normalise(raw)).toEqual(isAlreadyNormalised ? raw : normalised)
            )
        })
    })
})