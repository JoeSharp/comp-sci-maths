import {
    BinaryDigit,
    toggleBit,
    toggleBitInNumber,
    createBinaryNumber,
    getDecimalFrom2sComplement,
    BinaryNumber,
    shiftLeft,
    shiftRight,
    binaryString
} from "./floatingPointReducer";

interface TwosComplementTestCase {
    binary: BinaryNumber,
    decimal: number
}

const TWOS_COMPLEMMENT_TEST_CASES: TwosComplementTestCase[] = [
    {
        binary: [0, 0, 0, 0],
        decimal: 0
    }, {
        binary: [0, 0, 0, 1],
        decimal: 1
    }, {
        binary: [0, 0, 1, 0],
        decimal: 2
    }, {
        binary: [1, 0, 0, 0],
        decimal: -8
    }, {
        binary: [1, 1, 0, 0],
        decimal: -4
    }, {
        binary: [1, 1, 1, 1],
        decimal: -1
    }
]

interface ShiftTestCase {
    binary: BinaryNumber,
    result: BinaryNumber,
    flag: boolean;
}

const SHIFT_RIGHT_TEST_CASES: ShiftTestCase[] = [
    {
        binary: [0, 1, 1, 0],
        result: [0, 0, 1, 1],
        flag: false
    }, {
        binary: [0, 1, 1, 1],
        result: [0, 0, 1, 1],
        flag: true
    }, {
        binary: [1, 0, 0, 0],
        result: [0, 1, 0, 0],
        flag: false
    }, {
        binary: [1, 0, 0, 1],
        result: [0, 1, 0, 0],
        flag: true
    }
]

const SHIFT_LEFT_TEST_CASES: ShiftTestCase[] = [
    {
        binary: [0, 1, 1, 0],
        result: [1, 1, 0, 0],
        flag: false
    }, {
        binary: [0, 0, 0, 1],
        result: [0, 0, 1, 0],
        flag: false
    }, {
        binary: [1, 1, 1, 0],
        result: [1, 1, 0, 0],
        flag: true
    }, {
        binary: [1, 0, 0, 0],
        result: [0, 0, 0, 0],
        flag: true
    }, {
        binary: [1, 0, 0, 1],
        result: [0, 0, 1, 0],
        flag: true
    }
]

describe("Floating Point Numbers", () => {
    test("Toggle Bit", () => {
        let value: BinaryDigit = 1;

        value = toggleBit(value);
        expect(value).toBe(0);

        value = toggleBit(value);
        expect(value).toBe(1);
    })

    test("Toggle Bit in Number", () => {
        let value: BinaryDigit[] = [0, 1, 1, 0];

        value = toggleBitInNumber(value, 1);
        expect(value).toEqual([0, 0, 1, 0]);

        value = toggleBitInNumber(value, 3);
        expect(value).toEqual([0, 0, 1, 1]);

        expect(() => toggleBitInNumber(value, -1)).toThrowError();
        expect(() => toggleBitInNumber(value, 4)).toThrowError();
        expect(() => toggleBitInNumber(value, 67)).toThrowError();
    })

    test("Create Numbers", () => {
        expect(createBinaryNumber(4)).toEqual([0, 0, 0, 0]);
        expect(createBinaryNumber(4, 1)).toEqual([1, 1, 1, 1])
        expect(createBinaryNumber(6, 0)).toEqual([0, 0, 0, 0, 0, 0])
    })

    TWOS_COMPLEMMENT_TEST_CASES.forEach(({ binary, decimal }) =>
        test(`Get Decimal from 2s Complement - ${binaryString(binary)} -> ${decimal}`,
            () => expect(getDecimalFrom2sComplement(binary)).toEqual(decimal))
    )

    SHIFT_RIGHT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`Shift Right ${binaryString(binary)} -> ${binaryString(result)} -> underflow: ${flag}`,
            () => expect(shiftRight(binary)).toEqual({ result, flag }))
    )

    SHIFT_LEFT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`Shift Left ${binaryString(binary)} -> ${binaryString(result)} -> underflow: ${flag}`,
            () => expect(shiftLeft(binary)).toEqual({ result, flag }))
    )
})