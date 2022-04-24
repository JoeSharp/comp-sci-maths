import {
    BinaryNumber
} from './types';

import {
    toggleBitInBinary,
    binaryAddition,
    shiftLeft,
    shiftRight,
    binaryFromString,
    binaryToString,
    getBinaryIntegerFromDenary, getDenaryFromBinaryInteger,
} from './binaryIntegers';

interface ShiftTestCase {
    binary: BinaryNumber,
    result: BinaryNumber,
    flag: boolean;
}

const SHIFT_RIGHT_TEST_CASES: ShiftTestCase[] = [
    {
        binary: binaryFromString('0110'),
        result: binaryFromString('0011'),
        flag: false
    }, {
        binary: binaryFromString('0111'),
        result: binaryFromString('0011'),
        flag: true
    }, {
        binary: binaryFromString('1000'),
        result: binaryFromString('0100'),
        flag: false
    }, {
        binary: binaryFromString('1001'),
        result: binaryFromString('0100'),
        flag: true
    }
]

const SHIFT_LEFT_TEST_CASES: ShiftTestCase[] = [
    {
        binary: binaryFromString('0110'),
        result: binaryFromString('1100'),
        flag: false
    }, {
        binary: binaryFromString('0001'),
        result: binaryFromString('0010'),
        flag: false
    }, {
        binary: binaryFromString('1110'),
        result: binaryFromString('1100'),
        flag: true
    }, {
        binary: binaryFromString('1000'),
        result: binaryFromString('0000'),
        flag: true
    }, {
        binary: binaryFromString('1001'),
        result: binaryFromString('0010'),
        flag: true
    }
]

interface BinaryIntegerTestCase {
    binary: BinaryNumber;
    denary: number;
}

const BINARY_INTEGER_TEST_CASES: BinaryIntegerTestCase[] = [
    {
        binary: binaryFromString('0000'),
        denary: 0
    },
    {
        binary: binaryFromString('1000'),
        denary: 8
    },
    {
        binary: binaryFromString('1100'),
        denary: 12
    },
    {
        binary: binaryFromString('0110'),
        denary: 6
    },
    {
        binary: binaryFromString('0101'),
        denary: 5
    },
    {
        binary: binaryFromString('1110'),
        denary: 14
    }
]

interface BinaryAdditionTestCase {
    a: BinaryNumber;
    b: BinaryNumber;
    result: BinaryNumber;
    overflow: boolean;
}

const BINARY_ADDITION_TEST_CASES: BinaryAdditionTestCase[] = [
    {
        a: binaryFromString("0000"),
        b: binaryFromString("0000"),
        result: binaryFromString("0000"),
        overflow: false
    },
    {
        a: binaryFromString("0001"),
        b: binaryFromString("0000"),
        result: binaryFromString("0001"),
        overflow: false
    },
    {
        a: binaryFromString("1010"),
        b: binaryFromString("0001"),
        result: binaryFromString("1011"),
        overflow: false
    },
    {
        a: binaryFromString("0001"),
        b: binaryFromString("0001"),
        result: binaryFromString("0010"),
        overflow: false
    },
    {
        a: binaryFromString("0011"),
        b: binaryFromString("0011"),
        result: binaryFromString("0110"),
        overflow: false
    },
    {
        a: binaryFromString("1011"),
        b: binaryFromString("0111"),
        result: binaryFromString("0010"),
        overflow: true
    },
    {
        a: binaryFromString("1111"),
        b: binaryFromString("1111"),
        result: binaryFromString("1110"),
        overflow: true
    }
]

describe("Binary Integers", () => {

    test("toggleBitInBinary", () => {
        let value: boolean[] = [false, true, true, false];

        value = toggleBitInBinary(value, 0);
        expect(value).toEqual([true, true, true, false]);

        value = toggleBitInBinary(value, 3);
        expect(value).toEqual([true, true, true, true]);

        expect(() => toggleBitInBinary(value, -1)).toThrowError();
        expect(() => toggleBitInBinary(value, 4)).toThrowError();
        expect(() => toggleBitInBinary(value, 67)).toThrowError();
    })

    BINARY_ADDITION_TEST_CASES.forEach(({ a, b, result, overflow }) => {
        test(`binaryAddition: ${binaryToString(a)} + ${binaryToString(b)} = ${binaryToString(result)}`, () => {
            expect(binaryAddition(a, b)).toEqual({ result, flag: overflow });
        })
    })

    SHIFT_RIGHT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`shiftRight: ${binaryToString(binary)} -> ${binaryToString(result)} -> underflow: ${flag}`,
            () => expect(shiftRight(binary)).toEqual({ result, flag }))
    )

    SHIFT_LEFT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`shiftLeft: ${binaryToString(binary)} -> ${binaryToString(result)} -> underflow: ${flag}`,
            () => expect(shiftLeft(binary)).toEqual({ result, flag }))
    )

    BINARY_INTEGER_TEST_CASES.forEach(({ binary, denary }) => {
        test(`getDenaryFromBinaryInteger ${binaryToString(binary)} -> ${denary}`, () =>
            expect(getDenaryFromBinaryInteger(binary)).toBe(denary))

        test(`getBinaryIntegerFromDenary ${denary} -> ${binaryToString(binary)}`, () =>
            expect(getBinaryIntegerFromDenary(denary, binary.length)).toEqual({ result: binary, flag: false }));

        test('Successive Addition', () => {
            const BITS = 8;
            const { result: one } = getBinaryIntegerFromDenary(1, BITS);
            let { result: value } = getBinaryIntegerFromDenary(0, BITS);

            for (let i = 0; i < Math.pow(2, BITS); i++) {
                let addResult = binaryAddition(value, one);
                expect(getDenaryFromBinaryInteger(value)).toBe(i);
                value = addResult.result;
            }
        })
    });
})