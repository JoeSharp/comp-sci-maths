import {
    toggleBitInBinary,
    createBinaryNumber,
    getDecimalFrom2sComplement,
    BinaryNumber,
    shiftLeft,
    shiftRight,
    binaryToString,
    createFloatingPoint,
    FloatingPointNumber,
    getDecimalFromFloatingPoint,
    binaryFromString,
    floatingPointToString,
    getFloatingPointFromDecimal,
    get1sComplement,
    or,
    and,
    xor,
    countOnes
} from "./floatingPointReducer";

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
    decimal: number
}

const TWOS_COMPLEMMENT_TEST_CASES: TwosComplementTestCase[] = [
    {
        binary: binaryFromString('0000'),
        decimal: 0
    }, {
        binary: binaryFromString('0001'),
        decimal: 1
    }, {
        binary: binaryFromString('0010'),
        decimal: 2
    }, {
        binary: binaryFromString('1000'),
        decimal: -8
    }, {
        binary: binaryFromString('1100'),
        decimal: -4
    }, {
        binary: binaryFromString('1111'),
        decimal: -1
    }
]

interface FloatingPointTestCase {
    floatingPoint: FloatingPointNumber,
    decimal: number
}

const FLOATING_POINT_TEST_CASES: FloatingPointTestCase[] = [
    {
        floatingPoint: {
            mantissa: binaryFromString('01011010'),
            exponent: binaryFromString('0011'),
        },
        decimal: 5.625
    }, {
        floatingPoint: {
            mantissa: binaryFromString('01000000'),
            exponent: binaryFromString('1110'),
        },
        decimal: 0.125
    }, {
        floatingPoint: {
            mantissa: binaryFromString('10101101'),
            exponent: binaryFromString('0101'),
        },
        decimal: -20.75
    }
]

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

describe("Logical Operators", () => {
    test("Count Ones", () => {
        expect(countOnes(false, false, true, true)).toBe(2);
        expect(countOnes(true, false, true, true)).toBe(3);
        expect(countOnes(false, false, false, false)).toBe(0);
        expect(countOnes(false, false, true, false)).toBe(1);
        expect(countOnes(true, true, true, true)).toBe(4);
    })

    test("OR", () => {
        expect(or(false, false)).toBe(false);
        expect(or(true, false)).toBe(true);
        expect(or(false, true)).toBe(true);
        expect(or(true, true)).toBe(true);
    })

    test("AND", () => {
        expect(and(false, false)).toBe(false);
        expect(and(true, false)).toBe(false);
        expect(and(false, true)).toBe(false);
        expect(and(true, true)).toBe(true);
    })

    test("XOR", () => {
        expect(xor(false, false)).toBe(false);
        expect(xor(true, false)).toBe(true);
        expect(xor(false, true)).toBe(true);
        expect(xor(true, true)).toBe(false);
    })
})

describe("Maths", () => {
    test("Toggle Bit in Binary Number", () => {
        let value: boolean[] = [false, true, true, false];

        value = toggleBitInBinary(value, 0);
        expect(value).toEqual([true, true, true, false]);

        value = toggleBitInBinary(value, 3);
        expect(value).toEqual([true, true, true, true]);

        expect(() => toggleBitInBinary(value, -1)).toThrowError();
        expect(() => toggleBitInBinary(value, 4)).toThrowError();
        expect(() => toggleBitInBinary(value, 67)).toThrowError();
    })

    SHIFT_RIGHT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`Shift Right ${binaryToString(binary)} -> ${binaryToString(result)} -> underflow: ${flag}`,
            () => expect(shiftRight(binary)).toEqual({ result, flag }))
    )

    SHIFT_LEFT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`Shift Left ${binaryToString(binary)} -> ${binaryToString(result)} -> underflow: ${flag}`,
            () => expect(shiftLeft(binary)).toEqual({ result, flag }))
    )
})

describe("Floating Point Numbers", () => {
    test("Create Numbers", () => {
        expect(createBinaryNumber(4)).toEqual([false, false, false, false]);
        expect(createBinaryNumber(4, true)).toEqual([true, true, true, true])
        expect(createBinaryNumber(6, false)).toEqual([false, false, false, false, false, false])
        expect(createFloatingPoint()).toEqual({
            mantissa: [false, false, false, false, false, false, false, false],
            exponent: [false, false, false, false]
        })
        expect(createFloatingPoint(4, 2)).toEqual({
            mantissa: [false, false, false, false],
            exponent: [false, false]
        })
    })

    TWOS_COMPLEMMENT_TEST_CASES.forEach(({ binary, decimal }) =>
        test(`Get Decimal from 2s Complement - ${binaryToString(binary)} -> ${decimal}`,
            () => expect(getDecimalFrom2sComplement(binary)).toBe(decimal)
        ))

    FLOATING_POINT_TEST_CASES.forEach(({ floatingPoint, decimal }) =>
        test(`Floating Point to Decimal ${floatingPointToString(floatingPoint)} -> ${decimal}`, () => {
            expect(getDecimalFromFloatingPoint(floatingPoint)).toBe(decimal)
            // expect(getFloatingPointFromDecimal(decimal)).toEqual(floatingPoint)
        }));

    ONES_COMPLEMENT_TEST_CASES.forEach(({ input, output }) =>
        test(`One's Complement ${binaryToString(input)} -> ${binaryToString(output)}`, () => {
            expect(get1sComplement(input)).toEqual(output);
        }));
})